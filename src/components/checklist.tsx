import { Check } from 'lucide-react';
import { toggleCheck, useChecks } from '@/lib/progress';
import { cn } from '@/lib/cn';

/** Checklist com estado persistido em localStorage. */
export function Checklist({ id, items }: { id: string; items: string[] }) {
  const checks = useChecks();
  const marked = checks[id] ?? [];
  return (
    <div className="not-prose my-6 rounded-lg border border-fd-border">
      <div className="flex items-center justify-between border-b border-fd-border px-4 py-2 text-xs font-medium uppercase tracking-wide text-fd-muted-foreground">
        <span>Checklist</span>
        <span className="tabular-nums">
          {marked.length}/{items.length}
        </span>
      </div>
      <ul className="divide-y divide-fd-border">
        {items.map((label, i) => {
          const on = marked.includes(i);
          return (
            <li key={i}>
              <label className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm hover:bg-fd-accent/50">
                <input type="checkbox" className="peer sr-only" checked={on} onChange={() => toggleCheck(id, i)} />
                <span
                  className={cn(
                    'grid size-4 shrink-0 place-items-center rounded border border-fd-border peer-focus-visible:ring-2 peer-focus-visible:ring-fd-ring',
                    on && 'border-fd-primary bg-fd-primary text-fd-primary-foreground',
                  )}
                >
                  {on && <Check className="size-3" strokeWidth={3} />}
                </span>
                <span className={cn(on && 'text-fd-muted-foreground line-through')}>{label}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
