"use client";

import Link from "next/link";

export default function ErrorState({
  title = "Something went off track",
  message = "We couldn't load your data. Your DSA journey is still here. Try again in a moment.",
  onRetry,
  retrying = false,
  showHome = false,
}) {
  return (
    <main className="error-page">
      <section className="error-card" role="alert" aria-live="polite">
        <div className="error-brand">
          <span className="error-brand-mark">AK</span>
          <span>AlgoTrack</span>
        </div>

        <div className="error-illustration" aria-hidden="true">
          <svg viewBox="0 0 120 100" width="120" height="100" fill="none">
            <rect
              x="22"
              y="12"
              width="76"
              height="70"
              rx="13"
              stroke="currentColor"
              strokeWidth="2"
              opacity=".35"
            />
            <path
              d="M38 34h44M38 46h28M38 58h18"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              opacity=".55"
            />
            <circle cx="83" cy="72" r="19" className="error-illustration-fill" />
            <circle
              cx="83"
              cy="72"
              r="15"
              fill="#8b5cf6"
              fillOpacity=".18"
              stroke="#a78bfa"
              strokeWidth="2"
            />
            <path
              d="M83 63v10M83 79v.5"
              stroke="#c4b5fd"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="error-eyebrow">TEMPORARY INTERRUPTION</p>
        <h1 className="error-title">{title}</h1>
        <p className="error-description">{message}</p>

        <div className="error-actions">
          {onRetry ? (
            <button
              type="button"
              className="error-retry"
              onClick={onRetry}
              disabled={retrying}
            >
              {retrying ? (
                <>
                  <span className="error-spinner" />
                  Retrying...
                </>
              ) : (
                <>
                  <span aria-hidden="true">↻</span>
                  Try again
                </>
              )}
            </button>
          ) : null}

          {showHome ? (
            <Link href="/" className="error-home">
              Back to AlgoTrack
            </Link>
          ) : null}
        </div>

        <p className="error-footer">
          Your progress matters. Let's get you back on track.
        </p>
      </section>
    </main>
  );
}
