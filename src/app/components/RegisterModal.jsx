/* import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/utils/api";
import toast from "react-hot-toast";

const RegisterModal = ({ setShowModal, setShowRegisterModal }) => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const [specialisation, setSpecialisation] = useState("");
  const [experience, setExperience] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    specialisation: "",
    experience: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "",
      specialisation: "",
      experience: "",
    });

  
    let hasErrors = false;
    if (firstName.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstName: "firstName field cannot be empty",
      }));
      hasErrors = true;
    }
    if (lastName.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastName: "lastName field cannot be empty",
      }));
      hasErrors = true;
    }
    if (email.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "email field cannot be empty",
      }));
      hasErrors = true;
    }
    if (password === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "passwordfield cannot be empty",
      }));
      hasErrors = true;
    }
    if (role.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        role: "role field cannot be empty",
      }));
      hasErrors = true;
    }
    if (specialisation.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        specialisation: "specialisation field cannot be empty",
      }));
      hasErrors = true;
    }
    if (experience === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        experience: "experience field cannot be empty",
      }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      password,
      image,
      role,
      specialisation,
      experience,
    };

    try {
      const data = await registerUser(user);
      console.log("data", data);
      setShowRegisterModal(false);
      setShowModal(true);

      toast.success("User Registered Successfully");
    } catch (error) {
      console.error("Error registering user:", error.message);
      toast.error("An unexpected error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-400">Register</h2>
        <form onSubmit={handleRegister} className="text-gray-600 ">
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
             
              className={`w-full px-4 py-2 text-gray-700 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
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
              className={`w-full px-4 py-2 text-gray-700 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form_input">
              Email:
            </label>
            <input
              type="text"
              id="email"
              className={`w-full px-4 py-2 text-gray-700 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
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
              className={`w-full px-4 py-2 text-gray-700 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
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
              className="form_input"
              placeholder="Enter your image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
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
              className={`w-full px-4 py-2 text-gray-700 border ${
                errors.role ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:outline-none`}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="trainer">Trainer</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role}</p>
            )}
          </div>

          {role === "trainer" && (
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
                  className={`w-full px-4 py-2 text-gray-700 border ${
                    errors.specialisation ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none`}
                  placeholder="Enter your specialisation"
                  value={specialisation}
                  onChange={(e) => setSpecialisation(e.target.value)}
                />
                {errors.specialisation && (
                  <p className="text-red-500 text-sm">
                    {errors.specialisation}
                  </p>
                )}
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
                  className={`w-full px-4 py-2 text-gray-700 border ${
                    errors.experience ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none`}
                  placeholder="Enter your experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm">{errors.experience}</p>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between align-between">
            <button
              type="submit"
              className="bg-primary-blue text-white p-2 rounded-md cursor-pointer"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
            <button
              className="text-white bg-primary-blue p-2 rounded-md cursor-pointer"
              onClick={() => setShowModal(false) || setShowRegisterModal(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;
 */


import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterModal = ({ setShowModal, setShowRegisterModal }) => {
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
  console.log("user", user);

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();
      console.log("data", data);
      if (res.ok) {
        setShowModal(true);
        setShowRegisterModal(false); // Close the RegisterModal
      }
      setUser(data);
      router.push("/");
      alert("Register success");
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-deep-green">Register</h2>
        <form onSubmit={handleRegister} className="text-gray-600 ">
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
            <label htmlFor="email" className="form_input">
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

          <div className="flex justify-between align-between">
            <button
              type="submit"
              className="bg-deep-green text-white p-2 rounded-md cursor-pointer"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
            <button
              className="text-white bg-deep-green p-2 rounded-md cursor-pointer"
              onClick={() => setShowModal(false) || setShowRegisterModal(false)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal;