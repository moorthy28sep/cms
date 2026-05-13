import type { PersonaTask, PersonaNotification } from '../types/personas';

export const policyholderTasks: PersonaTask[] = [
  {
    id: 'task-ph-001',
    title: 'Review Renewal Offer',
    description: 'Your auto policy renews in 30 days. Review the renewal terms.',
    priority: 'high',
    dueDate: '2026-06-10',
    status: 'pending',
    assignedTo: 'ph-001',
    relatedEntity: { type: 'policy', id: 'pol-001' }
  },
  {
    id: 'task-ph-002',
    title: 'Upload Repair Receipt',
    description: 'Submit final repair invoice for claim CLM-2026-123456',
    priority: 'medium',
    dueDate: '2026-05-15',
    status: 'in_progress',
    assignedTo: 'ph-001',
    relatedEntity: { type: 'claim', id: 'clm-001' }
  }
];

export const agentTasks: PersonaTask[] = [
  {
    id: 'task-ag-001',
    title: 'Follow up: Michael Chen Quote',
    description: 'Auto quote expires in 5 days. Contact customer.',
    priority: 'high',
    dueDate: '2026-05-12',
    status: 'pending',
    assignedTo: 'ag-001',
    relatedEntity: { type: 'policy', id: 'pol-003' }
  },
  {
    id: 'task-ag-002',
    title: 'Annual Review: TechStart Inc.',
    description: 'Schedule annual policy review meeting',
    priority: 'medium',
    dueDate: '2026-05-20',
    status: 'pending',
    assignedTo: 'ag-001',
    relatedEntity: { type: 'policy', id: 'pol-004' }
  },
  {
    id: 'task-ag-003',
    title: 'Cross-sell Opportunity',
    description: 'Sarah Johnson has auto - recommend home bundling',
    priority: 'low',
    status: 'pending',
    assignedTo: 'ag-001'
  }
];

export const underwriterTasks: PersonaTask[] = [
  {
    id: 'task-uw-001',
    title: 'Review High-Risk Application',
    description: 'Commercial policy application requires manual underwriting',
    priority: 'high',
    dueDate: '2026-05-11',
    status: 'in_progress',
    assignedTo: 'uw-001'
  },
  {
    id: 'task-uw-002',
    title: 'AI Override Review',
    description: 'Underwriting AI flagged application - review recommendation',
    priority: 'medium',
    dueDate: '2026-05-13',
    status: 'pending',
    assignedTo: 'uw-001'
  },
  {
    id: 'task-uw-003',
    title: 'Rate Table Update',
    description: 'Q2 rate adjustments effective June 1',
    priority: 'high',
    dueDate: '2026-05-25',
    status: 'pending',
    assignedTo: 'uw-001'
  }
];

export const adjusterTasks: PersonaTask[] = [
  {
    id: 'task-ca-001',
    title: 'High-Value Claim Review',
    description: 'Liability claim $15K - coverage analysis needed',
    priority: 'high',
    dueDate: '2026-05-12',
    status: 'in_progress',
    assignedTo: 'ca-001',
    relatedEntity: { type: 'claim', id: 'clm-003' }
  },
  {
    id: 'task-ca-002',
    title: 'Fraud Alert Investigation',
    description: 'AI flagged claim with 67% fraud score - investigate',
    priority: 'high',
    dueDate: '2026-05-11',
    status: 'pending',
    assignedTo: 'ca-001',
    relatedEntity: { type: 'claim', id: 'clm-003' }
  },
  {
    id: 'task-ca-003',
    title: 'Finalize Settlement',
    description: 'Approve final payment for CLM-2026-123456',
    priority: 'medium',
    dueDate: '2026-05-14',
    status: 'pending',
    assignedTo: 'ca-001',
    relatedEntity: { type: 'claim', id: 'clm-001' }
  }
];

export const executiveTasks: PersonaTask[] = [
  {
    id: 'task-ex-001',
    title: 'Q2 Board Report',
    description: 'Prepare quarterly performance presentation',
    priority: 'high',
    dueDate: '2026-06-01',
    status: 'in_progress',
    assignedTo: 'ex-001'
  },
  {
    id: 'task-ex-002',
    title: 'AI Strategy Review',
    description: 'Evaluate agent performance metrics and ROI',
    priority: 'medium',
    dueDate: '2026-05-20',
    status: 'pending',
    assignedTo: 'ex-001'
  }
];

export const fraudAnalystTasks: PersonaTask[] = [
  {
    id: 'task-fa-001',
    title: 'Pattern Analysis: Auto Collision',
    description: '3 similar claims from same repair shop - investigate',
    priority: 'high',
    dueDate: '2026-05-13',
    status: 'in_progress',
    assignedTo: 'fa-001'
  },
  {
    id: 'task-fa-002',
    title: 'SIU Referral Review',
    description: 'Special Investigation Unit case escalation',
    priority: 'high',
    dueDate: '2026-05-12',
    status: 'pending',
    assignedTo: 'fa-001',
    relatedEntity: { type: 'claim', id: 'clm-003' }
  },
  {
    id: 'task-fa-003',
    title: 'Monthly Fraud Report',
    description: 'Compile fraud detection statistics for management',
    priority: 'medium',
    dueDate: '2026-05-31',
    status: 'pending',
    assignedTo: 'fa-001'
  }
];

