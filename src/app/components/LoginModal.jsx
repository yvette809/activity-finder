"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginModal = ({ setShowLoginModal }) => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/dashboard");
      setShowLoginModal(false);
    }
  };

  const handleRegisterClick = () => {
    router.push("/register");
    setShowLoginModal(false);
  };

  return (
    <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  ">
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-400">Login</h2>
        <form onSubmit={handleLogin} className="text-gray-600 ">
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

          <div className="flex justify-between align-between">
            <button
              type="submit"
              className="bg-deep-green text-white p-2 rounded-md cursor-pointer"
            >
              Login
            </button>
            <button
              className="text-white bg-deep-green p-2 rounded-md cursor-pointer"
              onClick={() => setShowLoginModal(false)}
            >
              Close
            </button>
          </div>

          <div>
            <div>
              <div>
                Don't have an account? Please{" "}
                <strong
                  className="text-deep-green cursor-pointer flex justify-center"
                  onClick={handleRegisterClick}
                >
                  Register
                </strong>
              </div>
            </div>
          </div>
        </form>
        {showRegisterModal && (
          <RegisterModal
            setShowLoginModal={setShowLoginModal}
            setShowRegisterModal={setShowRegisterModal}
          />
        )}
      </div>
    </div>
  );
};

export default LoginModal;
