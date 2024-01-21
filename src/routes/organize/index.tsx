import {
  component$,
  useSignal,
  useTask$,
  $,
} from "@builder.io/qwik";
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

  const removeTodo = $((uuid: string) => {
    todos.value.delete(uuid);
  });

  const updateTodo = $((uuid: string, todo: Todo) => {
    todos.value.set(uuid, todo);
  });

  useTask$(() => {
    todos.value.set(uuid(), { checked: false, text: "" });
  });

  return (
    <>
      <div>{Array.from(todos.value).map(([k]) => k + "\n")}</div>
      <div id="editor" class={styles.editor}>
        {Array.from(todos.value).map(([uuid, todo]) => (
          <TodoRow
            key={uuid}
            id={uuid}
            todo={todo}
            addTodo={addTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Organize",
};
