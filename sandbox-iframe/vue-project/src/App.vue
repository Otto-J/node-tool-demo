<template>
  <div>
    <iframe width="100%" height="500" id="iframe"></iframe>
  </div>
</template>
<script lang="ts" setup>
import { loadSandpackClient } from "@codesandbox/sandpack-client";
import type { SandboxSetup, ClientOptions } from "@codesandbox/sandpack-client";
import { onMounted } from "vue";

const main = async () => {
  const iframe = document.getElementById("iframe") as HTMLIFrameElement;
  if (!iframe) {
    return;
  }

  const content: SandboxSetup = {
    files: {
      // We infer dependencies and the entry point from package.json
      "/package.json": {
        code: JSON.stringify({
          main: "index.js",
          dependencies: { uuid: "latest" },
        }),
      },

      // Main file
      "/index.js": { code: `console.log(require('uuid'))` },
    },
    // environment: "vanilla",
  };
  // Optional options
  const options: ClientOptions = {};

  // Properly load and mount the bundler
  const client = await loadSandpackClient(iframe, content, options);
};

onMounted(() => {
  main();
});
</script>

<style></style>
