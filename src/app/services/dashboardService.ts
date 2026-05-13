import type { PersonaRole, PersonaTask, PersonaNotification } from '../types/personas';
import { mockPolicies, mockClaims } from '../data/mockData';
import {
  policyholderTasks,
  agentTasks,
  underwriterTasks,
  adjusterTasks,
  executiveTasks,
  fraudAnalystTasks,
  policyholderNotifications,
  agentNotifications,
  underwriterNotifications,
  adjusterNotifications,
  executiveNotifications,
  fraudAnalystNotifications
} from '../data/personaData';

export interface MetricData {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  trend?: string;
  color: string;
}

export interface DashboardData {
  metrics: MetricData[];
  tasks: PersonaTask[];
  notifications: PersonaNotification[];
}

class DashboardService {
  private metricsCache: Map<PersonaRole, MetricData[]> = new Map();
  private lastUpdateTime: number = 0;
  private cacheDuration: number = 30000; // 30 seconds

  /**
   * Get computed metrics based on actual data and persona
   * Metrics are derived from mockData to stay in sync with dashboard state
   */
  getMetricsForPersona(persona: PersonaRole, forceRefresh = false): MetricData[] {
    const now = Date.now();
    const cached = this.metricsCache.get(persona);

    // Return cached if available and not expired (unless force refresh)
    if (cached && !forceRefresh && now - this.lastUpdateTime < this.cacheDuration) {
      return cached;
    }

    const metrics = this.computeMetrics(persona);
    this.metricsCache.set(persona, metrics);
    this.lastUpdateTime = now;
    return metrics;
  }

  /**
   * Compute metrics from actual data based on persona type
   * This ensures metrics always match the underlying data
   */
  private computeMetrics(persona: PersonaRole): MetricData[] {
    // Dynamic metrics from actual data
    const activePolicies = mockPolicies.filter(p => p.status === 'ACTIVE').length;
    const totalPolicies = mockPolicies.length;
    const openClaims = mockClaims.filter(c => !['PAID', 'CLOSED'].includes(c.status)).length;
    const totalClaims = mockClaims.length;
    const totalReserves = mockClaims.reduce((sum, c) => sum + c.reserveAmount, 0);
    const totalPaid = mockClaims.reduce((sum, c) => sum + c.paidAmount, 0);
    const highRiskClaims = mockClaims.filter(c => (c.fraudScore || 0) > 60).length;
    const quotePolicies = mockPolicies.filter(p => p.status === 'QUOTE').length;

    // Task counts for each persona
    const policyholderPendingTasks = policyholderTasks.filter(t => t.status !== 'completed').length;
    const agentPendingTasks = agentTasks.filter(t => t.status === 'pending').length;
    const underwriterPendingTasks = underwriterTasks.filter(t => t.status === 'pending').length;
    const adjusterPendingTasks = adjusterTasks.filter(t => t.status === 'pending').length;
    const executivePendingTasks = executiveTasks.filter(t => t.status === 'pending').length;
    const fraudAnalystPendingTasks = fraudAnalystTasks.filter(t => t.status === 'pending').length;

    const metricsMap: Record<PersonaRole, MetricData[]> = {
      policyholder: [
        {
          icon: '📄',
          label: 'Active Policies',
          value: activePolicies,
          color: 'bg-gradient-to-br from-primary to-primary/80'
        },
        {
          icon: '⚠️',
          label: 'Open Claims',
          value: openClaims,
          color: 'bg-gradient-to-br from-chart-2 to-chart-2/80'
        },
        {
          icon: '📋',
          label: 'Pending Tasks',
          value: policyholderPendingTasks,
          color: 'bg-gradient-to-br from-chart-5 to-chart-5/80'
        },
        {
          icon: '💵',
          label: 'Next Payment',
          value: '$103.75',
          color: 'bg-gradient-to-br from-chart-4 to-chart-4/80'
        }
      ],
      agent: [
        {
          icon: '👥',
          label: 'Active Quotes',
          value: quotePolicies,
          color: 'bg-gradient-to-br from-primary to-primary/80'
        },
        {
          icon: '📄',
          label: 'Active Policies',
          value: activePolicies,
          color: 'bg-gradient-to-br from-chart-2 to-chart-2/80'
        },
        {
          icon: '📋',
          label: 'Pending Tasks',
          value: agentPendingTasks,
          color: 'bg-gradient-to-br from-warning to-warning/80'
        },
        {
          icon: '📈',
          label: 'Close Rate',
          value: '68%',
          trend: '+5%',
          color: 'bg-gradient-to-br from-chart-5 to-chart-5/80'
        }
      ],
      underwriter: [
        {
          icon: '📋',
          label: 'Pending Reviews',
          value: underwriterPendingTasks,
          color: 'bg-gradient-to-br from-primary to-primary/80'
        },
        {
          icon: '✅',
          label: 'Total Policies',
          value: activePolicies,
          color: 'bg-gradient-to-br from-success to-success/80'
        },
        {
          icon: '⚠️',
          label: 'High Risk Claims',
          value: highRiskClaims,
          color: 'bg-gradient-to-br from-destructive to-destructive/80'
        },
        {
          icon: '⏱️',
          label: 'Avg Processing Time',
          value: '1.2h',
          trend: '-15%',
          color: 'bg-gradient-to-br from-chart-3 to-chart-3/80'
        }
      ],
      claims_adjuster: [
        {
          icon: '⚠️',
          label: 'Open Claims',
          value: openClaims,
          color: 'bg-gradient-to-br from-primary to-primary/80'
        },
        {
          icon: '📋',
          label: 'Pending Tasks',
          value: adjusterPendingTasks,
          color: 'bg-gradient-to-br from-warning to-warning/80'
        },
        {
          icon: '🚨',
          label: 'High Risk Claims',
          value: highRiskClaims,
          color: 'bg-gradient-to-br from-destructive to-destructive/80'
        },
        {
          icon: '📅',
          label: 'Avg Cycle Time',
          value: '8.5d',
          trend: '-12%',
          color: 'bg-gradient-to-br from-success to-success/80'
        }
      ],
      executive: [
        {
          icon: '💵',
          label: 'Monthly Premium',
          value: `$${(mockPolicies.reduce((sum, p) => sum + p.premium, 0) / 1000).toFixed(0)}K`,
          trend: '+12%',
          color: 'bg-gradient-to-br from-primary to-primary/80'
        },
        {
          icon: '📈',
          label: 'Combined Ratio',
          value: '65%',
          trend: '-5%',
          color: 'bg-gradient-to-br from-success to-success/80'
        },
        {
          icon: '📊',
          label: 'Total Policies',
          value: totalPolicies,
          trend: '+8%',
          color: 'bg-gradient-to-br from-chart-3 to-chart-3/80'
        },
        {
          icon: '🤖',
          label: 'AI Accuracy',
          value: '89%',
          trend: '+8%',
          color: 'bg-gradient-to-br from-chart-5 to-chart-5/80'
        }
      ],
      fraud_analyst: [
        {
          icon: '🚨',
          label: 'Active Investigations',
          value: fraudAnalystPendingTasks,
          color: 'bg-gradient-to-br from-destructive to-destructive/80'
        },
        {
          icon: '📈',
          label: 'Detection Rate',
          value: '89%',
          trend: '+15%',
          color: 'bg-gradient-to-br from-success to-success/80'
        },
        {
          icon: '💰',
          label: 'Fraud Prevented MTD',
          value: '$47K',
          color: 'bg-gradient-to-br from-chart-4 to-chart-4/80'
        },
        {
          icon: '⚠️',
          label: 'High Risk Claims',
          value: highRiskClaims,
          trend: '+3',
          color: 'bg-gradient-to-br from-warning to-warning/80'
        }
      ]
    };

    return metricsMap[persona] || [];
  }

