import express from 'express';
import authUser from '../middleware/authUser.js';
import authSeller from '../middleware/authseller.js';
import { getAllOrders, getUserOrders, placeOrder } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place', authUser, placeOrder);
orderRouter.get('/user', authUser, getUserOrders);
orderRouter.get('/seller', authSeller, getAllOrders);

export default orderRouter;