import { Server, Database, Zap, Lock, GitBranch, Cloud } from 'lucide-react';

export function ArchitectureView() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="mb-2">System Architecture</h1>
        <p className="text-muted-foreground">Production-grade insurance platform design overview</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ArchitectureCard
          title="Service Architecture"
          icon={<Server className="size-5" />}
          items={[
            { label: 'Phase 1', value: 'Modular Monolith (NestJS)' },
            { label: 'Database', value: 'PostgreSQL with schema isolation' },
            { label: 'Phase 2', value: 'Selective microservices extraction' },
            { label: 'Deployment', value: 'Docker + Kubernetes (EKS)' }
          ]}
        />

        <ArchitectureCard
          title="Event-Driven Backbone"
          icon={<Zap className="size-5" />}
          items={[
            { label: 'Messaging', value: 'Apache Kafka (Confluent Cloud)' },
            { label: 'Topics', value: 'policy.*, claim.*, payment.*' },
            { label: 'Consumers', value: 'Audit, Analytics, Notifications' },
            { label: 'Schema', value: 'Avro with registry' }
          ]}
        />

        <ArchitectureCard
          title="Data Architecture"
          icon={<Database className="size-5" />}
          items={[
            { label: 'OLTP', value: 'PostgreSQL (Primary + 2 replicas)' },
            { label: 'OLAP', value: 'S3 Data Lake + Iceberg/Delta' },
            { label: 'Cache', value: 'Redis (read-through)' },
            { label: 'Search', value: 'Elasticsearch' }
          ]}
        />

        <ArchitectureCard
          title="Audit Strategy"
          icon={<Lock className="size-5" />}
          items={[
            { label: 'Policies', value: 'CDC + Audit Log (hybrid)' },
            { label: 'Claims', value: 'Event Sourcing' },
            { label: 'Storage', value: 'S3 Parquet (immutable)' },
            { label: 'Retention', value: '7 years (compliance)' }
          ]}
        />
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <GitBranch className="size-5" />
          <h3>Domain Models</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="mb-2">Policy Lifecycle</h4>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-chart-5" />
                <span className="text-muted-foreground">QUOTE → Initial pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-chart-2" />
                <span className="text-muted-foreground">BOUND → Contract accepted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-chart-4" />
                <span className="text-muted-foreground">ACTIVE → In force</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-chart-1" />
                <span className="text-muted-foreground">ENDORSED → Mid-term change</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-chart-3" />
                <span className="text-muted-foreground">RENEWED → New term</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-muted" />
                <span className="text-muted-foreground">CANCELLED/EXPIRED → Terminated</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2">Claims Lifecycle</h4>
            <div className="text-sm space-y-2">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-chart-5" />
                <span className="text-muted-foreground">FNOL → First notice of loss</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-chart-1" />
                <span className="text-muted-foreground">ASSIGNED → Adjuster assigned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-chart-3" />
                <span className="text-muted-foreground">INVESTIGATING → Gathering evidence</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-chart-2" />
                <span className="text-muted-foreground">COVERAGE_REVIEW → Policy analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-chart-4" />
                <span className="text-muted-foreground">APPROVED → Ready for payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-chart-4" />
                <span className="text-muted-foreground">PAID → Settlement issued</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-muted" />
                <span className="text-muted-foreground">CLOSED → Case finalized</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Cloud className="size-5" />
          <h3>Integration Patterns</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr className="text-left">
                <th className="pb-2">External System</th>
                <th className="pb-2">Protocol</th>
                <th className="pb-2">Use Case</th>
                <th className="pb-2">Pattern</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b border-border">
                <td className="py-2">ISO ClaimSearch</td>
                <td>SOAP/XML</td>
                <td>Claim history lookup</td>
                <td>Request-Response</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">ACORD</td>
                <td>XML/EDI</td>
                <td>Data exchange</td>
                <td>Message Queue</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">LexisNexis</td>
                <td>REST</td>
                <td>Identity verification</td>
                <td>API Gateway</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2">DMV</td>
                <td>Batch SFTP</td>
                <td>Driver records</td>
                <td>Scheduled Import</td>
              </tr>
              <tr>
                <td className="py-2">Payment Rails</td>
                <td>REST + Webhooks</td>
                <td>ACH/Card processing</td>
                <td>Event-driven</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-accent/50 border border-border rounded-lg p-4">
        <h4 className="mb-2">Technology Stack</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Backend:</span> NestJS (TypeScript)
          </div>
          <div>
            <span className="text-muted-foreground">Frontend:</span> React + TypeScript
          </div>
          <div>
            <span className="text-muted-foreground">Database:</span> PostgreSQL 15
          </div>
          <div>
            <span className="text-muted-foreground">Events:</span> Apache Kafka
          </div>
          <div>
            <span className="text-muted-foreground">Cache:</span> Redis
          </div>
          <div>
            <span className="text-muted-foreground">Storage:</span> AWS S3
          </div>
          <div>
            <span className="text-muted-foreground">ML Platform:</span> AWS SageMaker
          </div>
          <div>
            <span className="text-muted-foreground">Monitoring:</span> Datadog
          </div>
          <div>
            <span className="text-muted-foreground">Orchestration:</span> Temporal
          </div>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
        <h4 className="mb-2">📄 Complete Architecture Documentation</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Full architectural specification available in <code className="bg-background px-1 py-0.5 rounded">ARCHITECTURE.md</code>
        </p>
        <p className="text-sm text-muted-foreground">
          Includes: domain models, event sourcing strategy, agentic AI framework, microservices design,
          integration patterns, implementation roadmap, and technology decisions.
        </p>
      </div>
    </div>
  );
}

interface ArchitectureCardProps {
  title: string;
  icon: React.ReactNode;
  items: { label: string; value: string }[];
}

function ArchitectureCard({ title, icon, items }: ArchitectureCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h3>{title}</h3>
      </div>
      <div className="space-y-2 text-sm">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span className="text-muted-foreground">{item.label}:</span>
            <span className="text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
