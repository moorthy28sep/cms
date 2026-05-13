import { ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { PERSONAS, type PersonaRole } from '../types/personas';

interface PersonaSwitcherProps {
  currentPersona: PersonaRole;
  onSwitch: (persona: PersonaRole) => void;
}

export function PersonaSwitcher({ currentPersona, onSwitch }: PersonaSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const persona = PERSONAS[currentPersona];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/10 to-chart-5/10 border border-border rounded-xl hover:from-primary/20 hover:to-chart-5/20 transition-all"
      >
        <div className="size-10 bg-gradient-to-br from-primary to-chart-5 rounded-full flex items-center justify-center text-xl shrink-0">
          {persona.avatar}
        </div>
        <div className="flex-1 text-left">
          <div className="text-sm">{persona.name}</div>
          <div className="text-xs text-muted-foreground capitalize">{persona.role.replace(/_/g, ' ')}</div>
        </div>
        <ChevronDown className={`size-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-2 space-y-1 max-h-96 overflow-y-auto">
              {(Object.keys(PERSONAS) as PersonaRole[]).map((role) => {
                const p = PERSONAS[role];
                const isActive = role === currentPersona;

                return (
                  <button
                    key={role}
                    onClick={() => {
                      onSwitch(role);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className={`size-8 ${isActive ? 'bg-primary' : 'bg-muted'} rounded-full flex items-center justify-center text-lg`}>
                      {isActive ? <span className="text-white">{p.avatar}</span> : p.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm">{p.name}</div>
                      <div className="text-xs text-muted-foreground capitalize">{role.replace(/_/g, ' ')}</div>
                    </div>
                    {isActive && (
                      <div className="size-2 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-border p-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                <LogOut className="size-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
