import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

import { signInSchema, signUpSchema } from "@shubh_negi/medium-types";

const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();

userRoute.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signUpSchema.safeParse(body);

  if (!success) {
    c.status(403);
    return c.json({
      msg: "invalid input",
    });
  }

  const user = await prisma.user.create({
    data: body,
  });

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    msg: "user created successfully",
    token
  });
});

userRoute.post("/signin", async (c) => {
  const prisma = c.get("prisma");

  const body = await c.req.json();
  const { success } = signInSchema.safeParse(body);

  if (!success) {
    c.status(403);
    return c.json({
      msg: "invalid input",
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
      password: body.password,
    },
  });
  
  if (!user) {
    c.status(403);
    return c.json({
      msg: "Invalid Credentials",
    });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({
    msg: "Sign in sucessfully",
    token,
  });
});

export { userRoute };
