"use client";

import { useEffect } from "react";
import ErrorState from "@/components/ErrorState";

export default function StudioError({ error, reset }) {
  useEffect(() => {
    console.error("AlgoTrack studio error:", error);
  }, [error]);

  return (
    <ErrorState
      title="This page hit a snag"
      message="Something unexpected happened while opening this page. Try loading it again."
      onRetry={reset}
      showHome
    />
  );
}
