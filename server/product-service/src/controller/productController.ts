import * as productService  from '../service/productService'
import { Request, Response } from 'express';
import { IProduct } from '../model/productModel';

const getAllProducts = async (req:Request, res:Response) => {
    try {
        const products = await productService.getAllProducts();
        const result = products.map((product: IProduct)  => ({
            _id: product._id,
            product_name: product.product_name,
            images: product.images[0],
            price: product.price,
            ratings: product.ratings,
            stock: product.stock
        }))
        res.status(200).json(result)
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
}

const createProduct = async (req:Request, res:Response) => {
    try {
        const productData: IProduct | IProduct[] = req.body; 
        const product = await productService.createProduct(productData)
        res.status(201).json(product)
    } catch (error) {
        const err = error as Error;
        res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
}

const getProductById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const productId: string = req.params.id;
        const product: IProduct | null = await productService.getProductById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default { getAllProducts, createProduct, getProductById  };