
"use client";

import { useMemo, useState } from "react";

export default function CalendarPlanForm({
  selected,
  title,
  setTitle,
  notes,
  setNotes,
  problemIds,
  setProblemIds,
  sheet,
  saving,
  onSubmit,
}) {
  const [errors, setErrors] = useState({});
  const [problemSearch, setProblemSearch] = useState("");

  // Search by problem title, topic title, or difficulty.
  const filteredSheet = useMemo(() => {
    const query = problemSearch.trim().toLowerCase();

    if (!query) return sheet || [];

    return (sheet || [])
      .map((topic) => ({
        ...topic,
        problems: (topic.problems || []).filter((problem) => {
          const problemTitle = (problem.title || "").toLowerCase();
          const difficulty = (problem.difficulty || "").toLowerCase();
          const topicTitle = (topic.title || "").toLowerCase();

          return (
            problemTitle.includes(query) ||
            difficulty.includes(query) ||
            topicTitle.includes(query)
          );
        }),
      }))
      .filter((topic) => topic.problems.length > 0);
  }, [sheet, problemSearch]);

  function toggleProblem(problemId) {
    setProblemIds((current) =>
      current.includes(problemId)
        ? current.filter((id) => id !== problemId)
        : [...current, problemId]
    );
  }

  function validateForm() {
    const newErrors = {};

    if (!selected) {
      newErrors.selected = "Please select a date for your session.";
    }

    if (!title.trim()) {
      newErrors.title = "Please enter a session title.";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleTitleChange(value) {
    setTitle(value);

    if (errors.title) {
      setErrors((current) => ({ ...current, title: "" }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (saving || !validateForm()) return;

    // Supports an async parent submit handler.
    onSubmit(event);
  }

  return (
    <form
      className="card calendar-plan-form"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Form heading */}
      <div className="calendar-form-heading">
        <div>
          <h3>Plan your session</h3>
          <p className="muted">Create a focused study session.</p>
        </div>

        <span className="calendar-form-icon" aria-hidden="true">
          ✦
        </span>
      </div>

      {/* Selected date */}
      <div>
        <div className="calendar-selected-date">
          <span className="calendar-date-icon" aria-hidden="true">
            ◷
          </span>

          <div>
            <span className="calendar-date-label">Selected date</span>
            <strong>{selected || "No date selected"}</strong>
          </div>
        </div>

        {errors.selected && (
          <p className="field-error" role="alert">
            <span aria-hidden="true">!</span>
            {errors.selected}
          </p>
        )}
      </div>

      {/* Session title */}
      <div className="form-field">
        <label htmlFor="title">
          Session title <span className="required-mark">*</span>
        </label>

        <input
          id="title"
          type="text"
          className={errors.title ? "field-invalid" : ""}
          value={title}
          onChange={(event) => handleTitleChange(event.target.value)}
          onBlur={() => {
            if (!title.trim()) {
              setErrors((current) => ({
                ...current,
                title: "Please enter a session title.",
              }));
            } else if (title.trim().length < 3) {
              setErrors((current) => ({
                ...current,
                title: "Title must be at least 3 characters.",
              }));
            } else {
              setErrors((current) => ({ ...current, title: "" }));
            }
          }}
          placeholder="e.g. Arrays revision + practice"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
          maxLength={100}
        />

        {errors.title && (
          <p className="field-error" id="title-error" role="alert">
            <span aria-hidden="true">!</span>
            {errors.title}
          </p>
        )}
      </div>

      {/* Problem selection */}
      <div className="form-field">
        <div className="problem-section-header">
          <label className="problem-section-label">
            Select problems
            <span className="optional-label">Optional</span>
          </label>

          <span className="problem-count">
            {problemIds.length} selected
          </span>
        </div>

        {/* Search bar */}

        <div className="problem-search">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>

          <input
            type="text"
            value={problemSearch}
            onChange={(event) => setProblemSearch(event.target.value)}
            placeholder="Search problems, topics, difficulty..."
            aria-label="Search problems"
          />

          {problemSearch && (
            <button
              type="button"
              className="problem-search-clear"
              onClick={() => setProblemSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>


        {/* Filtered problems */}
        <div className="problem-checkbox-list">
          {filteredSheet.length === 0 ? (
            <div className="problem-empty-state">
              <span aria-hidden="true">⌕</span>

              <p>
                {problemSearch
                  ? `No problems found for "${problemSearch}".`
                  : "No topics or problems available."}
              </p>

              {problemSearch && (
                <button
                  type="button"
                  className="problem-search-reset"
                  onClick={() => setProblemSearch("")}
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            filteredSheet.map((topic) => (
              <div className="problem-topic" key={topic._id}>
                <h4 className="problem-topic-title">{topic.title}</h4>

                {topic.problems.map((problem) => {
                  const checked = problemIds.includes(problem._id);
                  const difficulty = (
                    problem.difficulty || "medium"
                  ).toLowerCase();

                  return (
                    <label
                      className={`problem-checkbox ${checked ? "problem-checkbox-selected" : ""
                        }`}
                      key={problem._id}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleProblem(problem._id)}
                      />

                      <span className="problem-checkbox-content">
                        <span className="problem-name">
                          {problem.title}
                        </span>

                        <span
                          className={`problem-difficulty difficulty-${difficulty}`}
                        >
                          {problem.difficulty || "Medium"}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <p className="muted selected-problems-summary">
          {problemIds.length} problem
          {problemIds.length !== 1 ? "s" : ""} selected for this session
        </p>
      </div>

      {/* Session notes */}
      <div className="form-field">
        <label htmlFor="notes">
          Session notes
          <span className="optional-label">Optional</span>
        </label>

        <textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="What do you want to revise or accomplish?"
          rows={4}
          maxLength={1000}
        />

        <div className="textarea-footer">
          <span className="muted">
            Keep your goals clear and achievable.
          </span>

          <span className="muted">{notes.length}/1000</span>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="btn btn-primary calendar-save-button"
        disabled={saving}
      >
        {saving ? (
          <>
            <span className="save-spinner" aria-hidden="true" />
            Saving your plan...
          </>
        ) : (
          <>
            Save study plan
            <span aria-hidden="true">↗</span>
          </>
        )}
      </button>

      <p className="calendar-form-footnote">
        Your study plan will be saved to your account.
      </p>
    </form>
  );
}
