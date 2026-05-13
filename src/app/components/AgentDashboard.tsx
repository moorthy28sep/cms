import { Bot, Brain, FileSearch, Shield, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockAgentActions } from '../data/mockData';

export function AgentDashboard() {
  const avgConfidence = mockAgentActions.reduce((sum, a) => sum + a.confidence, 0) / mockAgentActions.length;
  const overrideRate = (mockAgentActions.filter(a => a.humanOverride).length / mockAgentActions.length) * 100;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="mb-2">AI Agent Orchestration</h1>
        <p className="text-muted-foreground">Autonomous and human-in-the-loop agentic processes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="size-5 text-chart-5" />
            <span className="text-sm text-muted-foreground">Avg Confidence</span>
          </div>
          <div className="mb-1">{(avgConfidence * 100).toFixed(1)}%</div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-chart-5 rounded-full" style={{ width: `${avgConfidence * 100}%` }} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="size-5 text-chart-4" />
            <span className="text-sm text-muted-foreground">Actions Today</span>
          </div>
          <div className="mb-1">{mockAgentActions.length}</div>
          <div className="text-sm text-muted-foreground">Across all agents</div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="size-5 text-chart-1" />
            <span className="text-sm text-muted-foreground">Override Rate</span>
          </div>
          <div className="mb-1">{overrideRate.toFixed(0)}%</div>
          <div className="text-sm text-muted-foreground">Human interventions</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgentCard
          name="Fraud Detection Agent"
          type="Autonomous"
          icon={<Shield className="size-5" />}
          description="Analyzes claims for fraud patterns using ML anomaly detection and graph-based network analysis"
          capabilities={[
            'Pattern recognition across historical claims',
            'Cross-reference with external databases',
            'Risk scoring with explainability'
          ]}
          confidence={89}
        />

        <AgentCard
          name="Document Extraction Agent"
          type="Autonomous"
          icon={<FileSearch className="size-5" />}
          description="Extracts structured data from uploaded documents using OCR and NLP"
          capabilities={[
            'PDF and image processing',
            'Field mapping to schema',
            'Confidence scoring per field'
          ]}
          confidence={95}
        />

        <AgentCard
          name="Underwriting Assistant"
          type="Human-in-Loop"
          icon={<TrendingUp className="size-5" />}
          description="Provides risk assessment and pricing recommendations for underwriters to review"
          capabilities={[
            'Risk factor analysis',
            'Premium calculation suggestions',
            'Explainable AI with feature importance'
          ]}
          confidence={82}
        />

        <AgentCard
          name="Coverage Gap Analyzer"
          type="Human-in-Loop"
          icon={<Brain className="size-5" />}
          description="Analyzes policy language to determine coverage applicability for claims"
          capabilities={[
            'Legal NLP on policy clauses',
            'Ambiguity detection',
            'Precedent-based reasoning'
          ]}
          confidence={78}
        />
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="size-5" />
          <h3>Recent Agent Actions</h3>
        </div>

        <div className="space-y-3">
          {mockAgentActions.map(action => (
            <div key={action.id} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4>{action.agentName}</h4>
                  <div className="text-sm text-muted-foreground">{action.action}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Confidence: </span>
                    <span className={action.confidence >= 0.8 ? 'text-chart-4' : 'text-chart-1'}>
                      {(action.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  {action.humanOverride && (
                    <span className="text-xs text-chart-1">Human Override</span>
                  )}
                </div>
              </div>

              <div className="text-sm bg-background/50 p-3 rounded mb-2">
                {action.output}
              </div>

              <div className="text-xs text-muted-foreground">
                {new Date(action.timestamp).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-accent/50 border border-border rounded-lg p-4">
        <h4 className="mb-2">Agent Governance Framework</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• <strong>Model Versioning:</strong> All agent versions tracked in audit log</li>
          <li>• <strong>Confidence Thresholds:</strong> Low confidence (&lt;70%) auto-routes to human review</li>
          <li>• <strong>Override Protocol:</strong> Humans can override with required reason, fed back into retraining</li>
          <li>• <strong>Explainability:</strong> Feature importance and reasoning captured for every decision</li>
          <li>• <strong>Continuous Learning:</strong> Agent performance metrics monitored, models retrained quarterly</li>
        </ul>
      </div>
    </div>
  );
}

interface AgentCardProps {
  name: string;
  type: 'Autonomous' | 'Human-in-Loop';
  icon: React.ReactNode;
  description: string;
  capabilities: string[];
  confidence: number;
}

function AgentCard({ name, type, icon, description, capabilities, confidence }: AgentCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 bg-chart-5/10 rounded-lg shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="mb-1">{name}</h3>
          <span className={`inline-block px-2 py-1 rounded text-xs ${
            type === 'Autonomous' ? 'bg-chart-4/20 text-chart-4' : 'bg-chart-1/20 text-chart-1'
          }`}>
            {type}
          </span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-3">{description}</p>

      <div className="mb-3">
        <div className="text-sm mb-2">Capabilities:</div>
        <ul className="text-sm text-muted-foreground space-y-1">
          {capabilities.map((cap, i) => (
            <li key={i}>• {cap}</li>
          ))}
        </ul>
      </div>

      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-muted-foreground">Avg Confidence</span>
          <span>{confidence}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-chart-5 rounded-full" style={{ width: `${confidence}%` }} />
        </div>
      </div>
    </div>
  );
}
