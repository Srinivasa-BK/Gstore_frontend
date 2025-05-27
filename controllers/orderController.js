import Order from "../models/order.js";
import Product from "../models/product.js";
import shortId from "shortid";

// Place order COD: /api/order/place
export const placeOrder = async (req, res) => {
    try {
        const { userId, items, address, paymentType, cardType } = req.body;

        if (!address || items?.legth === 0) {
            return res.status(400).json({ message: "Invalid order details" });
        }

        // calculate Amount using items.
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return await acc + product.offerPrice * item.quantity;
        }, 0);

        // Add Tax chagres 2%
        amount += Math.floor(amount * 0.02);

        if (paymentType?.toLowerCase() === "online") {
            const order = await Order.create({
                userId,
                items,
                address,
                amount,
                paymentType: "online",
                transactionId: shortId.generate(),
                isPaid: true,
                cardType,
            })
            res.status(201).json({
                message: "Order placed successfully",
                data: {
                    orderId: order._id,
                    transactionId: order.transactionId,
                    amount: order.amount
                }
            });
        } else {
            const order = await Order.create({
                userId,
                items,
                address,
                amount,
                paymentType: "COD"
            })
            res.status(201).json({
                message: "Order placed successfully",
                data: {
                    orderId: order._id,
                    amount: order.amount
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get order by userId: /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "Invalid user ID" });
        }

        const orders = await Order
            .find({
                userId,
                $or: [{ paymentType: "COD" }, { isPaid: true }]
            })
            .populate("items.product address")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get All Orders (for seller / admin ): /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order
            .find({
                $or: [{ paymentType: "COD" }, { isPaid: true }]
            })
            .populate("items.product address");

        res.status(200).json(orders);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}