import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { getStatusDescription } from "@/utils/dateUtils"

interface StatusBadgeProps {
  status: string
}

const statusConfig: Record<
  string,
  { bg: string; text: string; dot: string; border: string }
> = {
  Completed: {
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
    border: "border-success/25",
  },
  "In Progress": {
    bg: "bg-info/10",
    text: "text-info",
    dot: "bg-info",
    border: "border-info/25",
  },
  Planning: {
    bg: "bg-warning/10",
    text: "text-warning",
    dot: "bg-warning",
    border: "border-warning/25",
  },
  Pending: {
    bg: "bg-muted/60",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
    border: "border-border",
  },
  Approved: {
    bg: "bg-success/10",
    text: "text-success",
    dot: "bg-success",
    border: "border-success/25",
  },
  Rejected: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    dot: "bg-destructive",
    border: "border-destructive/25",
  },
  High: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    dot: "bg-destructive",
    border: "border-destructive/25",
  },
  Medium: {
    bg: "bg-warning/10",
    text: "text-warning",
    dot: "bg-warning",
    border: "border-warning/25",
  },
  Low: {
    bg: "bg-info/10",
    text: "text-info",
    dot: "bg-info",
    border: "border-info/25",
  },
  "Not Started": {
    bg: "bg-muted/60",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
    border: "border-border",
  },
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const cfg = statusConfig[status] ?? {
    bg: "bg-muted/60",
    text: "text-muted-foreground",
    dot: "bg-muted-foreground",
    border: "border-border",
  }

  const description = getStatusDescription(status)

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className={`badge border ${cfg.bg} ${cfg.text} ${cfg.border} cursor-help`}
          >
            <span className={`pulse-dot ${cfg.dot}`} />
            {status}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default StatusBadge
