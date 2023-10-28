import { component$ } from "@builder.io/qwik";

import AppNavBar from "./nav-bar/nav-bar";
import HamburgerMenu from "./hamburger-menu/hamburger-menu";

export default component$(() => {
  return (
    <header class="grid">
      <AppNavBar />
      <HamburgerMenu />
    </header>
  );
});
