import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Sun,
  Moon,
  UserCircle,
  Menu,
  CheckCheck,
  ChefHat,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

interface NavbarProps {
  onMenuClick: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsRead, setNotificationsRead] = useState(false);

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/recipes": "My Recipes",
    "/settings": "Settings",
  };

  const title = pageTitles[location.pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-100 bg-white/95 px-4 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/95 sm:px-7 lg:px-9">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="rounded-xl p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            {title}
          </h1>
          <p className="hidden text-xs text-gray-400 sm:block">
            Let's make something delicious today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          title="Toggle theme"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen((current) => !current)}
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <Bell size={19} />

            {!notificationsRead && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-orange-500 dark:border-gray-900" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 top-14 z-50 w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl dark:border-gray-700 dark:bg-gray-900 sm:w-80">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900 dark:text-white">
                  Notifications
                </h3>

                <button
                  type="button"
                  onClick={() => setNotificationsRead(true)}
                  className="flex items-center gap-1 text-xs font-medium text-[#246747] hover:underline dark:text-green-400"
                >
                  <CheckCheck size={14} />
                  Mark read
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex gap-3 rounded-xl bg-green-50 p-3 dark:bg-green-950/30">
                  <ChefHat size={19} className="shrink-0 text-[#246747] dark:text-green-400" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      Welcome to Savorly!
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Start building your personal recipe collection.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-orange-50 p-3 dark:bg-orange-950/20">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    Cooking inspiration
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Explore new recipes and save your favourites.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setNotificationsOpen(false);
                  setNotificationsRead(true);
                }}
                className="mt-4 w-full rounded-xl py-2 text-sm font-semibold text-[#246747] hover:bg-green-50 dark:text-green-400 dark:hover:bg-gray-800"
              >
                Close notifications
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate("/settings")}
          title="View profile and settings"
          className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-[#246747] dark:bg-green-950 dark:text-green-400">
            <UserCircle size={21} />
          </div>

          <span className="hidden text-sm font-semibold text-gray-700 dark:text-gray-200 md:block">
            My Profile
          </span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;