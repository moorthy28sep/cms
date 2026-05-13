import { X, Download, FileText, Eye } from 'lucide-react';
import type { PolicyDocument } from '../types/documents';

interface DocumentPreviewProps {
  document: PolicyDocument;
  onClose: () => void;
  onDownload: (doc: PolicyDocument) => void;
}

export function DocumentPreview({ document, onClose, onDownload }: DocumentPreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="size-5 text-primary" />
            <div>
              <h2 className="font-semibold">{document.name}</h2>
              <p className="text-sm text-muted-foreground">
                {(document.size / 1024).toFixed(1)} KB • {new Date(document.uploadedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-muted/20 to-muted/5">
          {/* PDF Preview Mockup */}
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-4 text-gray-900">
            {/* Document Header */}
            <div className="text-center pb-6 border-b border-gray-300">
              <h1 className="text-2xl font-bold">INSURANCE POLICY DOCUMENT</h1>
              <p className="text-sm text-gray-600 mt-2">Document ID: {document.id}</p>
            </div>

            {/* Policy Details */}
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-4">POLICYHOLDER INFORMATION</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Name:</p>
                    <p className="font-semibold">John Smith</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-semibold">john.smith@email.com</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone:</p>
                    <p className="font-semibold">(555) 123-4567</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Policy Number:</p>
                    <p className="font-semibold">AUTO-2026-001234</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">COVERAGE DETAILS</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coverage Type:</span>
                    <span className="font-semibold">Auto Insurance - Full Coverage</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Effective Date:</span>
                    <span className="font-semibold">January 15, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expiration Date:</span>
                    <span className="font-semibold">January 15, 2027</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Premium:</span>
                    <span className="font-semibold">$1,245.00</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">VEHICLE INFORMATION</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle:</span>
                    <span className="font-semibold">2023 Toyota Camry</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">VIN:</span>
                    <span className="font-semibold">4T1BF1AK5CU123456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mileage:</span>
                    <span className="font-semibold">12,450 miles</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-4">COVERAGES & LIMITS</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bodily Injury Liability:</span>
                    <span className="font-semibold">$100,000 / $300,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Damage Liability:</span>
                    <span className="font-semibold">$100,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Collision:</span>
                    <span className="font-semibold">$500 Deductible</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Comprehensive:</span>
                    <span className="font-semibold">$250 Deductible</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-300">
                <p className="text-xs text-gray-600">
                  This document is a sample preview of the insurance policy. For complete terms and conditions, please refer to the full policy document.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border p-6 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => onDownload(document)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Download className="size-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
