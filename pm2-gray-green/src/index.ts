import { createServer } from "node:http";
import { createApp, createRouter, eventHandler, toNodeListener } from "h3";

const app = createApp();
const router = createRouter();

router.get(
  "/",
  eventHandler(() => {
    console.log("test1");
    return {
      status: "ok",
    };
  })
);

app.use(router);

createServer(toNodeListener(app)).listen(process.env.PORT || 3000);
