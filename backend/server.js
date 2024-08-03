import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectToMongoDB from "./database/connectToMongoDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { v2 as cloudinary } from "cloudinary";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "/.env") });

//connecting to database
connectToMongoDB();
const app = express();

const PORT = process.env.PORT;

const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN || `http://localhost`;

const FRONTEND_DOMAIN = process.env.FRONTEND_DOMAIN;

console.log(FRONTEND_DOMAIN);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

let allowedOrigins = [
  "https://vibe-production-6a25.up.railway.app",
  BACKEND_DOMAIN,
];

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//use helmet to secure the app by setting various HTTP headers
app.use(helmet());

//read and access cookies
app.use(cookieParser());

//middlewares
app.use(express.json({ limit: "10mb" })); //Parsing Json data to req.body
app.use(express.urlencoded({ limit: "10mb", extended: true })); // To parse form data in the req.body

//routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server started at ${BACKEND_DOMAIN}:${PORT}`)
);
