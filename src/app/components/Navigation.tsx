import { LayoutDashboard, AlertCircle, History, Bot, Info, Book, GitBranch, FileText } from 'lucide-react';

export type View = 'dashboard' | 'policies' | 'claims' | 'audit' | 'agents' | 'architecture' | 'diagrams' | 'readme';

interface NavigationProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export function Navigation({ currentView, onNavigate }: NavigationProps) {
  const navItems: { view: View; label: string; icon: React.ReactNode }[] = [
    
    { view: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="size-5" /> },
    { view: 'policies', label: 'Policies', icon: <FileText className="size-5" /> },
    { view: 'claims', label: 'Claims', icon: <AlertCircle className="size-5" /> },
    { view: 'agents', label: 'AI Agents', icon: <Bot className="size-5" /> },
    //{ view: 'audit', label: 'Audit Trail', icon: <History className="size-5" /> },
    { view: 'diagrams', label: 'Diagrams', icon: <GitBranch className="size-5" /> },
    //{ view: 'readme', label: 'README', icon: <Book className="size-5" /> },
    //{ view: 'architecture', label: 'Tech Specs', icon: <Info className="size-5" /> }
  ];

  return (
    <nav className="flex-1 space-y-2">
      

      {navItems.map(item => (
        <button
          key={item.view}
          onClick={() => onNavigate(item.view)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            currentView === item.view
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-muted text-foreground'
          }`}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
