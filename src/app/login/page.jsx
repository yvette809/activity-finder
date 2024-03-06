"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

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
      setUser(data);
      router.push("/dashboard");
    }
  };

  return (
    <div className="  flex items-center justify-center mt-6 ">
      <div className="bg-white p-8 rounded-md shadow-md w-[60vw]">
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
            <button type="submit" className="outline_btn">
              Login
            </button>
          </div>

          <div>
            <div>
              <div>
                Don't have an account? Please{" "}
                <Link
                  className="text-deep-green cursor-pointer font-bold"
                  href="/register"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
