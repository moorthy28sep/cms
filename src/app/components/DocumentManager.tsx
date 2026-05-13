import { Upload, Download, X, FileText, Eye } from 'lucide-react';
import { useState } from 'react';
import type { PolicyDocument } from '../types/documents';
import { DocumentPreview } from './DocumentPreview';

interface DocumentManagerProps {
  documents: PolicyDocument[];
  onAddDocument: (doc: PolicyDocument) => void;
  onRemoveDocument: (docId: string) => void;
  onDownload: (doc: PolicyDocument) => void;
  maxFiles?: number;
}

export function DocumentManager({
  documents,
  onAddDocument,
  onRemoveDocument,
  onDownload,
  maxFiles = 5
}: DocumentManagerProps) {
  const [previewDoc, setPreviewDoc] = useState<PolicyDocument | null>(null);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    if (documents.length + files.length > maxFiles) {
      alert(`Maximum ${maxFiles} documents allowed`);
      return;
    }

    Array.from(files).forEach((file) => {
      const newDoc: PolicyDocument = {
        id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: 'DOCUMENT' as any,
        size: file.size,
        uploadedDate: new Date().toISOString(),
        uploadedBy: 'Current User',
        url: URL.createObjectURL(file)
      };
      onAddDocument(newDoc);
    });

    e.currentTarget.value = '';
  };

  return (
    <div className="bg-gradient-to-br from-chart-4/5 to-chart-5/5 rounded-xl border border-border p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="flex items-center gap-2">
          <FileText className="size-5 text-primary" />
          Documents
        </h4>
        <span className="text-xs text-muted-foreground">
          {documents.length}/{maxFiles}
        </span>
      </div>

      {/* Upload Section */}
      <div className="relative">
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.png"
          onChange={handleFileUpload}
          className="hidden"
          id="document-upload"
          disabled={documents.length >= maxFiles}
        />
        <label
          htmlFor="document-upload"
          className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed transition-colors cursor-pointer ${
            documents.length >= maxFiles
              ? 'border-muted bg-muted/50 cursor-not-allowed opacity-50'
              : 'border-primary/30 hover:border-primary/60 bg-primary/5 hover:bg-primary/10'
          }`}
        >
          <Upload className="size-4 text-primary" />
          <span className="text-sm">
            {documents.length >= maxFiles ? 'Max documents reached' : 'Click to upload documents'}
          </span>
        </label>
      </div>

      {/* Documents List */}
      {documents.length > 0 && (
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 rounded-lg bg-card border border-border"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <FileText className="size-4 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm truncate">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(doc.size / 1024).toFixed(1)} KB • {new Date(doc.uploadedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="p-1.5 rounded hover:bg-primary/10 transition-colors"
                  title="Preview"
                >
                  <Eye className="size-4 text-primary" />
                </button>
                <button
                  onClick={() => onDownload(doc)}
                  className="p-1.5 rounded hover:bg-muted transition-colors"
                  title="Download"
                >
                  <Download className="size-4 text-muted-foreground hover:text-foreground" />
                </button>
                <button
                  onClick={() => onRemoveDocument(doc.id)}
                  className="p-1.5 rounded hover:bg-destructive/10 transition-colors"
                  title="Remove"
                >
                  <X className="size-4 text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {documents.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-2">
          No documents uploaded yet
        </p>
      )}

      {previewDoc && (
        <DocumentPreview
          document={previewDoc}
          onClose={() => setPreviewDoc(null)}
          onDownload={onDownload}
        />
      )}
    </div>
  );
}
