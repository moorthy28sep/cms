import { Policy, Claim } from './index';

export type DocumentType = 'POLICY' | 'QUOTE' | 'CLAIM_DOCUMENT' | 'RECEIPT' | 'INVOICE' | 'REPORT' | 'EVIDENCE';

export interface PolicyDocument {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  uploadedDate: string;
  uploadedBy: string;
  url?: string;
}

export interface QuoteWithDocuments extends Omit<Policy, 'status'> {
  status: 'QUOTE';
  documents: PolicyDocument[];
}

export interface ClaimWithDocuments extends Claim {
  documents: PolicyDocument[];
  policyDocuments?: PolicyDocument[];
}

// Mock document storage - in real app, this would be S3 or similar
export const mockDocuments: Map<string, PolicyDocument[]> = new Map();

// Initialize with mock data
export function initializeDocuments(mockDocData: Record<string, any>): void {
  Object.entries(mockDocData).forEach(([entityId, docs]) => {
    mockDocuments.set(entityId, docs as PolicyDocument[]);
  });
}

export function addDocument(entityId: string, document: PolicyDocument): void {
  if (!mockDocuments.has(entityId)) {
    mockDocuments.set(entityId, []);
  }
  mockDocuments.get(entityId)?.push(document);
}

export function getDocuments(entityId: string): PolicyDocument[] {
  return mockDocuments.get(entityId) || [];
}

export function downloadDocument(doc: PolicyDocument): void {
  // Simulate document download - in real app would be actual file download
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(
      `Document: ${doc.name}\nSize: ${doc.size} bytes\nUploaded: ${doc.uploadedDate}\nUploaded By: ${doc.uploadedBy}`
    )}`
  );
  element.setAttribute('download', doc.name);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
