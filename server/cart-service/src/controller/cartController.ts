import * as cartService from '../service/cartService'
import { Request, Response } from 'express'
import { ICart } from '../model/cartModel';


const getAllCarts = async ( req: Request, res: Response ) => {
    try {
        const cart: ICart[] = await cartService.getAllCarts();
        res.status(200).json(cart)
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
};

const createCart = async (req: Request, res: Response): Promise<void> => {
    const { userId, items } = req.body;
    if (!userId || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ message: 'Missing required fields or items' });
        return; 
    }
    try {
        
        let updatedCart;
        for (const item of items) {
            const { productId, quantity } = item;
        
            if (!productId || !quantity) {
                res.status(400).json({ message: 'Invalid item data' });
                return;
            }
            updatedCart = await cartService.createCart(userId, item);
        }
        console.log('updateCart',updatedCart);
        
        res.status(200).json({ message: 'Items added to cart', cart: updatedCart });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

export default { getAllCarts, createCart }