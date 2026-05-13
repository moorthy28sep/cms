import { FileText, User, Calendar, DollarSign, ChevronRight } from 'lucide-react';
import { mockPolicies } from '../data/mockData';
import type { PolicyStatus } from '../types';

interface PolicyListProps {
  onSelectPolicy: (id: string) => void;
  onNewQuote: () => void;
}

export function PolicyList({ onSelectPolicy, onNewQuote }: PolicyListProps) {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Policy Administration</h1>
          <p className="text-muted-foreground">Manage policy lifecycle from quote to renewal</p>
        </div>
        <button
          onClick={onNewQuote}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
        >
          + New Quote
        </button>
      </div>

      <div className="space-y-3">
        {mockPolicies.map(policy => (
          <div
            key={policy.id}
            onClick={() => onSelectPolicy(policy.id)}
            className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1">{policy.policyNumber}</h3>
                  <StatusBadge status={policy.status} />
                </div>
              </div>
              <ChevronRight className="size-5 text-muted-foreground" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="size-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Policyholder</div>
                  <div>{policy.policyholder.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Effective</div>
                  <div>{new Date(policy.effectiveDate).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="size-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Premium</div>
                  <div>${policy.premium.toFixed(2)}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-muted-foreground" />
                <div>
                  <div className="text-muted-foreground">Product</div>
                  <div>{policy.productType}</div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
              Version {policy.version} · Last modified {new Date(policy.modifiedAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: PolicyStatus }) {
  const colors: Record<PolicyStatus, string> = {
    QUOTE: 'bg-chart-5/20 text-chart-5',
    BOUND: 'bg-chart-2/20 text-chart-2',
    ACTIVE: 'bg-chart-4/20 text-chart-4',
    ENDORSED: 'bg-chart-1/20 text-chart-1',
    RENEWED: 'bg-chart-3/20 text-chart-3',
    CANCELLED: 'bg-muted text-muted-foreground',
    EXPIRED: 'bg-muted text-muted-foreground'
  };

  return (
    <span className={`inline-block px-2 py-1 rounded text-xs ${colors[status]}`}>
      {status}
    </span>
  );
}
