import mongoose from "mongoose";
import User from "../models/userModel.js"; // Import your user model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import e from "express";
dotenv.config(); // Add this at the top of your controller file

export const news = async (req, res) => {
  console.log(req.user._id);
  const userId = req.user._id.toString();
  const { email } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log(user.email);
    console.log(email);
    console.log(!(user.email === email));
    if (user.email === email) {
      user.newsletterSubscribed = true;
      await user.save(); // Save changes to the database
      res.status(200).json({ message: "Newsletter subscription updated" }); // More accurate status code
    } else {
      return res.json({ message: "Email you signed up with is different" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const newuser = { ...user, token };

    res.json({
      name: user.name,
      email: user.email,
      phoneno: user.phoneNumber,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
export const signup = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, address, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phoneNumber,
      address,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created!" });
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res) => {
  // Client-side token clearing is a common approach
  res.json({ message: "Logout successful (client-side)" });
};

export const profile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found bhai jaan" });
    }

    // Omit password hash
    const { password, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    next(error);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    // Check if the current user is an admin (you'll need middleware to authorize this)
    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ error: "Unauthorized: Admin access required" });
    }

    const users = await User.find({}, { password: 0 }); // Exclude the password field

    res.json(users);
  } catch (error) {
    next(error);
  }
};
export const updatePassword = async (req, res, next) => {
  try {
    const { userId } = req.user; // Get user ID from authenticated request
    const { currentPassword, newPassword } = req.body;

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Incorrect current password" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
