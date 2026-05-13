import { ArrowLeft, FileText, User, Calendar, DollarSign, History, Edit, XCircle } from 'lucide-react';
import { useState } from 'react';
import { mockPolicies, mockAuditEvents } from '../data/mockData';
import type { Policy, PolicyStatus } from '../types';
import type { PolicyDocument } from '../types/documents';
import { getDocuments, addDocument, downloadDocument } from '../types/documents';
import { DocumentManager } from './DocumentManager';

interface PolicyDetailProps {
  policyId: string;
  onBack: () => void;
}

export function PolicyDetail({ policyId, onBack }: PolicyDetailProps) {
  const policy = mockPolicies.find(p => p.id === policyId);

  if (!policy) {
    return (
      <div className="p-8">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="size-4" />
          Back to Policies
        </button>
        <div className="text-center py-12">Policy not found</div>
      </div>
    );
  }

  const policyEvents = mockAuditEvents.filter(e => e.what.resourceId === policyId);
  const [policyDocuments, setPolicyDocuments] = useState<PolicyDocument[]>(getDocuments(policyId));

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" />
          Back to Policies
        </button>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
            <Edit className="size-4" />
            Endorse Policy
          </button>
          <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
            <XCircle className="size-4" />
            Cancel Policy
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/10 via-chart-3/10 to-chart-5/10 border border-primary/20 rounded-xl p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-4 bg-primary rounded-xl">
            <FileText className="size-8 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="mb-2">{policy.policyNumber}</h1>
            <StatusBadge status={policy.status} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <InfoCard
            icon={<User className="size-5 text-primary" />}
            label="Policyholder"
            value={policy.policyholder.name}
            subtitle={policy.policyholder.email}
          />
          <InfoCard
            icon={<DollarSign className="size-5 text-chart-4" />}
            label="Annual Premium"
            value={`$${policy.premium.toFixed(2)}`}
            subtitle="Per year"
          />
          <InfoCard
            icon={<Calendar className="size-5 text-chart-2" />}
            label="Effective Date"
            value={new Date(policy.effectiveDate).toLocaleDateString()}
            subtitle={`Expires ${new Date(policy.expirationDate).toLocaleDateString()}`}
          />
          <InfoCard
            icon={<FileText className="size-5 text-chart-1" />}
            label="Product Type"
            value={policy.productType}
            subtitle={`Version ${policy.version}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <User className="size-5 text-primary" />
            Policyholder Details
          </h3>
          <div className="space-y-3 text-sm">
            <DetailRow label="Name" value={policy.policyholder.name} />
            <DetailRow label="Type" value={policy.policyholder.type} />
            <DetailRow label="Email" value={policy.policyholder.email} />
            <DetailRow label="Phone" value={policy.policyholder.phone} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <FileText className="size-5 text-chart-3" />
            Coverage Summary
          </h3>
          <div className="space-y-3">
            {policy.productType === 'AUTO' && (
              <>
                <CoverageItem name="Bodily Injury Liability" limit="$250,000/$500,000" />
                <CoverageItem name="Property Damage Liability" limit="$100,000" />
                <CoverageItem name="Collision" limit="Actual Cash Value" />
                <CoverageItem name="Comprehensive" limit="Actual Cash Value" deductible="$500" />
              </>
            )}
            {policy.productType === 'HOME' && (
              <>
                <CoverageItem name="Dwelling" limit="$350,000" />
                <CoverageItem name="Personal Property" limit="$175,000" />
                <CoverageItem name="Liability" limit="$300,000" />
                <CoverageItem name="Loss of Use" limit="$70,000" />
              </>
            )}
            {policy.productType === 'COMMERCIAL' && (
              <>
                <CoverageItem name="General Liability" limit="$2,000,000" />
                <CoverageItem name="Property" limit="$500,000" />
                <CoverageItem name="Business Interruption" limit="$250,000" />
                <CoverageItem name="Cyber Liability" limit="$1,000,000" />
              </>
            )}
          </div>
        </div>
      </div>

      <DocumentManager
        documents={policyDocuments}
        onAddDocument={(doc) => {
          setPolicyDocuments([...policyDocuments, doc]);
          addDocument(policyId, doc);
        }}
        onRemoveDocument={(docId) => {
          setPolicyDocuments(policyDocuments.filter(d => d.id !== docId));
        }}
        onDownload={downloadDocument}
        maxFiles={10}
      />

      <div className="flex gap-3 justify-end">
        
        <button className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
          📥 Download Policy
        </button>
      </div>
      
    </div>
  );
}

function StatusBadge({ status }: { status: PolicyStatus }) {
  const colors: Record<PolicyStatus, string> = {
    QUOTE: 'bg-warning text-warning-foreground',
    BOUND: 'bg-info text-info-foreground',
    ACTIVE: 'bg-success text-success-foreground',
    ENDORSED: 'bg-chart-1 text-white',
    RENEWED: 'bg-chart-3 text-white',
    CANCELLED: 'bg-muted text-muted-foreground',
    EXPIRED: 'bg-muted text-muted-foreground'
  };

  return (
    <span className={`inline-block px-3 py-1.5 rounded-lg text-sm ${colors[status]}`}>
      {status}
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

function CoverageItem({ name, limit, deductible }: { name: string; limit: string; deductible?: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border text-sm">
      <span>{name}</span>
      <div className="text-right">
        <div>{limit}</div>
        {deductible && <div className="text-xs text-muted-foreground">Deductible: {deductible}</div>}
      </div>
    </div>
  );
}
