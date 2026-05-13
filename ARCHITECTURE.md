# Insurance Policy Administration System (PAS) & Claims Management System (CMS)
## Production-Grade Architecture Design

**Last Updated:** May 8, 2026  
**Version:** 1.0  
**Classification:** System of Record with Full Audit Trail

---

## Executive Summary

This document outlines a modern, cloud-native insurance platform designed as a system of record with comprehensive audit trails, event-driven architecture, and strategic agentic AI integration.

**Core Principles:**
- **Immutability First:** All state transitions are append-only with full lineage
- **Event-Driven:** Asynchronous event backbone for scalability and decoupling
- **Audit Everything:** WHO, WHAT, WHEN, WHY for every action
- **Agent-Augmented:** AI agents for automation with human oversight controls
- **API-First:** REST for synchronous reads/writes, Events for async workflows

---

## 1. Core Domain Models

### 1.1 Policy Lifecycle

**States:** `QUOTE → BOUND → ACTIVE → ENDORSED → RENEWED → CANCELLED → EXPIRED`

```
Policy {
  id: UUID
  policyNumber: string
  productType: enum[AUTO, HOME, LIFE, COMMERCIAL]
  status: PolicyStatus
  effectiveDate: timestamp
  expirationDate: timestamp
  premium: Money
  
  // Relationships
  policyholder: Party
  insuredParties: Party[]
  coverages: Coverage[]
  endorsements: Endorsement[]
  
  // Audit
  version: int
  createdAt: timestamp
  createdBy: User
  modifiedAt: timestamp
  modifiedBy: User
}

PolicyEvent {
  id: UUID
  policyId: UUID
  eventType: enum[QUOTED, BOUND, ENDORSED, RENEWED, CANCELLED]
  timestamp: timestamp
  actor: User | System | Agent
  payload: JSON
  previousState: JSON
  newState: JSON
  reason: string
  metadata: {
    ipAddress: string
    userAgent: string
    correlationId: UUID
  }
}
```

**Key Workflows:**
- **Quote-to-Bind:** Quote generation → underwriting review → pricing → binding
- **Endorsement:** Mid-term change → recalculation → endorsement issuance
- **Renewal:** 60-day notice → renewal offer → acceptance → new policy term
- **Cancellation:** Request → validation → pro-rata refund calculation → closure

### 1.2 Claims Lifecycle

**States:** `FNOL → ASSIGNED → INVESTIGATING → COVERAGE_REVIEW → APPROVED → SETTLING → PAID → CLOSED`

```
Claim {
  id: UUID
  claimNumber: string
  policyId: UUID
  type: enum[AUTO_COLLISION, PROPERTY_DAMAGE, LIABILITY, INJURY]
  status: ClaimStatus
  lossDate: timestamp
  reportedDate: timestamp
  
  // Financial
  reserveAmount: Money
  paidAmount: Money
  estimatedAmount: Money
  
  // Assignments
  adjuster: User
  investigator: User | null
  
  // Relationships
  claimant: Party
  documents: Document[]
  notes: Note[]
  payments: Payment[]
  
  // Audit
  version: int
  events: ClaimEvent[]
}

ClaimEvent {
  id: UUID
  claimId: UUID
  eventType: enum[FNOL, STATUS_CHANGE, RESERVE_UPDATE, PAYMENT, NOTE_ADDED]
  timestamp: timestamp
  actor: User | Agent
  payload: JSON
  automationLevel: enum[MANUAL, SUGGESTED, AUTOMATED]
}
```

**Key Workflows:**
- **FNOL (First Notice of Loss):** Intake → triage → assignment → SLA tracking
- **Investigation:** Evidence gathering → fraud detection → liability determination
- **Adjudication:** Coverage analysis → reserve setting → approval workflow
- **Settlement:** Negotiation → payment processing → subrogation identification
- **Closure:** Final payment → file documentation → closure with reason

### 1.3 Shared Entities

