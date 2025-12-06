"use client";

import { useState } from "react";
import api from "../../lib/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const { login: saveUser } = useAuth();

  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signup") {
        await api.post("/api/user/signup", form);
        alert("Signup successful! Please login.");
        setMode("login");
        setForm({ name: "", email: "", password: "" });
      } else {
        const res = await api.post("/api/user/login", {
          email: form.email,
          password: form.password,
        });
        saveUser(res.data.user, res.data.token);
        window.location.href = "/chat";
      }
    } catch (error) {
      alert(error.response?.data?.message || "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-black via-neutral-900 to-black relative overflow-hidden">

      {/* Outer Glow Effect */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-blue-600/20 blur-[140px] -z-10"></div>

      <div className="w-full max-w-md p-10 rounded-2xl">

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center text-white mb-2 drop-shadow-[0_0_15px_rgba(0,112,255,0.3)]">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-center text-gray-400 mb-8 text-sm">
          {mode === "login" ? "Login to continue" : "Create an account to start"}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {mode === "signup" && (
            <div>
              <label className="text-gray-400 text-sm mb-1 block">Full Name</label>
              <input
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                value={form.name}
                required
                className="w-full p-3 rounded-lg bg-neutral-900 text-white placeholder-gray-500 border border-neutral-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 outline-none transition-all"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@email.com"
              onChange={handleChange}
              value={form.email}
              required
              className="w-full p-3 rounded-lg bg-neutral-900 text-white placeholder-gray-500 border border-neutral-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 outline-none transition-all"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={form.password}
              required
              className="w-full p-3 rounded-lg bg-neutral-900 text-white placeholder-gray-500 border border-neutral-700 focus:border-blue-500 focus:ring focus:ring-blue-500/30 outline-none transition-all"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 rounded-lg text-white font-semibold text-lg tracking-wide mt-4 transition-all duration-300 shadow-lg
            ${isLoading
                ? "border cursor-not-allowed"
                : "border hover:shadow-[0_0_20px_rgba(0,112,255,0.5)]"
              }`}
          >
            {isLoading
              ? mode === "login"
                ? "Logging In..."
                : "Signing Up..."
              : mode === "login"
                ? "Login"
                : "Sign Up"}
          </button>
        </form>

        {/* Switch Mode */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          {mode === "login" ? (
            <>
              Don’t have an account?
              <button
                onClick={toggleMode}
                className="text-blue-400 hover:text-blue-300 underline ml-1 transition"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?
              <button
                onClick={toggleMode}
                className="text-blue-400 hover:text-blue-300 underline ml-1 transition"
              >
                Login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