  /**
   * Get persona-specific tasks from personaData
   * Tasks are kept static but can be filtered/prioritized
   */
  getTasksForPersona(persona: PersonaRole): PersonaTask[] {
    const taskMap: Record<PersonaRole, PersonaTask[]> = {
      policyholder: policyholderTasks,
      agent: agentTasks,
      underwriter: underwriterTasks,
      claims_adjuster: adjusterTasks,
      executive: executiveTasks,
      fraud_analyst: fraudAnalystTasks
    };
    return taskMap[persona] || [];
  }

  /**
   * Get persona-specific notifications from personaData
   */
  getNotificationsForPersona(persona: PersonaRole): PersonaNotification[] {
    const notifMap: Record<PersonaRole, PersonaNotification[]> = {
      policyholder: policyholderNotifications,
      agent: agentNotifications,
      underwriter: underwriterNotifications,
      claims_adjuster: adjusterNotifications,
      executive: executiveNotifications,
      fraud_analyst: fraudAnalystNotifications
    };
    return notifMap[persona] || [];
  }

  /**
   * Get all dashboard data for a persona in one call
   * Ensures consistency across metrics, tasks, and notifications
   */
  getDashboardData(persona: PersonaRole, forceRefresh = false): DashboardData {
    return {
      metrics: this.getMetricsForPersona(persona, forceRefresh),
      tasks: this.getTasksForPersona(persona),
      notifications: this.getNotificationsForPersona(persona)
    };
  }

  /**
   * Invalidate cache when data changes
   * Call this when policies or claims are updated
   */
  invalidateCache(persona?: PersonaRole): void {
    if (persona) {
      this.metricsCache.delete(persona);
    } else {
      this.metricsCache.clear();
    }
    this.lastUpdateTime = 0;
  }

  /**
   * Get quick actions for a persona
   */
  getQuickActionsForPersona(persona: PersonaRole): { icon: string; label: string }[] {
    const actionsMap: Record<PersonaRole, { icon: string; label: string }[]> = {
      policyholder: [
        { icon: '📄', label: 'View My Policies' },
        { icon: '🚗', label: 'Report a Claim' },
        { icon: '💳', label: 'Make a Payment' },
        { icon: '📞', label: 'Contact My Agent' }
      ],
      agent: [
        { icon: '💬', label: 'Generate Quote' },
        { icon: '📋', label: 'New Application' },
        { icon: '📊', label: 'My Commissions' },
        { icon: '👥', label: 'My Clients' }
      ],
      underwriter: [
        { icon: '📋', label: 'Review Applications' },
        { icon: '⚙️', label: 'Manage Rate Tables' },
        { icon: '📊', label: 'Analytics' },
        { icon: '✅', label: 'Approve Policy' }
      ],
      claims_adjuster: [
        { icon: '📂', label: 'Open Claims' },
        { icon: '📸', label: 'Upload Evidence' },
        { icon: '💰', label: 'Reserve Analysis' },
        { icon: '🚨', label: 'Fraud Check' }
      ],
      executive: [
        { icon: '📊', label: 'View Reports' },
        { icon: '📈', label: 'Analytics Dashboard' },
        { icon: '🎯', label: 'Set KPIs' },
        { icon: '🤝', label: 'Stakeholder View' }
      ],
      fraud_analyst: [
        { icon: '🔍', label: 'Start Investigation' },
        { icon: '📊', label: 'Pattern Analysis' },
        { icon: '⚠️', label: 'Risk Assessment' },
        { icon: '📝', label: 'Create Report' }
      ]
    };

    return actionsMap[persona] || [];
  }
}

// Export singleton instance
export const dashboardService = new DashboardService();
