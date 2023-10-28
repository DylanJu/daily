import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <nav>
      <a role="button" class="outline" href="/">목록</a>
      <a role="button" class="outline" href="/read">읽기</a>
      <a role="button" class="outline" href="/write">쓰기</a>
      <a role="button" class="outline" href="/organize">정리</a>
    </nav>
  );
});
