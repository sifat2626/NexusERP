import data from "@/data/data.json"
import StatCard from "@/components/StatCard"
import BudgetBar, { formatCurrency } from "@/components/BudgetBar"
import StatusBadge from "@/components/StatusBadge"
import HelpTooltip from "@/components/HelpTooltip"
import {
  FolderKanban,
  Wallet,
  ListChecks,
  Clock,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  Activity,
  Sparkles,
  User,
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
        <div className="flex items-center gap-2 text-sm mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-foreground font-medium">
            Welcome back!
          </span>
          <span className="text-muted-foreground hidden sm:inline">
            — Here's what's happening today
          </span>
        </div>
        <h1 className="page-title">{company.name}</h1>
        <p className="page-subtitle">
          Your complete overview of all construction projects, budgets, and team
          activities
        </p>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stagger-1 animate-slide-up">
          <StatCard
            title="Active Projects"
            value={projects.length}
            subtitle={`${projects.filter((p) => p.status === "In Progress").length} currently running`}
            icon={FolderKanban}
            iconBg="bg-primary/10"
            iconColor="text-primary"
            trend={12}
          />
        </div>
        <div className="stagger-2 animate-slide-up">
          <StatCard
            title="Total Money Allocated"
            value={formatCurrency(totalBudget)}
            subtitle={`${formatCurrency(totalSpent)} already used`}
            icon={Wallet}
            iconBg="bg-success/10"
            iconColor="text-success"
            trend={-3}
          />
        </div>
        <div className="stagger-3 animate-slide-up">
          <StatCard
            title="Work Items"
            value={totalTasks}
            subtitle="Things to do across all projects"
            icon={ListChecks}
            iconBg="bg-accent/10"
            iconColor="text-accent"
            trend={8}
          />
        </div>
        <div className="stagger-4 animate-slide-up">
          <StatCard
            title="Payment Requests"
            value={totalPayments}
            subtitle={`${pendingApprovals} have been approved`}
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
            <div className="flex items-center gap-2">
              <div>
                <h2 className="text-base font-semibold text-foreground font-display">
                  Money Tracker
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  See how much of your budget has been spent
                </p>
              </div>
              <HelpTooltip content="This shows the green bar filling up as you spend money from each project's budget. The fuller the bar, the more you've spent." />
            </div>
            <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 border border-primary/20 px-2.5 py-1.5 rounded-lg">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{budgetUtilPct}% spent overall</span>
            </div>
          </div>
          <div className="space-y-5">
            {projects.map((p) => (
              <div key={p.projectId}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-medium truncate">{p.name}</span>
                  <StatusBadge status={p.status} />
                </div>
                <BudgetBar spent={p.budget.spent} total={p.budget.total} />
              </div>
            ))}
          </div>
        </div>

        {/* Active Risks */}
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-base font-semibold font-display flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
              </span>
              Potential Issues
            </h2>
            <HelpTooltip content="These are warnings about things that could cause problems. The 'How to fix' section tells you what to do about each issue." />
          </div>
          <div className="space-y-3">
            {projects.flatMap((p) =>
              p.risks.map((r) => (
                <div
                  key={r.riskId}
                  className="p-3 rounded-xl bg-muted/30 border border-border/50 hover:border-border transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <StatusBadge status={r.severity} />
                  </div>
                  <p className="text-sm font-medium">{r.description}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    <span className="font-semibold">How to fix:</span>{" "}
                    {r.mitigation}
                  </p>
                </div>
              )),
            )}
            {totalRisks === 0 && (
              <div className="text-center py-6">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle className="w-5 h-5 text-success" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Great! No problems detected
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Projects Overview */}
      <div className="stat-card gradient-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <div>
              <h2 className="text-base font-semibold text-foreground font-display">
                Your Projects
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Quick look at what you're working on
              </p>
            </div>
            <HelpTooltip content="These are your active projects. Click 'See All' to view the complete list with more details." />
          </div>
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            See All Projects <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.slice(0, 3).map((p) => (
            <div
              key={p.projectId}
              className="p-4 rounded-xl border border-border/50 hover:border-primary/30 bg-muted/10 hover:bg-muted/20 transition-all duration-200 cursor-pointer group"
              onClick={() => navigate(`/projects/${p.projectId}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors flex-1 pr-2">
                  {p.name}
                </h3>
                <StatusBadge status={p.status} />
              </div>
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-3.5 h-3.5" />
                  <span className="truncate">{p.manager.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <ListChecks className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="font-medium">{p.tasks.length} tasks</span>
                </div>
              </div>
              <BudgetBar spent={p.budget.spent} total={p.budget.total} />
            </div>
          ))}
        </div>
        {projects.length > 3 && (
          <div className="mt-4 pt-4 border-t border-border/40 text-center">
            <button
              onClick={() => navigate("/projects")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              + {projects.length - 3} more project{projects.length - 3 !== 1 ? "s" : ""}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
