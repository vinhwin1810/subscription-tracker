import { Router } from "express";

const userRouter = Router();

/// /users - GET
userRouter.get("/users", (req, res) => {
  res.send("fetch all users");
});

/// /users/:id - GET
userRouter.get("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send(`fetch user with id: ${id}`);
});

/// /users - POST
userRouter.post("/users", (req, res) => {
  res.send("create a new user");
});

/// /users/:id - PUT
userRouter.put("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send(`update user with id: ${id}`);
});

/// /users/:id - DELETE
userRouter.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  res.send(`delete user with id: ${id}`);
});

export default userRouter;
