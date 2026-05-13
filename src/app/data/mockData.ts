import { Policy, Claim, AuditEvent, AgentAction } from '../types';

export const mockPolicies: Policy[] = [
  {
    id: 'pol-001',
    policyNumber: 'AUTO-2026-001234',
    productType: 'AUTO',
    status: 'ACTIVE',
    effectiveDate: '2026-01-15',
    expirationDate: '2027-01-15',
    premium: 1245.00,
    policyholder: {
      id: 'party-001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      type: 'PERSON'
    },
    version: 3,
    createdAt: '2026-01-10T10:30:00Z',
    modifiedAt: '2026-03-15T14:22:00Z'
  },
  {
    id: 'pol-002',
    policyNumber: 'HOME-2026-005678',
    productType: 'HOME',
    status: 'ACTIVE',
    effectiveDate: '2026-02-01',
    expirationDate: '2027-02-01',
    premium: 2150.00,
    policyholder: {
      id: 'party-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 987-6543',
      type: 'PERSON'
    },
    version: 1,
    createdAt: '2026-01-28T09:15:00Z',
    modifiedAt: '2026-01-28T09:15:00Z'
  },
  {
    id: 'pol-003',
    policyNumber: 'AUTO-2026-002341',
    productType: 'AUTO',
    status: 'QUOTE',
    effectiveDate: '2026-06-01',
    expirationDate: '2027-06-01',
    premium: 987.50,
    policyholder: {
      id: 'party-003',
      name: 'Michael Chen',
      email: 'mchen@email.com',
      phone: '(555) 456-7890',
      type: 'PERSON'
    },
    version: 1,
    createdAt: '2026-05-05T16:45:00Z',
    modifiedAt: '2026-05-05T16:45:00Z'
  },
  {
    id: 'pol-004',
    policyNumber: 'COMM-2026-000987',
    productType: 'COMMERCIAL',
    status: 'ACTIVE',
    effectiveDate: '2026-03-01',
    expirationDate: '2027-03-01',
    premium: 8750.00,
    policyholder: {
      id: 'party-004',
      name: 'TechStart Inc.',
      email: 'admin@techstart.com',
      phone: '(555) 111-2222',
      type: 'ORGANIZATION'
    },
    version: 2,
    createdAt: '2026-02-20T11:00:00Z',
    modifiedAt: '2026-04-10T13:30:00Z'
  }
];

export const mockClaims: Claim[] = [
  {
    id: 'clm-001',
    claimNumber: 'CLM-2026-123456',
    policyId: 'pol-001',
    type: 'AUTO_COLLISION',
    status: 'INVESTIGATING',
    lossDate: '2026-04-15',
    reportedDate: '2026-04-16',
    reserveAmount: 5000.00,
    paidAmount: 0,
    estimatedAmount: 4200.00,
    claimant: {
      id: 'party-001',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '(555) 123-4567',
      type: 'PERSON'
    },
    adjuster: 'Emily Rodriguez',
    fraudScore: 12,
    version: 5
  },
  {
    id: 'clm-002',
    claimNumber: 'CLM-2026-234567',
    policyId: 'pol-002',
    type: 'PROPERTY_DAMAGE',
    status: 'PAID',
    lossDate: '2026-03-20',
    reportedDate: '2026-03-21',
    reserveAmount: 8500.00,
    paidAmount: 7850.00,
    estimatedAmount: 7850.00,
    claimant: {
      id: 'party-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 987-6543',
      type: 'PERSON'
    },
    adjuster: 'David Park',
    fraudScore: 8,
    version: 12
  },
  {
    id: 'clm-003',
    claimNumber: 'CLM-2026-345678',
    policyId: 'pol-001',
    type: 'LIABILITY',
    status: 'COVERAGE_REVIEW',
    lossDate: '2026-05-01',
    reportedDate: '2026-05-02',
    reserveAmount: 15000.00,
    paidAmount: 0,
    estimatedAmount: 12000.00,
    claimant: {
      id: 'party-005',
      name: 'Robert Williams',
      email: 'r.williams@email.com',
      phone: '(555) 333-4444',
      type: 'PERSON'
    },
    adjuster: 'Emily Rodriguez',
    fraudScore: 67,
    version: 3
  }
];

