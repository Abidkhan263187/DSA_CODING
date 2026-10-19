
function badgeClass(level) {
    if (level === "Easy") return "badge easy";
    if (level === "Hard") return "badge hard";
    return "badge medium";
  }
  
  export default function DifficultyBadge({ level }) {
    return <span className={badgeClass(level)}>{level}</span>;
  }
  