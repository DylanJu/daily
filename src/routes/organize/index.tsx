import { component$, useSignal, useTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { v4 as uuid } from "uuid";

import TodoRow from "~/components/todo/Todo";
import styles from "./index.module.css";

export type Todo = {
  checked: boolean;
  text: string;
  createdAt: number;
  completedAt: number;
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
    newTodos.set(newId, {
      checked: false,
      text: "",
      createdAt: Date.now(),
      completedAt: 0,
    });
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

  // const onArrowUpKeyDown = $((currentId: string, prevId?: string) => {
  //   // TODO: 여러칸 올라갈 때 현재의 위치 계속 보존 (vscode처러)
  //   // get current cursur position
  //   const selection = document.getSelection();
  //   const range = selection?.getRangeAt(0);
  //   // console.log('range', range);

  //   const currentRect = range?.getClientRects()[0];
  //   // console.log('rect', currentRect);

  //   if (!prevId || !currentRect || !selection) {
  //     console.group("onArrowUpKeyDown")
  //     console.log("prevId", prevId);
  //     console.log("currentRect", currentRect);
  //     console.log("selection", selection);
  //     console.groupEnd();
  //     return;
  //   }

  //   // 새로운 위치로 커서를 이동합니다.
  //   const newRange = document.createRange();
  //   const prevTodo = document.getElementById(prevId);

  //   if (!prevTodo || !prevTodo.textContent) {
  //     console.log("prevTodo", prevTodo);
  //     console.log("prevTodo.textContent", prevTodo?.textContent);
  //     return;
  //   }

  //   console.log(prevTodo.textContent);
  //   const rect = prevTodo.getClientRects()[0];
  //   for (let i = 0; i < prevTodo.textContent.length; i++) {
  //     if (rect.left > currentRect.left) {
  //       break;
  //     }
  //     console.log('i', i, rect.left, currentRect.left, prevTodo.textContent[i].rec);
  //     newRange.setStart(prevTodo.firstChild!, i);
  //   }

  //   // newRange.setStart(prevTodo.firstChild!, currentRect.left);
  //   newRange.collapse(true);

  //   // 새 범위를 선택 객체에 설정합니다.
  //   selection.removeAllRanges();
  //   selection.addRange(newRange);
  // });
  const onArrowUpKeyDown = $((currentId: string, prevId?: string) => {
    if (!prevId) return;
    const prevTodo = document.getElementById(prevId);
    if (!prevTodo) return;

    const selection = window.getSelection();
    if (!selection) return;

    const range = selection.getRangeAt(0);
    const position = range.startOffset;
    const maxPosition = prevTodo.childNodes[0].textContent?.length || 0;
    // console.log("position", position);

    // edit-first 요소에 새로운 범위를 설정합니다.
    const newRange = document.createRange();
    newRange.setStart(prevTodo.childNodes[0], Math.min(position, maxPosition));
    newRange.collapse(true);

    // 새로운 범위를 선택합니다.
    selection.removeAllRanges();
    selection.addRange(newRange);

    // edit-first 요소에 포커스를 줍니다.
    prevTodo.focus();
  });

  const onArrowDownKeyDown = $((currentId: string, nextId?: string) => {});

  useTask$(() => {
    addTodo();
  });

  const todoList = Array.from(todos.value);

  return (
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
          onArrowUpKeyDown={onArrowUpKeyDown}
          onArrowDownKeyDown={onArrowDownKeyDown}
          setSelection={setSelection}
        />
      ))}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Organize",
};