**Party:**
```
Party {
  id: UUID
  type: enum[PERSON, ORGANIZATION]
  name: string
  dateOfBirth: date | null
  taxId: string (encrypted)
  addresses: Address[]
  contacts: ContactInfo[]
  roles: PartyRole[] // POLICYHOLDER, DRIVER, CLAIMANT, AGENT
  
  // External IDs
  lexisNexisId: string | null
  dmvRecord: string | null
  
  // Audit
  createdAt: timestamp
  updatedAt: timestamp
  dataChangeLog: ChangeEvent[]
}
```

**Document:**
```
Document {
  id: UUID
  entityType: enum[POLICY, CLAIM, PARTY]
  entityId: UUID
  documentType: enum[CONTRACT, PHOTO, MEDICAL_RECORD, ESTIMATE]
  storageUri: string (S3/Azure Blob)
  uploadedAt: timestamp
  uploadedBy: User
  
  // AI Extraction
  extractedData: JSON | null
  extractionConfidence: float
  extractionAgent: string | null
  humanVerified: boolean
}
```

**Payment:**
```
Payment {
  id: UUID
  type: enum[PREMIUM, CLAIM, REFUND]
  amount: Money
  method: enum[ACH, CHECK, CARD, WIRE]
  status: enum[PENDING, PROCESSED, FAILED, REVERSED]
  
  // Rails Integration
  externalReferenceId: string
  processedAt: timestamp
  
  // Audit
  initiatedBy: User | System
  approvedBy: User | null
  auditTrail: PaymentEvent[]
}
```

---

## 2. Audit & Immutability Strategy

### 2.1 Recommended Approach: **Hybrid Event Sourcing + CDC**

**Decision Matrix:**

| Approach | Pros | Cons | Use Case |
|----------|------|------|----------|
| **Pure Event Sourcing** | Complete audit trail, temporal queries | Complex reads, performance overhead | Claims (complex state machines) |
| **Append-Only Logs** | Simple, fast writes | No automatic rebuild | Audit logs, activity streams |
| **CDC (Change Data Capture)** | Existing DB compatibility, tooling | Not immutable at source | Policies (frequent reads) |
| **Hybrid** | Best of both worlds | More complexity | Recommended |

**Implementation:**

```
Policy Domain: CDC + Audit Log
- Write-optimized DB (PostgreSQL) with triggers
- Debezium CDC → Kafka → Audit Store (S3 Parquet)
- Point-in-time reconstruction for audits

Claim Domain: Event Sourcing
- Event Store (EventStoreDB or Kafka with compaction)
- Projections for read models
- Snapshots every 50 events

Shared Events Backbone: Kafka
- Topic: insurance.policy.events
- Topic: insurance.claim.events  
- Topic: insurance.payment.events
- Topic: insurance.agent.actions
- Retention: 90 days (compliance-driven)
```

### 2.2 Audit Trail Requirements

**Every record must capture:**
```
AuditMetadata {
  who: {
    userId: UUID
    userName: string
    role: string
    sessionId: UUID
  }
  what: {
    action: string
    resourceType: string
    resourceId: UUID
    changeSet: {
      before: JSON
      after: JSON
      diff: JSONPatch
    }
  }
  when: {
    timestamp: ISO8601
    timezone: string
  }
  why: {
    reason: string (required for sensitive actions)
    ticketNumber: string | null
    approvalChain: User[] | null
  }
  how: {
    source: enum[WEB_UI, API, BATCH, AGENT]
    ipAddress: string
    userAgent: string
  }
  context: {
    correlationId: UUID
    causationId: UUID | null
    spanId: string (distributed tracing)
  }
}
```

**Compliance:**
- **SOC 2 Type II:** Tamper-proof audit logs (write to immutable storage)
- **GDPR/CCPA:** Right to deletion (tombstone records, not physical deletion)
- **State Insurance Regulations:** 7-year retention minimum

---

## 3. Agentic Processes

### 3.1 AI Agent Taxonomy

