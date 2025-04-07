import * as productService from '../../src/service/productService';
import productController  from '../../src/controller/productController';
import { Request, Response } from 'express';
import { IProduct } from '../../src/model/productModel';
import { json } from 'stream/consumers';


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

    it('should return 201 and created product', async() => {
        const mockProduct = [{
            product_name: 'New Product',
            category: 'new-category',
            description: 'description',
            images: ['img.jpg'],
            price: 150,
            stock: 10,
            ratings: 4.5,
        }] as IProduct[];

        const req = {
            body: mockProduct
        } as Request

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        jest.spyOn(productService, 'createProduct').mockResolvedValue(mockProduct);

        await productController.createProduct(req,res);

        expect(productService.createProduct).toHaveBeenCalledWith(mockProduct);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockProduct);
    })

    it('should return 200 with product By Id', async() => {
        const mockProduct = {   
            _id: 'pd_01',
            product_name: 'Product_01',
            category: 'new-category',
            description: 'description',
            images: ['img.jpg'],
            price: 150,
            stock: 10,
            ratings: 4.5,
        } as IProduct;
            
        jest.spyOn(productService, 'getProductById').mockResolvedValue(mockProduct);

        const req = { params: { id: 'pd_01' } } as unknown as Request;   
        const res = {
            status: jest.fn().mockReturnThis(),  
            json: jest.fn()  
        } as unknown as Response;

        await productController.getProductById(req,res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                _id: 'pd_01',
                product_name: 'Product_01',
                category: 'new-category',
                description: 'description',
                images: ['img.jpg'],
                price: 150,
                stock: 10,
                ratings: 4.5
            })
        );
    })
});


