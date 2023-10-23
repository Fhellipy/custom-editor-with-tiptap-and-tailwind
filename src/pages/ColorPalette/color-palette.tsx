import { ChevronDown } from "lucide-react";

export function ColorPalette() {
  return (
    <details className="group flex flex-col border rounded p-4">
      <summary className="flex items-center justify-between relative cursor-pointer p-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:rounded">
        <h1 className="font-bold uppercase">Paleta de Cores</h1>
        <ChevronDown className="w-6 h-6 shrink-0 transition-transform duration-300 transform rotate-0 group-open:rotate-180" />
      </summary>

      <div className="flex flex-col py-4 gap-2">
        <span className="bg-background text-foreground border p-1 rounded px-2">
          background
        </span>
        <span className="bg-foreground text-background border rounded p-1 px-2">
          foreground
        </span>

        <span className="bg-primary text-primary-foreground p-1 border rounded px-2">
          primary
        </span>
        <span className="bg-primary-foreground text-primary border rounded p-1 px-2">
          primary-foreground
        </span>

        <span className="bg-secondary text-secondary-foreground p-1 border rounded px-2">
          secondary
        </span>
        <span className="bg-secondary-foreground text-secondary border rounded p-1 px-2">
          secondary-foreground
        </span>

        <span className="bg-card text-card-foreground p-1 border rounded px-2">
          card
        </span>
        <span className="bg-card-foreground text-card border rounded p-1 px-2">
          card-foreground
        </span>

        <span className="bg-surface text-surface-foreground p-1 border rounded px-2">
          surface
        </span>
        <span className="bg-surface-foreground text-surface border rounded p-1 px-2">
          surface-foreground
        </span>

        <span className="bg-disabled text-disabled-foreground p-1 border rounded px-2 ">
          disabled
        </span>
        <span className="bg-disabled-foreground text-disabled border rounded p-1 px-2">
          disabled-foreground
        </span>

        <span className="bg-destructive text-destructive-foreground p-1 border rounded px-2 ">
          destructive
        </span>
        <span className="bg-destructive-foreground border rounded p-1 px-2">
          destructive-foreground
        </span>
      </div>
    </details>
  );
}
