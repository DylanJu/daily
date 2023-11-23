import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { Miniflare, MiniflareOptions } from 'miniflare';

export default defineConfig(async ({ mode }) => {
  /**
   * https://github.com/BuilderIO/qwik/issues/3345#issuecomment-1778018755
   * Miniflare로 d1 사용하는 방법 (개발모드에서 d1 사용하기)
   */
  let platform = {}

  if (mode === 'ssr') {// or mode: 'ssr'
     // The following miniflare statements are heavily inspired by the source of the `wrangler execute` CLI command.
     // @see https://github.com/cloudflare/workers-sdk/blob/24d1c5cf3b810e780df865a0f76f1c3ae8ed5fbe/packages/wrangler/src/d1/execute.tsx#L236-L251
    /**
     * The `d1Persist` directory is created after you've executed `wrangler execute *database_name* --local`. 
     */
    const d1Persist = '.wrangler/state/v3/d1'
    const mf = new Miniflare({
      modules: true,
      script: "",
      d1Persist,
      d1Databases: { DB: '767fd7f2-cbc9-4540-8780-bedf45f93e1e' }, // the value of `database_id` or `preview_database_id` in your `wrangler.toml`. Depends on what values that are / were present when you called `wrangler execute` mentioned earlier.
    });

    const db = await mf.getD1Database('DB') // The key of the `d1Databases` object prop.

    platform = {
      env: { DB: db }
    }
  }
  // 개발모드 d1 설정 끝

  return {
    // 개발모드 d1 사용하기 위해 platfrom을 넣어줘요.
    plugins: [qwikCity({ platform }), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    optimizeDeps: { include: ['@auth/core'] }
  };
});
