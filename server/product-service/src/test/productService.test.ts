import Product,{ IProduct } from '../../src/model/productModel';
import * as productService from '../../src/service/productService'


jest.mock('../../src/model/productModel'); 

describe('Product Service', () => {
    it('should return product list', async () => {
        const mockProducts = [
            {
                _id: '1',
                product_name: 'Mock',
                images: ['mock.jpg'],
                price: 100,
                ratings: 4.5,
                stock: 10
            }
        ];

        // @ts-ignore
        Product.find.mockReturnValue({
            select: jest.fn().mockResolvedValue(mockProducts)
        });

        const result = await productService.getAllProducts();
        expect(result).toEqual(mockProducts);
    });

    it('should create product', async () => {
        const mockProduct= { 
            _id: 'newId',
            product_name: 'New Product',
            category: 'category-01',
            description: 'product-01',
            images: ['new_image.jpg'],
            price: 150,
            stock: 10,
            ratings: 4.5
        } as IProduct;

        //@ts-ignore
        Product.insertMany.mockResolvedValue([mockProduct]);
        const result = await productService.createProduct(mockProduct);
        expect(result).toEqual([mockProduct]);
        expect(Product.insertMany).toHaveBeenCalledWith(mockProduct)
    })

    it('should return product by ID', async() => {
        const mockProduct = { 
            _id: '1',
            product_name: 'New Product',
            category: 'category-01',
            description: 'product-01',
            images: ['new_image.jpg'],
            price: 150,
            stock: 10,
            ratings: 4.5
        }

        // @ts-ignore
        Product.findById.mockResolvedValue(mockProduct);
        const result = await productService.getProductById('1');
        expect(result).toEqual(mockProduct)
    })
});

