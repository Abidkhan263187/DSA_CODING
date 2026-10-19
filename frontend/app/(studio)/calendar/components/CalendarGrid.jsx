"use client";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function pad(n) {
  return String(n).padStart(2, "0");
}

function ymd(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export default function CalendarGrid({
  cursor,
  selected,
  setSelected,
  byDate,
  shiftMonth,
}) {
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const today = ymd(new Date());

  const days = [];

  for (let i = 0; i < startPad; i += 1) {
    days.push(null);
  }

  for (let d = 1; d <= lastDate; d += 1) {
    days.push(new Date(year, month, d));
  }

  return (
    <section className="card">
      <div className="cal-toolbar">
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => shiftMonth(-1)}
        >
          Prev
        </button>

        <h2 className="serif cal-title">
          {cursor.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>

        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => shiftMonth(1)}
        >
          Next
        </button>
      </div>

      <div className="calendar-grid">
        {WEEKDAYS.map((day) => (
          <div key={day} className="dow">
            <span className="dow-full">{day}</span>
            <span className="dow-short">{day.slice(0, 1)}</span>
          </div>
        ))}

        {days.map((date, idx) => {
          if (!date) return <div key={`e-${idx}`} />;

          const key = ymd(date);
          const count = (byDate[key] || []).length;

          const cls = [
            "day",
            key === today ? "today" : "",
            key === selected ? "selected" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div key={key}>
             
              <button
                type="button"
                className={cls}
                key={key}
                onClick={() => setSelected(key)}
                aria-pressed={key === selected}
                aria-label={`Select ${key}`}
              >
                <span className="title">{date.getDate()}</span>

                {count > 0 && (
                  <span className="day-meta">
                    <span className="dot" />
                    <span className="day-count">
                      {count} plan{count > 1 ? "s" : ""}
                    </span>
                  </span>
                )}
              </button>
            

              {/* {count > 0 && (
                <p className="day-meta">
                  <span className="dot" />
                  <span className="day-count">
                    {count} plan{count > 1 ? "s" : ""}
                  </span>
                </p>
              )} */}
            </div>
          );
        })}
      </div>
    </section>
  );
}