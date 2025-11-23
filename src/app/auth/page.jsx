"use client";

import { useState } from "react";
import api from "../../lib/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const { login: saveUser } = useAuth();

  const [mode, setMode] = useState("login"); // login | signup
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
        await api.post("/api/user/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        alert("Signup successful! Please login.");
        setMode("login");
        setForm({ name: "", email: "", password: "" });
      } else {
        const res = await api.post("/api/user/login", {
          email: form.email,
          password: form.password,
        });

        saveUser(res.data.user, res.data.token);
        router.push("/dashboard");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-white/10">
        
        {/* Top Title */}
        <h1 className="text-4xl font-bold text-center text-white mb-2 tracking-tight">
          {mode === "login" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-center text-gray-300 mb-8 text-sm">
          {mode === "login"
            ? "Login using your credentials"
            : "Signup to get started"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          {mode === "signup" && (
            <div>
              <label className="text-gray-300 text-sm mb-1 block">
                Full Name
              </label>
              <input
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                value={form.name}
                required
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:border-blue-400 focus:ring focus:ring-blue-400/30 outline-none"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Email</label>
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              onChange={handleChange}
              value={form.email}
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:border-blue-400 focus:ring focus:ring-blue-400/30 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-300 text-sm mb-1 block">Password</label>
            <input
              name="password"
              type="password"
              placeholder="your password"
              onChange={handleChange}
              value={form.password}
              required
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:border-blue-400 focus:ring focus:ring-blue-400/30 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full p-3 rounded-lg text-white font-semibold text-lg tracking-wide mt-4 transition-all duration-300 
              ${isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"}`
            }
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

        {/* Switch mode */}
        <p className="mt-6 text-center text-gray-300">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={toggleMode}
                className="text-blue-400 hover:text-blue-300 underline ml-1"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleMode}
                className="text-blue-400 hover:text-blue-300 underline ml-1"
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
