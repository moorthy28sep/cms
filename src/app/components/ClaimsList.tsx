import { AlertCircle, User, Calendar, DollarSign, Shield, ChevronRight } from 'lucide-react';
import { mockClaims, mockPolicies } from '../data/mockData';
import type { ClaimStatus } from '../types';

interface ClaimsListProps {
  onSelectClaim: (id: string) => void;
  onNewClaim: () => void;
}

export function ClaimsList({ onSelectClaim, onNewClaim }: ClaimsListProps) {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Claims Management</h1>
          <p className="text-muted-foreground">Track claims from FNOL through settlement and closure</p>
        </div>
        <button
          onClick={onNewClaim}
          className="px-4 py-2 bg-chart-2 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          + Report Claim (FNOL)
        </button>
      </div>

      <div className="space-y-3">
        {mockClaims.map(claim => {
          const policy = mockPolicies.find(p => p.id === claim.policyId);
          const isFraudRisk = (claim.fraudScore || 0) > 60;

          return (
            <div
              key={claim.id}
              onClick={() => onSelectClaim(claim.id)}
              className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${isFraudRisk ? 'bg-destructive/10' : 'bg-chart-2/10'}`}>
                    <AlertCircle className={`size-5 ${isFraudRisk ? 'text-destructive' : 'text-chart-2'}`} />
                  </div>
                  <div>
                    <h3 className="mb-1">{claim.claimNumber}</h3>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={claim.status} />
                      {isFraudRisk && (
                        <span className="inline-block px-2 py-1 rounded text-xs bg-destructive/20 text-destructive">
                          High Fraud Risk
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <ChevronRight className="size-5 text-muted-foreground" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="size-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Claimant</div>
                    <div>{claim.claimant.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Loss Date</div>
                    <div>{new Date(claim.lossDate).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="size-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Reserve</div>
                    <div>${claim.reserveAmount.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="size-4 text-muted-foreground" />
                  <div>
                    <div className="text-muted-foreground">Policy</div>
                    <div className="truncate">{policy?.policyNumber || 'N/A'}</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <div>
                  Type: {claim.type.replace(/_/g, ' ')} · Adjuster: {claim.adjuster || 'Unassigned'}
                  {claim.fraudScore !== undefined && ` · Fraud Score: ${claim.fraudScore}`}
                </div>
                <div>
                  Paid: ${claim.paidAmount.toLocaleString()} / ${claim.estimatedAmount.toLocaleString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ClaimStatus }) {
  const colors: Record<ClaimStatus, string> = {
    FNOL: 'bg-chart-5/20 text-chart-5',
    ASSIGNED: 'bg-chart-1/20 text-chart-1',
    INVESTIGATING: 'bg-chart-3/20 text-chart-3',
    COVERAGE_REVIEW: 'bg-chart-2/20 text-chart-2',
    APPROVED: 'bg-chart-4/20 text-chart-4',
    SETTLING: 'bg-chart-1/20 text-chart-1',
    PAID: 'bg-chart-4/20 text-chart-4',
    CLOSED: 'bg-muted text-muted-foreground'
  };

  return (
    <span className={`inline-block px-2 py-1 rounded text-xs ${colors[status]}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
