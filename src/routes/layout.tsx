import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";
import type { Session } from "@auth/core/types";

import AppHeader from "~/components/app-header/app-header";
import styles from './layout.module.css';

export const onRequest: RequestHandler = (event) => {
  const session: Session | null = event.sharedMap.get('session');
  if (!session || new Date(session.expires) < new Date()) {
    throw event.redirect(302, `/api/auth/signin?callbackUrl=${event.url.pathname}`);
  }
};

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <main class={["container", styles.main ]}>
      <AppHeader />
      <Slot />
    </main>
  );
});
