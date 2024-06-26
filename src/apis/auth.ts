import Elysia, { t } from "elysia";

const auth = new Elysia({
  // prefix: "/auth",
}).group(
  "/auth",
  {
    body: t.Literal("hellobro"),
  },
  (app) =>
    app
      .post("/sign-in", () => "Sign in")
      .post("/sign-up", () => "Sign up")
      .get("/profile", () => "Profile"),
);

export default auth;
