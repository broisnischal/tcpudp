import { Elysia, t } from "elysia";

export const chat = new Elysia({
  websocket: {},
})
  .ws("/ws", {
    body: t.Object({
      message: t.String(),
    }),
    message(ws, { message }) {
      ws.send({
        message,
        time: Date.now(),
      });
    },
  })
  .listen(3000);
