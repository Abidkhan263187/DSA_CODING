"use client";

import ErrorState from "@/components/ErrorState";
import { errorMessage } from "@/lib/errorMessage";

export default function ApiError({ error, onRetry, retrying = false }) {
  const message = errorMessage(error);
  const isServerError =
    /503|502|504|failed to fetch|networkerror|network request failed/i.test(
      message
    );

  return (
    <ErrorState
      title={
        isServerError ? "Our servers need a moment" : "Couldn't load your data"
      }
      message={
        isServerError
          ? "The service is temporarily unavailable. Please check your connection and try again."
          : "We couldn't retrieve your data right now. Your study session can continue once the service recovers."
      }
      onRetry={onRetry}
      retrying={retrying}
    />
  );
}
