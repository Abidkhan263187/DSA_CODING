
"use client";

import { useEffect, useState } from "react";
import {
  Code2,
  Flame,
  Target,
  Trophy,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

const challenges = [
  {
    title: "Two Sum",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    time: "15 min",
    url: "https://leetcode.com/problems/two-sum/",
  },
  {
    title: "Valid Parentheses",
    topic: "Stack",
    difficulty: "Easy",
    time: "20 min",
    url: "https://leetcode.com/problems/valid-parentheses/",
  },
  {
    title: "Binary Search",
    topic: "Binary Search",
    difficulty: "Easy",
    time: "20 min",
    url: "https://leetcode.com/problems/binary-search/",
  },
  {
    title: "Longest Substring Without Repeating Characters",
    topic: "Sliding Window",
    difficulty: "Medium",
    time: "30 min",
    url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },
];

export default function CalendarInspiration() {
  // A fixed initial value ensures server and client render identical HTML.
  const [challengeIndex, setChallengeIndex] = useState(2);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const challenge = challenges[challengeIndex];

  function nextChallenge() {
    setChallengeIndex((current) => (current + 1) % challenges.length);
  }

  return (
    <section className="calendar-inspiration">
      <div className="inspiration-heading">
        <div>
          <span className="inspiration-eyebrow">
            <Flame size={14} aria-hidden="true" />
            YOUR DAILY DOSE OF DSA
          </span>

          <h3>Small steps. Strong problem-solving.</h3>

          <p>
            Build consistency, sharpen your logic, and get one step closer
            to your coding goals.
          </p>
        </div>

        <div className="inspiration-icon" aria-hidden="true">
          <Code2 size={27} />
        </div>
      </div>

      <div className="inspiration-challenge">
        <div className="challenge-symbol" aria-hidden="true">
          <Target size={21} />
        </div>

        <div className="challenge-content">
          <span className="challenge-label">QUICK CHALLENGE</span>

          <h4>{challenge.title}</h4>

          <div className="challenge-meta">
            <span>{challenge.topic}</span>
            <span className="challenge-difficulty">
              {challenge.difficulty}
            </span>
            <span>{challenge.time}</span>
          </div>
        </div>

        <a
          className="challenge-link"
          href={challenge.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${challenge.title} on LeetCode`}
        >
          <ArrowUpRight size={19} />
        </a>
      </div>

      <button
        type="button"
        className="challenge-refresh"
        onClick={nextChallenge}
      >
        <Code2 size={14} />
        Try another challenge
      </button>

      <div className="inspiration-tips">
        <div className="inspiration-tip">
          <span className="tip-icon" aria-hidden="true">
            <Trophy size={17} />
          </span>

          <div>
            <strong>Consistency beats intensity</strong>
            <p>Even one problem a day adds up over time.</p>
          </div>
        </div>

        <div className="inspiration-tip">
          <span className="tip-icon" aria-hidden="true">
            <Lightbulb size={17} />
          </span>

          <div>
            <strong>Think before you code</strong>
            <p>Explain your approach and complexity first.</p>
          </div>
        </div>
      </div>

      <div className="inspiration-footer">
        <span>YOUR NEXT BREAKTHROUGH STARTS WITH ONE PROBLEM.</span>
        <span className="footer-sparkle" aria-hidden="true">
          ✦
        </span>
      </div>
    </section>
  );
}
