import express from "express";
import WebSocket from "ws";

import { join } from "path";

// @todo: Would be cool to do our own implementation:
// @see https://datatracker.ietf.org/doc/rfc6455/?include_text=1
// @see https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers

const app = express();
const port = 3000;

app.use("/", express.static(join(__dirname, "public")));

const server = app.listen(port, () =>
  console.log(`Server up and running on ${port}`)
);

const wss = new WebSocket.Server({ server });
wss.on("connection", ws => {
  console.log("Connection started.");
  ws.on("open", () => console.log("Connection opened"));
  ws.on("message", data => console.log("Message from client incoming:", data));
  ws.send("Connected.");
});
