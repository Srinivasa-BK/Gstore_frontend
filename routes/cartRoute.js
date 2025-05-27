import express from "express";
import authUser from "../middleware/authUser.js";
import { updateCart, getcartItems } from "../controllers/cartcontroller.js";

const cartRouter = express.Router();

cartRouter.get("/", authUser, getcartItems);
cartRouter.post("/update", authUser, updateCart);

export default cartRouter;
