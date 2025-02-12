import type { QRL } from "@builder.io/qwik";
import { component$, $, useVisibleTask$, useSignal } from "@builder.io/qwik";
import { format } from "date-fns";

import type { Todo } from "~/routes/organize";

import styles from "./Todo.module.css";

const TodoRow = component$<{
  prevId?: string;
  currentId: string;
  nextId?: string;
  todo: Todo;
  addTodo: QRL<() => void>;
  removeTodo: QRL<(currentId: string, prevId?: string) => void>;
  onArrowUpKeyDown: QRL<(currentId: string, prevId?: string) => void>;
  onArrowDownKeyDown: QRL<(currentId: string, nextId?: string) => void>;
  setSelection: (currentId: string, last?: boolean) => void;
}>(
  ({
    nextId,
    currentId,
    prevId,
    todo,
    addTodo,
    removeTodo,
    onArrowUpKeyDown,
    onArrowDownKeyDown,
    setSelection,
  }) => {
    const checkboxRef = useSignal<HTMLInputElement>();
    const contentEditableRef = useSignal<HTMLElement>();

    const onKeyDown$ = $((e: KeyboardEvent) => {
      // console.group("key down");
      // console.log(e.key);
      // console.log(contentEditableRef.value?.textContent);
      // console.groupEnd();

      if (e.key === "Enter") {
        addTodo();
        e.preventDefault();
        return;
      }

      if (e.key === "Backspace" && !contentEditableRef.value?.textContent) {
        removeTodo(currentId, prevId);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        onArrowUpKeyDown(currentId, prevId);
        return;
      }

      if (e.key === "ArrowDown") {
        onArrowDownKeyDown(currentId, nextId);
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
          ref={contentEditableRef}
          contentEditable="true"
          class={styles.input}
        ></div>
        <div class="secondary">
          <small class="secondary">
            시작시간: {format(todo.createdAt, "yyyy-MM-dd HH:mm (ccc)")}
          </small>
          {todo.completedAt > 0 ? (
            <small>
              종료시간: {format(todo.completedAt, "yyyy-MM-dd HH:mm (ccc)")}
            </small>
          ) : null}
        </div>
      </div>
    );
  }
);

export default TodoRow;
