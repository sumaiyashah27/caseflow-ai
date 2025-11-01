import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Proper router navigation

// --- Mock API function (keep this until backend connects) ---
async function login(email, password) {
  console.log("Mock login attempt with:", email, password);
  if (email === "admin@caseflow.ai" && password === "admin123") {
    return Promise.resolve({ token: "mock-jwt-token" });
  } else {
    return Promise.reject({
      response: {
        data: { error: "❌ Invalid credentials (mock response)" },
      },
    });
  }
}
// ------------------------------------------------------------

export default function Login() {
  const [email, setEmail] = useState("admin@caseflow.ai");
  const [password, setPassword] = useState("admin123");
  const [msg, setMsg] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ using router

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      await login(email, password);
      setMsg("✅ Logged in successfully!");
      setTimeout(() => navigate("/dashboard"), 100); // ✅ Redirect to /dashboard
    } catch (e: any) {
      setMsg(e?.response?.data?.error || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <div className="bg-gray-800 shadow-2xl rounded-lg p-8 md:p-10 w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-4">
          ⚖️ CaseFlow AI
        </h1>
        <p className="text-center text-gray-400 mb-8 text-lg">Secure login to your AI Dashboard</p>

        <form onSubmit={submit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-amber-700 transition-colors duration-300 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>

        {msg && (
          <div
            className={`mt-6 text-center text-md font-medium px-4 py-3 rounded-lg ${
              msg.includes("✅") ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"
            }`}
          >
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}
