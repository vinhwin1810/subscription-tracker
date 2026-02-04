import { Router } from "express";
import authMiddleWare from "../middlewares/auth.middleware.js";

const userRouter = Router();

/// /users - GET
userRouter.get("/", (req, res) => {
  res.send("fetch all users");
});

/// /users/:id - GET
userRouter.get("/:id", authMiddleWare, (req, res) => {
  const { id } = req.params;
  res.send(`fetch user with id: ${id}`);
});

/// /users - POST
userRouter.post("/", (req, res) => {
  res.send("create a new user");
});

/// /users/:id - PUT
userRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`update user with id: ${id}`);
});

/// /users/:id - DELETE
userRouter.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`delete user with id: ${id}`);
});

export default userRouter;
