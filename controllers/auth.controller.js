import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const SignUp = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body;
    // check if user already exists
    const existingUser = await mongoose.model("User").findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await mongoose
      .model("User")
      .create([{ name, email, password: hashedPassword }]);
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await session.commitTransaction();
    session.endSession();
    return res.status(201).json({ user: newUser, token });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error during sign up:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