**Autonomous Agents (No Human in Loop):**
1. **Document Extraction Agent**
   - Input: Uploaded PDF/images
   - Process: OCR → NLP extraction → schema mapping
   - Output: Structured data + confidence scores
   - Trigger: On document upload
   - Tech: AWS Textract + Custom LLM (Claude/GPT-4)

2. **Fraud Detection Agent**
   - Input: Claim submission data
   - Process: Anomaly detection, cross-reference historical patterns
   - Output: Fraud risk score (0-100)
   - Action: Flag high-risk (>80) for manual review
   - Tech: Scikit-learn + Graph DB for network analysis

3. **Subrogation Identification Agent**
   - Input: Claim details
   - Process: Liability analysis, third-party detection
   - Output: Subrogation opportunity score
   - Action: Create subrogation case if score >70
   - Tech: Rule engine + ML classifier

**Human-in-the-Loop Agents:**
1. **Underwriting Assistant**
   - Input: Quote application
   - Process: Risk assessment, pricing recommendation
   - Output: Suggested premium + risk factors
   - Human Action: Underwriter reviews and overrides if needed
   - Tech: XGBoost models + explainability (SHAP)

2. **Coverage Gap Analyzer**
   - Input: Policy details + claim
   - Process: Coverage clause analysis
   - Output: Coverage determination + ambiguity flags
   - Human Action: Claims examiner resolves ambiguities
   - Tech: Legal NLP (specialized LLM fine-tuned on policy language)

3. **Settlement Negotiator**
   - Input: Claim value, claimant communications
   - Process: Generate settlement offer range
   - Output: Recommended offer + negotiation talking points
   - Human Action: Adjuster conducts negotiation
   - Tech: Reinforcement learning trained on past settlements

**Deterministic Workflow Engines:**
- **Premium Calculation:** Rule-based (Drools/DMN)
- **SLA Monitoring:** Temporal.io workflows
- **Renewal Processing:** Batch jobs (Spring Batch/Airflow)

### 3.2 Agent Governance

```
AgentAction {
  id: UUID
  agentName: string
  version: string (model version tracking)
  trigger: Event
  input: JSON
  output: JSON
  confidence: float
  executionTime: int (ms)
  humanOverride: {
    overridden: boolean
    overriddenBy: User | null
    reason: string | null
  }
  
  // Explainability
  reasoning: string
  features: {name: string, importance: float}[]
  
  // Audit
  timestamp: timestamp
  correlationId: UUID
}
```

**Human Override Protocol:**
- All agent decisions stored with confidence scores
- Low confidence (<70%) auto-routed to human queue
- Humans can override with required reason
- Override patterns fed back into model retraining

---

## 4. System Architecture

### 4.1 Service Decomposition: **Modular Monolith → Microservices**

**Phase 1 (MVP):** Modular Monolith
```
InsuranceCore (Single Deployment)
├── Policy Module
├── Claims Module
├── Parties Module
├── Payments Module
├── Documents Module
├── Audit Module
└── Agents Module

Benefits:
- Faster initial delivery
- Simpler deployment
- Easier transactions
- Lower operational overhead

Technology: Spring Boot (Java) or NestJS (TypeScript)
Database: PostgreSQL (single DB, schema-per-module)
```

**Phase 2 (Scale):** Selective Microservices
```
Extract high-change/high-load modules:
- Claims Service (most complex workflows)
- Document Service (large file handling)
- Agent Orchestration Service

Keep as modular monolith:
- Policy Service (stable domain)
- Party Service (low change rate)
- Payment Service (transaction integrity)
```

### 4.2 Event-Driven Backbone

```
         ┌─────────────────────────────────────────┐
         │         Kafka Event Bus                 │
         │  Topics: policy.*, claim.*, payment.*  │
         └─────────────────────────────────────────┘
                    ▲              │
                    │              ▼
        ┌───────────┴──────┐   ┌──────────────────┐
        │  Command API     │   │  Event Consumers │
        │  (REST/GraphQL)  │   │  - Audit Store   │
        │                  │   │  - Analytics     │
        └──────────────────┘   │  - Notifications │
                               │  - External Sync │
                               └──────────────────┘
```

