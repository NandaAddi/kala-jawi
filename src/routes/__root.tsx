import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #d9b482 0%, #b8895a 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-brand-dark font-display">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-brand-dark">Page not found</h2>
        <p className="mt-2 text-sm text-brand-dark/70">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border-2 border-brand-gold bg-brand-dark px-4 py-2 text-sm font-bold text-brand-cream transition-all duration-300 hover:bg-brand-dark/80 hover:border-brand-light-gold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #d9b482 0%, #b8895a 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-brand-dark font-display">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-brand-dark/70">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-lg border-2 border-brand-gold bg-brand-dark px-4 py-2 text-sm font-bold text-brand-cream transition-all duration-300 hover:bg-brand-dark/80 hover:border-brand-light-gold"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border-2 border-brand-gold bg-transparent px-4 py-2 text-sm font-bold text-brand-dark transition-all duration-300 hover:bg-brand-dark/10 hover:border-brand-light-gold"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Kalajawi - Platform Pembelajaran Budaya Jawa Digital" },
      {
        name: "description",
        content:
          "Kalajawi adalah platform pembelajaran digital interaktif yang menjelajahi kekayaan budaya Jawa. Temukan cerita, seni, tradisi, dan warisan leluhur dalam pengalaman belajar yang menyenangkan.",
      },
      { name: "author", content: "Kalajawi" },
      { property: "og:title", content: "Kalajawi - Platform Pembelajaran Budaya Jawa Digital" },
      {
        property: "og:description",
        content:
          "Kalajawi adalah platform pembelajaran digital interaktif yang menjelajahi kekayaan budaya Jawa. Temukan cerita, seni, tradisi, dan warisan leluhur dalam pengalaman belajar yang menyenangkan.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://kala-jawi.nandaaddiwijaya.my.id/" },
      { property: "og:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.webp" },
      { property: "og:site_name", content: "Kalajawi" },
      { property: "og:locale", content: "id_ID" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kalajawi - Platform Pembelajaran Budaya Jawa Digital" },
      {
        name: "twitter:description",
        content: "Platform pembelajaran digital interaktif untuk menjelajahi kekayaan budaya Jawa.",
      },
      { name: "twitter:image", content: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kalajawi",
    alternateName: "Platform Pembelajaran Budaya Jawa",
    url: "https://kala-jawi.nandaaddiwijaya.my.id/",
    description: "Platform pembelajaran digital interaktif untuk menjelajahi kekayaan budaya Jawa.",
    publisher: {
      "@type": "Organization",
      name: "Kalajawi",
      logo: {
        "@type": "ImageObject",
        url: "https://kala-jawi.nandaaddiwijaya.my.id/og-image.webp",
      },
    },
    inLanguage: "id",
  };

  return (
    <html lang="id" data-framework="react" data-generator="tanstack-start">
      <head>
        <meta name="generator" content="TanStack Start v1" />
        <meta name="framework" content="React 19" />
        <meta name="theme" content="Tailwind CSS" />
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
