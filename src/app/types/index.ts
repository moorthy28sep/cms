export type PolicyStatus = 'QUOTE' | 'BOUND' | 'ACTIVE' | 'ENDORSED' | 'RENEWED' | 'CANCELLED' | 'EXPIRED';
export type ClaimStatus = 'FNOL' | 'ASSIGNED' | 'INVESTIGATING' | 'COVERAGE_REVIEW' | 'APPROVED' | 'SETTLING' | 'PAID' | 'CLOSED';
export type ProductType = 'AUTO' | 'HOME' | 'LIFE' | 'COMMERCIAL';
export type ClaimType = 'AUTO_COLLISION' | 'PROPERTY_DAMAGE' | 'LIABILITY' | 'INJURY';

export interface Party {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'PERSON' | 'ORGANIZATION';
}

export interface AuditMetadata {
  who: {
    userId: string;
    userName: string;
    role: string;
  };
  what: {
    action: string;
    resourceType: string;
    resourceId: string;
  };
  when: string;
  why?: string;
  how: {
    source: 'WEB_UI' | 'API' | 'BATCH' | 'AGENT';
  };
}

export interface Policy {
  id: string;
  policyNumber: string;
  productType: ProductType;
  status: PolicyStatus;
  effectiveDate: string;
  expirationDate: string;
  premium: number;
  policyholder: Party;
  version: number;
  createdAt: string;
  modifiedAt: string;
}

export interface Claim {
  id: string;
  claimNumber: string;
  policyId: string;
  type: ClaimType;
  status: ClaimStatus;
  lossDate: string;
  reportedDate: string;
  reserveAmount: number;
  paidAmount: number;
  estimatedAmount: number;
  claimant: Party;
  adjuster?: string;
  fraudScore?: number;
  version: number;
}

export interface AuditEvent extends AuditMetadata {
  id: string;
  timestamp: string;
  previousState?: any;
  newState?: any;
}

export interface AgentAction {
  id: string;
  agentName: string;
  timestamp: string;
  action: string;
  confidence: number;
  output: string;
  humanOverride: boolean;
}
