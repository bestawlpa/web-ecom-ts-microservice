import Cart, { ICart } from '../model/cartModel'

const getAllCarts = async (): Promise<ICart[]> => {
    try {
        return await Cart.find()
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching carts: ' + err.message);
    }
}

export { getAllCarts }