import express,{ Router } from 'express';
import productController from '../controller/productController';

const router: Router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);


export default router;