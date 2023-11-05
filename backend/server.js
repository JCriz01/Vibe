import express from "express";
import { fileURLToPath } from "url";
import path from "path";
//import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./database/connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { v2 as cloudinary } from "cloudinary";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: path.join(__dirname, "/.env") });

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;
const DOMAIN = process.env.DOMAIN || `http://localhost`;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(
  cors({
    origin: `https//${process.env.DOMAIN}`,
  })
);

app.use(helmet());

//middlewares
app.use(express.json({ limit: "10mb" })); //Parsing Json data to req.body
app.use(express.urlencoded({ limit: "10mb", extended: true })); // To parse form data in the req.body
app.use(cookieParser()); //read and access cookies

//routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server started at ${DOMAIN}:${PORT}`)
);
