import data from "@/data/data.json";
import StatusBadge from "@/components/StatusBadge";
import { formatCurrency } from "@/components/BudgetBar";
import { CreditCard, FileText, CheckCircle2, Clock } from "lucide-react";
import StatCard from "@/components/StatCard";

const PaymentsApprovals = () => {
  const projects = data.company.projects;

  const allPayments = projects.flatMap((p) =>
    p.payments.map((pay) => ({ ...pay, projectName: p.name, projectId: p.projectId }))
  );

  const totalAmount = allPayments.reduce((sum, p) => sum + p.amount, 0);
  const approved = allPayments.filter((p) => p.approvalFlow?.status === "Approved");
  const totalInvoices = allPayments.reduce((sum, p) => sum + p.invoices.length, 0);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Payments & Approvals</h1>
        <p className="page-subtitle">Track payment requests, invoices, and approval status</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Payment Requests" value={allPayments.length} icon={CreditCard} iconBg="bg-info/10" iconColor="text-info" />
        <StatCard title="Total Amount" value={formatCurrency(totalAmount)} icon={FileText} iconBg="bg-success/10" iconColor="text-success" />
        <StatCard title="Approved" value={approved.length} subtitle={`of ${allPayments.length} requests`} icon={CheckCircle2} iconBg="bg-success/10" iconColor="text-success" />
      </div>

      {/* Payment list */}
      {allPayments.length === 0 ? (
        <div className="stat-card text-center py-12">
          <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No payment requests found</p>
        </div>
      ) : (
        <div className="space-y-5">
          {allPayments.map((payment) => (
            <div key={payment.paymentId} className="stat-card">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-base">{payment.paymentId}</h3>
                    <StatusBadge status={payment.approvalFlow?.status || "Pending"} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{payment.projectName}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">{formatCurrency(payment.amount)}</p>
                  <p className="text-xs text-muted-foreground">Requested: {payment.requestDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Request info */}
                <div className="p-3 rounded-lg bg-muted/40 border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Request Info</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requested By</span>
                      <span className="font-medium">{payment.requestedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Request Date</span>
                      <span>{payment.requestDate}</span>
                    </div>
                  </div>
                </div>

                {/* Approval info */}
                <div className="p-3 rounded-lg bg-muted/40 border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Approval Info</p>
                  {payment.approvalFlow ? (
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Approved By</span>
                        <span className="font-medium">{payment.approvalFlow.approvedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Approved Date</span>
                        <span>{payment.approvalFlow.approvedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <StatusBadge status={payment.approvalFlow.status} />
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Awaiting approval</p>
                  )}
                </div>
              </div>

              {/* Invoices */}
              {payment.invoices.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Invoices</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b text-left text-muted-foreground">
                          <th className="pb-2 font-medium">Invoice ID</th>
                          <th className="pb-2 font-medium">Vendor</th>
                          <th className="pb-2 font-medium text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payment.invoices.map((inv) => (
                          <tr key={inv.invoiceId} className="border-b last:border-0">
                            <td className="py-2 font-mono text-xs">{inv.invoiceId}</td>
                            <td className="py-2">{inv.vendor}</td>
                            <td className="py-2 text-right font-medium">{formatCurrency(inv.amount)}</td>
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
  );
};

export default PaymentsApprovals;
