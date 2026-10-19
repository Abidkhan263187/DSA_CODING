"use client";

import { useState } from "react";

export default function SelectedEvents({ events, onDelete }) {
  const [deletingId, setDeletingId] = useState(null);

  async function handleDelete(id) {
    if (deletingId) return;

    setDeletingId(id);

    try {
      await onDelete(id);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="card" style={{ marginTop: 16 }}>
      <h3 style={{ marginTop: 0 }}>A fresh day, a fresh start</h3>

      {events.length === 0 ? (
        <p className="muted">
          No plans yet. Add a study session and make today count.
        </p>
      ) : (
        <div className="event-list">
          {events.map((event) => {
            const isDeleting = deletingId === event._id;

            return (
              <div className="event" key={event._id}>
                <div>
                  <strong>{event.title}</strong>

                  {event.notes && (
                    <p className="muted">{event.notes}</p>
                  )}

                  {event.problemIds?.map((problem) => (
                    <p key={problem._id} className="muted">
                      Problem: {problem.title} ({problem.difficulty})
                    </p>
                  ))}
                </div>

                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => handleDelete(event._id)}
                  disabled={Boolean(deletingId)}
                  aria-busy={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}