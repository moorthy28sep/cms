import { useState } from 'react';
import { X, User, Mail, Phone, FileText, DollarSign, Calendar } from 'lucide-react';
import type { ProductType } from '../types';
import type { PolicyDocument } from '../types/documents';
import { DocumentManager } from './DocumentManager';
import { downloadDocument } from '../types/documents';

interface NewQuoteFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function NewQuoteForm({ onClose, onSubmit }: NewQuoteFormProps) {
  const [formData, setFormData] = useState({
    productType: 'AUTO' as ProductType,
    holderName: '',
    holderEmail: '',
    holderPhone: '',
    effectiveDate: '',
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    driverAge: '',
    propertyValue: '',
    zipCode: ''
  });

  const [documents, setDocuments] = useState<PolicyDocument[]>([]);

  const handleAddDocument = (doc: PolicyDocument) => {
    setDocuments([...documents, doc]);
  };

  const handleRemoveDocument = (docId: string) => {
    setDocuments(documents.filter(d => d.id !== docId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      documents
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            New Quote Request
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block mb-2">Product Type</label>
            <select
              value={formData.productType}
              onChange={(e) => setFormData({ ...formData, productType: e.target.value as ProductType })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="AUTO">Auto Insurance</option>
              <option value="HOME">Home Insurance</option>
              <option value="LIFE">Life Insurance</option>
              <option value="COMMERCIAL">Commercial Insurance</option>
            </select>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-chart-3/5 rounded-lg p-4 border border-border">
            <h4 className="mb-4 flex items-center gap-2">
              <User className="size-4 text-primary" />
              Policyholder Information
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm">Full Name</label>
                <input
                  type="text"
                  value={formData.holderName}
                  onChange={(e) => setFormData({ ...formData, holderName: e.target.value })}
                  className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="John Smith"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={formData.holderEmail}
                      onChange={(e) => setFormData({ ...formData, holderEmail: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="john@email.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={formData.holderPhone}
                      onChange={(e) => setFormData({ ...formData, holderPhone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {formData.productType === 'AUTO' && (
            <div className="bg-gradient-to-br from-chart-1/5 to-chart-4/5 rounded-lg p-4 border border-border">
              <h4 className="mb-4">Vehicle Information</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-2 text-sm">Year</label>
                    <input
                      type="number"
                      value={formData.vehicleYear}
                      onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                      className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="2024"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Make</label>
                    <input
                      type="text"
                      value={formData.vehicleMake}
                      onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                      className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Toyota"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Model</label>
                    <input
                      type="text"
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                      className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Camry"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm">Driver Age</label>
                    <input
                      type="number"
                      value={formData.driverAge}
                      onChange={(e) => setFormData({ ...formData, driverAge: e.target.value })}
                      className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="28"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Zip Code</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="12345"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {formData.productType === 'HOME' && (
            <div className="bg-gradient-to-br from-chart-2/5 to-chart-5/5 rounded-lg p-4 border border-border">
              <h4 className="mb-4">Property Information</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm">Property Value</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input
                        type="number"
                        value={formData.propertyValue}
                        onChange={(e) => setFormData({ ...formData, propertyValue: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="350000"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm">Zip Code</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="12345"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block mb-2">Effective Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="date"
                value={formData.effectiveDate}
                onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <DocumentManager
            documents={documents}
            onAddDocument={handleAddDocument}
            onRemoveDocument={handleRemoveDocument}
            onDownload={downloadDocument}
            maxFiles={5}
          />

          <div className="bg-info/10 border border-info/30 rounded-lg p-4">
            <h4 className="mb-2 text-info">✨ AI-Powered Underwriting</h4>
            <p className="text-sm text-muted-foreground">
              Our underwriting assistant will analyze this application and provide a risk assessment with recommended pricing in real-time.
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
            >
              Generate Quote
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
