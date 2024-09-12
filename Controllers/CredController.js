import mongoose from "mongoose";
import Credentials from "../Models/Credentials.js"; // Use import
import express from "express";

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(req.body);

    // Step 3: Check if Username already exists
    const existingUser = await Credentials.findOne({ username: username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Step 5: Create a new account
    const newAccount = new Credentials({
      username: username,
      password: password,
    });

    await newAccount.save();

    // Step 6: Send a success response
    return res.status(201).json({ message: "Account created successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Login function
export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Step 1: Find the user in the database
      const user = await Credentials.findOne({ username });
  
      if (!user) {
        return res.status(400).json({ message: "User does not exist." });
      }
  
      // Step 2: Check if password matches
      if (user.password !== password) {
        return res.status(400).json({ message: "Incorrect password." });
      }
  
      // Step 3: If credentials are correct, send success response
      return res.status(200).json({ message: "Login successful!", user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  };

  export const getHighestScore = async (req, res) => {
    const userId = req.params.id;
  
    try {
      const user = await Credentials.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      return res.status(200).json({ highestScore: user.highestScore });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  };


  export const handleHighestScore = async (req, res) => {
    const { userId, highestScore } = req.body;
  
    try {
      // Step 1: Find the user by userId
      const user = await Credentials.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      // Step 2: Check if the new highestScore is greater than the stored highestScore
      if (highestScore > user.highestScore) {
        // Step 3: Update the highestScore if the condition is met
        user.highestScore = highestScore;
        await user.save();
  
        return res.status(200).json({
          message: "Highest score updated successfully!",
          user: user
        });
      } else {
        // If the new score is not higher, send a message indicating no update
        return res.status(200).json({
          message: "The new score is not higher than the current highest score.",
          user: user
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  };

  export const leaderboard = async (req, res) => {
    try {
      // Find the top 10 users with the highest scores
      const topScorers = await Credentials.find({}, { username: 1, highestScore: 1 }) // Select username and highestScore
        .sort({ highestScore: -1 }) // Sort in descending order by highestScore
        .limit(10); // Limit the result to top 10 users
  
      return res.status(200).json({
        message: "Top 10 highest scorers",
        leaderboard: topScorers
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
  };