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
