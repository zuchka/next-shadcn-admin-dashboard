"use client";

import { useState } from "react";
import { Banner } from "@/components/ui/banner";

const CodeBlock = ({ children, title }: { children: string; title: string }) => (
  <div className="space-y-2">
    <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</h4>
    <pre className="bg-muted/50 rounded-lg p-3 text-xs overflow-x-auto">
      <code>{children}</code>
    </pre>
  </div>
);

const BannerExample = ({ title, code, children }: { title: string; code: string; children: React.ReactNode }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">{title}</h3>
    <div className="space-y-4">
      <CodeBlock title="React Code" children={code} />
      <div className="space-y-4">{children}</div>
    </div>
  </div>
);

export default function Page() {
  const [dismissedBanners, setDismissedBanners] = useState<Set<string>>(new Set());

  const handleDismiss = (id: string) => {
    setDismissedBanners((prev) => new Set([...prev, id]));
  };

  const resetDismissed = () => {
    setDismissedBanners(new Set());
  };

  return (
    <div className="@container/main flex flex-col gap-6 md:gap-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Design System</h1>
        <p className="text-muted-foreground">A comprehensive collection of reusable components and design patterns.</p>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Banners</h2>
            <p className="text-muted-foreground text-sm">
              Banner components for displaying important information with optional actions.
            </p>
          </div>
          <button onClick={resetDismissed} className="text-xs text-muted-foreground hover:text-foreground underline">
            Reset dismissed banners
          </button>
        </div>

        {/* Inline Variants */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Inline Banners</h3>
            <p className="text-sm text-muted-foreground mb-6">Single line banners with actions and dismiss options.</p>
          </div>

          {/* Inline Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CodeBlock
              title="Inline Info Banner"
              children={`<Banner
  layout="inline"
  variant="info"
  primaryAction={{ label: "Primary Action", onClick: () => {} }}
  onDismiss={() => {}}
>
  Single line information with an action and dismiss option
</Banner>`}
            />
            <div className="flex items-center">
              {!dismissedBanners.has("inline-info") && (
                <Banner
                  layout="inline"
                  variant="info"
                  primaryAction={{ label: "Primary Action", onClick: () => console.log("Primary clicked") }}
                  onDismiss={() => handleDismiss("inline-info")}
                >
                  Single line information with an action and dismiss option
                </Banner>
              )}
            </div>
          </div>

          {/* Inline Neutral */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CodeBlock
              title="Inline Neutral Banner"
              children={`<Banner
  layout="inline"
  variant="info-neutral"
  primaryAction={{ label: "Primary Action", onClick: () => {} }}
  onDismiss={() => {}}
>
  Single line information with an action and dismiss option
</Banner>`}
            />
            <div className="flex items-center">
              {!dismissedBanners.has("inline-neutral") && (
                <Banner
                  layout="inline"
                  variant="info-neutral"
                  primaryAction={{ label: "Primary Action", onClick: () => console.log("Primary clicked") }}
                  onDismiss={() => handleDismiss("inline-neutral")}
                >
                  Single line information with an action and dismiss option
                </Banner>
              )}
            </div>
          </div>

          {/* Inline Error */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CodeBlock
              title="Inline Error Banner"
              children={`<Banner
  layout="inline"
  variant="error"
  primaryAction={{ label: "Primary Action", onClick: () => {} }}
  onDismiss={() => {}}
>
  Single line information with an action and dismiss option
</Banner>`}
            />
            <div className="flex items-center">
              {!dismissedBanners.has("inline-error") && (
                <Banner
                  layout="inline"
                  variant="error"
                  primaryAction={{ label: "Primary Action", onClick: () => console.log("Primary clicked") }}
                  onDismiss={() => handleDismiss("inline-error")}
                >
                  Single line information with an action and dismiss option
                </Banner>
              )}
            </div>
          </div>

          {/* Inline Warning */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CodeBlock
              title="Inline Warning Banner"
              children={`<Banner
  layout="inline"
  variant="warning"
  primaryAction={{ label: "Primary Action", onClick: () => {} }}
  onDismiss={() => {}}
>
  Single line information with an action and dismiss option
</Banner>`}
            />
            <div className="flex items-center">
              {!dismissedBanners.has("inline-warning") && (
                <Banner
                  layout="inline"
                  variant="warning"
                  primaryAction={{ label: "Primary Action", onClick: () => console.log("Primary clicked") }}
                  onDismiss={() => handleDismiss("inline-warning")}
                >
                  Single line information with an action and dismiss option
                </Banner>
              )}
            </div>
          </div>

          {/* Inline Success */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CodeBlock
              title="Inline Success Banner"
              children={`<Banner
  layout="inline"
  variant="success"
  primaryAction={{ label: "Primary Action", onClick: () => {} }}
  onDismiss={() => {}}
>
  Single line information with an action and dismiss option
</Banner>`}
            />
            <div className="flex items-center">
              {!dismissedBanners.has("inline-success") && (
                <Banner
                  layout="inline"
                  variant="success"
                  primaryAction={{ label: "Primary Action", onClick: () => console.log("Primary clicked") }}
                  onDismiss={() => handleDismiss("inline-success")}
                >
                  Single line information with an action and dismiss option
                </Banner>
              )}
            </div>
          </div>
        </div>

        {/* Block Variants */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Block Banners with Heading and Actions</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Multi-line banners with heading, description, and action buttons.
            </p>
          </div>

          {/* Block Info */}
          <div className="space-y-4">
            <CodeBlock
              title="Block Info Banner"
              children={`<Banner
  variant="info"
  heading="At the moment, we are unable to identify the cause of the connection problem."
  primaryAction={{ label: "Primary Action", onClick: () => {} }}
  secondaryAction={{ label: "Secondary Action", onClick: () => {} }}
  onDismiss={() => {}}
>
  Get help from the Builder community. This is the best place to get technical assistance from the team
</Banner>`}
            />
            {!dismissedBanners.has("block-info") && (
              <Banner
                variant="info"
                heading="At the moment, we are unable to identify the cause of the connection problem."
                primaryAction={{ label: "Primary Action", onClick: () => console.log("Primary clicked") }}
                secondaryAction={{ label: "Secondary Action", onClick: () => console.log("Secondary clicked") }}
                onDismiss={() => handleDismiss("block-info")}
              >
                Get help from the Builder community. This is the best place to get technical assistance from the team
              </Banner>
            )}
          </div>

          {/* Block Neutral */}
          <div className="space-y-4">
            <CodeBlock
              title="Block Neutral Banner"
              children={`<Banner
  variant="info-neutral"
  heading="At the moment, we are unable to identify the cause of the connection problem."
  primaryAction={{ label: "Primary Action", onClick: () => {} }}
  secondaryAction={{ label: "Secondary Action", onClick: () => {} }}
  onDismiss={() => {}}
>
  Get help from the Builder community. This is the best place to get technical assistance from the team
</Banner>`}
            />
            {!dismissedBanners.has("block-neutral") && (
              <Banner
                variant="info-neutral"
                heading="At the moment, we are unable to identify the cause of the connection problem."
                primaryAction={{ label: "Primary Action", onClick: () => console.log("Primary clicked") }}
                secondaryAction={{ label: "Secondary Action", onClick: () => console.log("Secondary clicked") }}
                onDismiss={() => handleDismiss("block-neutral")}
              >
                Get help from the Builder community. This is the best place to get technical assistance from the team
              </Banner>
            )}
          </div>

          {/* Block Error */}
          <div className="space-y-4">
            <CodeBlock
              title="Block Error Banner"
              children={`<Banner
  variant="error"
  heading="At the moment, we are unable to identify the cause of the connection problem."
  primaryAction={{ label: "Primary Action", onClick: () => {} }}
  secondaryAction={{ label: "Secondary Action", onClick: () => {} }}
  onDismiss={() => {}}
>
  Get help from the Builder community. This is the best place to get technical assistance from the team
</Banner>`}
            />
            {!dismissedBanners.has("block-error") && (
              <Banner
                variant="error"
                heading="At the moment, we are unable to identify the cause of the connection problem."
                primaryAction={{ label: "Primary Action", onClick: () => console.log("Primary clicked") }}
                secondaryAction={{ label: "Secondary Action", onClick: () => console.log("Secondary clicked") }}
                onDismiss={() => handleDismiss("block-error")}
              >
                Get help from the Builder community. This is the best place to get technical assistance from the team
              </Banner>
            )}
          </div>

          {/* Block Warning */}
          <div className="space-y-4">
            <CodeBlock
              title="Block Warning Banner"
              children={`<Banner
  variant="warning"
  heading="At the moment, we are unable to identify the cause of the connection problem."
  primaryAction={{ label: "Primary Action", onClick: () => {} }}
  secondaryAction={{ label: "Secondary Action", onClick: () => {} }}
  onDismiss={() => {}}
>
  Get help from the Builder community. This is the best place to get technical assistance from the team
</Banner>`}
            />
            {!dismissedBanners.has("block-warning") && (
              <Banner
                variant="warning"
                heading="At the moment, we are unable to identify the cause of the connection problem."
                primaryAction={{ label: "Primary Action", onClick: () => console.log("Primary clicked") }}
                secondaryAction={{ label: "Secondary Action", onClick: () => console.log("Secondary clicked") }}
                onDismiss={() => handleDismiss("block-warning")}
              >
                Get help from the Builder community. This is the best place to get technical assistance from the team
              </Banner>
            )}
          </div>

          {/* Block Success */}
          <div className="space-y-4">
            <CodeBlock
              title="Block Success Banner"
              children={`<Banner
  variant="success"
  heading="At the moment, we are unable to identify the cause of the connection problem."
  primaryAction={{ label: "Primary Action", onClick: () => {} }}
  secondaryAction={{ label: "Secondary Action", onClick: () => {} }}
  onDismiss={() => {}}
>
  Get help from the Builder community. This is the best place to get technical assistance from the team
</Banner>`}
            />
            {!dismissedBanners.has("block-success") && (
              <Banner
                variant="success"
                heading="At the moment, we are unable to identify the cause of the connection problem."
                primaryAction={{ label: "Primary Action", onClick: () => console.log("Primary clicked") }}
                secondaryAction={{ label: "Secondary Action", onClick: () => console.log("Secondary clicked") }}
                onDismiss={() => handleDismiss("block-success")}
              >
                Get help from the Builder community. This is the best place to get technical assistance from the team
              </Banner>
            )}
          </div>
        </div>

        {/* Configuration Examples */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Configuration Options</h3>
            <p className="text-sm text-muted-foreground mb-6">Examples of different banner configurations and customizations.</p>
          </div>

          {/* Without dismiss button */}
          <div className="space-y-4">
            <CodeBlock
              title="Banner without dismiss button"
              children={`<Banner variant="info" showDismiss={false}>
  This banner cannot be dismissed
</Banner>`}
            />
            <Banner variant="info" showDismiss={false}>
              This banner cannot be dismissed
            </Banner>
          </div>

          {/* Without icon */}
          <div className="space-y-4">
            <CodeBlock
              title="Banner without icon"
              children={`<Banner variant="warning" showIcon={false} onDismiss={() => {}}>
  This banner has no icon
</Banner>`}
            />
            <Banner variant="warning" showIcon={false} onDismiss={() => console.log("Dismissed")}>
              This banner has no icon
            </Banner>
          </div>

          {/* Without actions */}
          <div className="space-y-4">
            <CodeBlock
              title="Banner without actions"
              children={`<Banner variant="success" heading="Success!" onDismiss={() => {}}>
  Operation completed successfully
</Banner>`}
            />
            <Banner variant="success" heading="Success!" onDismiss={() => console.log("Dismissed")}>
              Operation completed successfully
            </Banner>
          </div>

          {/* Custom className */}
          <div className="space-y-4">
            <CodeBlock
              title="Banner with custom styling"
              children={`<Banner variant="error" className="border-2 border-dashed" onDismiss={() => {}}>
  Custom styled banner with dashed border
</Banner>`}
            />
            <Banner variant="error" className="border-2 border-dashed" onDismiss={() => console.log("Dismissed")}>
              Custom styled banner with dashed border
            </Banner>
          </div>
        </div>

        {/* Props Documentation */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Props</h3>
          <div className="bg-muted/50 rounded-lg p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">BannerProps</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded">variant</span>
                    <span className="text-muted-foreground ml-2">
                      &quot;info&quot; | &quot;info-neutral&quot; | &quot;error&quot; | &quot;warning&quot; |
                      &quot;success&quot;
                    </span>
                  </div>
                  <div>
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded">layout</span>
                    <span className="text-muted-foreground ml-2">&quot;inline&quot; | &quot;block&quot;</span>
                  </div>
                  <div>
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded">heading</span>
                    <span className="text-muted-foreground ml-2">string (optional)</span>
                  </div>
                  <div>
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded">children</span>
                    <span className="text-muted-foreground ml-2">React.ReactNode</span>
                  </div>
                  <div>
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded">onDismiss</span>
                    <span className="text-muted-foreground ml-2">() =&gt; void (optional)</span>
                  </div>
                  <div>
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded">primaryAction</span>
                    <span className="text-muted-foreground ml-2">
                      {`{ label: string; onClick: () => void }`} (optional)
                    </span>
                  </div>
                  <div>
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded">secondaryAction</span>
                    <span className="text-muted-foreground ml-2">
                      {`{ label: string; onClick: () => void }`} (optional)
                    </span>
                  </div>
                  <div>
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded">showDismiss</span>
                    <span className="text-muted-foreground ml-2">boolean (default: true)</span>
                  </div>
                  <div>
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded">showIcon</span>
                    <span className="text-muted-foreground ml-2">boolean (default: true)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
