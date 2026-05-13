import { ArrowLeft, AlertCircle, User, Calendar, DollarSign, FileText, Shield, History, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { mockClaims, mockPolicies, mockAuditEvents, mockAgentActions } from '../data/mockData';
import type { ClaimStatus } from '../types';
import type { PolicyDocument } from '../types/documents';
import { getDocuments, addDocument, downloadDocument } from '../types/documents';
import { DocumentManager } from './DocumentManager';

interface ClaimDetailProps {
  claimId: string;
  onBack: () => void;
}

export function ClaimDetail({ claimId, onBack }: ClaimDetailProps) {
  const claim = mockClaims.find(c => c.id === claimId);
  const policy = claim ? mockPolicies.find(p => p.id === claim.policyId) : null;
  
  const [claimDocuments, setClaimDocuments] = useState<PolicyDocument[]>(getDocuments(claimId));

  if (!claim) {
    return (
      <div className="p-8">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="size-4" />
          Back to Claims
        </button>
        <div className="text-center py-12">Claim not found</div>
      </div>
    );
  }

  const isFraudRisk = (claim.fraudScore || 0) > 60;
  const claimEvents = mockAuditEvents.filter(e => e.what.resourceId === claimId);
  const relatedAgentActions = mockAgentActions.filter(a => a.id.includes(claimId.slice(-3)));

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back to Claims
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-success text-success-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
            <CheckCircle className="size-4" />
            Approve Claim
          </button>
          <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
            <XCircle className="size-4" />
            Deny Claim
          </button>
        </div>
      </div>

      <div className={`bg-gradient-to-br ${isFraudRisk ? 'from-destructive/10 via-warning/10 to-destructive/5' : 'from-chart-2/10 via-chart-3/10 to-chart-4/10'} border ${isFraudRisk ? 'border-destructive/20' : 'border-chart-2/20'} rounded-xl p-8`}>
        <div className="flex items-start gap-4 mb-6">
          <div className={`p-4 rounded-xl ${isFraudRisk ? 'bg-destructive' : 'bg-chart-2'}`}>
            <AlertCircle className="size-8 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="mb-2">{claim.claimNumber}</h1>
            <div className="flex items-center gap-2">
              <StatusBadge status={claim.status} />
              {isFraudRisk && (
                <span className="inline-block px-3 py-1.5 rounded-lg text-sm bg-destructive text-destructive-foreground">
                  ⚠️ High Fraud Risk: {claim.fraudScore}%
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard
            icon={<User className="size-5 text-chart-2" />}
            label="Claimant"
            value={claim.claimant.name}
            subtitle={claim.adjuster || 'Unassigned'}
          />
          <InfoCard
            icon={<DollarSign className="size-5 text-chart-4" />}
            label="Reserve Amount"
            value={`$${claim.reserveAmount.toLocaleString()}`}
            subtitle={`Paid: $${claim.paidAmount.toLocaleString()}`}
          />
          <InfoCard
            icon={<Calendar className="size-5 text-chart-3" />}
            label="Loss Date"
            value={new Date(claim.lossDate).toLocaleDateString()}
            subtitle={`Reported: ${new Date(claim.reportedDate).toLocaleDateString()}`}
          />
          <InfoCard
            icon={<Shield className="size-5 text-chart-1" />}
            label="Policy"
            value={policy?.policyNumber || 'N/A'}
            subtitle={claim.type.replace(/_/g, ' ')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            Claim Details
          </h3>
          <div className="space-y-3 text-sm">
            <DetailRow label="Claim Number" value={claim.claimNumber} />
            <DetailRow label="Claim Type" value={claim.type.replace(/_/g, ' ')} />
            <DetailRow label="Status" value={claim.status.replace(/_/g, ' ')} />
            <DetailRow label="Loss Date" value={new Date(claim.lossDate).toLocaleDateString()} />
            <DetailRow label="Reported Date" value={new Date(claim.reportedDate).toLocaleDateString()} />
            <DetailRow label="Adjuster" value={claim.adjuster || 'Unassigned'} />
            <DetailRow label="Version" value={claim.version.toString()} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <DollarSign className="size-5 text-chart-4" />
            Financial Summary
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Reserve Amount</span>
                <span className="text-lg">${claim.reserveAmount.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-1" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Estimated Amount</span>
                <span className="text-lg">${claim.estimatedAmount.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-chart-3" style={{ width: `${(claim.estimatedAmount / claim.reserveAmount) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Paid Amount</span>
                <span className="text-lg text-success">${claim.paidAmount.toLocaleString()}</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success" style={{ width: `${(claim.paidAmount / claim.reserveAmount) * 100}%` }} />
              </div>
            </div>

            <div className="pt-3 border-t border-border">
              <div className="flex justify-between">
                <span className="text-sm">Outstanding</span>
                <span className="text-lg">${(claim.estimatedAmount - claim.paidAmount).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DocumentManager
        documents={claimDocuments}
        onAddDocument={(doc) => {
          setClaimDocuments([...claimDocuments, doc]);
          addDocument(claimId, doc);
        }}
        onRemoveDocument={(docId) => {
          setClaimDocuments(claimDocuments.filter(d => d.id !== docId));
        }}
        onDownload={downloadDocument}
        maxFiles={10}
      />

      <div className="flex gap-3 justify-end">
        <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
          📥 Download Claim
        </button>
        
      </div>

      {relatedAgentActions.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <Shield className="size-5 text-chart-5" />
            AI Agent Analysis
          </h3>
          <div className="space-y-3">
            {relatedAgentActions.map(action => (
              <div key={action.id} className="bg-gradient-to-r from-chart-5/10 to-transparent rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm">{action.agentName}</h4>
                    <div className="text-xs text-muted-foreground">{action.action}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Confidence: </span>
                      <span className={action.confidence >= 0.8 ? 'text-success' : 'text-warning'}>
                        {(action.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-sm bg-background/50 p-3 rounded mt-2">{action.output}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <History className="size-5 text-chart-3" />
          Claim Timeline
        </h3>
        {claimEvents.length > 0 ? (
          <div className="space-y-3">
            {claimEvents.map(event => (
              <div key={event.id} className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm">{event.what.action}</h4>
                    <div className="text-xs text-muted-foreground">{event.who.userName} ({event.who.role})</div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleString()}
                  </div>
                </div>
                {event.why && <div className="text-sm text-muted-foreground mt-2">{event.why}</div>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">No timeline events found</div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ClaimStatus }) {
  const colors: Record<ClaimStatus, string> = {
    FNOL: 'bg-warning text-warning-foreground',
    ASSIGNED: 'bg-chart-1 text-white',
    INVESTIGATING: 'bg-chart-3 text-white',
    COVERAGE_REVIEW: 'bg-info text-info-foreground',
    APPROVED: 'bg-success text-success-foreground',
    SETTLING: 'bg-chart-1 text-white',
    PAID: 'bg-success text-success-foreground',
    CLOSED: 'bg-muted text-muted-foreground'
  };

  return (
    <span className={`inline-block px-3 py-1.5 rounded-lg text-sm ${colors[status]}`}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle: string;
}

function InfoCard({ icon, label, value, subtitle }: InfoCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="mb-1">{value}</div>
      <div className="text-sm text-muted-foreground">{subtitle}</div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-border">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
