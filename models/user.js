// Import mongoose for MongoDB object modeling
import mongoose from "mongoose";

// Define the schema for the User collection
const userSchema = new mongoose.Schema(
  {
    // User's name (required)
    name: {
      type: String,
      required: true,
    },
    // User's email (required and unique)
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // User's password (required)
    password: {
      type: String,
      required: true,
    },
    // User's cart items (default is empty object)
    // cartItems: {
    //     type: Object,
    //     default: {}
    // },
    cartItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product", // Must match your Product model name
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
    // Store empty objects as-is, do not remove them
    minimize: false,
  }
);

// Create the User model if it doesn't already exist, otherwise use the existing one
const User = mongoose.models.user || mongoose.model("user", userSchema);

// Export the User model for use in other files
export default User;
