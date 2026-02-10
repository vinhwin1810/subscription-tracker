import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: 2,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      // Password is optional for OAuth users
      required: false,
      min: 6,
    },
    // OAuth 2.0 fields
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values to be unique
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);

export default User;
