import { FileText, AlertTriangle, DollarSign, TrendingUp, Activity, Bot } from 'lucide-react';
import { mockPolicies, mockClaims, mockAgentActions } from '../data/mockData';

export function Dashboard() {
  const totalPolicies = mockPolicies.length;
  const activePolicies = mockPolicies.filter(p => p.status === 'ACTIVE').length;
  const totalClaims = mockClaims.length;
  const openClaims = mockClaims.filter(c => !['PAID', 'CLOSED'].includes(c.status)).length;
  const totalReserves = mockClaims.reduce((sum, c) => sum + c.reserveAmount, 0);
  const totalPaid = mockClaims.reduce((sum, c) => sum + c.paidAmount, 0);
  const highRiskClaims = mockClaims.filter(c => (c.fraudScore || 0) > 60).length;
  const agentActionsToday = mockAgentActions.length;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="mb-2">AIQ PAS/CMS Dashboard</h1>
        <p className="text-muted-foreground">AI system of record with comprehensive audit trails</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Policies"
          value={activePolicies}
          subtitle={`${totalPolicies} total`}
          icon={<FileText className="size-5 text-white" />}
          trend="+12%"
          bgColor="bg-gradient-to-br from-primary to-primary/80"
        />
        <MetricCard
          title="Open Claims"
          value={openClaims}
          subtitle={`${totalClaims} total claims`}
          icon={<AlertTriangle className="size-5 text-white" />}
          trend="-5%"
          bgColor="bg-gradient-to-br from-chart-2 to-chart-2/80"
        />
        <MetricCard
          title="Total Reserves"
          value={`$${(totalReserves / 1000).toFixed(0)}K`}
          subtitle={`$${(totalPaid / 1000).toFixed(0)}K paid out`}
          icon={<DollarSign className="size-5 text-white" />}
          bgColor="bg-gradient-to-br from-chart-4 to-chart-4/80"
        />
        <MetricCard
          title="Agent Actions"
          value={agentActionsToday}
          subtitle="AI automations today"
          icon={<Bot className="size-5 text-white" />}
          trend="+28%"
          bgColor="bg-gradient-to-br from-chart-5 to-chart-5/80"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-primary/5 to-chart-5/5 border border-border rounded-xl p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <Activity className="size-5 text-primary" />
            Policy Lifecycle Distribution
          </h3>
          <div className="space-y-3">
            {Object.entries(
              mockPolicies.reduce((acc, p) => {
                acc[p.status] = (acc[p.status] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([status, count], i) => (
              <div key={status}>
                <div className="flex justify-between mb-1">
                  <span className="capitalize">{status.toLowerCase()}</span>
                  <span>{count}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      i === 0 ? 'bg-gradient-to-r from-warning to-chart-1' :
                      i === 1 ? 'bg-gradient-to-r from-primary to-chart-3' :
                      i === 2 ? 'bg-gradient-to-r from-success to-chart-2' :
                      'bg-gradient-to-r from-chart-4 to-chart-5'
                    }`}
                    style={{ width: `${(count / totalPolicies) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-chart-2/5 to-chart-3/5 border border-border rounded-xl p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <TrendingUp className="size-5 text-chart-2" />
            Claims Status Overview
          </h3>
          <div className="space-y-3">
            {Object.entries(
              mockClaims.reduce((acc, c) => {
                acc[c.status] = (acc[c.status] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([status, count], i) => (
              <div key={status}>
                <div className="flex justify-between mb-1">
                  <span className="capitalize">{status.replace(/_/g, ' ').toLowerCase()}</span>
                  <span>{count}</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      i === 0 ? 'bg-gradient-to-r from-warning to-chart-1' :
                      i === 1 ? 'bg-gradient-to-r from-chart-3 to-info' :
                      i === 2 ? 'bg-gradient-to-r from-success to-chart-2' :
                      'bg-gradient-to-r from-chart-4 to-chart-5'
                    }`}
                    style={{ width: `${(count / totalClaims) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {highRiskClaims > 0 && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
          <div>
            <h4 className="text-destructive">High-Risk Claims Alert</h4>
            <p className="text-sm text-destructive/80 mt-1">
              {highRiskClaims} claim{highRiskClaims > 1 ? 's' : ''} flagged with fraud score above 60. Review recommended.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  trend?: string;
  bgColor: string;
}

function MetricCard({ title, value, subtitle, icon, trend, bgColor }: MetricCardProps) {
  return (
    <div className={`${bgColor} text-white rounded-xl p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm opacity-90">{title}</span>
        <div className="p-2 bg-white/20 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mb-1 text-2xl">{value}</div>
      <div className="flex items-center justify-between">
        <span className="text-sm opacity-90">{subtitle}</span>
        {trend && (
          <span className="text-sm bg-white/20 px-2 py-0.5 rounded">
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
