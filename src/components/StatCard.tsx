import { LucideIcon, TrendingUp } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconBg?: string
  iconColor?: string
  trend?: number
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "bg-primary/10",
  iconColor = "text-primary",
  trend,
}: StatCardProps) => {
  return (
    <div className="stat-card gradient-border flex flex-col gap-4 group cursor-default animate-fade-in">
      <div className="flex items-start justify-between">
        <div
          className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        {trend !== undefined && (
          <span
            className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${trend >= 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}
          >
            <TrendingUp
              className={`w-3 h-3 ${trend < 0 ? "rotate-180" : ""}`}
            />
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </p>
        <p className="metric-value mt-1">{value}</p>
        {subtitle && (
          <p className="text-sm text-muted-foreground/70 mt-1 flex items-center gap-1.5 leading-relaxed">
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40 inline-block" />
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

export default StatCard
