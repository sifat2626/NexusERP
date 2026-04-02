import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconBg?: string
  iconColor?: string
}

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg = "bg-primary/15",
  iconColor = "text-primary",
}: StatCardProps) => {
  return (
    <div className="stat-card flex flex-col gap-4 group cursor-default animate-fade-in">
      <div className="flex items-start justify-between">
        <div
          className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105`}
        >
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          {title}
        </p>
        <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
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
