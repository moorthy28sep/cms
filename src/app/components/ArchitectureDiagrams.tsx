import { Database, Zap, ArrowRight, Server, Cloud, Shield, GitBranch, Boxes } from 'lucide-react';

export function ArchitectureDiagrams() {
  return (
    <div className="p-8 space-y-8 max-w-7xl">
      <div>
        <h1 className="mb-2">Architecture Diagrams & Design Specifications</h1>
        <p className="text-muted-foreground">Visual system design for business stakeholders and engineering teams</p>
      </div>

      {/* System Context Diagram */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2">
          <Boxes className="size-6 text-primary" />
          System Context Diagram
        </h2>
        <div className="bg-gradient-to-br from-primary/5 to-chart-3/5 border border-border rounded-xl p-8">
          <div className="flex flex-col items-center gap-8">
            {/* External Actors */}
            <div className="grid grid-cols-3 gap-8 w-full">
              <Actor name="Policyholders" icon="👤" color="bg-chart-1" />
              <Actor name="Agents/Brokers" icon="👔" color="bg-chart-2" />
              <Actor name="Adjusters" icon="🔍" color="bg-chart-3" />
            </div>

            {/* Core System */}
            <div className="w-full max-w-2xl bg-gradient-to-br from-primary to-chart-5 text-white rounded-2xl p-8 shadow-2xl">
              <h3 className="text-center mb-4">Insurance PAS/CMS Platform</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/20 rounded-lg p-3">Policy Administration</div>
                <div className="bg-white/20 rounded-lg p-3">Claims Management</div>
                <div className="bg-white/20 rounded-lg p-3">AI Agent Orchestration</div>
                <div className="bg-white/20 rounded-lg p-3">Audit & Compliance</div>
              </div>
            </div>

           
          </div>
        </div>
      </section>



      {/* Agent Design Specs */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2">
          <Cloud className="size-6 text-chart-5" />
          AI Agent Design Specifications
        </h2>
        <div className="space-y-4">
          <AgentSpec
            name="Fraud Detection Agent"
            type="Autonomous"
            trigger="On claim submission"
            input="Claim data + historical patterns"
            processing={[
              'Feature engineering (20+ features)',
              'XGBoost model (89% accuracy)',
              'Graph analysis (network connections)',
              'Anomaly detection (Isolation Forest)'
            ]}
            output="Fraud score (0-100) + explanation"
            decision="Score >80 → Manual review; Score <60 → Auto-approve"
            color="from-destructive/10 to-warning/10"
          />

          <AgentSpec
            name="Document Extraction Agent"
            type="Autonomous"
            trigger="On document upload"
            input="PDF/Image files"
            processing={[
              'OCR extraction (Python + Azure)',
              'Claude 4 NLP extraction',
              'Schema mapping',
              'Confidence scoring'
            ]}
            output="Structured JSON + field confidence"
            decision="Confidence >90% → Auto-populate; <90% → Human review"
            color="from-chart-3/10 to-chart-2/10"
          />

          <AgentSpec
            name="Underwriting Assistant"
            type="Human-in-Loop"
            trigger="On quote request"
            input="Application data + external data (DMV, credit)"
            processing={[
              'Risk factor calculation',
              'Premium optimization (pricing model)',
              'Competitive analysis',
              'SHAP explainability'
            ]}
            output="Recommended premium + risk breakdown"
            decision="Human underwriter reviews → Can override with reason"
            color="from-primary/10 to-chart-5/10"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="flex items-center gap-2">
          <GitBranch className="size-6 text-primary" />
          Technology & Tooling
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DeploymentBox label="Next.js" detail="Frontend, server rendering, routing" color="bg-primary" />
          <DeploymentBox label="Python" detail="AI/ML services, workflow automation" color="bg-chart-5" />
          <DeploymentBox label="TypeScript" detail="Safe UI and business logic" color="bg-chart-4" />
          <DeploymentBox label="Docker" detail="Container build and deployment" color="bg-chart-2" />
          <DeploymentBox label="Azure DevOps" detail="CI/CD pipeline" color="bg-success" />
          <DeploymentBox label="GitHub Actions" detail="Build/test automation" color="bg-warning" />
        </div>
      </section>

      {/* Deployment Architecture */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2">
          <Server className="size-6 text-success" />
          Deployment Architecture (Azure)
        </h2>
        <div className="bg-gradient-to-br from-success/5 to-chart-2/5 border border-border rounded-xl p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <DeploymentBox label="Azure DNS" detail="DNS service" color="bg-chart-3" />
              <DeploymentBox label="Azure CDN" detail="Global caching" color="bg-chart-3" />
              <DeploymentBox label="App Gateway" detail="Layer 7 load balancer" color="bg-chart-3" />
            </div>

            <div className="flex justify-center">
              <ArrowDown />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <h4 className="text-center">Compute</h4>
                <DeploymentBox label="AKS Cluster" detail="Kubernetes orchestration" color="bg-primary" />
                <DeploymentBox label="Next.js Services" detail="Frontend + UI routing" color="bg-primary" />
                <DeploymentBox label="Azure Functions" detail="Serverless jobs" color="bg-chart-5" />
              </div>

              <div className="space-y-3">
                <h4 className="text-center">Data & Messaging</h4>
                <DeploymentBox label="Azure PostgreSQL" detail="Managed relational DB" color="bg-chart-4" />
                <DeploymentBox label="Azure Cache" detail="Redis caching" color="bg-chart-1" />
                <DeploymentBox label="Event Hubs" detail="Streaming messaging" color="bg-warning" />
              </div>
            </div>

            <div className="flex justify-center">
              <ArrowDown />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <DeploymentBox label="Blob Storage" detail="Object storage" color="bg-success" size="small" />
              <DeploymentBox label="Azure ML" detail="Model training & deployment" color="bg-chart-5" size="small" />
              <DeploymentBox label="Azure Monitor" detail="Logging & alerts" color="bg-chart-3" size="small" />
              <DeploymentBox label="Key Vault" detail="Secrets & credentials" color="bg-destructive" size="small" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Actor({ name, icon, color }: { name: string; icon: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`size-16 ${color} text-white rounded-full flex items-center justify-center text-2xl`}>
        {icon}
      </div>
      <span className="text-sm text-center">{name}</span>
    </div>
  );
}

function ExternalSystem({ name, color }: { name: string; color: string }) {
  return (
    <div className={`${color} text-white rounded-lg p-3 text-center text-sm`}>
      {name}
    </div>
  );
}

interface DomainEntityProps {
  name: string;
  attributes: string[];
  relationships: string[];
  color: string;
}

function DomainEntity({ name, attributes, relationships, color }: DomainEntityProps) {
  return (
    <div className={`bg-gradient-to-br ${color} border border-border rounded-xl p-5`}>
      <h4 className="mb-4 pb-3 border-b border-border">{name}</h4>
      <div className="space-y-3">
        <div>
          <div className="text-xs text-muted-foreground mb-2">Attributes:</div>
          <ul className="space-y-1 text-xs font-mono">
            {attributes.map((attr, i) => (
              <li key={i} className="text-muted-foreground">• {attr}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-2">Relationships:</div>
          <ul className="space-y-1 text-xs">
            {relationships.map((rel, i) => (
              <li key={i} className="text-primary">→ {rel}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function EventBox({ label, detail, color, size = 'normal' }: { label: string; detail: string; color: string; size?: 'normal' | 'small' }) {
  const sizeClasses = size === 'small' ? 'p-3' : 'p-4';
  const textClasses = size === 'small' ? 'text-xs' : 'text-sm';

  return (
    <div className={`${color} text-white rounded-lg ${sizeClasses} text-center min-w-32`}>
      <div className={textClasses}>{label}</div>
      <div className={`text-xs opacity-80 mt-1`}>{detail}</div>
    </div>
  );
}

function Arrow({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center">
      <ArrowRight className="size-6 text-muted-foreground" />
      {label && <span className="text-xs text-muted-foreground mt-1">{label}</span>}
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="flex items-center justify-center">
      <div className="border-l-2 border-dashed border-muted-foreground h-8" />
    </div>
  );
}

interface DataLayerProps {
  title: string;
  icon: React.ReactNode;
  components: { name: string; detail: string }[];
  color: string;
}

function DataLayer({ title, icon, components, color }: DataLayerProps) {
  return (
    <div className={`bg-gradient-to-br ${color} border border-border rounded-xl p-5`}>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h4>{title}</h4>
      </div>
      <div className="space-y-2">
        {components.map((comp, i) => (
          <div key={i} className="bg-card/50 rounded-lg p-3">
            <div className="text-sm">{comp.name}</div>
            <div className="text-xs text-muted-foreground">{comp.detail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface AgentSpecProps {
  name: string;
  type: string;
  trigger: string;
  input: string;
  processing: string[];
  output: string;
  decision: string;
  color: string;
}

function AgentSpec({ name, type, trigger, input, processing, output, decision, color }: AgentSpecProps) {
  return (
    <div className={`bg-gradient-to-br ${color} border border-border rounded-xl p-6`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="mb-1">{name}</h4>
          <span className="inline-block px-2 py-1 bg-chart-5/20 text-chart-5 rounded text-xs">{type}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-muted-foreground mb-1">Trigger:</div>
          <div className="bg-card/50 rounded p-2">{trigger}</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1">Input:</div>
          <div className="bg-card/50 rounded p-2">{input}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-muted-foreground mb-2">Processing Pipeline:</div>
        <div className="space-y-1">
          {processing.map((step, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              <div className="size-6 bg-primary text-white rounded-full flex items-center justify-center text-xs shrink-0">
                {i + 1}
              </div>
              <div className="bg-card/50 rounded px-3 py-1 flex-1">{step}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-4">
        <div>
          <div className="text-muted-foreground mb-1">Output:</div>
          <div className="bg-card/50 rounded p-2">{output}</div>
        </div>
        <div>
          <div className="text-muted-foreground mb-1">Decision Logic:</div>
          <div className="bg-card/50 rounded p-2">{decision}</div>
        </div>
      </div>
    </div>
  );
}

function DeploymentBox({ label, detail, color, size = 'normal' }: { label: string; detail: string; color: string; size?: 'normal' | 'small' }) {
  const sizeClasses = size === 'small' ? 'p-2' : 'p-3';
  const textClasses = size === 'small' ? 'text-xs' : 'text-sm';

  return (
    <div className={`${color} text-white rounded-lg ${sizeClasses} text-center`}>
      <div className={textClasses}>{label}</div>
      <div className="text-xs opacity-80 mt-1">{detail}</div>
    </div>
  );
}