**Event Schema (Avro/Protobuf):**
```protobuf
message PolicyBoundEvent {
  string event_id = 1;
  string policy_id = 2;
  int64 timestamp = 3;
  string bound_by = 4;
  PolicySnapshot snapshot = 5;
  AuditContext audit = 6;
}
```

### 4.3 API Design

**REST API (Synchronous):**
```
POST   /api/v1/policies               # Create quote
GET    /api/v1/policies/{id}          # Get policy
PATCH  /api/v1/policies/{id}          # Endorse policy
POST   /api/v1/policies/{id}/bind     # Bind quote
POST   /api/v1/policies/{id}/renew    # Initiate renewal

POST   /api/v1/claims                 # FNOL
GET    /api/v1/claims/{id}            # Get claim
PATCH  /api/v1/claims/{id}/status     # Update status
POST   /api/v1/claims/{id}/payments   # Issue payment

GET    /api/v1/audit/{entityId}       # Audit trail
```

**Async Events (Webhooks + Internal):**
```
PUBLISH: policy.quoted
PUBLISH: policy.bound
PUBLISH: claim.fnol_received
PUBLISH: claim.payment_issued
PUBLISH: agent.action_taken
```

### 4.4 Data Architecture

**OLTP (Operational):**
```
PostgreSQL (Multi-tenant with schema isolation)
├── policies_db
├── claims_db
├── parties_db
└── payments_db

Replication: Primary + 2 Read Replicas
Backups: Continuous WAL archival + Daily snapshots
```

**OLAP (Analytics):**
```
Data Lake (S3 + Iceberg/Delta Lake)
├── raw/ (CDC streams, event logs)
├── curated/ (cleaned, joined)
└── aggregated/ (metrics, reports)

Query Engine: Apache Spark + Trino
BI Tools: Tableau / Looker
```

**Cache Layer:**
```
Redis (Read-through cache)
- Policy lookups (TTL: 5 min)
- Party data (TTL: 15 min)
- Rate tables (TTL: 1 hour)
```

### 4.5 Integration Patterns

**External Systems:**

| System | Protocol | Use Case | Pattern |
|--------|----------|----------|---------|
| **ISO ClaimSearch** | SOAP/XML | Claim history lookup | Request-Response |
| **ACORD** | XML/EDI | Standard data exchange | Message Queue |
| **LexisNexis** | REST | Identity verification | API Gateway |
| **DMV** | Batch SFTP | Driver records | Scheduled Import |
| **Payment Rails (Stripe/Plaid)** | REST + Webhooks | ACH/Card processing | Event-driven |
| **Reinsurance** | FTP/API | Treaty processing | Batch + Reconciliation |

**Integration Platform:**
```
MuleSoft / Apache Camel
├── Connectors (pre-built)
├── Transformation (XSLT/JSONata)
├── Error Handling (DLQ, retry)
└── Monitoring (ELK stack)
```

---

## 5. Implementation Roadmap

### 5.1 MVP (6 months)

**Goal:** Deployable system for single line of business (Auto Insurance)

**Scope:**
- ✅ Policy lifecycle: Quote → Bind → Endorse
- ✅ Claims lifecycle: FNOL → Assignment → Payment
- ✅ Party management
- ✅ Document upload with OCR
- ✅ Basic audit trail
- ✅ Simple underwriting rules (deterministic)
- ⚠️ Manual fraud review (no ML yet)

**Tech Stack:**
- **Backend:** NestJS (TypeScript) - modular monolith
- **Frontend:** React + TypeScript + Tailwind
- **Database:** PostgreSQL 15
- **Events:** Kafka (Confluent Cloud managed)
- **Storage:** AWS S3
- **Deployment:** Docker + Kubernetes (EKS)
- **CI/CD:** GitHub Actions
- **Monitoring:** Datadog

