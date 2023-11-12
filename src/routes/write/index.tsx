import { component$ } from "@builder.io/qwik";
import { routeAction$, Form } from "@builder.io/qwik-city";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

export const useAddJourney = routeAction$(async (data, context) => {
  console.log(context.env);

  return { success: true, content: "123" };
})

export const onPost: RequestHandler = async ({next, env, platform}) => {
  console.log('env', env);
  console.log('platform', Object.keys(platform));
  console.log('platform.env', platform.env?.['DB']);
  // console.log('Before request', url);
  await next();
  // console.log('After request', url);
};

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
