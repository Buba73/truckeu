type Severity = "high" | "medium" | "low";
type AlertType = "closure" | "restriction" | "warning";

export function SeverityBadge({ severity }: { severity: Severity }) {
  const styles: Record<Severity, string> = {
    high: "bg-red-900 text-red-300 border border-red-700",
    medium: "bg-amber-900 text-amber-300 border border-amber-700",
    low: "bg-blue-900 text-blue-300 border border-blue-700",
  };
  const labels: Record<Severity, string> = {
    high: "Vysoká",
    medium: "Střední",
    low: "Nízká",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[severity]}`}>
      {labels[severity]}
    </span>
  );
}

export function TypeBadge({ type }: { type: AlertType }) {
  const styles: Record<AlertType, string> = {
    closure: "bg-red-800 text-red-200",
    restriction: "bg-orange-800 text-orange-200",
    warning: "bg-yellow-800 text-yellow-200",
  };
  const labels: Record<AlertType, string> = {
    closure: "🚫 Uzavírka",
    restriction: "⚠️ Omezení",
    warning: "ℹ️ Upozornění",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium ${styles[type]}`}>
      {labels[type]}
    </span>
  );
}
