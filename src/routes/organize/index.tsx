import { component$, $, useSignal, useTask$ } from "@builder.io/qwik";
import type { QwikKeyboardEvent } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { v4 as uuid } from "uuid";

import { Todo } from "~/components/todo/Todo";
import styles from "./index.module.css";

export default component$(() => {
  const uuids = useSignal<Map<string, string>>(new Map());
  // uuid 배열관리
  // 엔터키 누르면, 현재 커서 다음에 새로운 uuid 추가하고 TODO 컴포넌트 생성, 커서이동 -> onKeyDown$ 이벤트로 처리
  // delete키 누르면, 현재 커서의 uuid 삭제하고 TODO 컴포넌트 삭제, 커서이동 -> onKeyDown$ 이벤트로 처리
  // onKeyDown$ 상속시키기

  const onKeyDown$ = $(
    (
      event: QwikKeyboardEvent<HTMLDivElement>,
      currentTarget: HTMLDivElement
    ) => {
      console.log("target", event.target);
      console.log("currentTarget", currentTarget);

      // if (event.key === "Enter") {
      // }
    }
  );

  const addTodo = $(() => {
    const newId = uuid();

    if (uuids.value.has(newId)) {
      // addTodo();
      return;
    }

    uuids.value.set(newId, "");
  });

  useTask$(() => {
    addTodo();
  });

  return (
    <>
      <div>{Array.from(uuids.value).map(([k]) => k + "\n")}</div>
      <div
        contentEditable="true"
        class={styles.editor}
        preventdefault:keydown
        onKeyDown$={onKeyDown$}
      >
        {Array.from(uuids.value).map(([uuid, text]) => (
          <Todo key={uuid} id={uuid}>
            {text}
          </Todo>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Organize",
};
