"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";
import z from "zod";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: "",
    role: "",
    specialisation: "",
    experience: 0,
  });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const RegisterSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    image: z.string().url(),
    role: z.enum(["user", "trainer"]),
    specialisation: z.string().min(0).optional(),
    experience: z.number().min(0).optional(),
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const validatedData = RegisterSchema.parse(user);

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        router.push("/");
      }

      toast.success("User successfully registered");
    } catch (error) {
      console.error("Error registering user:", error);
      if (error instanceof z.ZodError) {
        setErrors(
          error.errors.reduce((acc, curr) => {
            return {
              ...acc,
              [curr.path[0]]: curr.message,
            };
          }, {})
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="  flex items-center justify-center mt-6 ">
      <div className="bg-white p-8 rounded-md shadow-md w-[60vw] ">
        <h2 className="text-2xl font-bold mb-4 text-deep-green">Register</h2>
        <form onSubmit={handleRegister} className="text-gray-600  ">
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              className="form_input"
              placeholder="Enter your first name"
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-600"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              className="form_input"
              placeholder="Enter your last name"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email:
            </label>
            <input
              type="text"
              id="email"
              className="form_input"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="form_input"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="image"
              className="form_input"
              placeholder="Enter your image URL"
              value={user.image}
              onChange={(e) => setUser({ ...user, image: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-600"
            >
              Role:
            </label>
            <select
              id="role"
              className="form_input"
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="trainer">Trainer</option>
            </select>
          </div>

          {user.role === "trainer" && (
            <div>
              <div className="mb-4">
                <label
                  htmlFor="specialisation"
                  className="block text-sm font-medium text-gray-600"
                >
                  Specialisation:
                </label>
                <input
                  type="text"
                  id="specialisation"
                  className="form_input"
                  placeholder="Enter your specialisation"
                  value={user.specialisation}
                  onChange={(e) =>
                    setUser({ ...user, specialisation: e.target.value })
                  }
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-600"
                >
                  Experience (in years):
                </label>
                <input
                  type="number"
                  id="experience"
                  className="form_input"
                  placeholder="Enter your experience"
                  value={user.experience}
                  onChange={(e) =>
                    setUser({ ...user, experience: e.target.value })
                  }
                />
              </div>
            </div>
          )}
          <div>
            Already Have An Account? please
            <Link
              className="text-deep-green cursor-pointer font-bold mb-6"
              href="/login"
            >
              {" "}
              Login
            </Link>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="outline_btn" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
