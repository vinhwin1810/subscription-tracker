import { Router } from "express";
import { SignUp } from "../controllers/auth.controller.js";

const authRouter = Router();
authRouter.post("/sign-up", SignUp);
authRouter.post("/sign-in", (req, res) => {
  res.send("Sign In");
});
authRouter.post("/sign-out", (req, res) => {
  res.send("Sign Out");
});

export default authRouter;
