import { component$ } from "@builder.io/qwik";

import styles from "./hamburger-menu.module.css";

export default component$(() => {
  return (
    <button
      class={[styles.hamburger, styles["hamburger--spring"]]}
      type="button"
      onClick$={(event, element) => {
        element.classList.toggle(styles["is-active"]);
      }}
    >
      <span class={styles["hamburger-box"]}>
        <span class={styles["hamburger-inner"]}></span>
      </span>
    </button>
  );
});
