"use client";

import AuthGuard from "@/components/AuthGuard";
import Navbar from "@/components/Navbar";
import NavProgress from "@/components/NavProgress";

export default function StudioLayout({ children }) {
  return (
    <AuthGuard>
      <div className="app-shell">
        <NavProgress />
        <Navbar />
        {children}
      </div>
    </AuthGuard>
  );
}
