"use strict";

// src/index.ts
var import_node_http = require("http");
var import_h3 = require("h3");
var app = (0, import_h3.createApp)();
var router = (0, import_h3.createRouter)();
router.get(
  "/",
  (0, import_h3.eventHandler)(() => {
    console.log("dist2");

    return { status: "okkkk" };
  })
);
app.use(router);
(0, import_node_http.createServer)((0, import_h3.toNodeListener)(app)).listen(
  process.env.PORT || 3e3
);
