/*
    This file sets up and starts the Express server for the Green Kart application.

    - Imports all required packages and routers.
    - Loads environment variables from the .env file.
    - Connects to the MongoDB database.
    - Connects to Cloudinary for image storage.
    - Sets up middleware for parsing JSON, cookies, and handling CORS (Cross-Origin Resource Sharing).
    - Defines a simple route to check if the API is working.
    - Registers routers for user, seller, product, cart, address, and order related API endpoints.
    - Starts the server and listens on the specified port.
*/

// Import required packages
import cookieParser from "cookie-parser"; // For parsing cookies from requests
import express from "express"; // Express framework for building APIs
import cors from "cors"; // To enable Cross-Origin Resource Sharing
import connectDB from "./configs/db.js"; // Import database connection function
import dotenv from "dotenv"; // To load environment variables from .env file

import connectCloudinary from "./configs/cloudinary.js"; // Import Cloudinary connection function

// Import routers for different API endpoints
import userRouter from "./routes/userRoute.js"; // User-related routes
import sellerRouter from "./routes/sellerRoute.js"; // Seller-related routes
import productRouter from "./routes/productRoute.js"; // Product-related routes
import cartRouter from "./routes/cartRoute.js"; // Cart-related routes
import addressRouter from "./routes/addresRoute.js"; // Address-related routes
import orderRouter from "./routes/orderRoute.js"; // Order-related routes

dotenv.config(); // Load environment variables

const app = express(); // Create an Express application
const port = process.env.PORT || 4000; // Set the port number

await connectDB(); // Connect to MongoDB database

await connectCloudinary(); // Connect to Cloudinary for image storage

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://thunderous-bonbon-70bf99.netlify.app",
  // "https://abc123.ngrok.io",
]; // List of allowed origins for CORS

// Middleware configuration
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cookieParser()); // Parse cookies attached to the client request
// app.use(
//   cors({
//     origin: allowedOrigins, // Allow requests only from specified origins
//     credentials: true, // Allow cookies to be sent with requests
//   })
// );
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // Enable if using cookies/auth
//   })
// );
app.use(
  cors({
    origin: ["https://ephemeral-peony-67fbdb.netlify.app"], // Replace with your Netlify domain
    methods: ["GET", "POST"],
    credentials: true,
  };

// Define a simple route to check if the API is working
app.get("/", (req, res) => res.send("API is working"));

// Use userRouter for all routes starting with /api/user
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter); // Use sellerRouter for all routes starting with /api/seller

// Use productRouter for all routes starting with /api/product
app.use("/api/product", productRouter);

app.use("/api/cart", cartRouter); // Use cartRouter for all routes starting with /api/cart

app.use("/api/address", addressRouter); // Use addressRouter for all routes starting with /api/address

app.use("/api/order", orderRouter); // Use orderRouter for all routes starting with /api/order

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
