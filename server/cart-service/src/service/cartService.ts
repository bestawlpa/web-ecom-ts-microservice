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
        cart.items.push({ productId: productObjectId, quantity: item.quantity });
    }
    
    return await cart.save(); 
};
// export const createCart = async (userId: string, item: { productId: string; quantity: number }) => {
//   // ไม่ต้องแปลง productId เป็น ObjectId เพราะเรากำหนด schema เป็น String
//   const { productId, quantity } = item;

//   // ค้นหาตะกร้าของผู้ใช้
//   const cart = await Cart.findOne({ userId });
  
//   if (!cart) {
//     // ถ้ายังไม่มีตะกร้าใหม่สำหรับผู้ใช้
//     const newCart = new Cart({
//       userId,
//       items: [
//         {
//           productId,  // เก็บเป็น string ตามที่ได้ตั้งค่าใน schema
//           quantity,
//         },
//       ],
//     });

//     // บันทึกตะกร้าใหม่
//     return await newCart.save();
//   }

//   // ถ้ามีตะกร้าแล้ว, ตรวจสอบว่ามีสินค้าในตะกร้าอยู่แล้วหรือไม่
//   const existingItem = cart.items.find(i => i.productId === productId);

//   if (existingItem) {
//     // ถ้ามีสินค้าแล้ว, เพิ่มจำนวนสินค้าตามที่กำหนด
//     existingItem.quantity += quantity;
//   } else {
//     // ถ้ายังไม่มีสินค้าในตะกร้า, เพิ่มสินค้าใหม่ลงไป
//     cart.items.push({ productId, quantity });
//   }

//   // บันทึกการอัปเดตตะกร้า
//   return await cart.save();
// };