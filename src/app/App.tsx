'use client';

import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { Navigation, View } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { PolicyList } from './components/PolicyList';
import { PolicyDetail } from './components/PolicyDetail';
import { ClaimsList } from './components/ClaimsList';
import { ClaimDetail } from './components/ClaimDetail';
import { AuditTrail } from './components/AuditTrail';
import { AgentDashboard } from './components/AgentDashboard';
import { ArchitectureView } from './components/ArchitectureView';
import { ArchitectureDiagrams } from './components/ArchitectureDiagrams';
import { ReadmeView } from './components/ReadmeView';
import { NewQuoteForm } from './components/NewQuoteForm';
import { NewClaimForm } from './components/NewClaimForm';
import { PersonaSwitcher } from './components/PersonaSwitcher';
import { PersonaDashboard } from './components/PersonaDashboard';
import { toast } from 'sonner';
import { Toaster } from './components/Toaster';
import type { PersonaRole } from './types/personas';
import { initializeDocuments } from './types/documents';
import { mockDocuments as mockDocumentsData } from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const [showNewQuoteForm, setShowNewQuoteForm] = useState(false);
  const [showNewClaimForm, setShowNewClaimForm] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<PersonaRole>('policyholder');

  useEffect(() => {
    // Initialize documents from mock data
    initializeDocuments(mockDocumentsData);
  }, []);

  const handleSelectPolicy = (id: string) => {
    setSelectedPolicyId(id);
  };

  const handleBackToPolicies = () => {
    setSelectedPolicyId(null);
  };

  const handleSelectClaim = (id: string) => {
    setSelectedClaimId(id);
  };

  const handleBackToClaims = () => {
    setSelectedClaimId(null);
  };

  const handleNewQuote = (data: any) => {
    console.log('New quote:', data);
    toast.success('Quote generated successfully!', {
      description: `Premium calculated: $${Math.floor(Math.random() * 2000 + 800)} annually`
    });
    setShowNewQuoteForm(false);
  };

  const handleNewClaim = (data: any) => {
    console.log('New claim:', data);
    toast.success('Claim submitted successfully!', {
      description: 'Adjuster assigned. Fraud detection analysis in progress.'
    });
    setShowNewClaimForm(false);
  };

  const handlePersonaSwitch = (persona: PersonaRole) => {
    setCurrentPersona(persona);
    setCurrentView('dashboard');
    toast.success(`Switched to ${persona.replace(/_/g, ' ')} view`, {
      description: `Welcome to your personalized dashboard`
    });
  };

  const renderView = () => {
    if (currentView === 'policies') {
      if (selectedPolicyId) {
        return <PolicyDetail policyId={selectedPolicyId} onBack={handleBackToPolicies} />;
      }
      return <PolicyList onSelectPolicy={handleSelectPolicy} onNewQuote={() => setShowNewQuoteForm(true)} />;
    }

    if (currentView === 'claims') {
      if (selectedClaimId) {
        return <ClaimDetail claimId={selectedClaimId} onBack={handleBackToClaims} />;
      }
      return <ClaimsList onSelectClaim={handleSelectClaim} onNewClaim={() => setShowNewClaimForm(true)} />;
    }

    switch (currentView) {
      case 'dashboard':
        return <PersonaDashboard persona={currentPersona} />;
      case 'audit':
        return <AuditTrail />;
      case 'agents':
        return <AgentDashboard />;
      case 'architecture':
        return <ArchitectureView />;
      case 'diagrams':
        return <ArchitectureDiagrams />;
      case 'readme':
        return <ReadmeView />;
      default:
        return <PersonaDashboard persona={currentPersona} />;
    }
  };

  return (
    <div className="size-full flex bg-background">
      <div className="bg-gradient-to-b from-primary/5 to-background border-r border-border w-64 p-6 space-y-6 flex flex-col">
        <div className="mb-2">
          <div className="size-12 bg-gradient-to-br from-primary to-chart-5 rounded-xl flex items-center justify-center mb-3 shadow-lg">
            <FileText className="size-6 text-white" />
          </div>
          <h2 className="mb-1">AIQ PAS/CMS</h2>
          <p className="text-xs text-muted-foreground">AI-Grade Platform</p>
        </div>

        <PersonaSwitcher currentPersona={currentPersona} onSwitch={handlePersonaSwitch} />

        <Navigation currentView={currentView} onNavigate={(view) => {
          setCurrentView(view);
          setSelectedPolicyId(null);
          setSelectedClaimId(null);
        }} />
      </div>
      <main className="flex-1 overflow-y-auto">
        {renderView()}
      </main>

      {showNewQuoteForm && (
        <NewQuoteForm onClose={() => setShowNewQuoteForm(false)} onSubmit={handleNewQuote} />
      )}

      {showNewClaimForm && (
        <NewClaimForm onClose={() => setShowNewClaimForm(false)} onSubmit={handleNewClaim} />
      )}

      <Toaster />
    </div>
  );
}