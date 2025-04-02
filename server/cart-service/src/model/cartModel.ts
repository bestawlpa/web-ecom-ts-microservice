import mongoose, { Document, Schema} from "mongoose";

interface ICart extends Document {
    userId: mongoose.Types.ObjectId;
    items: {
        _id: mongoose.Types.ObjectId;
        productId: mongoose.Types.ObjectId;
        quantity: number;
    }[];
}

const cartSchema = new Schema<ICart>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  
    items: [
      { 
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<ICart>('Cart', cartSchema);
export { ICart };