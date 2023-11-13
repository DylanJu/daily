import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

export const useAddJourney = routeAction$(async (data, context) => {
  const db = context.platform.env?.DB

  if (!db) {
    return { success: false, content: "123" };
  }

  const { results } = await db.prepare(
    "SELECT * FROM Customers WHERE CompanyName = ?"
  )
    .bind("Bs Beverages")
    .all();

  return { success: true, content: JSON.stringify(results) };
});

export default component$(() => {
  const action = useAddJourney();

  return (
    <div>
      <h1>Write</h1>
      <Form action={action}>
        <textarea name="content" />
        <button type="submit">submit</button>
      </Form>

      {action.value?.success && (
        // When the action is done successfully, the `action.value` property will contain the return value of the action
        <p>User {action.value.content} added successfully</p>
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Write",
};
