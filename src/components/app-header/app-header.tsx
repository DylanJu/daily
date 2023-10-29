import { component$ } from "@builder.io/qwik";

import AppNavBar from "./nav-bar/nav-bar";

export default component$(() => {
  return (
    <header>
      <AppNavBar />
    </header>
  );
});
