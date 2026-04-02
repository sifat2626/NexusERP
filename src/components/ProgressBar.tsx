import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  value: number;
  /** Tailwind gradient classes e.g. "from-info to-info/60" */
  gradient?: string;
  height?: "h-1.5" | "h-2" | "h-2.5";
  /** Delay before animation starts (ms) — useful for staggered lists */
  delay?: number;
  showPercent?: boolean;
}

const ProgressBar = ({
  value,
  gradient = "from-primary to-success",
  height = "h-1.5",
  delay = 0,
  showPercent = false,
}: ProgressBarProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          // Optional stagger delay
          const timer = setTimeout(() => setAnimated(true), delay);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animated, delay]);

  return (
    <div className="flex items-center gap-2.5">
      <div
        ref={trackRef}
        className={`flex-1 ${height} bg-muted/60 rounded-full overflow-hidden border border-border/20`}
      >
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
          style={{
            width: animated ? `${value}%` : "0%",
            transition: animated
              ? `width 1.0s cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms`
              : "none",
          }}
        />
      </div>
      {showPercent && (
        <span className="text-sm font-bold shrink-0" style={{ minWidth: "2.5rem", textAlign: "right" }}>
          {value}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
