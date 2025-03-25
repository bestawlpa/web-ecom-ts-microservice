import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
    product_name: string;
    category: string;
    description: string;
    images: string[];
    price: number;
    stock: number;
    ratings: number;
}

const productSchema = new Schema<IProduct>({
    product_name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    ratings: { type: Number, default: 0 },
}, { timestamps: true });


export default mongoose.model<IProduct>('Product', productSchema);
export { IProduct };