export const mockAuditEvents: AuditEvent[] = [
  {
    id: 'audit-001',
    timestamp: '2026-05-08T10:30:15Z',
    who: {
      userId: 'user-123',
      userName: 'Emily Rodriguez',
      role: 'Claims Adjuster'
    },
    what: {
      action: 'STATUS_CHANGE',
      resourceType: 'CLAIM',
      resourceId: 'clm-001'
    },
    when: '2026-05-08T10:30:15Z',
    why: 'Additional investigation required based on witness statements',
    how: {
      source: 'WEB_UI'
    },
    previousState: { status: 'ASSIGNED' },
    newState: { status: 'INVESTIGATING' }
  },
  {
    id: 'audit-002',
    timestamp: '2026-05-08T09:15:42Z',
    who: {
      userId: 'agent-fraud-01',
      userName: 'Fraud Detection Agent v2.3',
      role: 'AI Agent'
    },
    what: {
      action: 'FRAUD_SCORE_UPDATE',
      resourceType: 'CLAIM',
      resourceId: 'clm-003'
    },
    when: '2026-05-08T09:15:42Z',
    why: 'Automated fraud analysis detected high-risk patterns',
    how: {
      source: 'AGENT'
    },
    previousState: { fraudScore: 45 },
    newState: { fraudScore: 67 }
  },
  {
    id: 'audit-003',
    timestamp: '2026-05-08T08:45:00Z',
    who: {
      userId: 'user-456',
      userName: 'Marcus Thompson',
      role: 'Underwriter'
    },
    what: {
      action: 'POLICY_ENDORSED',
      resourceType: 'POLICY',
      resourceId: 'pol-001'
    },
    when: '2026-05-08T08:45:00Z',
    why: 'Added additional driver per customer request',
    how: {
      source: 'WEB_UI'
    },
    previousState: { premium: 1145.00, version: 2 },
    newState: { premium: 1245.00, version: 3 }
  },
  {
    id: 'audit-004',
    timestamp: '2026-05-07T16:20:30Z',
    who: {
      userId: 'agent-doc-01',
      userName: 'Document Extraction Agent v1.5',
      role: 'AI Agent'
    },
    what: {
      action: 'DOCUMENT_PROCESSED',
      resourceType: 'CLAIM',
      resourceId: 'clm-001'
    },
    when: '2026-05-07T16:20:30Z',
    why: 'Extracted repair estimate from uploaded PDF',
    how: {
      source: 'AGENT'
    }
  },
  {
    id: 'audit-005',
    timestamp: '2026-05-07T14:10:15Z',
    who: {
      userId: 'user-789',
      userName: 'David Park',
      role: 'Claims Adjuster'
    },
    what: {
      action: 'PAYMENT_ISSUED',
      resourceType: 'CLAIM',
      resourceId: 'clm-002'
    },
    when: '2026-05-07T14:10:15Z',
    why: 'Claim approved and settlement payment processed',
    how: {
      source: 'WEB_UI'
    },
    previousState: { status: 'APPROVED', paidAmount: 0 },
    newState: { status: 'PAID', paidAmount: 7850.00 }
  }
];

export const mockAgentActions: AgentAction[] = [
  {
    id: 'agent-action-001',
    agentName: 'Fraud Detection Agent',
    timestamp: '2026-05-08T09:15:42Z',
    action: 'Analyzed claim for fraud patterns',
    confidence: 0.89,
    output: 'High-risk claim detected: unusual damage pattern, delayed reporting, inconsistent witness statements',
    humanOverride: false
  },
  {
    id: 'agent-action-002',
    agentName: 'Document Extraction Agent',
    timestamp: '2026-05-07T16:20:30Z',
    action: 'Extracted data from repair estimate PDF',
    confidence: 0.95,
    output: 'Successfully extracted: Labor $2,100, Parts $1,850, Total $4,200. Detected vendor: AutoFix Pro',
    humanOverride: false
  },
  {
    id: 'agent-action-003',
    agentName: 'Underwriting Assistant',
    timestamp: '2026-05-05T16:45:00Z',
    action: 'Risk assessment for new quote',
    confidence: 0.82,
    output: 'Recommended premium: $987.50 based on driver age (28), clean record, vehicle type (sedan), zip code risk score',
    humanOverride: true
  },
  {
    id: 'agent-action-004',
    agentName: 'Coverage Gap Analyzer',
    timestamp: '2026-05-02T11:30:00Z',
    action: 'Analyzed policy coverage for claim',
    confidence: 0.78,
    output: 'Liability coverage applies. Potential ambiguity: claim involves commercial use, policy has personal use clause',
    humanOverride: false
  },
  {
    id: 'agent-action-005',
    agentName: 'Subrogation Identification Agent',
    timestamp: '2026-04-16T10:00:00Z',
    action: 'Identified subrogation opportunity',
    confidence: 0.91,
    output: 'Third-party liability detected. Recommend pursuing subrogation against other driver (police report #12345)',
    humanOverride: false
  }
];

