import * as cartService from '../service/cartService'
import { Request, Response } from 'express'
import { ICart } from '../model/cartModel';

 const getAllCarts = async ( req: Request, res: Response) => {
    try {
        const cart: ICart[] = await cartService.getAllCarts();
        res.status(200).json(cart)
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
}

export default { getAllCarts }