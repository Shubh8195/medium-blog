import { Context, Hono, Next } from "hono";
import { userRoute } from "./routes/user";
import { blogRoute } from "./routes/blog";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { cors } from "hono/cors";

const app = new Hono();

app.use("*", cors());

app.use("*", async (c: Context, next: Next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
});

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);

export default app;
