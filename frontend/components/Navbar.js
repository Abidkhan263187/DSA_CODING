
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import {
  clearSession,
  getUser,
  subscribeAuth,
} from "@/lib/auth";

export default function Navbar({ variant = "studio" }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = useSyncExternalStore(
    subscribeAuth,
    getUser,
    () => null
  );

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [loading, setLoading] = useState(false);

  const userName = user?.name?.trim() || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  // Apply the saved theme to the entire application.
  useEffect(() => {
    const savedTheme = localStorage.getItem("AK AlgoTrack-theme");
    const darkMode = savedTheme !== "light";

    setIsDark(darkMode);
    document.documentElement.classList.toggle(
      "light",
      !darkMode
    );
  }, []);

  // Close menus when the route changes.
  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Prefetch studio routes.
  useEffect(() => {
    if (variant !== "studio") return;

    router.prefetch("/sheet");
    router.prefetch("/calendar");
  }, [router, variant]);

  // Close the profile dropdown when clicking outside it.
  useEffect(() => {
    function handleClickOutside(event) {
      const target = event.target;
      if (!target.closest(".profile-menu")) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside
      );
    };
  }, []);

  function logout() {
    setLoading(true);
    setOpen(false);
    setProfileOpen(false);
    clearSession();
    router.replace("/");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function toggleTheme() {
    setIsDark((currentTheme) => {
      const nextTheme = !currentTheme;

      localStorage.setItem(
        "AK AlgoTrack-theme",
        nextTheme ? "dark" : "light"
      );

      document.documentElement.classList.toggle(
        "light",
        !nextTheme
      );

      return nextTheme;
    });
  }



  return (
    <header className="nav">
      <div className="nav-inner">
        {/* Brand */}
        <Link
          href={variant === "studio" ? "/sheet" : "/"}
          className="brand"
          prefetch={variant === "studio"}
        >
          <span className="brand-mark">AK</span>
          AK AlgoTrack
        </Link>

        {/* Mobile navigation toggle */}
        <button
          className={`nav-toggle ${open ? "open" : ""}`}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Navigation */}
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {variant === "studio" ? (
            <>
              <Link
                className={pathname === "/sheet" ? "active" : ""}
                href="/sheet"
                prefetch
              >
                Sheet
              </Link>

              <Link
                className={
                  pathname === "/calendar" ? "active" : ""
                }
                href="/calendar"
                prefetch
              >
                Calendar
              </Link>

              {/* Theme toggle */}
              <button
                className="btn btn-ghost theme-toggle"
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
                  : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                  </svg>

                  } theme`}
              >
                {isDark ? "☀" : "☾"}
              </button>

              {/* User profile dropdown */}

              {user && (
                <div className="profile-menu">
                  {/* Desktop profile trigger */}
                  <button
                    type="button"
                    className="profile-trigger"
                    onClick={() => setProfileOpen((prev) => !prev)}
                    aria-label="Open profile menu"
                    aria-expanded={profileOpen}
                  >
                    <span className="profile-avatar">
                      {userInitial}
                    </span>

                    <span className="profile-chevron"> {profileOpen ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>}
                    </span>
                  </button>

                  {/* Mobile profile row */}
                  <div className="mobile-profile">
                    <span className="profile-avatar">
                      {userInitial}
                    </span>

                    <div className="mobile-profile-info">
                      <span className="mobile-profile-name">
                        {userName}
                      </span>
                      <span className="mobile-profile-status">
                        Signed in
                      </span>
                    </div>

                    <button
                      type="button"
                      className="mobile-logout"
                      onClick={logout}
                    >
                      <span aria-hidden="true">↗</span>

                      {loading ? <span className="loading">Loading...</span> : "Logout"}
                    </button>
                  </div>

                  {/* Desktop dropdown */}
                  {profileOpen && (
                    <div className="profile-dropdown">
                      <div className="profile-info">
                        <span className="profile-avatar profile-avatar-lg">
                          {userInitial}
                        </span>

                        <div className="profile-details">
                          <p className="profile-name">{userName}</p>
                          <p className="profile-subtitle">
                            Signed in to AK AlgoTrack
                          </p>
                        </div>
                      </div>

                      <div className="profile-divider" />

                      <button
                        type="button"
                        className="profile-logout"
                        onClick={logout}
                      >
                        <span aria-hidden="true">↗</span>
                        {loading ? <span className="loading">Loading...</span> : "Logout"}
                      </button>
                    </div>
                  )}
                </div>
              )}

            </>
          ) : (
            <>
              {/* Public pages */}
              <button
                className="btn btn-ghost theme-toggle"
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? "light" : "dark"
                  } theme`}
              >
                {isDark ? "☀ Light" : "☾ Dark"}
              </button>

              <Link href="/login">Login</Link>

             
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
