import { useState, type ReactNode } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#f8f8f4] dark:bg-gray-950">
      <Sidebar
        mobileOpen={mobileOpen}
        closeMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Navbar onMenuClick={() => setMobileOpen(true)} />

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-9">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;