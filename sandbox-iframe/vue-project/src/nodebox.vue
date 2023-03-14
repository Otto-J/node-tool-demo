<template>
  <div>hi</div>

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
import { onMounted } from "vue";
import { Nodebox } from "@codesandbox/nodebox";

// Establish a connection with the runtime environment.

// onmouted = async () => {
// };

const init = async (runtime: Nodebox) => {
  // Populate the in-memory file system of Nodebox
  // with a Next.js project files.
  return runtime.fs.init({
    "package.json": JSON.stringify({
      name: "nextjs-preview",
      dependencies: {
        "@next/swc-wasm-nodejs": "12.1.6",
        next: "12.1.6",
        react: "18.2.0",
        "react-dom": "18.2.0",
      },
    }),
    // On the index page, let's illustrate how server-side props
    // propagate to your page component in Next.js.
    "pages/index.jsx": `
export default function Homepage({ name }) {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>The name "{name}" has been received from server-side props.</p>
    </div>
  )
}

export function getServerSideProps() {
  return {
    props: {
      name: 'John'
    }
  }
}
    `,
  });
};
const runProject = async (runtime: Nodebox) => {
  // First, create a new shell instance.
  // You can use the same instance to spawn commands,
  // observe stdio, restart and kill the process.
  const shell = runtime.shell.create();
  console.log(shell, "shell");

  // Then, let's run the "dev" script that we've defined
  // in "package.json" during the previous step.
  const nextProcess = await shell.runCommand("npm", ["dev"]);
  console.log("nextProcess", nextProcess);

  // Find the preview by the process and mount it
  // on the preview iframe on the page.
  const previewInfo = await runtime.preview.getByShellId(nextProcess.id);
  console.log("previewInfo");
  const previewIframe = document.getElementById(
    "preview-iframe"
  ) as HTMLIFrameElement;
  previewIframe.setAttribute("src", previewInfo.url);
};
onMounted(async () => {
  try {
    const runtime = new Nodebox({
      // Provide a reference to the <iframe> element in the DOM
      // where Nodebox should render the preview.
      iframe: document.getElementById("nodebox-iframe") as HTMLIFrameElement,
    });
    console.log(runtime, "runtime");
    await runtime.connect();
    console.log("runtime connected");
    await init(runtime);
    console.log("runtime initialized");
    await runProject(runtime);
    console.log("runtime running");
  } catch (e) {
    console.log(e);
  }
});
</script>
