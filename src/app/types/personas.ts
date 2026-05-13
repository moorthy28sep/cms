export type PersonaRole =
  | 'policyholder'
  | 'agent'
  | 'underwriter'
  | 'claims_adjuster'
  | 'executive'
  | 'fraud_analyst';

export interface Persona {
  id: string;
  role: PersonaRole;
  name: string;
  avatar: string;
  department?: string;
  permissions: string[];
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    dashboardLayout: string;
  };
}

export const PERSONAS: Record<PersonaRole, Persona> = {
  policyholder: {
    id: 'ph-001',
    role: 'policyholder',
    name: 'John Smith',
    avatar: '👤',
    permissions: ['view_own_policies', 'submit_claims', 'make_payments', 'view_documents'],
    preferences: {
      theme: 'light',
      notifications: true,
      dashboardLayout: 'simple'
    }
  },
  agent: {
    id: 'ag-001',
    role: 'agent',
    name: 'Sarah Johnson',
    avatar: '👔',
    department: 'Sales',
    permissions: ['create_quotes', 'bind_policies', 'view_commissions', 'manage_clients'],
    preferences: {
      theme: 'light',
      notifications: true,
      dashboardLayout: 'sales'
    }
  },
  underwriter: {
    id: 'uw-001',
    role: 'underwriter',
    name: 'Marcus Thompson',
    avatar: '📊',
    department: 'Underwriting',
    permissions: ['review_applications', 'approve_policies', 'set_premiums', 'view_risk_scores'],
    preferences: {
      theme: 'light',
      notifications: true,
      dashboardLayout: 'analytical'
    }
  },
  claims_adjuster: {
    id: 'ca-001',
    role: 'claims_adjuster',
    name: 'Emily Rodriguez',
    avatar: '🔍',
    department: 'Claims',
    permissions: ['review_claims', 'approve_payments', 'assign_investigators', 'close_claims'],
    preferences: {
      theme: 'light',
      notifications: true,
      dashboardLayout: 'workflow'
    }
  },
  executive: {
    id: 'ex-001',
    role: 'executive',
    name: 'Robert Chen',
    avatar: '💼',
    department: 'Executive',
    permissions: ['view_all', 'view_analytics', 'view_financials', 'approve_major_decisions'],
    preferences: {
      theme: 'light',
      notifications: false,
      dashboardLayout: 'executive'
    }
  },
  fraud_analyst: {
    id: 'fa-001',
    role: 'fraud_analyst',
    name: 'Lisa Martinez',
    avatar: '🛡️',
    department: 'Fraud Prevention',
    permissions: ['review_fraud_alerts', 'investigate_claims', 'flag_accounts', 'view_patterns'],
    preferences: {
      theme: 'dark',
      notifications: true,
      dashboardLayout: 'investigation'
    }
  }
};

export interface PersonaTask {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
  status: 'pending' | 'in_progress' | 'completed';
  assignedTo: string;
  relatedEntity?: {
    type: 'policy' | 'claim';
    id: string;
  };
}

export interface PersonaNotification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
