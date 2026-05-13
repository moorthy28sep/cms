interface PersonaTagProps {
  icon: string;
  role: string;
  focus: string;
}

export function PersonaTag({ icon, role, focus }: PersonaTagProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-3 text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-sm mb-1">{role}</div>
      <div className="text-xs text-muted-foreground">{focus}</div>
    </div>
  );
}
