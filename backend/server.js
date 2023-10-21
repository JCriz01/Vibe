import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json()); //Parsing Json data to req.body
app.use(express.urlencoded({ extended: true })); // To parse form data in the req.body
app.use(cookieParser());

//routes
app.use("/api/users", userRoutes);

app.listen(PORT, () =>
  console.log(`Server started at https://localhost:${PORT}`)
);
