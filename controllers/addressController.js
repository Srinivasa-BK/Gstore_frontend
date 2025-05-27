import Address from "../models/address.js";

// Add Address: /api/address/add
export const addAddress = async (req, res) => {
    try {
        const { userId, address } = req.body;
        await Address.create({ ...address, userId });
        return res.status(200).json({ message: "Address added successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get Address: /api/address/get
export const getAddress = async (req, res) => {
    try {
        const { userId } = req.body;
        const addresses = await Address.find({ userId });
        return res.status(200).json(addresses);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}