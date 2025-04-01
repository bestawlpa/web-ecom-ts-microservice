import Product, { IProduct } from '../model/productModel';

const getAllProducts = async (): Promise<IProduct[]> => {
    try {
        return await Product.find().select('_id product_name images price ratings stock');
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching products: ' + err.message);
    }
};

const createProduct = async (productData: IProduct | IProduct[]):Promise<IProduct[]> =>{
    try {
        return await Product.insertMany(productData);
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error creating product: ' + err.message);
    }
}

const getProductById = async (id: string):Promise<IProduct | null> => {
    try {
        return await Product.findById(id);
    } catch (error) {
        const err = error as Error;  
        throw new Error('Error fetching product by ID: ' + err.message);
    }
}

export { getAllProducts, createProduct, getProductById };