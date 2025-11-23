"use client";

import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  if (!user)
    return (
      <p className="text-gray-300 text-center p-6 animate-pulse">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex items-center justify-center p-6">
      <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        
        <h1 className="text-3xl font-bold mb-4">
          Welcome, <span className="text-blue-400">{user.name}</span>
        </h1>

        <button
          onClick={logout}
          className="
            mt-6 px-6 py-3 bg-red-600 text-white rounded-lg 
            hover:bg-red-700 transition font-semibold
          "
        >
          Logout
        </button>
      </div>
    </div>
  );
}
