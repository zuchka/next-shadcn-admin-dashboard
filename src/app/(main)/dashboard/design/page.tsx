export default function Page() {
  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Design System</h1>
        <p className="text-muted-foreground">A comprehensive collection of reusable components and design patterns.</p>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Banners</h2>
          <p className="text-muted-foreground text-sm">Banner components and variations will be displayed here.</p>
        </div>

        {/* Content will be added later */}
        <div className="rounded-lg border border-dashed border-muted-foreground/25 p-8 text-center">
          <p className="text-muted-foreground">Content coming soon...</p>
        </div>
      </div>
    </div>
  );
}
