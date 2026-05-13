import { useState } from 'react';
import { X, AlertCircle, Calendar, FileText, User, MapPin } from 'lucide-react';
import type { ClaimType } from '../types';

interface NewClaimFormProps {
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function NewClaimForm({ onClose, onSubmit }: NewClaimFormProps) {
  const [formData, setFormData] = useState({
    policyNumber: '',
    claimType: 'AUTO_COLLISION' as ClaimType,
    lossDate: '',
    lossTime: '',
    description: '',
    location: '',
    policeReport: false,
    reportNumber: '',
    injuries: false,
    estimatedDamage: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2">
            <AlertCircle className="size-5 text-chart-2" />
            First Notice of Loss (FNOL)
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-gradient-to-br from-chart-2/5 to-chart-3/5 rounded-lg p-4 border border-border">
            <h4 className="mb-4 flex items-center gap-2">
              <FileText className="size-4 text-chart-2" />
              Policy Information
            </h4>
            <div>
              <label className="block mb-2 text-sm">Policy Number</label>
              <input
                type="text"
                value={formData.policyNumber}
                onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="AUTO-2026-001234"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">Claim Type</label>
            <select
              value={formData.claimType}
              onChange={(e) => setFormData({ ...formData, claimType: e.target.value as ClaimType })}
              className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="AUTO_COLLISION">Auto Collision</option>
              <option value="PROPERTY_DAMAGE">Property Damage</option>
              <option value="LIABILITY">Liability</option>
              <option value="INJURY">Personal Injury</option>
            </select>
          </div>

          <div className="bg-gradient-to-br from-warning/5 to-destructive/5 rounded-lg p-4 border border-border">
            <h4 className="mb-4 flex items-center gap-2">
              <Calendar className="size-4 text-warning" />
              Loss Information
            </h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm">Loss Date</label>
                  <input
                    type="date"
                    value={formData.lossDate}
                    onChange={(e) => setFormData({ ...formData, lossDate: e.target.value })}
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm">Loss Time</label>
                  <input
                    type="time"
                    value={formData.lossTime}
                    onChange={(e) => setFormData({ ...formData, lossTime: e.target.value })}
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">Location of Loss</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="123 Main St, City, State, ZIP"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm">Description of Loss</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-24"
                  placeholder="Please describe what happened in detail..."
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <input
                type="checkbox"
                id="policeReport"
                checked={formData.policeReport}
                onChange={(e) => setFormData({ ...formData, policeReport: e.target.checked })}
                className="size-4 accent-primary"
              />
              <label htmlFor="policeReport" className="flex-1 text-sm cursor-pointer">
                Police report filed
              </label>
            </div>

            {formData.policeReport && (
              <div className="ml-7">
                <label className="block mb-2 text-sm">Report Number</label>
                <input
                  type="text"
                  value={formData.reportNumber}
                  onChange={(e) => setFormData({ ...formData, reportNumber: e.target.value })}
                  className="w-full px-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Report #12345"
                />
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <input
                type="checkbox"
                id="injuries"
                checked={formData.injuries}
                onChange={(e) => setFormData({ ...formData, injuries: e.target.checked })}
                className="size-4 accent-destructive"
              />
              <label htmlFor="injuries" className="flex-1 text-sm cursor-pointer">
                Injuries reported
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2">Estimated Damage Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input
                type="number"
                value={formData.estimatedDamage}
                onChange={(e) => setFormData({ ...formData, estimatedDamage: e.target.value })}
                className="w-full pl-8 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="5000"
              />
            </div>
          </div>

          <div className="bg-success/10 border border-success/30 rounded-lg p-4">
            <h4 className="mb-2 text-success">🤖 Automated Processing</h4>
            <p className="text-sm text-muted-foreground">
              Upon submission, our AI agents will:
            </p>
            <ul className="text-sm text-muted-foreground mt-2 space-y-1">
              <li>• Verify policy coverage and applicability</li>
              <li>• Assign an adjuster based on workload and expertise</li>
              <li>• Run fraud detection analysis</li>
              <li>• Set initial reserve amount</li>
              <li>• Send confirmation to all parties</li>
            </ul>
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
              className="flex-1 px-4 py-2 bg-chart-2 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
