import Product from '../../src/model/productModel';
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
});