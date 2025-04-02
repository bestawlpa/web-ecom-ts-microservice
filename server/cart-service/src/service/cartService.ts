import Cart, { ICart } from '../model/cartModel'
import { Types } from "mongoose";


export const getAllCarts = async (): Promise<ICart[]> => {
    try {
        return await Cart.find()
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching carts: ' + err.message);
    }
};

export const createCart = async( userId: string, item: { productId: string; quantity: number }) => {
    try {
        const productObjectId = new Types.ObjectId(item.productId);
        const cart = await Cart.findOne({userId});
        if (!cart) {
            const newCart = new Cart({
                userId,
                items: [
                    { 
                        productId: productObjectId, 
                        quantity: item.quantity 
                    }
                ],
            })

            return await newCart.save();
        }
        const existingItem = cart.items.find(i => i.productId.toString() === productObjectId.toString());

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.items.push({ _id: new Types.ObjectId, productId: productObjectId, quantity: item.quantity });
        }
        return await cart.save(); 
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching carts: ' + err.message);
    }
};

export const getCartByUserId = async (userId: string) => {
    try {
        const userObjectId = new Types.ObjectId(userId);
        const cart = await Cart.findOne({ userId: userObjectId }).lean(); 
        return cart;
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching carts: ' + err.message);
    }
};

export const removeItemFromCart = async (userId: string, itemId: string) => {
    try {
        const cart = await Cart.findOne({ userId }) as ICart | null;

        if (!cart) {
            throw new Error('Cart not found');
        }

        
        cart.items = cart.items.filter(item => item._id.toString() !== itemId);

        
        if (cart.items.length === 0) {
            await Cart.deleteOne({ _id: cart._id })
            return; 
        }
        return await cart.save();
    } catch (error) {
        const err = error as Error;
        throw new Error('Error removing item from cart: ' + err.message);
    }
};

