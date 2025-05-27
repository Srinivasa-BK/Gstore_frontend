import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user : POST /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password, isAdmin } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user & save it to the database
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false
        });

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // res.cookie("token", token, {
        //     httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        //     maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
        //     secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        //     sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Prevents CSRF attacks by ensuring the cookie is sent only for same-site requests
        // });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                name: newUser.name,
                email: newUser.email,
                userId: newUser._id,
            },
            token,
        });
    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Login a user : POST /api/user/login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare the password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: existingUser._id, isAdmin: existingUser.isAdmin }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     maxAge: 24 * 60 * 60 * 1000,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        // });

        return res.status(200).json({
            message: "Login successful",
            user: {
                name: existingUser.name,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
                userId: existingUser._id,
            },
            token,
        });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Chech Authenticated user : GET /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({
            message: "User authenticated",
            user,
        });
    } catch (error) {
        console.error("Error in authUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Logout a user : GET /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};