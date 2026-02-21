import Fastify from "fastify";
import websocket from "@fastify/websocket";

const app = Fastify({ logger: true });

await app.register(websocket);

// Simple WS echo for now (we’ll replace with PTY streaming next)
app.get("/ws", { websocket: true }, (connection) => {
  connection.socket.on("message", (msg: any) => {
    connection.socket.send(`echo: ${msg.toString()}`);
  });
});

app.get("/health", async () => ({ ok: true }));

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? "localhost";

app.listen({ port, host }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});