import { describe, it, expect, vi,  beforeEach } from 'vitest'
import { render, screen, waitFor} from '@testing-library/react'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import productSlice,{ fetchProducts } from "../reduces/productSlice";
import userSlice from "../reduces/userSlice"
import { configureStore } from '@reduxjs/toolkit';
import Home from "../page/Home";

const mockProduct = [
    { 
        _id: "1sdf", 
        product_name: "Test Product 1", 
        category: "Category 1",   
        description: "A great product",
        images: ["test1.jpg", "test2.jpg"], 
        price: 100, 
        stock: 10,           
        ratings: 4.5 
    },
    { 
        _id: "2sdf", 
        product_name: "Test Product 2", 
        category: "Category 2", 
        description: "Another great product", 
        images: ["test1.jpg", "test2.jpg"], 
        price: 200, 
        stock: 5,               
        ratings: 4.8 
    },
]

const mockFetchSuccess = () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => mockProduct
    } as unknown as Response)
}

const mockFetchFail = () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ message: 'Server error' })
    } as unknown as Response)
}

describe('Redux - Product Slice', () => {
    it('should fetch and store product data successfully', async () => {
        mockFetchSuccess()
        const store = configureStore({ reducer: { product: productSlice } })

        await store.dispatch(fetchProducts())
        const state = store.getState().product

        expect(state.products).toEqual(mockProduct)
        expect(state.loading).toBe(false)
        expect(state.error).toBeNull()
    })

    it('should handle fetch failure and set error state', async () => {
        mockFetchFail()
        const store = configureStore({ reducer: { product: productSlice } })

        await store.dispatch(fetchProducts())
        const state = store.getState().product

        expect(state.products).toEqual([])
        expect(state.error).not.toBeNull()
    })
})

describe('Home UI', () => {
    beforeEach(() => {
        mockFetchSuccess()
    
        const store = configureStore({
            reducer: { 
                product: productSlice, 
                user: userSlice 
            } 
        })

        render(
            <Provider store={store}>  
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        )
    })

    it('should render the Header component', () => {
        expect(screen.getByRole('banner')).toBeInTheDocument()
    })

    it('should render the Footer component', () => {
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    })

    it('should display product info on the page', async () => {
        await waitFor(() => {
            expect(screen.getByText('Test Product 1')).toBeInTheDocument()
            expect(screen.getByText('฿100')).toBeInTheDocument()
            expect(screen.getByText('4.5')).toBeInTheDocument()

            expect(screen.getByText('Test Product 2')).toBeInTheDocument()
            expect(screen.getByText('฿200')).toBeInTheDocument()
            expect(screen.getByText('4.8')).toBeInTheDocument()
        })
    })

    it('should alert when adding to cart without login', async () => {
        window.alert = vi.fn()
        await waitFor(() => {
            expect(screen.getByText('Test Product 1')).toBeInTheDocument()
        })
        const button = screen.getAllByRole('button')[0]
        button.click()
        await waitFor(() => {
            expect(window.alert).toHaveBeenCalledWith("กรุณา login ก่อนเพิ่มสินค้าในตะกร้า")
        })
    })
})
