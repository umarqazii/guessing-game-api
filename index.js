import express from "express";
import cors from 'cors';
import mongoose from "mongoose";

const app = express();
import CredRoutes from "./Routes/CredRoutes.js";
//require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/cred', CredRoutes);

app.get('/', (req, res) => {
    res.send('Server is up and running')
})

mongoose.connect("mongodb+srv://umarqazi:database@webcluster.wwimsz7.mongodb.net/Game?retryWrites=true&w=majority")
  .then(() => {
    console.log("MongoDB connection established successfully");
    
    // Start the server after a successful database connection
    app.listen(4000, () => {
      console.log('Server is running on port 4000');
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });