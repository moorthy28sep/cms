import { useEffect, useState, type ReactNode } from 'react';
import { CheckCircle, Clock, AlertTriangle, Bell, TrendingUp, FileText, DollarSign, Users } from 'lucide-react';
import type { PersonaRole, PersonaTask, PersonaNotification } from '../types/personas';
import { PERSONAS } from '../types/personas';
import { dashboardService, type MetricData } from '../services/dashboardService';

interface PersonaDashboardProps {
  persona: PersonaRole;
}

export function PersonaDashboard({ persona }: PersonaDashboardProps) {
  const personaData = PERSONAS[persona];
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const dashboardData = dashboardService.getDashboardData(persona);
  const tasks = dashboardData.tasks;
  const notifications = dashboardData.notifications;

  useEffect(() => {
    // Load metrics and refresh periodically
    setMetrics(dashboardService.getMetricsForPersona(persona));

    // Auto-refresh metrics every 30 seconds to stay in sync with data
    const interval = setInterval(() => {
      dashboardService.invalidateCache(persona);
      setMetrics(dashboardService.getMetricsForPersona(persona, true));
    }, 30000);

    return () => clearInterval(interval);
  }, [persona]);

  return (
    <div className="p-8 space-y-6">
      <div className="bg-gradient-to-br from-primary/10 via-chart-3/10 to-chart-5/10 border border-primary/20 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="size-16 bg-gradient-to-br from-primary to-chart-5 rounded-2xl flex items-center justify-center text-3xl">
            {personaData.avatar}
          </div>
          <div>
            <h1 className="mb-2">Welcome back, {personaData.name}!</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="capitalize">{persona.replace(/_/g, ' ')}</span>
              {personaData.department && (
                <>
                  <span>•</span>
                  <span>{personaData.department}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <MetricCard key={i} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TasksSection tasks={tasks} persona={persona} />
          {persona === 'executive' && <ExecutiveInsights />}
          {persona === 'fraud_analyst' && <FraudPatterns />}
          {persona === 'agent' && <SalesOpportunities />}
        </div>

        <div className="space-y-6">
          <NotificationsSection notifications={notifications} />
          <QuickActions persona={persona} />
        </div>
      </div>
    </div>
  );
}

function TasksSection({ tasks, persona }: { tasks: PersonaTask[]; persona: PersonaRole }) {
  const pendingTasks = tasks.filter(t => t.status !== 'completed');
  const highPriority = pendingTasks.filter(t => t.priority === 'high').length;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2">
          <CheckCircle className="size-5 text-primary" />
          My Tasks
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-1 bg-destructive/10 text-destructive rounded">
            {highPriority} High Priority
          </span>
          <span className="text-muted-foreground">
            {pendingTasks.length} Active
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

function TaskCard({ task }: { task: PersonaTask }) {
  const priorityColors = {
    high: 'border-l-destructive bg-destructive/5',
    medium: 'border-l-warning bg-warning/5',
    low: 'border-l-chart-2 bg-chart-2/5'
  };

  const statusIcons = {
    pending: <Clock className="size-4 text-muted-foreground" />,
    in_progress: <TrendingUp className="size-4 text-chart-3" />,
    completed: <CheckCircle className="size-4 text-success" />
  };

  return (
    <div className={`border-l-4 ${priorityColors[task.priority]} rounded-lg p-4`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="text-sm mb-1">{task.title}</h4>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>
        {statusIcons[task.status]}
      </div>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
        {task.dueDate && (
          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
        )}
        {task.relatedEntity && (
          <span className="px-2 py-0.5 bg-muted rounded capitalize">
            {task.relatedEntity.type}
          </span>
        )}
        <span className="px-2 py-0.5 bg-primary/10 text-primary rounded capitalize">
          {task.priority}
        </span>
      </div>
    </div>
  );
}

function NotificationsSection({ notifications }: { notifications: PersonaNotification[] }) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2">
          <Bell className="size-5 text-chart-3" />
          Notifications
        </h3>
        {unreadCount > 0 && (
          <span className="size-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center text-xs">
            {unreadCount}
          </span>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map(notif => (
          <NotificationCard key={notif.id} notification={notif} />
        ))}
      </div>
    </div>
  );
}

function NotificationCard({ notification }: { notification: PersonaNotification }) {
  const typeColors = {
    info: 'border-l-info bg-info/5',
    warning: 'border-l-warning bg-warning/5',
    success: 'border-l-success bg-success/5',
    error: 'border-l-destructive bg-destructive/5'
  };

  return (
    <div className={`border-l-4 ${typeColors[notification.type]} rounded-lg p-3 ${!notification.read ? 'font-medium' : 'opacity-60'}`}>
      <div className="flex items-start justify-between mb-1">
        <h4 className="text-sm">{notification.title}</h4>
        {!notification.read && (
          <div className="size-2 rounded-full bg-primary shrink-0 mt-1" />
        )}
      </div>
      <p className="text-xs text-muted-foreground mb-2">{notification.message}</p>
      <span className="text-xs text-muted-foreground">
        {new Date(notification.timestamp).toLocaleString()}
      </span>
    </div>
  );
}

function QuickActions({ persona }: { persona: PersonaRole }) {
  const actions = getQuickActionsForPersona(persona);

  return (
    <div className="bg-gradient-to-br from-chart-2/10 to-chart-4/10 border border-border rounded-xl p-6">
      <h3 className="mb-4">Quick Actions</h3>
      <div className="space-y-2">
        {actions.map((action, i) => (
          <button
            key={i}
            className="w-full px-4 py-3 bg-card border border-border rounded-lg hover:bg-muted transition-colors text-left flex items-center gap-3"
          >
            <span className="text-xl">{action.icon}</span>
            <span className="text-sm">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function ExecutiveInsights() {
  return (
    <div className="bg-gradient-to-br from-chart-4/10 to-chart-5/10 border border-border rounded-xl p-6">
      <h3 className="mb-4">Executive Insights</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card/50 rounded-lg p-4">
          <div className="text-2xl mb-1">$1.2M</div>
          <div className="text-sm text-muted-foreground">Monthly Premium</div>
          <div className="text-xs text-success mt-1">↑ 12% MoM</div>
        </div>
        <div className="bg-card/50 rounded-lg p-4">
          <div className="text-2xl mb-1">92%</div>
          <div className="text-sm text-muted-foreground">Customer Retention</div>
          <div className="text-xs text-success mt-1">↑ 3% YoY</div>
        </div>
        <div className="bg-card/50 rounded-lg p-4">
          <div className="text-2xl mb-1">65%</div>
          <div className="text-sm text-muted-foreground">Combined Ratio</div>
          <div className="text-xs text-success mt-1">↓ 5% QoQ</div>
        </div>
        <div className="bg-card/50 rounded-lg p-4">
          <div className="text-2xl mb-1">89%</div>
          <div className="text-sm text-muted-foreground">AI Accuracy</div>
          <div className="text-xs text-success mt-1">↑ 8% YoY</div>
        </div>
      </div>
    </div>
  );
}

function FraudPatterns() {
  return (
    <div className="bg-gradient-to-br from-destructive/10 to-warning/10 border border-border rounded-xl p-6">
      <h3 className="mb-4 flex items-center gap-2">
        <AlertTriangle className="size-5 text-destructive" />
        Fraud Patterns Detected
      </h3>
      <div className="space-y-3">
        <div className="bg-card/50 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm">Repair Shop Network</h4>
            <span className="px-2 py-0.5 bg-destructive/20 text-destructive rounded text-xs">Critical</span>
          </div>
          <p className="text-sm text-muted-foreground">3 claims from AutoFix Pro in 2 weeks. Avg claim value: $4,800</p>
        </div>
        <div className="bg-card/50 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm">Late Reporting Pattern</h4>
            <span className="px-2 py-0.5 bg-warning/20 text-warning rounded text-xs">Medium</span>
          </div>
          <p className="text-sm text-muted-foreground">5 claims reported 25+ days after incident across 2 policyholders</p>
        </div>
      </div>
    </div>
  );
}

function SalesOpportunities() {
  return (
    <div className="bg-gradient-to-br from-success/10 to-chart-2/10 border border-border rounded-xl p-6">
      <h3 className="mb-4">Cross-Sell Opportunities</h3>
      <div className="space-y-3">
        <div className="bg-card/50 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm">Sarah Johnson</h4>
            <span className="px-2 py-0.5 bg-success/20 text-success rounded text-xs">High Intent</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Has auto, recommend home bundling</p>
          <div className="text-xs text-success">Potential: $1,850/year</div>
        </div>
        <div className="bg-card/50 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm">TechStart Inc.</h4>
            <span className="px-2 py-0.5 bg-chart-3/20 text-chart-3 rounded text-xs">Medium</span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">Commercial - add cyber liability</p>
          <div className="text-xs text-success">Potential: $3,200/year</div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  color: string;
}

function MetricCard({ icon, label, value, trend, color }: MetricCardProps) {
  return (
    <div className={`${color} text-white rounded-xl p-5 shadow-lg`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm opacity-90">{label}</span>
        <div className="p-2 bg-white/20 rounded-lg">
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
      <div className="text-2xl mb-1">{value}</div>
      {trend && (
        <div className="text-sm bg-white/20 px-2 py-0.5 rounded inline-block">
          {trend}
        </div>
      )}
    </div>
  );
}


function getMetricsForPersona(persona: PersonaRole): MetricCardProps[] {
  return dashboardService.getMetricsForPersona(persona);
}

function getQuickActionsForPersona(persona: PersonaRole) {
  return dashboardService.getQuickActionsForPersona(persona);
}
