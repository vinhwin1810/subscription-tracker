import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.development.local" });

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const backendAppURL = process.env.BACKEND_APP_URL;

// Serialize user - store user ID in session
// This is called automatically after logging in
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user - retrieve full user object from database using ID stored in session
// This is called automatically on each request to recreate the user object
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: backendAppURL + "/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Try to find and update existing user with this Google ID
        const existingUser = await User.findOneAndUpdate(
          { googleId: profile.id },
          {
            accessToken,
            refreshToken,
            name: profile.displayName,
            avatarUrl: profile.photos[0].value,
            isVerified: profile.emails[0].verified,
          },
          { new: true } // Return updated document
        );

        if (existingUser) {
          return done(null, existingUser);
        }

        // If no user exists, create a new one
        const user = await new User({
          accessToken,
          refreshToken,
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          avatarUrl: profile.photos[0].value,
          isVerified: profile.emails[0].verified,
        }).save();

        done(null, user);
      } catch (error) {
        console.error("Error during authentication: ", error);
        done(error);
      }
    }
  )
);

export default passport;