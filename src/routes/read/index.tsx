import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { drizzle } from "drizzle-orm/d1";
import { customers } from "~/schema";

export const useProductDetails = routeLoader$(async (requestEvent) => {
  if (!requestEvent.platform.env?.DB) throw new Error("No DB");

  const db = drizzle(requestEvent.platform.env.DB);
  const result = await db.select().from(customers).all()
  
  return { success: true, content: JSON.stringify(result) };
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
