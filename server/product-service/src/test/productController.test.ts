import * as productService from '../../src/service/productService';
import productController  from '../../src/controller/productController';
import { Request, Response } from 'express';
import { IProduct } from '../../src/model/productModel';


describe('getAllProducts', () => {
    it('should return 200 with product list', async () => {
        const mockProducts: Partial<IProduct>[] = [
            {
                _id: '1',
                product_name: 'Mock Product',
                images: ['img1.jpg','img2.jpg'],
                price: 100,
                ratings: 4.5,
                stock: 10
            },
            {
                _id: '2',
                product_name: 'Mock Product2',
                images: ['img2.jpg'],
                price: 200,
                ratings: 4.5,
                stock: 10
            }
        ];
    
        jest.spyOn(productService, 'getAllProducts').mockResolvedValue(mockProducts as IProduct[]);

        const req = {} as Request;  
        const res = {
            status: jest.fn().mockReturnThis(),  
            json: jest.fn()  
        } as unknown as Response;

        await productController.getAllProducts(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([expect.objectContaining({
                _id: '1',
                product_name: 'Mock Product',
                images: 'img1.jpg',
                price: 100,
            })]),
        );
        expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([expect.objectContaining({
                _id: '2',
                product_name: 'Mock Product2',
                images: 'img2.jpg',
                price: 200
        })]),
        );
    });
});


