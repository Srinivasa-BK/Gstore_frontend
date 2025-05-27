import User from "../models/user.js";

// Get user cart data: /api/cart
export const getcartItems = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId)
      .populate("cartItems.productId")
      .lean();

    // const cartItems = user.cartItems.reduce((acc, item) => {
    //   Object.assign(acc, {
    //     [item.productId._id]: {
    //       ...item.productId,
    //       quantity: item.quantity,
    //     },
    //   });
    //   return acc;
    // }, {});
    return res.status(200).json({
      message: "Cart items fetched successfully",
      cartItems: user.cartItems.map((item) => ({
        ...item.productId,
        quantity: item.quantity,
      })),
      // cartItems,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user cart data: /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    await User.findByIdAndUpdate(userId, { cartItems });
    return res.status(200).json({ message: "Cart updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
