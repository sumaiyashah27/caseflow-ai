import { Routes, Route, Link, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Cases from "./pages/Cases";
import Login from "./pages/Login";
import { FileText, FolderKanban, LayoutDashboard, LogOut } from "lucide-react";

export default function App() {
  const location = useLocation();

  // Hide navbar on Landing and Login pages
  const hideNav = ["/", "/login"].includes(location.pathname);

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* ✅ Modern Navbar */}
      {!hideNav && (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
          <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            {/* Left - Brand */}
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent tracking-tight">
                ⚖️ CaseFlow AI
              </h1>
            </div>

            {/* Center - Nav Links */}
            <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
              <NavLink to="/dashboard" icon={<LayoutDashboard size={16} />} label="Dashboard" />
              <NavLink to="/documents" icon={<FileText size={16} />} label="Documents" />
              <NavLink to="/cases" icon={<FolderKanban size={16} />} label="Cases" />
            </div>

            {/* Right - Logout */}
            <Link
              to="/"
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all"
            >
              <LogOut size={16} /> Logout
            </Link>
          </nav>
        </header>
      )}

      {/* ✅ Page Content */}
      <main className={`${hideNav ? "" : "pt-2"} transition-all`}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

/* --- Subcomponent for Reusable Nav Links --- */
function NavLink({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-all ${
        isActive
          ? "text-amber-600 font-semibold border-b-2 border-amber-500"
          : "hover:text-amber-600 hover:scale-[1.03] text-gray-700"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
