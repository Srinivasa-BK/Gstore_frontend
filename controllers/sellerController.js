import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// Login Seller:  POST /api/seller/login

export const sellerLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            });
            res.cookie("sellerToken", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            });
            return res.status(200).json({
                message: "Login successful",
                seller: {
                    email,
                },
            });
        } else {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }
    } catch (error) {
        console.error("Error in sellerLogin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Chech Authenticated seller : GET /api/seller/auth
export const isSellerAuth = async (req, res) => {
    try {
        // const { userId } = req.body;
        // const user = await User.findById(userId).select("-password");
        return res.status(200).json({
            message: "User authenticated",
            // email: req.body.email,
        });
    } catch (error) {
        console.error("Error in authUser:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Logout a seller : GET /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in sellerLogout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get All external users: /api/seller/externalusers
export const getExternalUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password")
        console.log(users)
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}