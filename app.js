import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectDB from "./db/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import notFound from "./middlewares/routeNotFound.middleware.js";
import passport from "./services/Passport.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.development.local" });

const app = express();

// CORS middleware - MUST be before other middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Allow cookies to be sent
  })
);

// Body parser middleware
app.use(express.json());
app.use(cookieParser());

// Session middleware - MUST be before passport
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret_key_here",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // true in production (HTTPS only)
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// Passport middleware - MUST be after session
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use(notFound);
app.use(errorMiddleware);

app.listen(PORT, async (err) => {
  if (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
  console.log(`Server is running on port http://localhost:${PORT}`);
  await connectDB();
});

export default app;
