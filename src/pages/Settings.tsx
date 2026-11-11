import { useState } from "react";
import {
  User,
  Bell,
  Moon,
  Sun,
  ShieldCheck,
  Save,
  ChefHat,
  CheckCircle2,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function Settings() {
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState(
    localStorage.getItem("savorly-name") || "Savorly User"
  );

  const [email, setEmail] = useState(
    localStorage.getItem("savorly-email") || "demo@savorly.com"
  );

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [recipeUpdates, setRecipeUpdates] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("savorly-name", name);
    localStorage.setItem("savorly-email", email);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#246747] dark:text-green-400">
          PERSONALIZE YOUR EXPERIENCE
        </p>

        <h2 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
          Settings
        </h2>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Manage your profile and customize how Savorly works for you.
        </p>
      </div>

      {/* Profile */}
      <section className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-3 border-b border-gray-100 p-6 dark:border-gray-800">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-[#246747] dark:bg-green-950/40 dark:text-green-400">
            <User size={21} />
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Profile information
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Update your personal details.
            </p>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#246747] text-white">
              <ChefHat size={30} />
            </div>

            <div>
              <h4 className="font-bold text-gray-900 dark:text-white">
                {name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Savorly member
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Full name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />

            <Input
              label="Email address"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={handleSave}>
              <Save size={17} /> Save changes
            </Button>

            {saved && (
              <span className="flex items-center gap-2 text-sm font-medium text-green-600">
                <CheckCircle2 size={17} /> Changes saved!
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section className="rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-3 border-b border-gray-100 p-6 dark:border-gray-800">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400">
            {theme === "light" ? <Sun size={21} /> : <Moon size={21} />}
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Appearance
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Customize the look of your workspace.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
          <div>
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
              Dark mode
            </h4>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Switch between light and dark appearance.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={theme === "dark"}
            onClick={toggleTheme}
            className={`relative h-7 w-12 rounded-full transition ${
              theme === "dark" ? "bg-[#246747]" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                theme === "dark" ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-3xl border border-gray-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-3 border-b border-gray-100 p-6 dark:border-gray-800">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400">
            <Bell size={21} />
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              Notifications
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Choose which updates you want to receive.
            </p>
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          <div className="flex items-center justify-between gap-4 p-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                Email notifications
              </h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Receive updates about your account.
              </p>
            </div>

            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(event) =>
                setEmailNotifications(event.target.checked)
              }
              className="h-5 w-5 accent-[#246747]"
            />
          </div>

          <div className="flex items-center justify-between gap-4 p-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-800 dark:text-white">
                Recipe updates
              </h4>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Get updates about your recipe collection.
              </p>
            </div>

            <input
              type="checkbox"
              checked={recipeUpdates}
              onChange={(event) => setRecipeUpdates(event.target.checked)}
              className="h-5 w-5 accent-[#246747]"
            />
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="flex items-center gap-4 rounded-2xl border border-green-100 bg-green-50 p-5 dark:border-green-900/40 dark:bg-green-950/20">
        <ShieldCheck size={27} className="shrink-0 text-[#246747] dark:text-green-400" />

        <div>
          <h3 className="font-bold text-gray-800 dark:text-white">
            Account security
          </h3>
          <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
            Your demo account uses session-based authentication. Remember
            to log out when using a shared device.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Settings;