import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { drizzle } from "drizzle-orm/d1";
import { customers } from "~/schema";

export const useAddJourney = routeAction$(async (data, context) => {
  if (!context.platform.env?.DB) throw new Error("No DB");

  const db = drizzle(context.platform.env.DB);

  type InsertCustomer = typeof customers.$inferInsert

  const newCustomer = {
    // CustomerId: 102,
    // CompanyName: "101 company",
    ContactName: data.content,
  }

  const result = await db.insert(customers).values(newCustomer as InsertCustomer).run();

  console.log(typeof data, data);

  return { success: true, content: result };
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
        <p>User added successfully
          <br />
          {JSON.stringify(action.value.content)}
        </p>
        
      )}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Write",
};
