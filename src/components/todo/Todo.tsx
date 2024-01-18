// import type { QRL, QwikKeyboardEvent } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";

export const Todo = component$<{
  id: string;
  // onKeyDown$: QRL<
  //   (
  //     e: QwikKeyboardEvent<HTMLDivElement>,
  //     currentTarget: HTMLDivElement
  //   ) => void
  // >;
}>(({ id }) => {
  return (
    <div id={id}>
      <Slot />
    </div>
  );
});
