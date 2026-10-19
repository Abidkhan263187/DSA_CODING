
"use client";

import { useEffect, useState } from "react";
import ApiError from "@/components/ApiError";
import { api } from "@/lib/api";
import { errorMessage } from "@/lib/errorMessage";
import { patchCache } from "@/lib/queryCache";
import { useCachedApi } from "@/lib/useCachedApi";

import SheetHeader from "./components/SheetHeader";
import SheetStats from "./components/SheetStats";
import SheetSkeleton from "./components/SheetSkeleton";
import TopicCard from "./components/TopicCard";

export default function SheetPage() {
  const { data, error, loading, retrying, setError, update, retry } =
    useCachedApi("/api/topics");

  const [open, setOpen] = useState({});
  const [busy, setBusy] = useState({});

  // Open the first topic by default
  useEffect(() => {
    if (!data?.sheet || Object.keys(open).length) return;

    const initialOpen = {};

    data.sheet.forEach((topic, index) => {
      initialOpen[topic._id] = index === 0;
    });

    setOpen(initialOpen);
  }, [data, open]);

  // Expand or collapse a topic
  function toggleTopic(topicId) {
    setOpen((current) => ({
      ...current,
      [topicId]: !current[topicId],
    }));
  }

  // Toggle problem completion
  async function toggleProblem(problemId) {
    setBusy((current) => ({
      ...current,
      [problemId]: true,
    }));

    try {
      const result = await api("/api/progress/toggle", {
        method: "POST",
        body: JSON.stringify({ problemId }),
      });

      update((previous) => {
        if (!previous) return previous;

        const sheet = previous.sheet.map((topic) => {
          const problems = topic.problems.map((problem) =>
            problem._id === problemId
              ? { ...problem, completed: result.completed }
              : problem
          );

          return {
            ...topic,
            problems,
            completedCount: problems.filter(
              (problem) => problem.completed
            ).length,
          };
        });

        const totalCompleted = sheet.reduce(
          (sum, topic) => sum + topic.completedCount,
          0
        );

        const totalProblems = previous.stats.totalProblems;

        const next = {
          sheet,
          stats: {
            ...previous.stats,
            totalCompleted,
            percent: totalProblems
              ? Math.round(
                  (totalCompleted / totalProblems) * 100
                )
              : 0,
          },
        };

        patchCache("/api/topics", () => next);

        return next;
      });
    } catch (err) {
      setError(err);
    } finally {
      setBusy((current) => ({
        ...current,
        [problemId]: false,
      }));
    }
  }

  if (error && !data) {
    return <ApiError error={error} onRetry={retry} retrying={retrying} />;
  }

  return (
    <main className="page studio-page">
      <SheetHeader />

      {error ? <div className="error">{errorMessage(error)}</div> : null}

      {loading && !data ? (
        <SheetSkeleton />
      ) : data ? (
        <>
          <SheetStats stats={data.stats} />

          {data.sheet.map((topic) => (
            <TopicCard
              key={topic._id}
              topic={topic}
              isOpen={!!open[topic._id]}
              busy={busy}
              onToggleTopic={toggleTopic}
              onToggleProblem={toggleProblem}
            />
          ))}
        </>
      ) : null}
    </main>
  );
}