export const policyholderNotifications: PersonaNotification[] = [
  {
    id: 'notif-ph-001',
    type: 'info',
    title: 'Policy Renewal Notice',
    message: 'Your auto policy renews on June 10, 2026. Review your renewal offer.',
    timestamp: '2026-05-08T09:00:00Z',
    read: false,
    actionUrl: '/policies/pol-001'
  },
  {
    id: 'notif-ph-002',
    type: 'success',
    title: 'Claim Update',
    message: 'Your claim has been approved. Payment will be processed in 2-3 business days.',
    timestamp: '2026-05-07T14:30:00Z',
    read: false,
    actionUrl: '/claims/clm-001'
  },
  {
    id: 'notif-ph-003',
    type: 'warning',
    title: 'Payment Due Soon',
    message: 'Your premium payment of $103.75 is due on May 15, 2026.',
    timestamp: '2026-05-06T10:00:00Z',
    read: true
  }
];

export const agentNotifications: PersonaNotification[] = [
  {
    id: 'notif-ag-001',
    type: 'warning',
    title: 'Quote Expiring',
    message: 'Michael Chen quote expires in 5 days - follow up recommended',
    timestamp: '2026-05-08T08:00:00Z',
    read: false
  },
  {
    id: 'notif-ag-002',
    type: 'success',
    title: 'Policy Bound',
    message: 'Congratulations! Policy AUTO-2026-002341 has been bound.',
    timestamp: '2026-05-07T16:45:00Z',
    read: false
  },
  {
    id: 'notif-ag-003',
    type: 'info',
    title: 'Commission Statement',
    message: 'Your April commission statement is now available.',
    timestamp: '2026-05-01T09:00:00Z',
    read: true
  }
];

export const underwriterNotifications: PersonaNotification[] = [
  {
    id: 'notif-uw-001',
    type: 'warning',
    title: 'Manual Review Required',
    message: 'Commercial application exceeds auto-approval limits',
    timestamp: '2026-05-08T11:30:00Z',
    read: false
  },
  {
    id: 'notif-uw-002',
    type: 'info',
    title: 'AI Override Alert',
    message: 'Underwriting AI recommendation requires human review',
    timestamp: '2026-05-08T09:15:00Z',
    read: false
  }
];

export const adjusterNotifications: PersonaNotification[] = [
  {
    id: 'notif-ca-001',
    type: 'error',
    title: 'High Fraud Score Alert',
    message: 'Claim CLM-2026-345678 flagged with 67% fraud score - immediate review required',
    timestamp: '2026-05-08T09:15:00Z',
    read: false,
    actionUrl: '/claims/clm-003'
  },
  {
    id: 'notif-ca-002',
    type: 'warning',
    title: 'SLA Approaching',
    message: 'Claim CLM-2026-123456 approaching 10-day SLA deadline',
    timestamp: '2026-05-08T08:00:00Z',
    read: false
  },
  {
    id: 'notif-ca-003',
    type: 'success',
    title: 'Payment Approved',
    message: 'Settlement payment of $7,850 has been processed',
    timestamp: '2026-05-07T14:10:00Z',
    read: true
  }
];

export const executiveNotifications: PersonaNotification[] = [
  {
    id: 'notif-ex-001',
    type: 'info',
    title: 'Weekly KPI Report',
    message: 'Claims ratio improved by 3% week-over-week',
    timestamp: '2026-05-08T06:00:00Z',
    read: false
  },
  {
    id: 'notif-ex-002',
    type: 'success',
    title: 'AI Performance Update',
    message: 'Fraud detection agent achieved 89% accuracy this quarter',
    timestamp: '2026-05-06T10:00:00Z',
    read: true
  }
];

export const fraudAnalystNotifications: PersonaNotification[] = [
  {
    id: 'notif-fa-001',
    type: 'error',
    title: 'Critical Fraud Alert',
    message: 'Pattern detected: 3 claims from same repair shop in 2 weeks',
    timestamp: '2026-05-08T10:45:00Z',
    read: false
  },
  {
    id: 'notif-fa-002',
    type: 'warning',
    title: 'SIU Escalation',
    message: 'High-value claim requires Special Investigation Unit review',
    timestamp: '2026-05-08T09:30:00Z',
    read: false
  },
  {
    id: 'notif-fa-003',
    type: 'info',
    title: 'Network Analysis Complete',
    message: 'Claimant network graph identified 5 connected entities',
    timestamp: '2026-05-07T15:20:00Z',
    read: true
  }
];
