import { History, User, Calendar, FileEdit, Bot, Monitor } from 'lucide-react';
import { mockAuditEvents } from '../data/mockData';

export function AuditTrail() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="mb-2">Audit Trail</h1>
        <p className="text-muted-foreground">Complete immutable record of all system actions and state changes</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <History className="size-5" />
          <h3>Recent Activity</h3>
        </div>

        <div className="space-y-4">
          {mockAuditEvents.map((event, index) => {
            const isAgent = event.how.source === 'AGENT';
            const timestamp = new Date(event.timestamp);

            return (
              <div key={event.id} className="relative">
                {index < mockAuditEvents.length - 1 && (
                  <div className="absolute left-5 top-12 w-0.5 h-full bg-border" />
                )}

                <div className="flex gap-4">
                  <div className={`shrink-0 size-10 rounded-full flex items-center justify-center ${
                    isAgent ? 'bg-chart-5/10' : 'bg-primary/10'
                  }`}>
                    {isAgent ? (
                      <Bot className={`size-5 text-chart-5`} />
                    ) : (
                      <User className={`size-5 text-primary`} />
                    )}
                  </div>

                  <div className="flex-1 bg-muted/30 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4>{event.who.userName}</h4>
                        <div className="text-sm text-muted-foreground">{event.who.role}</div>
                      </div>
                      <div className="text-sm text-muted-foreground text-right">
                        {timestamp.toLocaleDateString()} {timestamp.toLocaleTimeString()}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <FileEdit className="size-4 text-muted-foreground" />
                      <span className="text-sm">
                        <span className="text-foreground">{event.what.action}</span>
                        {' '}on{' '}
                        <span className="text-foreground">{event.what.resourceType}</span>
                        {' '}
                        <span className="text-muted-foreground text-xs">({event.what.resourceId})</span>
                      </span>
                    </div>

                    {event.why && (
                      <div className="text-sm mb-2 bg-background/50 p-2 rounded">
                        <span className="text-muted-foreground">Reason:</span> {event.why}
                      </div>
                    )}

                    {event.previousState && event.newState && (
                      <div className="grid grid-cols-2 gap-3 text-xs mt-3 pt-3 border-t border-border">
                        <div>
                          <div className="text-muted-foreground mb-1">Previous State</div>
                          <pre className="bg-background p-2 rounded overflow-x-auto">
                            {JSON.stringify(event.previousState, null, 2)}
                          </pre>
                        </div>
                        <div>
                          <div className="text-muted-foreground mb-1">New State</div>
                          <pre className="bg-background p-2 rounded overflow-x-auto">
                            {JSON.stringify(event.newState, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Monitor className="size-3" />
                        Source: {event.how.source}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {timestamp.toISOString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-accent/50 border border-border rounded-lg p-4">
        <h4 className="mb-2">Audit Capabilities</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• <strong>Immutable Record:</strong> All events stored in append-only audit log (S3 Parquet format)</li>
          <li>• <strong>Complete Context:</strong> WHO, WHAT, WHEN, WHY, HOW captured for every action</li>
          <li>• <strong>Point-in-Time Reconstruction:</strong> Query any resource state at any historical timestamp</li>
          <li>• <strong>Compliance Ready:</strong> SOC 2, GDPR, state insurance regulations with 7-year retention</li>
          <li>• <strong>Agent Traceability:</strong> All AI agent actions logged with model version and confidence scores</li>
        </ul>
      </div>
    </div>
  );
}
