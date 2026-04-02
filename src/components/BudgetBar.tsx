interface BudgetBarProps {
  spent: number;
  total: number;
  showLabel?: boolean;
}

const formatCurrency = (amount: number) => {
  if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)}L`;
  return `৳${amount.toLocaleString()}`;
};

const BudgetBar = ({ spent, total, showLabel = true }: BudgetBarProps) => {
  const pct = total > 0 ? Math.round((spent / total) * 100) : 0;
  const barColor = pct > 90 ? "bg-destructive" : pct > 70 ? "bg-warning" : "bg-success";

  return (
    <div className="space-y-1.5">
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatCurrency(spent)} spent</span>
          <span>{formatCurrency(total)} total</span>
        </div>
      )}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <p className="text-xs font-semibold text-foreground">{pct}% utilized</p>
    </div>
  );
};

export { formatCurrency };
export default BudgetBar;
