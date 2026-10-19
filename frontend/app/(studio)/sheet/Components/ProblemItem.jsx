
import DifficultyBadge from "./DifficultyBadge";

export default function ProblemItem({ problem, busy, onToggle }) {
  const {
    _id,
    title,
    completed,
    difficulty,
    youtubeUrl,
    practiceUrl,
    articleUrl,
  } = problem;

  return (
    <div className={`problem ${completed ? "done" : ""}`}>
      <button
        className={`check ${completed ? "on" : ""}`}
        type="button"
        disabled={busy}
        onClick={() => onToggle(_id)}
        aria-label={`Mark ${title} ${
          completed ? "incomplete" : "complete"
        }`}
      >
        {completed ? "✓" : ""}
      </button>

      <div>
        <strong>{title}</strong>

        <div className="links">
          {youtubeUrl && (
            <a href={youtubeUrl} target="_blank" rel="noreferrer">
              YouTube
            </a>
          )}

          {practiceUrl && (
            <a href={practiceUrl} target="_blank" rel="noreferrer">
              Practice
            </a>
          )}

          {articleUrl && (
            <a href={articleUrl} target="_blank" rel="noreferrer">
              Article
            </a>
          )}
        </div>
      </div>

      <DifficultyBadge level={difficulty} />
    </div>
  );
}
