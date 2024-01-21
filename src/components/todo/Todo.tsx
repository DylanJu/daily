import type { QRL } from "@builder.io/qwik";
import { component$, $, useVisibleTask$, useSignal } from "@builder.io/qwik";

import type { Todo } from "~/routes/organize";

const TodoRow = component$<{
  id: string;
  todo: Todo;
  addTodo: QRL<() => void>;
  removeTodo: QRL<(uuid: string) => void>;
  updateTodo: QRL<(uuid: string, todo: Todo) => void>;
}>(({ id, todo: { checked }, addTodo, removeTodo, updateTodo }) => {
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

    updateTodo(id, {
      checked,
      text: contentEditableRef.value?.textContent || "",
    });
  });

  useVisibleTask$(({ cleanup }) => {
    contentEditableRef.value!.addEventListener("keydown", onKeyDown$);

    cleanup(() => {
      contentEditableRef.value!.removeEventListener("keydown", onKeyDown$);
    });
  });

  return (
    <div data-id={id}>
      <input type="checkbox" checked={checked} />
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
