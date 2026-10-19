
export default function SheetStats({ stats }) {
    const {
      totalTopics,
      totalProblems,
      totalCompleted,
      percent,
    } = stats;
  
    return (
      <section className="stats">
        <div className="card stat">
          <span className="muted">Topics</span>
          <b>{totalTopics}</b>
        </div>
  
        <div className="card stat">
          <span className="muted">Problems</span>
          <b>{totalProblems}</b>
        </div>
  
        <div className="card stat">
          <span className="muted">Solved</span>
          <b>{totalCompleted}</b>
        </div>
  
        <div className="card stat">
          <span className="muted">Journey</span>
          <b>{percent}%</b>
  
          <div
            className="progress-bar"
            role="progressbar"
            aria-label="DSA completion"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span style={{ width: `${percent}%` }} />
          </div>
        </div>
      </section>
    );
  }
  