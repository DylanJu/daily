import type { QRL } from "@builder.io/qwik";
import { component$, $, useVisibleTask$, useSignal } from "@builder.io/qwik";

import type { Todo } from "~/routes/organize";

import styles from "./Todo.module.css";

const TodoRow = component$<{
  prevId?: string;
  currentId: string;
  nextId?: string;
  todo: Todo;
  addTodo: QRL<() => void>;
  removeTodo: QRL<(currentId: string, prevId?: string) => void>;
  setSelection: (currentId: string) => void;
}>(({ nextId, currentId, prevId, todo, addTodo, removeTodo, setSelection }) => {
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
      removeTodo(currentId, prevId);
      return;
    }
  });

  useVisibleTask$(({ cleanup }) => {
    contentEditableRef.value!.addEventListener("keydown", onKeyDown$);
    setSelection(currentId);

    cleanup(() => {
      contentEditableRef.value!.removeEventListener("keydown", onKeyDown$);
    });
  });

  return (
    <div data-currentId={currentId} class={styles.todoRow}>
      <input ref={checkboxRef} type="checkbox" checked={todo.checked} />
      <div
        id={currentId}
        class={styles.input}
        ref={contentEditableRef}
        contentEditable="true"
      >
      </div>
    </div>
  );
});

export default TodoRow;
