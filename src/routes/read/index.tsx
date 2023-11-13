import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useProductDetails = routeLoader$(async (requestEvent) => {
  const db = requestEvent.platform.env?.DB;
  
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
  const signal = useProductDetails(); 
  return (
    <div>
      <h1>Read</h1>
      <div>{signal.value.content}</div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Read",
};
