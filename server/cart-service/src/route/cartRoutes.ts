import express,{ Router } from 'express';
import cartController from '../controller/cartController'
// import authenticateToken from '../middleware/authenticateToken';

const router: Router = express.Router();

router.get('/carts', cartController.getAllCarts)
router.post('/addCart', cartController.createCart)


export default router;