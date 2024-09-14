import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import CredRoutes from "./Routes/CredRoutes.js";


app.use(cors());
app.use(express.json());

app.use('/cred', CredRoutes);

app.get('/', (req, res) => {
    res.send('Server is up and running')
})

//mongoose.connect("mongodb+srv://umarqazi:database@webcluster.wwimsz7.mongodb.net/Game?retryWrites=true&w=majority")
mongoose.connect(process.env.MONG_URI)
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