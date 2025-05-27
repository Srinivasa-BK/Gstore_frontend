import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  // const { sellerToken } = req.cookies;
  const sellerToken =
    req.headers.authorization?.split(" ")[1] || req.cookies.sellerToken;

  if (!sellerToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(sellerToken, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken);
    if (
      decodedToken.email === process.env.SELLER_EMAIL ||
      (decodedToken.id && decodedToken.isAdmin)
    ) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error in authUser:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authSeller;
