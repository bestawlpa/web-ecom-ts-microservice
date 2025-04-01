import mongoose, { Document, Schema} from "mongoose";

interface ICart extends Document {
    userId: mongoose.Types.ObjectId;
    items: {
        productId: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    // userId: string; // เปลี่ยนจาก ObjectId เป็น string
    // items: {
    //   productId: string; // เปลี่ยนจาก ObjectId เป็น string
    //   quantity: number;
    // }[];
}

// const cartSchema = new Schema<ICart>({
//   userId: { type: String, required: true },
//   items: [
//     {
//       productId: { type: String, required: true },
//       quantity: { type: Number, default: 1 },
//     },
//   ],
// }, { timestamps: true });

const cartSchema = new Schema<ICart>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // ใช้ mongoose.Schema.Types.ObjectId
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  // ใช้ mongoose.Schema.Types.ObjectId
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ICart>('Cart', cartSchema);
export { ICart };