import { Context, Hono } from "hono";
import { AuthMiddleware } from "../middlewares/auth";
import { blogCreateSchema, blogUpdateSchema } from "@shubh_negi/medium-types";

export const blogRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();

blogRoute.use("/*", AuthMiddleware);

blogRoute.get("/bulk", async (c: Context) => {
  const prisma = c.get("prisma");

  const posts = await prisma.post.findMany({
    include: {      
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json(posts);
});

blogRoute.get("/:id", async (c: Context) => {
  const prisma = c.get("prisma");
  const id = c.req.param("id");

  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {      
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json(post);
});

blogRoute.post("/", async (c: Context) => {
  const prisma = c.get("prisma");

  const userId = c.get("userId");
  const body = await c.req.json();

  const { success } = blogCreateSchema.safeParse(body);
  if (!success) {
    return c.json({
      msg: "invalid input",
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({
      msg: "user doesn't exist",
    });
  }

  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      author_id: userId,
    },
  });

  c.status(201);
  return c.json({
    msg: "post created successfully",
    id: post.id,
  });
});

blogRoute.put("/", async (c: Context) => {
  const prisma = c.get("prisma");

  const userId = c.get("userId");
  const body = await c.req.json();

  const { success } = blogUpdateSchema.safeParse(body);
  if (!success) {
    return c.json({
      msg: "invalid input",
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    c.status(403);
    return c.json({
      msg: "user doesn't exist",
    });
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: body.id,
      author_id: userId,
    },
    data: body,
  });

  console.log(updatedPost);

  return c.json({
    msg: "post updated successfully",
  });
});
