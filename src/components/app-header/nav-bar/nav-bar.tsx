import { component$ } from "@builder.io/qwik";

import HamburgerMenu from "./hamburger-menu/hamburger-menu";

export default component$(() => {
  return (
    <nav>
      <ul>
        <li>
          <a class="outline" href="/">
            목록
          </a>
        </li>
        <li>
          <a class="outline" href="/read">
            읽기
          </a>
        </li>
        <li>
          <a class="outline" href="/write">
            쓰기
          </a>
        </li>
        <li>
          <a class="outline" href="/organize">
            정리
          </a>
        </li>
      </ul>
      <ul>
        <li>
          <HamburgerMenu />
        </li>
      </ul>
    </nav>
  );
});
