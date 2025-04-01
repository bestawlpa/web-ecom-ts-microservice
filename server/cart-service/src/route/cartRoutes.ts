import express,{ Router } from 'express';
import cartController from '../controller/cartController'

const router: Router = express.Router();

router.get('/carts', cartController.getAllCarts)

export default router;