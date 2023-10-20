export function ColorPalette() {
  return (
    <article className="flex flex-col border rounded p-4 mt-4 gap-2">
      <h2 className="font-bold">Paleta de Cores</h2>

      <span className="bg-background text-foreground border p-1 border rounded px-2 ">
        background
      </span>

      <span className="bg-foreground text-background border rounded p-1 px-2">
        foreground
      </span>

      <span className="bg-primary text-primary-foreground p-1 border rounded  px-2 ">
        primary
      </span>
      <span className="bg-primary-foreground text-primary border rounded p-1 px-2">
        primary-foreground
      </span>

      <span className="bg-secondary text-secondary-foreground p-1 border rounded  px-2 ">
        secondary
      </span>
      <span className="bg-secondary-foreground text-secondary border rounded p-1 px-2">
        secondary-foreground
      </span>

      <span className="bg-card text-card-foreground p-1 border rounded  px-2 ">
        card
      </span>
      <span className="bg-card-foreground text-card border rounded p-1 px-2">
        card-foreground
      </span>

      <span className="bg-surface text-surface-foreground p-1 border rounded  px-2 ">
        surface
      </span>
      <span className="bg-surface-foreground text-surface border rounded p-1 px-2">
        surface-foreground
      </span>

      <span className="bg-disabled text-disabled-foreground p-1 border rounded  px-2 ">
        disabled
      </span>
      <span className="bg-disabled-foreground text-disabled border rounded p-1 px-2">
        disabled-foreground
      </span>

      <span className="bg-destructive text-destructive-foreground p-1 border rounded  px-2 ">
        destructive
      </span>
      <span className="bg-destructive-foreground border rounded p-1 px-2">
        destructive-foreground
      </span>
    </article>
  );
}
