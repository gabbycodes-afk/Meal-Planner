import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  ChefHat,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  mobileOpen: boolean;
  closeMobile: () => void;
}

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Recipes", path: "/recipes", icon: BookOpen },
  { name: "Settings", path: "/settings", icon: Settings },
];

function Sidebar({ mobileOpen, closeMobile }: SidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeMobile}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r border-gray-100 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-900 lg:sticky lg:top-0 lg:z-20 lg:translate-x-0 ${
          expanded ? "w-64" : "w-20"
        } ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className={`flex h-20 shrink-0 items-center border-b border-gray-100 dark:border-gray-800 ${
            expanded ? "justify-between px-5" : "justify-center px-2"
          }`}
        >
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#246747] text-white">
              <ChefHat size={23} />
            </div>

            {expanded && (
              <span className="text-xl font-extrabold tracking-tight text-[#246747] dark:text-green-400">
                Savorly
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close mobile sidebar"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto px-3 py-7">
          {expanded && (
            <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
              Workspace
            </p>
          )}

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobile}
                title={!expanded ? item.name : undefined}
                className={({ isActive }) =>
                  `flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#246747] text-white shadow-md shadow-green-900/10"
                      : "text-gray-500 hover:bg-green-50 hover:text-[#246747] dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-green-400"
                  } ${!expanded ? "justify-center" : ""}`
                }
              >
                <Icon size={20} className="shrink-0" />

                {expanded && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </div>

        <div className="border-t border-gray-100 p-3 dark:border-gray-800">
          <button
            type="button"
            onClick={handleLogout}
            title={!expanded ? "Logout" : undefined}
            className={`flex h-12 w-full items-center gap-3 rounded-xl px-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/30 ${
              !expanded ? "justify-center" : ""
            }`}
          >
            <LogOut size={20} className="shrink-0" />
            {expanded && <span>Logout</span>}
          </button>

          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            className="mt-3 hidden h-10 w-full items-center justify-center rounded-xl border border-gray-200 text-gray-500 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 lg:flex"
          >
            {expanded ? <ChevronLeft size={19} /> : <ChevronRight size={19} />}
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;