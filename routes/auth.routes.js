import { Router } from "express";
import { SignUp, SignIn } from "../controllers/auth.controller.js";

const authRouter = Router();
authRouter.post("/sign-up", SignUp);
authRouter.post("/sign-in", SignIn);
authRouter.post("/sign-out", (req, res) => {
  res.send("Sign Out");
});

export default authRouter;
