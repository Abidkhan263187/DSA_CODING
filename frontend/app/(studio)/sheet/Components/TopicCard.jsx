
import ProblemItem from "./ProblemItem";

export default function TopicCard({
  topic,
  isOpen,
  busy,
  onToggleTopic,
  onToggleProblem,
}) {
  return (
    <article className="card topic">
      <button
        className="topic-head"
        type="button"
        onClick={() => onToggleTopic(topic._id)}
        aria-expanded={isOpen}
      >
        <div className="topic-copy">
          <h2 className="topic-title">
            {topic.order}. {topic.title}
          </h2>

          <p className="topic-meta">{topic.description}</p>
        </div>

        <span className="done-pill">
          {topic.completedCount}/{topic.total} done
        </span>
      </button>

      {isOpen && (
        <div className="problem-list">
          {topic.problems.map((problem) => (
            <ProblemItem
              key={problem._id}
              problem={problem}
              busy={!!busy[problem._id]}
              onToggle={onToggleProblem}
            />
          ))}
        </div>
      )}
    </article>
  );
}
