
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getToken } from "@/lib/auth";
import StudioSkeleton from "@/components/StudioSkeleton";
import HomePageSkeleton from "@/components/HomePageSkeleton";


export default function HomePage() {
  const router = useRouter();
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    try {
      if (getToken()) {
        router.replace("/sheet");
        return;
      }
    } catch (error) {
      console.error("Session check failed:", error);
    }

    setCheckingSession(false);
  }, [router]);

  if (checkingSession) {
    return (
     <HomePageSkeleton />
    );
  }

  return (
    <main className="home-page">
      <Navbar variant="public" />

      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            YOUR PERSONAL DSA WORKSPACE
          </div>

          <p className="kicker">Your DSA Journey Starts Here</p>

          <h1>
            Your DSA desk,
            <br />
            <span>built for progress.</span>
          </h1>

          <p className="muted hero-description">
            Twelve chapters. Curated problems. Video, article, and practice
            links. A focused calendar for revision. Keep your preparation
            organised and your progress saved with MongoDB.
          </p>

          <div className="row hero-actions">
            <Link className="btn btn-primary" href="/register">
              Get started <span aria-hidden="true">↗</span>
            </Link>
          </div>
          &nbsp;
          <div className="hero-trust">
            <span>✓ Track solved problems</span>
            <span>✓ Plan revision</span>
            <span>✓ Keep your progress</span>
          </div>
        </div>

        <div className="card home-preview">
          <div className="preview-top">
            <div>
              <p className="kicker">YOUR STUDY ROUTINE</p>
              <h2>One problem at a time.</h2>
            </div>
          </div>
          <div className="preview-progress">
            <div className="preview-progress-label">
              <span>Consistency over perfection</span>&nbsp;
              <span>01 / 03</span>
            </div>
            &nbsp;

            <div className="preview-progress-track">
              <span />
            </div>
          </div>

          <div className="how-step">
            <span className="how-num">01</span>
            <div>
              <strong>Follow your roadmap</strong>
              <p className="muted">
                Explore DSA chapters and find the next problem to solve.
              </p>
            </div>
            <span className="step-arrow" aria-hidden="true">↗</span>
          </div>

          <div className="how-step">
            <span className="how-num">02</span>
            <div>
              <strong>Track your progress</strong>
              <p className="muted">
                Mark completed problems and keep your preparation organised.
              </p>
            </div>
            <span className="step-arrow" aria-hidden="true">↗</span>
          </div>

          <div className="how-step">
            <span className="how-num">03</span>
            <div>
              <strong>Plan your revision</strong>
              <p className="muted">
                Schedule study sessions and build a consistent practice habit.
              </p>
            </div>
            <span className="step-arrow" aria-hidden="true">↗</span>
          </div>

          <div className="preview-footer">
            <span className="preview-footer-dot" />
            Small steps. Measurable progress.
          </div>
        </div>
      </section>

      <section className="home-features">
        <div className="home-feature">
          <span className="feature-icon">⌘</span>
          <h3>Structured learning</h3>
          <p className="muted">
            Follow a chapter-based roadmap to make your DSA preparation
            manageable.
          </p>
        </div>

        <div className="home-feature">
          <span className="feature-icon">✓</span>
          <h3>Progress tracking</h3>
          <p className="muted">
            Track solved problems and review your progress as you move forward.
          </p>
        </div>

        <div className="home-feature">
          <span className="feature-icon">◷</span>
          <h3>Revision planning</h3>
          <p className="muted">
            Organise your study sessions with a dedicated calendar.
          </p>
        </div>
      </section>

      <footer className="home-footer">
        <span>AK AlgoTrack</span>
        <span>Built for the long game.</span>
      </footer>
    </main>
  );
}
