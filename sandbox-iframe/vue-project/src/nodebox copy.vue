<template>
  <div>hi</div>
  <!-- <iframe
    width="100%"
    height="500px"
    src="https://codesandbox.io/p/sandbox/nifty-ptolemy-knyuc0?codemirror=1&file=%2FREADME.md&hidenavigation=1&runonclick=1"
  ></iframe> -->
  <!-- <Sandpack template="nifty-ptolemy-knyuc0" /> -->

  <!--
  The "nodebox" iframe will mount the Nodebox runtime,
  allowing it to communicate with the rest of the application.
-->
  <iframe id="nodebox-iframe"></iframe>

  <!--
  The "preview" iframe will contain the result of running
  the Next.js example we will configure in a moment.
-->
  <iframe id="preview-iframe"></iframe>
</template>

<script setup lang="ts">
// import { Sandpack } from "sandpack-vue3";
// import { Sandpack } from "@codesandbox/vue-preview";
import { onMounted } from "vue";
import { Nodebox } from "@codesandbox/nodebox";

// Establish a connection with the runtime environment.

// onmouted = async () => {
// };

onMounted(async () => {
  const runtime = new Nodebox({
    // Provide a reference to the <iframe> element in the DOM
    // where Nodebox should render the preview.
    iframe: document.getElementById("nodebox-iframe") as HTMLIFrameElement,
  });
  await runtime.connect();
});
</script>
