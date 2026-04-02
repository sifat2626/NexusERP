interface StatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { bg: string; text: string; dot: string; border: string }> = {
  "Completed":    { bg: "bg-success/10",        text: "text-success",         dot: "bg-success",             border: "border-success/25"      },
  "In Progress":  { bg: "bg-info/10",           text: "text-info",            dot: "bg-info",                border: "border-info/25"         },
  "Planning":     { bg: "bg-warning/10",        text: "text-warning",         dot: "bg-warning",             border: "border-warning/25"      },
  "Pending":      { bg: "bg-muted/60",          text: "text-muted-foreground",dot: "bg-muted-foreground",    border: "border-border"          },
  "Approved":     { bg: "bg-success/10",        text: "text-success",         dot: "bg-success",             border: "border-success/25"      },
  "Rejected":     { bg: "bg-destructive/10",    text: "text-destructive",     dot: "bg-destructive",         border: "border-destructive/25"  },
  "High":         { bg: "bg-destructive/10",    text: "text-destructive",     dot: "bg-destructive",         border: "border-destructive/25"  },
  "Medium":       { bg: "bg-warning/10",        text: "text-warning",         dot: "bg-warning",             border: "border-warning/25"      },
  "Low":          { bg: "bg-info/10",           text: "text-info",            dot: "bg-info",                border: "border-info/25"         },
  "Not Started":  { bg: "bg-muted/60",          text: "text-muted-foreground",dot: "bg-muted-foreground",    border: "border-border"          },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const cfg = statusConfig[status] ?? {
    bg:     "bg-muted/60",
    text:   "text-muted-foreground",
    dot:    "bg-muted-foreground",
    border: "border-border",
  };

  return (
    <span className={`badge border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`pulse-dot ${cfg.dot}`} />
      {status}
    </span>
  );
};

export default StatusBadge;
