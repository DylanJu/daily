import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import AppHeader from "~/components/app-header/app-header";

export default component$(() => {
  return (
    <AppHeader />
  );
});

export const head: DocumentHead = {
  title: "Real-me",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
