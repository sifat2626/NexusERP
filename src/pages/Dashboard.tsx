import data from "@/data/data.json"
import StatCard from "@/components/StatCard"
import BudgetBar, { formatCurrency } from "@/components/BudgetBar"
import StatusBadge from "@/components/StatusBadge"
import HelpTooltip from "@/components/HelpTooltip"
import {
  FolderKanban,
  Wallet,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  User,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
  const { company } = data
  const projects = company.projects

  const totalBudget = projects.reduce((sum, p) => sum + p.budget.total, 0)
  const totalSpent = projects.reduce((sum, p) => sum + p.budget.spent, 0)

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="stagger-1 animate-slide-up">
          <StatCard
            title="Active Projects"
            value={projects.length}
            subtitle={`${projects.filter((p) => p.status === "In Progress").length} in progress`}
            icon={FolderKanban}
            iconBg="bg-primary/15"
            iconColor="text-primary"
          />
        </div>
        <div className="stagger-2 animate-slide-up">
          <StatCard
            title="Total Budget"
            value={formatCurrency(totalBudget)}
            subtitle={`${formatCurrency(totalSpent)} spent`}
            icon={Wallet}
            iconBg="bg-success/15"
            iconColor="text-success"
          />
        </div>
      </div>

      {/* Budget Overview + Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget by Project */}
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-6">
            <div>
              <h2 className="text-base font-semibold text-foreground font-display">
                How Budgets Are Spending
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Quick view of each project
              </p>
            </div>
            <HelpTooltip content="This shows how much of each project's budget has been used." />
          </div>
          <div className="space-y-5">
            {projects.slice(0, 5).map((p) => (
              <div key={p.projectId}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-sm font-medium truncate">{p.name}</span>
                </div>
                <BudgetBar spent={p.budget.spent} total={p.budget.total} />
              </div>
            ))}
          </div>
        </div>

        {/* Potential Issues - Simplified */}
        <div className="stat-card">
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-base font-semibold font-display flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-warning/20 flex items-center justify-center">
                <AlertTriangle className="w-3.5 h-3.5 text-warning" />
              </span>
              Things to Watch For
            </h2>
            <HelpTooltip content="These are areas that might need your attention soon." />
          </div>
          <div className="space-y-3">
            {projects.flatMap((p) =>
              p.risks.slice(0, 4).map((r) => {
                const riskColor =
                  r.severity === "High" ? "border-destructive/40 bg-destructive/8" :
                  r.severity === "Medium" ? "border-warning/40 bg-warning/8" :
                  "border-info/40 bg-info/8"

                return (
                  <div
                    key={r.riskId}
                    className={`p-3 rounded-xl border ${riskColor} hover:border-opacity-60 transition-colors`}
                  >
                    <p className="text-sm font-medium text-foreground">{r.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {r.mitigation}
                    </p>
                  </div>
                )
              }),
            )}
            {projects.flatMap((p) => p.risks).slice(0, 4).length === 0 && (
              <div className="text-center py-6">
                <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center mx-auto mb-2">
                  <AlertTriangle className="w-5 h-5 text-success" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Everything looks good!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Projects Overview */}
      <div className="stat-card">
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
          </div>
          <button
            onClick={() => navigate("/projects")}
            className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
          >
            See All <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.slice(0, 2).map((p) => (
            <div
              key={p.projectId}
              className="p-4 rounded-xl border border-border/30 bg-muted/10 hover:bg-muted/20 transition-all duration-200 cursor-pointer group"
              onClick={() => navigate(`/projects/${p.projectId}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors flex-1 pr-2">
                  {p.name}
                </h3>
                <StatusBadge status={p.status} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-3.5 h-3.5" />
                  <span className="truncate">{p.manager.name}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-border/30">
                <BudgetBar spent={p.budget.spent} total={p.budget.total} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
