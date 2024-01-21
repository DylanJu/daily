import type { QRL } from "@builder.io/qwik";
import { component$, $, useVisibleTask$, useSignal } from "@builder.io/qwik";

import type { Todo } from "~/routes/organize";

import styles from "./Todo.module.css";

const TodoRow = component$<{
  id: string;
  todo: Todo;
  addTodo: QRL<() => void>;
  removeTodo: QRL<(uuid: string) => void>;
}>(({ id, todo: { checked }, addTodo, removeTodo }) => {
  const checkboxRef = useSignal<HTMLInputElement>();
  const contentEditableRef = useSignal<HTMLElement>();

  const onKeyDown$ = $((e: KeyboardEvent) => {
    console.group("key down");
    console.log(e.key);
    console.log(contentEditableRef.value?.textContent);
    console.groupEnd();

    if (e.key === "Enter") {
      addTodo();
      e.preventDefault();
      return;
    }

    if (e.key === "Backspace" && !contentEditableRef.value?.textContent) {
      removeTodo(id);
      return;
    }
  });

  useVisibleTask$(({ cleanup }) => {
    contentEditableRef.value!.addEventListener("keydown", onKeyDown$);

    cleanup(() => {
      contentEditableRef.value!.removeEventListener("keydown", onKeyDown$);
    });
  });

  return (
    <div data-id={id} class={styles.todoRow}>
      <input ref={checkboxRef} type="checkbox" checked={checked} />
      <div
        id={id}
        ref={contentEditableRef}
        contentEditable="true"
      >
      </div>
    </div>
  );
});

export default TodoRow;
