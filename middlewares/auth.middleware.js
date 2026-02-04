import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config/env.js";

const authMiddleWare = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      console.log("Authorization Header:", req.headers.authorization);
      console.log("Headers:", req.headers);
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      const error = new Error("Not authorized, no token");
      error.statusCode = 401;
      throw error;
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      const error = new Error("No user found");
      error.statusCode = 401;
      throw error;
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleWare;