**Team:**
- 2 Backend Engineers
- 1 Frontend Engineer
- 1 DevOps Engineer
- 1 QA Engineer
- 1 Product Manager

### 5.2 Phase 2: Agent Integration (Months 7-12)

**Additions:**
- ✅ Document extraction agent (AWS Textract + Claude)
- ✅ Fraud detection (ML model)
- ✅ Underwriting assistant (pricing optimization)
- ✅ Analytics dashboard
- ✅ External integrations (ISO, LexisNexis)

**New Roles:**
- 1 ML Engineer
- 1 Data Engineer

### 5.3 Phase 3: Multi-Line Expansion (Months 13-18)

**Additions:**
- ✅ Home insurance
- ✅ Commercial lines
- ✅ Advanced workflows (subrogation, salvage)
- ✅ Microservices extraction (Claims, Documents)
- ✅ Advanced agent orchestration

### 5.4 Phase 4: Market Differentiators (Months 19-24)

**Additions:**
- ✅ Real-time pricing APIs
- ✅ Mobile-first FNOL
- ✅ Instant settlement for small claims
- ✅ Embedded insurance APIs (partner ecosystem)

---

## 6. Non-Functional Requirements

**Performance:**
- Policy quote generation: <500ms (p95)
- Claim FNOL submission: <1s (p95)
- API availability: 99.9% (43 minutes downtime/month)

**Scalability:**
- Support 1M active policies
- Handle 10K claims/month
- Process 100K events/day

**Security:**
- Zero-trust network architecture
- PII encryption at rest (AES-256) and in transit (TLS 1.3)
- Role-based access control (RBAC) with attribute-based policies
- SOC 2 Type II certified
- Annual penetration testing

**Compliance:**
- NAIC compliance (state-specific regulations)
- GDPR for EU operations
- HIPAA for health-related claims
- PCI-DSS for payment handling

---

## 7. Technology Decisions Summary

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Backend** | NestJS (TypeScript) | Type safety, modular architecture, great DX |
| **Frontend** | React + TypeScript | Industry standard, rich ecosystem |
| **Database** | PostgreSQL | ACID guarantees, JSON support, proven at scale |
| **Events** | Apache Kafka | Industry standard for event streaming |
| **Cache** | Redis | Fast, reliable, supports complex data structures |
| **Search** | Elasticsearch | Full-text search, audit log queries |
| **ML Platform** | AWS SageMaker | Managed infrastructure, model versioning |
| **Document Store** | AWS S3 | Cost-effective, durable, integrations |
| **Monitoring** | Datadog | APM + logs + metrics in one platform |
| **Orchestration** | Temporal | Durable workflows, excellent failure handling |

---

## Appendix: Key Architectural Decisions

**ADR-001: Hybrid Event Sourcing**  
**Decision:** Use event sourcing for Claims, CDC for Policies  
**Rationale:** Claims have complex state machines benefiting from event replay; Policies need fast reads

**ADR-002: Modular Monolith First**  
**Decision:** Start with modular monolith, extract to microservices later  
**Rationale:** Faster MVP delivery, clear module boundaries enable clean extraction

**ADR-003: Agent Human-in-the-Loop by Default**  
**Decision:** All AI agents output suggestions, require human approval for high-risk actions  
**Rationale:** Regulatory compliance, customer trust, gradual automation adoption

**ADR-004: Multi-Tenancy via Schema Isolation**  
**Decision:** Use PostgreSQL schemas for tenant isolation (if multi-tenant SaaS)  
**Rationale:** Data isolation, cost-effective vs separate DBs, performance acceptable for <1000 tenants

**ADR-005: Avro for Event Schemas**  
**Decision:** Use Avro with schema registry  
**Rationale:** Backward/forward compatibility, schema evolution, smaller payload than JSON

---

**Document Control:**  
- **Author:** Insurance Platform Architecture Team  
- **Reviewers:** CTO, VP Engineering, Chief Underwriter, Compliance Officer  
- **Next Review Date:** August 8, 2026
