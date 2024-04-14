import express from "express";
import passport from "passport";

import { checkAuth, isAdmin } from "../middlewares/authMiddleware.js";
import {
  signup,
  login,
  logout,
  profile,
  getAllUsers,
  news,
  updatePassword,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/newsletter", checkAuth, news);
router.get("/profile", checkAuth, profile);

router.get(
  "/all-users",
  checkAuth,
  isAdmin,
  getAllUsers
  // Controller function for fetching all users
);

router.put("/update/:id", checkAuth, updatePassword);
// Initiate Google Login
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google Login Redirect/Callback
router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication - create a JWT or redirect
    // Example with JWT:
    const token = generateJWT(req.user);
    res.redirect(`http://localhost:3000/dashboard?token=${token}`);
  }
);

router.post("/auth/google", async (req, res) => {
  const { idToken } = req.body;

  try {
    // 1. Verify the ID Token with Google APIs
    const { OAuth2Client } = require("google-auth-library");
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({ idToken });
    const payload = ticket.getPayload();

    // 2. Find or create the user by Google ID (similar to passport.js logic)
    // ... your existing logic here

    // 3. Generate JWT or handle login response
    // ... assuming you use JWT
    const token = generateJWT(user);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: "Invalid Google login" });
  }
});
export default router;
