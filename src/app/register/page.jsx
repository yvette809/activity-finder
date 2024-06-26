"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

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

  const validateForm = () => {
    const errors = {};

    if (!user.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!user.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!user.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = "Email is invalid";
    }

    if (!user.password.trim()) {
      errors.password = "Password is required";
    } else if (user.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setSubmitting(true);

    try {
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        router.push("/");
      }

      toast.success("User successfully registered");
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
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
              name="firstName"
              className="form_input"
              placeholder="Enter your first name"
              value={user.firstName}
              onChange={handleChange}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
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
              name="lastName"
              className="form_input"
              placeholder="Enter your last name"
              value={user.lastName}
              onChange={handleChange}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
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
              name="email"
              className="form_input"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
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
              name="password"
              className="form_input"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
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
              name="image"
              className="form_input"
              placeholder="Enter your image URL"
              value={user.image}
              onChange={handleChange}
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
              name="role"
              className="form_input"
              value={user.role}
              onChange={handleChange}
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
                  name="specialisation"
                  className="form_input"
                  placeholder="Enter your specialisation"
                  value={user.specialisation}
                  onChange={handleChange}
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
                  name="experience"
                  className="form_input"
                  placeholder="Enter your experience"
                  value={user.experience}
                  onChange={handleChange}
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
