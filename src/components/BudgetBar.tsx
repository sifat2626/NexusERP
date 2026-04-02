import { useEffect, useRef, useState } from "react"

interface BudgetBarProps {
  spent: number
  total: number
  showLabel?: boolean
}

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(1)}Cr`
  if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)}L`
  return `৳${amount.toLocaleString()}`
}

const BudgetBar = ({ spent, total, showLabel = true }: BudgetBarProps) => {
  const pct = total > 0 ? Math.round((spent / total) * 100) : 0

  const gradient =
    pct > 90
      ? "from-destructive to-destructive/70"
      : pct > 70
        ? "from-warning to-warning/70"
        : "from-primary to-success"

  // Intersection-observer driven animation
  const barRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const el = barRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animated])

  return (
    <div className="space-y-1.5" ref={barRef}>
      {showLabel && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">
            {formatCurrency(spent)} spent
          </span>
          <span className="font-bold text-foreground/80">{pct}%</span>
        </div>
      )}

      {/* Track */}
      <div className="h-2 bg-muted/60 rounded-full overflow-hidden border border-border/30 relative">
        {/* Fill — starts at 0, transitions to pct when in view */}
        <div
          ref={fillRef}
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          style={{
            width: animated ? `${pct}%` : "0%",
            transition: animated
              ? "width 1.1s cubic-bezier(0.25, 1, 0.5, 1)"
              : "none",
          }}
        />
      </div>

      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground/60 mt-0.5">
          <span className="font-medium">Budget</span>
          <span>{formatCurrency(total)}</span>
        </div>
      )}
    </div>
  )
}

export { formatCurrency }
export default BudgetBar
