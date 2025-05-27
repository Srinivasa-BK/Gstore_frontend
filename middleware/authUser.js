import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    // const { token } = req.cookies;

    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

    console.log("Token:", token);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decodedToken);
        if (decodedToken.id) {
            req.body = req.body || {};
            Object.assign(req.body, {
                userId: decodedToken.id,
            });
        } else {
            console.error("Invalid token structure:", decodedToken);
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    } catch (error) {
        console.error("Error in authUser:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default authUser;