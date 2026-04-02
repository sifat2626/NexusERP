import { useState } from "react"
import data from "@/data/data.json"
import StatusBadge from "@/components/StatusBadge"
import { formatCurrency } from "@/components/BudgetBar"
import {
  CreditCard,
  FileText,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Receipt,
  Building2,
  Filter,
  X,
} from "lucide-react"
import StatCard from "@/components/StatCard"

type ApprovalFilter = "All" | string

const PaymentsApprovals = () => {
  const projects = data.company.projects
  const [filter, setFilter] = useState<ApprovalFilter>("All")

  const allPayments = projects.flatMap((p) =>
    p.payments.map((pay) => ({
      ...pay,
      projectName: p.name,
      projectId: p.projectId,
    })),
  )

  /* Unique statuses from data */
  const statuses = Array.from(
    new Set(allPayments.map((p) => p.approvalFlow?.status ?? "Pending")),
  )

  const filtered =
    filter === "All"
      ? allPayments
      : allPayments.filter(
          (p) => (p.approvalFlow?.status ?? "Pending") === filter,
        )

  const totalAmount = allPayments.reduce((s, p) => s + p.amount, 0)
  const approved = allPayments.filter(
    (p) => p.approvalFlow?.status === "Approved",
  )
  const pending = allPayments.filter(
    (p) => !p.approvalFlow || p.approvalFlow.status !== "Approved",
  )
  const totalInvoices = allPayments.reduce((s, p) => s + p.invoices.length, 0)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <CreditCard className="w-3.5 h-3.5 text-primary" />
          <span>Finance Management</span>
        </div>
        <h1 className="page-title">Payments & Approvals</h1>
        <p className="page-subtitle">
          Track payment requests, invoices, and approval workflow status
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="animate-slide-up stagger-1">
          <StatCard
            title="Payment Requests"
            value={allPayments.length}
            subtitle={`${pending.length} pending`}
            icon={CreditCard}
            iconBg="bg-primary/10"
            iconColor="text-primary"
          />
        </div>
        <div className="animate-slide-up stagger-2">
          <StatCard
            title="Total Amount"
            value={formatCurrency(totalAmount)}
            subtitle="All payment requests"
            icon={FileText}
            iconBg="bg-success/10"
            iconColor="text-success"
          />
        </div>
        <div className="animate-slide-up stagger-3">
          <StatCard
            title="Approved"
            value={approved.length}
            subtitle={`of ${allPayments.length} requests`}
            icon={CheckCircle2}
            iconBg="bg-success/10"
            iconColor="text-success"
            trend={
              allPayments.length > 0
                ? Math.round((approved.length / allPayments.length) * 100)
                : 0
            }
          />
        </div>
        <div className="animate-slide-up stagger-4">
          <StatCard
            title="Total Invoices"
            value={totalInvoices}
            subtitle="Linked documents"
            icon={Receipt}
            iconBg="bg-accent/10"
            iconColor="text-accent"
          />
        </div>
      </div>

      {/* Approval status filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
          <Filter className="w-3.5 h-3.5" />
          <span>Approval:</span>
        </div>

        <button
          onClick={() => setFilter("All")}
          className={`filter-pill ${filter === "All" ? "active" : ""}`}
        >
          All
          <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
            {allPayments.length}
          </span>
        </button>

        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`filter-pill ${filter === s ? "active" : ""}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                s === "Approved"
                  ? "bg-success"
                  : s === "Rejected"
                    ? "bg-destructive"
                    : "bg-muted-foreground"
              }`}
            />
            {s}
            <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
              {
                allPayments.filter(
                  (p) => (p.approvalFlow?.status ?? "Pending") === s,
                ).length
              }
            </span>
          </button>
        ))}

        {filter !== "All" && (
          <button
            onClick={() => setFilter("All")}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors duration-150 ml-1 animate-pop"
          >
            <X className="w-3 h-3" /> Clear
          </button>
        )}

        <span className="basis-full sm:basis-auto sm:ml-auto text-sm text-muted-foreground">
          {filtered.length} of {allPayments.length} shown
        </span>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="stat-card text-center py-16 animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-3">
            <Clock className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="font-semibold">No payment requests match this filter</p>
          <p className="text-sm text-muted-foreground mt-1">
            Try a different approval status.
          </p>
          <button
            onClick={() => setFilter("All")}
            className="mt-4 text-sm text-primary hover:underline"
          >
            Show all payments
          </button>
        </div>
      )}

      {/* Payment cards */}
      {filtered.length > 0 && (
        <div className="space-y-5">
          {filtered.map((payment, i) => (
            <div
              key={payment.paymentId}
              className="stat-card gradient-border animate-slide-up"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5 pb-5 border-b border-border/40">
                <div className="flex items-start gap-4 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold font-display text-foreground break-words">
                        {payment.paymentId}
                      </h3>
                      <StatusBadge
                        status={payment.approvalFlow?.status ?? "Pending"}
                      />
                    </div>
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-muted-foreground min-w-0">
                      <Building2 className="w-3 h-3" />
                      <span className="truncate">{payment.projectName}</span>
                    </div>
                  </div>
                </div>
                <div className="text-left md:text-right w-full md:w-auto md:shrink-0">
                  <p className="text-2xl font-bold font-display">
                    {formatCurrency(payment.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Requested {payment.requestDate}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                {/* Request info */}
                <div className="rounded-xl bg-muted/20 border border-border/40 p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-4">
                    Request Info
                  </p>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-1.5 sm:gap-4">
                      <span className="text-muted-foreground shrink-0">
                        Requested By
                      </span>
                      <span className="font-semibold text-right">
                        {payment.requestedBy}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-1.5 sm:gap-4">
                      <span className="text-muted-foreground shrink-0">
                        Date
                      </span>
                      <span className="text-right">{payment.requestDate}</span>
                    </div>
                  </div>
                </div>

                {/* Approval info */}
                <div className="rounded-xl bg-muted/20 border border-border/40 p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-4">
                    Approval Info
                  </p>
                  {payment.approvalFlow ? (
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-1.5 sm:gap-4">
                        <span className="text-muted-foreground shrink-0">
                          Approved By
                        </span>
                        <span className="font-semibold text-right">
                          {payment.approvalFlow.approvedBy}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-1.5 sm:gap-4">
                        <span className="text-muted-foreground shrink-0">
                          Date
                        </span>
                        <span className="text-right">
                          {payment.approvalFlow.approvedDate}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-1.5 sm:gap-4">
                        <span className="text-muted-foreground shrink-0">
                          Status
                        </span>
                        <StatusBadge status={payment.approvalFlow.status} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground py-1">
                      <Clock className="w-4 h-4 shrink-0" />
                      <span>Awaiting approval</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Invoices */}
              {payment.invoices.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3 px-1">
                    <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                    <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Invoices ({payment.invoices.length})
                    </p>
                  </div>
                  <div className="rounded-xl overflow-x-auto border border-border/40">
                    <table className="data-table min-w-[620px]">
                      <thead>
                        <tr className="bg-muted/30">
                          <th>Invoice ID</th>
                          <th>Vendor</th>
                          <th className="text-right">Amount</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {payment.invoices.map((inv) => (
                          <tr key={inv.invoiceId}>
                            <td className="font-mono text-xs text-muted-foreground">
                              {inv.invoiceId}
                            </td>
                            <td className="font-medium">{inv.vendor}</td>
                            <td className="text-right font-bold">
                              {formatCurrency(inv.amount)}
                            </td>
                            <td className="text-right">
                              <button className="text-primary hover:text-primary/70 transition-colors inline-flex items-center gap-0.5 text-sm">
                                View <ArrowUpRight className="w-3 h-3" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PaymentsApprovals
