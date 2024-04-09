import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export async function AuthMiddleware(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    c.status(403);
    return c.json({
      msg: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const match = await verify(token, c.env.JWT_SECRET);
    if (!match) {
      c.status(403);
      return c.json({
        msg: "User not authorized",
      });
    }

    c.set("userId", match.id);

    await next();
  } catch (error) {
    console.log(error);

    c.status(403);
    return c.json({
      msg: "Something went wrong",
    });
  }
}
