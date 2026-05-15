import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function Signin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE}/user/signin`, formData);
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        }
        catch (err) {
            console.error("Signin failed:", err.response?.data || err.message);
            alert("Something went wrong during signin.");
        }
    }
    
  return (
    <div 
      /* Hardcoding the premium geometric sans-serif font stack */
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
      className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-4 sm:p-6 lg:p-8 relative overflow-hidden"
    >
      {/* Premium Ambient Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-blue-600 text-white font-bold text-xl shadow-md shadow-blue-500/20 mb-4">
            P
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-2.5 text-sm text-slate-500">
            Or{" "}
            <a href="/signup" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
              create a new account
            </a>
          </p>
        </div>

        {/* Form Card Container */}
        <div className="bg-white/80 backdrop-blur-md px-4 py-8 shadow-xl shadow-slate-200/50 border border-slate-200/60 sm:rounded-2xl sm:px-10">
          {/* Changed execution attachment to onSubmit for robust event capture with e.preventDefault() */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Your email
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  id="email"
                  value={formData.username}
                  autoComplete="email"
                  className="bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 block w-full px-3.5 py-3 shadow-xs placeholder:text-slate-400 focus:outline-none transition-all"
                  placeholder="name@example.com"
                  required
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Your password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  autoComplete="current-password"
                  className="bg-white border border-slate-200 text-slate-900 text-sm rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 block w-full px-3.5 py-3 shadow-xs placeholder:text-slate-400 focus:outline-none transition-all"
                  placeholder="••••••••"
                  required
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password Utilities */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 border-slate-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2.5 block text-sm text-slate-600 select-none cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:underline transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="flex w-full justify-center text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] focus:ring-4 focus:outline-none focus:ring-blue-200 font-semibold rounded-xl text-sm px-5 py-3 text-center shadow-md shadow-blue-500/10 transition-all cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}