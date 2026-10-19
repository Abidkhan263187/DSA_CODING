"use client";

import { useMemo, useState } from "react";
import ApiError from "@/components/ApiError";
import { api } from "@/lib/api";
import { errorMessage } from "@/lib/errorMessage";
import { useCachedApi } from "@/lib/useCachedApi";

import CalendarHeader from "./components/CalendarHeader";
import CalendarGrid from "./components/CalendarGrid";
import CalendarPlanForm from "./components/CalendarPlanForm";
import SelectedEvents from "./components/SelectedEvents";
import CalendarInspiration from "./components/CalendarInspiration";

function pad(n) {
  return String(n).padStart(2, "0");
}

function ymd(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
}

function monthKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
}

export default function CalendarPage() {
  const [cursor, setCursor] = useState(() => new Date());
  const [selected, setSelected] = useState(() => ymd(new Date()));
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [problemIds, setProblemIds] = useState([]);
  const [saving, setSaving] = useState(false);

  const month = monthKey(cursor);
  const calendarPath = `/api/calendar?month=${month}`;

  const {
    data: calData,
    error: calError,
    retrying,
    setError,
    update,
    retry,
  } = useCachedApi(calendarPath);

  const { data: sheetData } = useCachedApi("/api/topics");

  const events = calData?.events || [];
  const sheet = sheetData?.sheet || [];

  const byDate = useMemo(() => {
    const map = {};

    for (const event of events) {
      if (!map[event.date]) map[event.date] = [];
      map[event.date].push(event);
    }

    return map;
  }, [events]);

  const selectedEvents = byDate[selected] || [];

  async function addPlan(e) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const res = await api("/api/calendar", {
        method: "POST",
        body: JSON.stringify({
          date: selected,
          title,
          notes,
          problemIds,
        }),
      });

      setTitle("");
      setNotes("");
      setProblemIds([]);

      update((prev) => ({
        events: [...(prev?.events || []), res.event],
      }));
    } catch (err) {
      setError(err);
    } finally {
      setSaving(false);
    }
  }

  async function removePlan(id) {
    try {
      await api(`/api/calendar/${id}`, {
        method: "DELETE",
      });

      update((prev) => ({
        events: (prev?.events || []).filter(
          (event) => event._id !== id
        ),
      }));
    } catch (err) {
      setError(err);
    }
  }

  function shiftMonth(delta) {
    setCursor(
      (date) =>
        new Date(date.getFullYear(), date.getMonth() + delta, 1)
    );
  }

  if (calError && !calData) {
    return (
      <ApiError error={calError} onRetry={retry} retrying={retrying} />
    );
  }

  return (
    <main className="page studio-page">
      <CalendarHeader />

      {calError ? <div className="error">{errorMessage(calError)}</div> : null}

      <div className="split">
        <div className="calendar-column">
          <CalendarGrid
            cursor={cursor}
            selected={selected}
            setSelected={setSelected}
            byDate={byDate}
            shiftMonth={shiftMonth}
          />

          <CalendarInspiration />
        </div>

        <aside>
          <CalendarPlanForm
            selected={selected}
            title={title}
            setTitle={setTitle}
            notes={notes}
            setNotes={setNotes}
            problemIds={problemIds}
            setProblemIds={setProblemIds}
            sheet={sheet}
            saving={saving}
            onSubmit={addPlan}
          />

          <SelectedEvents
            events={selectedEvents}
            onDelete={removePlan}
          />
        </aside>
      </div>
    </main>
  );
}