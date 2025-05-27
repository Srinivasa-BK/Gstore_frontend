import express from 'express';
import { getExternalUsers, isSellerAuth, sellerLogin, sellerLogout } from '../controllers/sellerController.js';
import authSeller from '../middleware/authseller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth', authSeller, isSellerAuth);
sellerRouter.get('/logout', sellerLogout);
sellerRouter.get('/externalusers', authSeller, getExternalUsers)


export default sellerRouter;