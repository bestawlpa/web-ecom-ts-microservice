import * as cartService from '../service/cartService'
import { Request, Response } from 'express'
import { ICart } from '../model/cartModel';
import fetch from 'node-fetch';


const getAllCarts = async ( req: Request, res: Response ) => {
    try {
        const cart: ICart[] = await cartService.getAllCarts();
        res.status(200).json(cart)
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
};

const createCart = async (req: Request, res: Response) => {
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
        
        res.status(200).json({ message: 'Items added to cart', cart: updatedCart });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

const getProductById = async (productId: string) => {
    try {
        const response = await fetch(`http://product-service:3001/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Product not found');
        }
        const { product_name, images, price, quantity, stock  } = await response.json();    
    
        return { product_name, images, price, quantity, stock  };
    } catch (error) {
        const err = error as Error;
        console.log(err);
    }
};

const getCartByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const cartItems = await cartService.getCartByUserId(userId);

        if (!cartItems) {
          return res.status(404).json({ message: 'No itme in cart' });
        }

        const productDetails = await Promise.all(
          cartItems.items.map(async (item) => {
            const product = await getProductById(item.productId.toString());
            return { ...item, product }; 
          })
        );

        res.status(200).json({
          ...cartItems,
          items: productDetails,
        });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

// const getProductById = async (productId: string) => {
//     try {
//         const response = await fetch(`http://product-service:3001/api/products/${productId}`);
//         if (!response.ok) throw new Error('Product not found');
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         return null; // ส่งคืน null หากเกิดข้อผิดพลาด
//     }
// };

// const getCartByUserId = async (req: Request, res: Response) => {
//     try {
//         const userId = req.params.userId;
//         const cartItems = await cartService.getCartByUserId(userId);

//         if (!cartItems) {
//             return res.status(404).json({ message: 'No cart found for this user' });
//         }

//         // ดึงข้อมูลสินค้าทั้งหมดในครั้งเดียว
//         const productDetails = await Promise.all(
//             cartItems.items.map(async (item) => {
//                 const product = await getProductById(item.productId.toString());
//                 return product ? { ...item, product } : null; // ส่งคืนข้อมูลสินค้า
//             })
//         );

//         // กรอง null ออกจาก productDetails
//         const filteredProductDetails = productDetails.filter(item => item !== null);

//         res.status(200).json({
//             ...cartItems,
//             items: filteredProductDetails,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// };

const removeItemFromCart = async (req: Request, res: Response) => {
    const { userId, itemId } = req.params;

    if (!userId || !itemId) {
        return res.status(400).json({ message: 'Missing userId or itemId' });
    }

    try {
        const updatedCart = await cartService.removeItemFromCart(userId, itemId);
        res.status(200).json({ message: 'Item removed from cart', cart: updatedCart });
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
};

export default { getAllCarts, createCart, getCartByUserId, removeItemFromCart }