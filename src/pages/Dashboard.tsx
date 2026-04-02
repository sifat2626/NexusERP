import data from "@/data/data.json"
import StatCard from "@/components/StatCard"
import BudgetBar, { formatCurrency } from "@/components/BudgetBar"
import StatusBadge from "@/components/StatusBadge"
import {
  FolderKanban,
  Wallet,
  ListChecks,
  Clock,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Activity,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { company } = data
  const projects = company.projects

  const totalBudget = projects.reduce((sum, p) => sum + p.budget.total, 0)
  const totalSpent = projects.reduce((sum, p) => sum + p.budget.spent, 0)
  const totalTasks = projects.reduce((sum, p) => sum + p.tasks.length, 0)
  const pendingApprovals = projects
    .flatMap((p) => p.payments)
    .filter((pay) => pay.approvalFlow?.status === "Approved").length
  const totalPayments = projects.flatMap((p) => p.payments).length
  const totalRisks = projects.flatMap((p) => p.risks).length
  const budgetUtilPct =
    totalBudget > 0 ? Math.round((totalSpent / totalBudget) * 100) : 0

  const navigate = useNavigate()

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Activity className="w-3.5 h-3.5 text-primary" />
          <span>Welcome back, Admin</span>
        </div>
        <h1 className="page-title">{company.name}</h1>
        <p className="page-subtitle">
          Construction ERP Dashboard — Real-time overview of all projects and
          operations
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stagger-1 animate-slide-up">
          <StatCard
            title="Total Projects"
            value={projects.length}
            subtitle={`${projects.filter((p) => p.status === "In Progress").length} in progress`}
            icon={FolderKanban}
            iconBg="bg-primary/10"
            iconColor="text-primary"
            trend={12}
          />
        </div>
        <div className="stagger-2 animate-slide-up">
          <StatCard
            title="Total Budget"
            value={formatCurrency(totalBudget)}
            subtitle={`${formatCurrency(totalSpent)} spent`}
            icon={Wallet}
            iconBg="bg-success/10"
            iconColor="text-success"
            trend={-3}
          />
        </div>
        <div className="stagger-3 animate-slide-up">
          <StatCard
            title="Total Tasks"
            value={totalTasks}
            subtitle="Across all projects"
            icon={ListChecks}
            iconBg="bg-accent/10"
            iconColor="text-accent"
            trend={8}
          />
        </div>
        <div className="stagger-4 animate-slide-up">
          <StatCard
            title="Payments"
            value={totalPayments}
            subtitle={`${pendingApprovals} approved`}
            icon={Clock}
            iconBg="bg-warning/10"
            iconColor="text-warning"
          />
        </div>
      </div>

      {/* Budget Overview + Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Budget by Project */}
        <div className="lg:col-span-2 stat-card gradient-border">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-semibold text-foreground font-display">
                Budget Overview
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Utilization across all projects
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-primary bg-primary/10 border border-primary/20 px-2.5 py-1.5 rounded-lg">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{budgetUtilPct}% overall</span>
            </div>
          </div>
          <div className="space-y-5">
            {projects.map((p) => (
              <div key={p.projectId}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{p.name}</span>
                  <StatusBadge status={p.status} />
                </div>
                <BudgetBar spent={p.budget.spent} total={p.budget.total} />
              </div>
            ))}
          </div>
        </div>

        {/* Active Risks */}
        <div className="stat-card">
          <h2 className="text-base font-semibold font-display flex items-center gap-2 mb-5">
            <span className="w-6 h-6 rounded-lg bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
            </span>
            Active Risks
          </h2>
          <div className="space-y-3">
            {projects.flatMap((p) =>
              p.risks.map((r) => (
                <div
                  key={r.riskId}
                  className="p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <StatusBadge status={r.severity} />
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {r.riskId}
                    </span>
                  </div>
                  <p className="text-xs font-medium">{r.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed">
                    ↳ {r.mitigation}
                  </p>
                </div>
              )),
            )}
            {totalRisks === 0 && (
              <div className="text-center py-6">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle className="w-5 h-5 text-success" />
                </div>
                <p className="text-sm text-muted-foreground">No active risks</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="stat-card gradient-border">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-semibold text-foreground font-display">
              Projects at a Glance
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {projects.length} active projects
            </p>
          </div>
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View all <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table min-w-[680px]">
            <thead>
              <tr>
                <th>Project</th>
                <th>Manager</th>
                <th>Status</th>
                <th className="w-52">Budget Utilization</th>
                <th>Tasks</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.projectId}
                  className="cursor-pointer"
                  onClick={() => navigate(`/projects/${p.projectId}`)}
                >
                  <td>
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-[10px] font-mono text-muted-foreground">
                        {p.projectId}
                      </p>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{p.manager.name}</td>
                  <td>
                    <StatusBadge status={p.status} />
                  </td>
                  <td>
                    <BudgetBar
                      spent={p.budget.spent}
                      total={p.budget.total}
                      showLabel={false}
                    />
                  </td>
                  <td>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground">
                      <ListChecks className="w-3.5 h-3.5 text-muted-foreground" />
                      {p.tasks.length}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
