import express,{ Router } from 'express';
import cartController from '../controller/cartController'

const router: Router = express.Router();

router.get('/carts', cartController.getAllCarts)
router.post('/addCart', cartController.createCart)
router.get('/cart/:userId', cartController.getCartByUserId);
router.delete('/cart/remove/:userId/:itemId', cartController.removeItemFromCart);

export default router;