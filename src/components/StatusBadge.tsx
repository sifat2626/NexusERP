interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  "Completed": "bg-success/10 text-success",
  "In Progress": "bg-info/10 text-info",
  "Planning": "bg-warning/10 text-warning",
  "Pending": "bg-muted text-muted-foreground",
  "Approved": "bg-success/10 text-success",
  "High": "bg-destructive/10 text-destructive",
  "Medium": "bg-warning/10 text-warning",
  "Low": "bg-info/10 text-info",
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const style = statusStyles[status] || "bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
