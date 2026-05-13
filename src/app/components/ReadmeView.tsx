import { Book, CheckCircle, Shield, Zap, Database, Bot, GitBranch, TrendingUp } from 'lucide-react';
import { PersonaTag } from './PersonaTag';

export function ReadmeView() {
  return (
    <div className="p-8 space-y-8 max-w-6xl">
      <div className="bg-gradient-to-br from-primary/10 via-chart-3/10 to-chart-5/10 border border-primary/20 rounded-xl p-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-primary rounded-xl">
            <Book className="size-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="mb-2">AIQ PAS/CMS Platform</h1>
            <p className="text-lg text-muted-foreground">
              AI Policy Administration System & Claims Management System
            </p>
          </div>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2">
          <CheckCircle className="size-6 text-success" />
          Executive Summary
        </h2>
        <div className="bg-card border border-border rounded-xl p-6 space-y-3">
          <p>
            This application demonstrates a modern, event-driven insurance platform built as a <strong>system of record</strong> with
            comprehensive audit trails, AI-powered automation, and enterprise-grade architecture.
          </p>
          <p>
            The platform manages the complete lifecycle of insurance policies and claims, from quote generation through
            renewal/settlement, with built-in fraud detection, automated underwriting, and full regulatory compliance.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2">
          <TrendingUp className="size-6 text-chart-5" />
          Persona-Based Experience
        </h2>
        <div className="bg-gradient-to-br from-chart-5/10 to-primary/10 border border-border rounded-xl p-6">
          <p className="mb-4">
            <strong>Role-Based Dashboards:</strong> The platform provides customized experiences for 6 distinct user personas,
            each with tailored workflows, metrics, and permissions.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <PersonaTag icon="👤" role="Policyholder" focus="Self-service portal" />
            <PersonaTag icon="👔" role="Agent/Broker" focus="Sales & client management" />
            <PersonaTag icon="📊" role="Underwriter" focus="Risk assessment & pricing" />
            <PersonaTag icon="🔍" role="Claims Adjuster" focus="Investigation & settlement" />
            <PersonaTag icon="💼" role="Executive" focus="Analytics & KPIs" />
            <PersonaTag icon="🛡️" role="Fraud Analyst" focus="Pattern detection & SIU" />
          </div>
          <div className="mt-4 bg-info/10 border border-info/30 rounded-lg p-3">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Try It:</strong> Use the persona switcher in the sidebar to experience different role-based views.
              Each persona has unique tasks, notifications, metrics, and quick actions.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2">
          <Zap className="size-6 text-chart-1" />
          Core Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            icon={<Shield className="size-5 text-primary" />}
            title="Policy Administration"
            description="Complete policy lifecycle management from quote through renewal"
            features={[
              'Quote generation with AI-powered underwriting',
              'Policy binding and issuance',
              'Mid-term endorsements',
              'Automated renewal processing',
              'Multi-product support (Auto, Home, Life, Commercial)'
            ]}
          />

          <FeatureCard
            icon={<CheckCircle className="size-5 text-chart-2" />}
            title="Claims Management"
            description="End-to-end claims processing from FNOL to settlement"
            features={[
              'First Notice of Loss (FNOL) intake',
              'Automated adjuster assignment',
              'Real-time fraud detection scoring',
              'Reserve management',
              'Payment processing and settlement'
            ]}
          />

          <FeatureCard
            icon={<Bot className="size-5 text-chart-5" />}
            title="AI Agent Orchestration"
            description="Intelligent automation with human-in-the-loop controls"
            features={[
              'Fraud Detection Agent (89% accuracy)',
              'Document Extraction Agent (OCR + NLP)',
              'Underwriting Assistant (risk scoring)',
              'Coverage Gap Analyzer',
              'Subrogation Identification'
            ]}
          />

          <FeatureCard
            icon={<Database className="size-5 text-chart-4" />}
            title="Audit & Compliance"
            description="Immutable audit trails for regulatory compliance"
            features={[
              'WHO/WHAT/WHEN/WHY/HOW tracking',
              'Point-in-time reconstruction',
              'Event sourcing for claims',
              'CDC for policies',
              'SOC 2, GDPR, state insurance compliance'
            ]}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2">
          <TrendingUp className="size-6 text-chart-3" />
          Business Benefits
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <BenefitCard
            title="Operational Efficiency"
            metrics={[
              { label: 'Quote generation time', value: '<500ms', trend: '↓ 80%' },
              { label: 'Claims processing', value: '40% faster', trend: '↑ 40%' },
              { label: 'Manual review reduction', value: '60%', trend: '↓ 60%' }
            ]}
            color="from-chart-1/10 to-chart-1/5"
          />

          <BenefitCard
            title="Risk Mitigation"
            metrics={[
              { label: 'Fraud detection rate', value: '89%', trend: '↑ 35%' },
              { label: 'False positives', value: '12%', trend: '↓ 45%' },
              { label: 'Audit compliance', value: '100%', trend: '✓' }
            ]}
            color="from-destructive/10 to-warning/10"
          />

          <BenefitCard
            title="Customer Experience"
            metrics={[
              { label: 'Instant quotes', value: 'Real-time', trend: '✓' },
              { label: 'FNOL to payment', value: '3-5 days', trend: '↓ 50%' },
              { label: 'Customer satisfaction', value: '4.8/5', trend: '↑ 25%' }
            ]}
            color="from-success/10 to-chart-2/10"
          />
        </div>

        <div className="bg-gradient-to-br from-chart-5/10 to-primary/10 border border-border rounded-xl p-6">
          <h3 className="mb-3">Persona-Specific Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="mb-2 flex items-center gap-2">👤 Policyholders</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Self-service policy management 24/7</li>
                <li>• Instant claim status tracking</li>
                <li>• Transparent pricing and coverage</li>
                <li>• Mobile-first experience</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 flex items-center gap-2">👔 Agents</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• AI-powered cross-sell recommendations</li>
                <li>• Real-time commission tracking</li>
                <li>• Automated follow-up reminders</li>
                <li>• Client portfolio analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 flex items-center gap-2">📊 Underwriters</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• AI-assisted risk assessment</li>
                <li>• Automated pricing recommendations</li>
                <li>• Exception queue prioritization</li>
                <li>• Performance analytics dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 flex items-center gap-2">🔍 Claims Adjusters</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• SLA tracking and alerts</li>
                <li>• Fraud detection assistance</li>
                <li>• Automated reserve recommendations</li>
                <li>• Investigation workflow tools</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 flex items-center gap-2">💼 Executives</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Real-time KPI dashboards</li>
                <li>• Combined ratio tracking</li>
                <li>• AI ROI measurement</li>
                <li>• Predictive analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 flex items-center gap-2">🛡️ Fraud Analysts</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Pattern detection algorithms</li>
                <li>• Network graph analysis</li>
                <li>• SIU case management</li>
                <li>• Savings impact reporting</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2">
          <GitBranch className="size-6 text-chart-4" />
          Application Walkthrough
        </h2>

        <div className="space-y-3">
          <WalkthroughStep
            number="1"
            title="Persona Selection"
            description="Switch between 6 user personas (Policyholder, Agent, Underwriter, Adjuster, Executive, Fraud Analyst) to experience role-based dashboards with personalized tasks, notifications, and metrics"
            color="bg-chart-5"
          />

          <WalkthroughStep
            number="2"
            title="Persona Dashboard"
            description="Each role gets a customized view: Policyholders see their policies and claims, Agents track sales pipeline, Adjusters manage claim queues, Executives view KPIs, etc."
            color="bg-primary"
          />

          <WalkthroughStep
            number="3"
            title="Policy Management"
            description="View all policies, create new quotes, and track policy lifecycle. Click any policy card to see detailed coverage information and version history"
            color="bg-chart-1"
          />

          <WalkthroughStep
            number="4"
            title="Claims Processing"
            description="Submit FNOL reports, assign adjusters, track investigation progress, and view fraud detection scores. Each claim card opens detailed financial tracking"
            color="bg-chart-2"
          />

          <WalkthroughStep
            number="5"
            title="AI Agents"
            description="Monitor autonomous agents (fraud detection, document extraction) and human-in-loop agents (underwriting, coverage analysis) with confidence scores and override tracking"
            color="bg-chart-5"
          />

          <WalkthroughStep
            number="6"
            title="Audit Trail"
            description="Immutable event log showing every state change with complete context. Filter by entity type, user, or date range for compliance reporting"
            color="bg-chart-3"
          />

          <WalkthroughStep
            number="7"
            title="Architecture Diagrams"
            description="Visual architecture diagrams for business stakeholders: system context, domain models, event flows, data architecture, AI agent specs, and AWS deployment"
            color="bg-chart-4"
          />

          <WalkthroughStep
            number="8"
            title="Tech Specifications"
            description="Detailed technical architecture including service design, integration patterns, technology stack, and implementation decisions"
            color="bg-info"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2>Technical Architecture Highlights</h2>

        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div>
            <h4 className="mb-2 text-primary">🏗️ Service Architecture</h4>
            <p className="text-sm text-muted-foreground">
              Phase 1: Modular monolith (NestJS/TypeScript) for faster MVP delivery, with clear module boundaries enabling
              future extraction to microservices. Phase 2: Selective extraction of high-change/high-load modules (Claims, Documents).
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-chart-3">⚡ Event-Driven Backbone</h4>
            <p className="text-sm text-muted-foreground">
              Apache Kafka event bus with Avro schema registry. Topics: policy.*, claim.*, payment.*. Consumers for audit,
              analytics, notifications, and external system sync. Enables scalable, decoupled architecture.
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-chart-4">💾 Data Architecture</h4>
            <p className="text-sm text-muted-foreground">
              <strong>OLTP:</strong> PostgreSQL with schema isolation, primary + 2 read replicas.
              <strong>OLAP:</strong> S3 Data Lake with Iceberg/Delta Lake for analytics.
              <strong>Cache:</strong> Redis for hot data.
              <strong>Search:</strong> Elasticsearch for audit queries.
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-chart-2">🔒 Audit Strategy</h4>
            <p className="text-sm text-muted-foreground">
              <strong>Policies:</strong> CDC (Change Data Capture) + Audit Log for write-optimized operations.
              <strong>Claims:</strong> Event Sourcing with projections for complex state machines.
              <strong>Storage:</strong> Immutable S3 Parquet files with 7-year retention.
            </p>
          </div>

          <div>
            <h4 className="mb-2 text-chart-5">🤖 AI Agent Framework</h4>
            <p className="text-sm text-muted-foreground">
              <strong>Autonomous:</strong> Fraud detection, document extraction, subrogation identification.
              <strong>Human-in-Loop:</strong> Underwriting assistant, coverage analyzer, settlement negotiator.
              All actions logged with model version, confidence scores, and override capability.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2>Build vs. Buy Decision Framework</h2>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="p-3 text-left">Component</th>
                <th className="p-3 text-left">Decision</th>
                <th className="p-3 text-left">Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-3">Policy Core Domain</td>
                <td className="p-3"><span className="px-2 py-1 bg-primary/20 text-primary rounded">BUILD</span></td>
                <td className="p-3 text-muted-foreground">Unique business logic, competitive differentiator</td>
              </tr>
              <tr>
                <td className="p-3">Claims Processing Engine</td>
                <td className="p-3"><span className="px-2 py-1 bg-primary/20 text-primary rounded">BUILD</span></td>
                <td className="p-3 text-muted-foreground">Complex workflows, custom fraud detection</td>
              </tr>
              <tr>
                <td className="p-3">Event Streaming</td>
                <td className="p-3"><span className="px-2 py-1 bg-chart-2/20 text-chart-2 rounded">BUY</span></td>
                <td className="p-3 text-muted-foreground">Confluent Kafka (managed) - proven, reliable</td>
              </tr>
              <tr>
                <td className="p-3">Document Storage</td>
                <td className="p-3"><span className="px-2 py-1 bg-chart-2/20 text-chart-2 rounded">BUY</span></td>
                <td className="p-3 text-muted-foreground">AWS S3 - commodity, cost-effective</td>
              </tr>
              <tr>
                <td className="p-3">OCR/Document Extraction</td>
                <td className="p-3"><span className="px-2 py-1 bg-chart-2/20 text-chart-2 rounded">BUY</span></td>
                <td className="p-3 text-muted-foreground">AWS Textract + Claude - faster than building ML</td>
              </tr>
              <tr>
                <td className="p-3">Payment Processing</td>
                <td className="p-3"><span className="px-2 py-1 bg-chart-2/20 text-chart-2 rounded">BUY</span></td>
                <td className="p-3 text-muted-foreground">Stripe/Plaid - regulatory compliance, PCI-DSS</td>
              </tr>
              <tr>
                <td className="p-3">Fraud Detection Models</td>
                <td className="p-3"><span className="px-2 py-1 bg-warning/20 text-warning rounded">HYBRID</span></td>
                <td className="p-3 text-muted-foreground">AWS SageMaker (platform) + custom models</td>
              </tr>
              <tr>
                <td className="p-3">ISO/ACORD Integration</td>
                <td className="p-3"><span className="px-2 py-1 bg-chart-2/20 text-chart-2 rounded">BUY</span></td>
                <td className="p-3 text-muted-foreground">MuleSoft connectors - pre-built, tested</td>
              </tr>
              <tr>
                <td className="p-3">Workflow Orchestration</td>
                <td className="p-3"><span className="px-2 py-1 bg-chart-2/20 text-chart-2 rounded">BUY</span></td>
                <td className="p-3 text-muted-foreground">Temporal - durable workflows, proven at scale</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2>Implementation Roadmap</h2>

        <div className="space-y-3">
          <RoadmapPhase
            phase="MVP (Months 1-6)"
            color="bg-success"
            deliverables={[
              'Policy lifecycle: Quote → Bind → Endorse',
              'Claims lifecycle: FNOL → Payment',
              'Basic audit trail',
              'Document upload with OCR',
              'Auto insurance only'
            ]}
            team="7 people: 2 BE, 1 FE, 1 DevOps, 1 QA, 1 PM, 1 Designer"
          />

          <RoadmapPhase
            phase="Phase 2: Agent Integration (Months 7-12)"
            color="bg-chart-5"
            deliverables={[
              'Fraud detection agent (ML)',
              'Document extraction agent',
              'Underwriting assistant',
              'Analytics dashboard',
              'ISO/LexisNexis integration'
            ]}
            team="+2 people: ML Engineer, Data Engineer"
          />

          <RoadmapPhase
            phase="Phase 3: Multi-Line Expansion (Months 13-18)"
            color="bg-chart-3"
            deliverables={[
              'Home insurance',
              'Commercial lines',
              'Subrogation workflows',
              'Microservices extraction (Claims)',
              'Advanced agent orchestration'
            ]}
            team="Scale to 12-15 people"
          />

          <RoadmapPhase
            phase="Phase 4: Market Differentiators (Months 19-24)"
            color="bg-primary"
            deliverables={[
              'Real-time pricing APIs',
              'Mobile-first FNOL',
              'Instant settlement (<$5K claims)',
              'Embedded insurance APIs',
              'Partner ecosystem'
            ]}
            team="Scale to 20+ people"
          />
        </div>
      </section>

      <div className="bg-gradient-to-r from-primary/10 to-chart-5/10 border border-primary/20 rounded-xl p-6">
        <h3 className="mb-3">📚 Complete Documentation</h3>
        <p className="text-sm text-muted-foreground mb-3">
          For the full architectural specification including domain models, event schemas, API contracts,
          data models, security architecture, and detailed technical decisions, see:
        </p>
        <code className="bg-background px-3 py-1.5 rounded text-sm">ARCHITECTURE.md</code>
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="mb-3">🎯 Key Takeaways</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>✅ <strong>System of Record:</strong> Immutable audit trails meet SOC 2, GDPR, and state insurance regulations</li>
          <li>✅ <strong>Event-Driven:</strong> Scalable, decoupled architecture enables real-time processing</li>
          <li>✅ <strong>AI-Augmented:</strong> Autonomous agents reduce manual work by 60% while maintaining human oversight</li>
          <li>✅ <strong>Production-Ready:</strong> Enterprise patterns (CQRS, event sourcing, CDC) proven at scale</li>
          <li>✅ <strong>Actionable:</strong> Phased roadmap with clear build-vs-buy decisions and team sizing</li>
        </ul>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

function FeatureCard({ icon, title, description, features }: FeatureCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3>{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <ul className="space-y-1.5">
        {features.map((feature, i) => (
          <li key={i} className="text-sm flex items-start gap-2">
            <CheckCircle className="size-4 text-success shrink-0 mt-0.5" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface BenefitCardProps {
  title: string;
  metrics: { label: string; value: string; trend: string }[];
  color: string;
}

function BenefitCard({ title, metrics, color }: BenefitCardProps) {
  return (
    <div className={`bg-gradient-to-br ${color} border border-border rounded-xl p-5`}>
      <h4 className="mb-4">{title}</h4>
      <div className="space-y-3">
        {metrics.map((metric, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">{metric.label}</span>
              <span className="text-xs text-success">{metric.trend}</span>
            </div>
            <div>{metric.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface WalkthroughStepProps {
  number: string;
  title: string;
  description: string;
  color: string;
}

function WalkthroughStep({ number, title, description, color }: WalkthroughStepProps) {
  return (
    <div className="flex gap-4 bg-card border border-border rounded-lg p-4">
      <div className={`shrink-0 size-10 ${color} text-white rounded-full flex items-center justify-center`}>
        {number}
      </div>
      <div>
        <h4 className="mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

interface RoadmapPhaseProps {
  phase: string;
  color: string;
  deliverables: string[];
  team: string;
}

function RoadmapPhase({ phase, color, deliverables, team }: RoadmapPhaseProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`h-2 w-2 rounded-full ${color}`} />
        <h4>{phase}</h4>
      </div>
      <ul className="space-y-1.5 mb-3">
        {deliverables.map((item, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="text-success">•</span>
            {item}
          </li>
        ))}
      </ul>
      <div className="text-sm text-muted-foreground pt-3 border-t border-border">
        Team: {team}
      </div>
    </div>
  );
}
