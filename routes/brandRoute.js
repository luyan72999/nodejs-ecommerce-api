import express from 'express';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createCBrand, getAllBrands, getSingleBrand, updateBrand, deleteBrand } from '../controllers/brandController.js'

const categoryRoutes = express.Router();

categoryRoutes.post('/', isLoggedIn, createCBrand);
categoryRoutes.get('/', getAllBrands);
categoryRoutes.get('/:id', getSingleBrand);
categoryRoutes.put('/:id', isLoggedIn, updateBrand);
categoryRoutes.delete('/:id', isLoggedIn, updateBrand);
// productRoutes.get('/', getAllProducts);
// productRoutes.get('/:id', getProductById);
// productRoutes.put('/:id', isLoggedIn, updateProduct);
// productRoutes.delete('/:id', isLoggedIn, deleteProduct);

export default categoryRoutes;