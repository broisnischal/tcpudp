import { Elysia, t } from "elysia";
import auth from "./apis/auth";
import { chat } from "./apis/chat";
import { Hono } from "hono";

class Logger {
  log(value: string) {
    console.log(value);
  }
}

// const elysia = new Elysia().get("/Hello from Elysia inside Hono inside Elysia");
const hono = new Hono().get("/", (c) => c.text("Hello from Hono!"));
// .mount("/elysia", elysia);

const app = new Elysia()
  .onResponse(() => {
    console.log("Response", performance.now());
  })
  .derive(({ headers }) => {
    const auth = headers["authorization"];

    return {
      bearer: auth?.startsWith("Bearer") ? auth.slice(7) : null,
    };
  })
  .trace(async ({ handle }) => {
    const { time, end } = await handle;

    console.log("handle took", (await end) - time);
  })
  .get("/", () => "asdf")
  // .mount("/hono", hono.fetch)
  .decorate("logger", new Logger())
  .state("db", 0)
  .get("/hi", ({ bearer, cookie: { name } }) => {
    name.set({
      value: "testing",
    });

    return `Hi Elysia ${bearer ? `with bearer ${bearer}` : ""}`;
  })
  .use(auth)
  // .use(chat)
  .get("/test", ({ error, logger, store: { db } }) => {
    logger.log("testing");
    return error("I'm a teapot", {
      message: "shit bro",
      db: db,
    });
  })
  .get("/id/:id", ({ params: { id } }) => id)
  .post("/mirror", ({ body }) => body, {
    body: t.Object({
      id: t.Number(),
      name: t.String(),
    }),
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
