import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  ChefHat,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (login(email.trim(), password)) {
      navigate("/dashboard");
    } else {
      setError("Incorrect email or password. Please try again.");
    }
  };

  return (
    <div className="grid min-h-screen bg-[#f8f8f4] lg:grid-cols-2 dark:bg-gray-950">
      <div className="flex items-center justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="w-full max-w-md">
          <div className="mb-12 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#246747] text-white shadow-lg shadow-green-900/20">
              <ChefHat size={27} />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Savorly<span className="text-[#e7a45d]">.</span>
            </span>
          </div>

          <div className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-[#246747] dark:bg-green-950/40 dark:text-green-400">
              <Sparkles size={14} /> YOUR PERSONAL FOOD COMPANION
            </span>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Welcome back.
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Sign in to organize your recipes, plan meals and make every
              meal count.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Email address
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 transition focus-within:border-[#246747] focus-within:ring-2 focus-within:ring-[#246747]/10 dark:border-gray-700 dark:bg-gray-900">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="demo@savorly.com"
                  className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 transition focus-within:border-[#246747] focus-within:ring-2 focus-within:ring-[#246747]/10 dark:border-gray-700 dark:bg-gray-900">
                <Lock size={18} className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent py-3.5 text-sm text-gray-800 outline-none dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="text-gray-400 hover:text-gray-700 dark:hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </p>
            )}

            <Button type="submit" className="w-full py-3.5">
              Sign in <ArrowRight size={17} />
            </Button>
          </form>

          <div className="mt-7 rounded-2xl border border-green-100 bg-green-50 p-4 dark:border-green-900/40 dark:bg-green-950/20">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#246747] dark:text-green-400">
              Demo login credentials
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-200">
              Email: <strong>demo@savorly.com</strong>
            </p>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-200">
              Password: <strong>password123</strong>
            </p>
          </div>

          <p className="mt-8 text-center text-xs text-gray-400">
            © 2026 Savorly. Made for people who love good food.
          </p>
        </div>
      </div>

      <div className="relative hidden overflow-hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90"
          alt="A beautifully prepared healthy meal"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#102c20]/90 via-[#102c20]/20 to-black/10" />

        <div className="absolute bottom-16 left-12 right-12 text-white">
          <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold backdrop-blur-md">
            EAT WELL. LIVE WELL.
          </span>

          <h2 className="mt-6 max-w-lg text-5xl font-extrabold leading-tight">
            Good food starts with a little planning.
          </h2>

          <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
            Keep your favourite recipes close, discover new meals and bring
            more intention into your kitchen.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;