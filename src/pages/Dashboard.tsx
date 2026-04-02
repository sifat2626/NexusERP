import data from "@/data/data.json";
import StatCard from "@/components/StatCard";
import BudgetBar, { formatCurrency } from "@/components/BudgetBar";
import StatusBadge from "@/components/StatusBadge";
import { FolderKanban, Wallet, ListChecks, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { company } = data;
  const projects = company.projects;

  const totalBudget = projects.reduce((sum, p) => sum + p.budget.total, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.budget.spent, 0);
  const totalTasks = projects.reduce((sum, p) => sum + p.tasks.length, 0);
  const pendingApprovals = projects
    .flatMap((p) => p.payments)
    .filter((pay) => pay.approvalFlow?.status === "Approved").length;
  const totalPayments = projects.flatMap((p) => p.payments).length;
  const totalRisks = projects.flatMap((p) => p.risks).length;

  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
        <p className="text-sm text-muted-foreground">Welcome back</p>
        <h1 className="page-title">{company.name}</h1>
        <p className="page-subtitle">Construction ERP Dashboard — Overview of all projects and operations</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Projects" value={projects.length} subtitle={`${projects.filter(p => p.status === "In Progress").length} in progress`} icon={FolderKanban} iconBg="bg-info/10" iconColor="text-info" />
        <StatCard title="Total Budget" value={formatCurrency(totalBudget)} subtitle={`${formatCurrency(totalSpent)} spent`} icon={Wallet} iconBg="bg-success/10" iconColor="text-success" />
        <StatCard title="Total Tasks" value={totalTasks} subtitle={`Across all projects`} icon={ListChecks} iconBg="bg-accent/15" iconColor="text-accent-foreground" />
        <StatCard title="Payments" value={totalPayments} subtitle={`${pendingApprovals} approved`} icon={Clock} iconBg="bg-warning/10" iconColor="text-warning" />
      </div>

      {/* Budget overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 stat-card">
          <h2 className="text-base font-semibold mb-4">Budget Overview by Project</h2>
          <div className="space-y-5">
            {projects.map((p) => (
              <div key={p.projectId}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{p.name}</span>
                  <StatusBadge status={p.status} />
                </div>
                <BudgetBar spent={p.budget.spent} total={p.budget.total} />
              </div>
            ))}
          </div>
        </div>

        {/* Risks */}
        <div className="stat-card">
          <h2 className="text-base font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" /> Active Risks
          </h2>
          <div className="space-y-3">
            {projects.flatMap((p) =>
              p.risks.map((r) => (
                <div key={r.riskId} className="p-3 rounded-lg bg-muted/50 border">
                  <div className="flex items-center justify-between mb-1">
                    <StatusBadge status={r.severity} />
                    <span className="text-xs text-muted-foreground">{r.riskId}</span>
                  </div>
                  <p className="text-sm mt-1">{r.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Mitigation: {r.mitigation}</p>
                </div>
              ))
            )}
            {totalRisks === 0 && <p className="text-sm text-muted-foreground">No active risks</p>}
          </div>
        </div>
      </div>

      {/* Project quick list */}
      <div className="stat-card">
        <h2 className="text-base font-semibold mb-4">Projects at a Glance</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-3 font-medium">Project</th>
                <th className="pb-3 font-medium">Manager</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Budget Utilization</th>
                <th className="pb-3 font-medium">Tasks</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.projectId} className="border-b last:border-0 hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => navigate(`/projects/${p.projectId}`)}>
                  <td className="py-3 font-medium">{p.name}</td>
                  <td className="py-3 text-muted-foreground">{p.manager.name}</td>
                  <td className="py-3"><StatusBadge status={p.status} /></td>
                  <td className="py-3 w-48"><BudgetBar spent={p.budget.spent} total={p.budget.total} showLabel={false} /></td>
                  <td className="py-3">{p.tasks.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
