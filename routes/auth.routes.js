import { Router } from "express";
import { SignUp, SignIn } from "../controllers/auth.controller.js";
import passport from "../services/Passport.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.development.local" });
const successRedirectURL = process.env.SUCCESS_REDIRECT_URL;

const authRouter = Router();

// Local authentication routes
authRouter.post("/sign-up", SignUp);
authRouter.post("/sign-in", SignIn);
authRouter.get("/sign-out", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Error logging out" });
    }
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
});

// OAuth 2.0 routes - Google
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email", "https://www.googleapis.com/auth/calendar"],
    accessType: "offline",
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/api/v1/auth/failure",
  }),
  (req, res) => {
    // For testing without frontend - send JSON response
    // Once you have a frontend, change this to: res.redirect(successRedirectURL)
    res.status(200).json({
      success: true,
      message: "Authentication successful!",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        googleId: req.user.googleId,
        avatarUrl: req.user.avatarUrl,
        isVerified: req.user.isVerified,
      },
      sessionId: req.sessionID,
    });
  }
);

// Check authentication status
authRouter.get("/me", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// OAuth failure route
authRouter.get("/failure", (req, res) => {
  res.status(401).json({ message: "Authentication failed" });
});

export default authRouter;
