import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { v4 as uuid } from "uuid";

import TodoRow from "~/components/todo/Todo";
import styles from "./index.module.css";

export type Todo = {
  checked: boolean;
  text: string;
};

export default component$(() => {
  const todos = useSignal<Map<string, Todo>>(new Map());

  const addTodo = $(() => {
    const newId = uuid();

    if (todos.value.has(newId)) {
      // addTodo();
      return;
    }
    const newTodos = new Map(todos.value);
    newTodos.set(newId, { checked: false, text: "" });
    todos.value = newTodos;
  });

  const setSelection = $((currentId: string, last?: boolean) => {
    const range = document.createRange();
    const selection = document.getSelection();
    const element = document.getElementById(currentId);
    if (!element) return;

    range.selectNodeContents(element);
    range.collapse(!last);

    selection?.removeAllRanges();
    selection?.addRange(range);
  });

  const removeTodo = $((uuid: string, prevId?: string) => {
    const newTodos = new Map(todos.value);
    newTodos.delete(uuid);
    todos.value = newTodos;

    if (prevId) {
      setSelection(prevId, true);
    }
  });

  useTask$(() => {
    addTodo();
  });

  const todoList = Array.from(todos.value);

  return (
    <>
      <div>{todoList.map(([k]) => k + "\n")}</div>
      <div id="editor" class={styles.editor}>
        {todoList.map(([currentId, todo], i) => (
          <TodoRow
            key={currentId}
            prevId={todoList[i - 1]?.[0]}
            currentId={currentId}
            nextId={todoList[i + 1]?.[0]}
            todo={todo}
            addTodo={addTodo}
            removeTodo={removeTodo}
            setSelection={setSelection}
          />
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Organize",
};
