import exporess from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middleware/authseller.js";
import { addProduct, productList, productById, changeProductStock } from "../controllers/productController.js";

const productRouter = exporess.Router();

productRouter.post('/add', authSeller, addProduct);
productRouter.get('/list', productList);
productRouter.get('/:id', productById);
productRouter.post('/stock', authSeller, changeProductStock);

export default productRouter;