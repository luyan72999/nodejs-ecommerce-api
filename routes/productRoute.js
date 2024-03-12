import express from 'express';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/productController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const productRoutes = express.Router();

productRoutes.post('/', isLoggedIn, createProduct);
productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', getProductById);
productRoutes.put('/:id', isLoggedIn, updateProduct);
productRoutes.delete('/:id', isLoggedIn, deleteProduct);

export default productRoutes;