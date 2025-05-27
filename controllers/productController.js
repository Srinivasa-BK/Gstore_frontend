// import { v2 as cloudinary } from 'cloudinary';
import Product from "../models/product.js";

// Add Product: /api/product/add
export const addProduct = async (req, res) => {
  try {
    console.log(req.body);
    // let productData = JSON.parse(req.body.productData);
    let productData = req.body.productData;  

    await Product.create({
      ...productData,
      // image: imagesUrl,
    });

    return res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get All Products: /api/product/list
export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get Product by ID: /api/product/id
export const productById = async (req, res) => {
  try {
    // const { id } = req.body;
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
      message: "Product fetched successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Change Product stock: /api/product/stock
export const changeProductStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    const product = await Product.findByIdAndUpdate(id, { inStock });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({
      message: "Product stock updated successfully",
      product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