// Mock Documents
export const mockDocuments: Record<string, any[]> = {
  'pol-001': [
    {
      id: 'doc-pol-001-01',
      name: 'AUTO-2026-001234_Policy.pdf',
      type: 'POLICY',
      size: 245000,
      uploadedDate: '2026-01-15T10:00:00Z',
      uploadedBy: 'System'
    },
    {
      id: 'doc-pol-001-02',
      name: 'Coverage_Endorsement.pdf',
      type: 'POLICY',
      size: 125000,
      uploadedDate: '2026-03-15T14:22:00Z',
      uploadedBy: 'Marcus Thompson'
    }
  ],
  'pol-002': [
    {
      id: 'doc-pol-002-01',
      name: 'HOME-2026-005678_Policy.pdf',
      type: 'POLICY',
      size: 280000,
      uploadedDate: '2026-02-01T09:00:00Z',
      uploadedBy: 'System'
    }
  ],
  'pol-003': [
    {
      id: 'doc-pol-003-01',
      name: 'AUTO-2026-002341_Quote.pdf',
      type: 'QUOTE',
      size: 156000,
      uploadedDate: '2026-05-05T16:45:00Z',
      uploadedBy: 'Sarah Johnson'
    }
  ],
  'pol-004': [
    {
      id: 'doc-pol-004-01',
      name: 'COMM-2026-000987_Policy.pdf',
      type: 'POLICY',
      size: 520000,
      uploadedDate: '2026-03-01T11:00:00Z',
      uploadedBy: 'System'
    },
    {
      id: 'doc-pol-004-02',
      name: 'Commercial_Amendment_1.pdf',
      type: 'POLICY',
      size: 95000,
      uploadedDate: '2026-04-10T13:30:00Z',
      uploadedBy: 'Marcus Thompson'
    }
  ],
  'clm-001': [
    {
      id: 'doc-clm-001-01',
      name: 'CLM-2026-123456_Initial_Report.pdf',
      type: 'CLAIM_DOCUMENT',
      size: 185000,
      uploadedDate: '2026-04-16T10:30:00Z',
      uploadedBy: 'Emily Rodriguez'
    },
    {
      id: 'doc-clm-001-02',
      name: 'Repair_Estimate.pdf',
      type: 'RECEIPT',
      size: 235000,
      uploadedDate: '2026-04-20T14:15:00Z',
      uploadedBy: 'John Smith'
    },
    {
      id: 'doc-clm-001-03',
      name: 'Police_Report.pdf',
      type: 'EVIDENCE',
      size: 156000,
      uploadedDate: '2026-04-17T09:00:00Z',
      uploadedBy: 'System'
    }
  ],
  'clm-002': [
    {
      id: 'doc-clm-002-01',
      name: 'CLM-2026-234567_Initial_Report.pdf',
      type: 'CLAIM_DOCUMENT',
      size: 202000,
      uploadedDate: '2026-03-21T11:00:00Z',
      uploadedBy: 'David Park'
    },
    {
      id: 'doc-clm-002-02',
      name: 'Settlement_Agreement.pdf',
      type: 'REPORT',
      size: 167000,
      uploadedDate: '2026-05-06T16:45:00Z',
      uploadedBy: 'David Park'
    }
  ],
  'clm-003': [
    {
      id: 'doc-clm-003-01',
      name: 'CLM-2026-345678_Initial_Report.pdf',
      type: 'CLAIM_DOCUMENT',
      size: 210000,
      uploadedDate: '2026-05-02T09:30:00Z',
      uploadedBy: 'Emily Rodriguez'
    },
    {
      id: 'doc-clm-003-02',
      name: 'Liability_Analysis.pdf',
      type: 'REPORT',
      size: 312000,
      uploadedDate: '2026-05-05T13:20:00Z',
      uploadedBy: 'Emily Rodriguez'
    },
    {
      id: 'doc-clm-003-03',
      name: 'Witness_Statement.pdf',
      type: 'EVIDENCE',
      size: 98000,
      uploadedDate: '2026-05-03T10:00:00Z',
      uploadedBy: 'System'
    }
  ]
};
