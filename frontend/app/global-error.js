"use client";

import { useEffect } from "react";
import ErrorState from "@/components/ErrorState";
import "./globals.css";

const themeScript = `
  try {
    const theme = localStorage.getItem("AK AlgoTrack-theme");
    document.documentElement.classList.toggle("light", theme === "light");
  } catch {}
`;

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("AlgoTrack global error:", error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="ambient" aria-hidden="true" />
        <ErrorState
          title="We'll be back on track"
          message="The application encountered an unexpected problem. Please try reloading the experience."
          onRetry={reset}
        />
      </body>
    </html>
  );
}
