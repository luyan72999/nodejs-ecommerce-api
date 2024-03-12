import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCategory, getAllCategories, updateCategory, deleteCategory, getSingleCategory } from '../controllers/categoryController.js';

const categoryRoutes = express.Router();

categoryRoutes.post('/', isLoggedIn, createCategory);
categoryRoutes.get('/', getAllCategories);
categoryRoutes.get('/:id', getSingleCategory);
categoryRoutes.put('/:id', isLoggedIn, updateCategory);
categoryRoutes.delete('/:id', isLoggedIn, deleteCategory);
// productRoutes.get('/', getAllProducts);
// productRoutes.get('/:id', getProductById);
// productRoutes.put('/:id', isLoggedIn, updateProduct);
// productRoutes.delete('/:id', isLoggedIn, deleteProduct);

export default categoryRoutes;