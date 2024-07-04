import { Elysia, t } from "elysia";
import auth from "./apis/auth";
import { chat } from "./apis/chat";
import { Hono } from "hono";
import { swagger } from "@elysiajs/swagger";
import { Stream } from "@elysiajs/stream";

class Logger {
  log(value: string) {
    console.log(value);
  }
}

const prisma = "string";

// const elysia = new Elysia().get("/Hello from Elysia inside Hono inside Elysia");
const hono = new Hono().get("/", (c) => c.text("Hello from Hono!"));
// .mount("/elysia", elysia);

const app = new Elysia()
  .decorate("prisma", prisma)
  .use(swagger())
  .onResponse(() => {
    console.log("Response", performance.now());
  })
  .derive(({ headers }) => {
    const auth = headers["authorization"];

    return {
      bearer: auth?.startsWith("Bearer") ? auth.slice(7) : null,
      ip: headers["x-real-ip"],
    };
  })
  .trace(async ({ handle }) => {
    const { time, end } = await handle;

    console.log("handle took", (await end) - time);
  })
  .get(
    "/stream",
    () =>
      // new Stream(async (stream) => {
      //   stream.send("hello");

      //   await stream.wait(1000);
      //   stream.send("world");

      //   stream.close();
      // }),
      new Stream((stream) => {
        const interval = setInterval(() => {
          stream.send("hello world");
        }, 500);

        setTimeout(() => {
          clearInterval(interval);
          stream.close();
        }, 3000);
      }),
  )
  .get("/", () => "asdf")
  // .mount("/hono", hono.fetch)
  .decorate("logger", new Logger())
  .state("db", 0)
  .state("version", 0)
  .get("/hi", ({ bearer, cookie: { name } }) => {
    name.set({
      value: "testing",
    });

    return `Hi Elysia ${bearer ? `with bearer ${bearer}` : ""}`;
  })
  .use(auth)
  // .use(chat)
  .get("/test", ({ error, logger, prisma, store: { db } }) => {
    logger.log("testing");
    return error("OK", {
      message: "shit bro",
      db: db,
    });
  })
  .get("/id/:id", ({ params: { id } }) => id)
  .post(
    "/mirror",
    ({ body }) => {
      return body;
    },
    {
      body: t.Object({
        id: t.Number(),
        name: t.String(),
        username: t.String(),
      }),
    },
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
