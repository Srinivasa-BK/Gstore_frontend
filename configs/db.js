// Import the mongoose library for MongoDB object modeling
import mongoose from "mongoose";

// Async function to connect to MongoDB
const connectDB = async () => {
    try {
        // Listen for the 'connected' event and log when the database is connected
        mongoose.connection.on('connected', () => {
            console.log("Database Connected");
        })
        // Connect to the MongoDB database using the URI from environment variables
        await mongoose.connect(`${process.env.MONGODB_URI}/greenkart`)
    } catch (error) {
        // Log any connection errors
        console.error(error.message);
    }
}

// Export the connectDB function for use in other files
export default connectDB;