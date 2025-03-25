import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


interface IProduct {
    _id :string,
    product_name: string;
    category: string;
    description: string;
    images: string | string[];
    price: number;
    stock: number;
    ratings: number;
}

interface ProductState {
    products: IProduct[];
    currentProduct: IProduct | null;
    loading: boolean;
    error: string | null;
}

const server = import.meta.env.VITE_SERVER;

export const fetchProducts = createAsyncThunk<IProduct[], void, { rejectValue: string }>(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${server}api/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: IProduct[] = await response.json();
      return data;
    } catch (error: unknown) {
      
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Something went wrong");
      }
      
      return rejectWithValue("Something went wrong");
    }
  }
);

export const fetchProductById = createAsyncThunk<IProduct, string,  { rejectValue: string }>(
  "products/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${server}api/products/${productId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data:IProduct = await response.json();
      return data;
    } catch (error) {
      
      if (error instanceof Error) {
        return rejectWithValue(error.message || "Something went wrong");
      }
      
      return rejectWithValue("Something went wrong");
    }
  }
);


const productSlice = createSlice({
    name:"product",
    initialState:{
        products: [],
        currentProduct: null,
        loading: false,
        error: null,
    } as ProductState,
    reducers: {},

    extraReducers:(builder) => {
        builder
            //FetchAll
            //PENDING
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            //SUCCESS
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })

            //FAIL
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch products"; 
            })

            //FetchById
            //PENDING
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            //SUCCESS
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentProduct = action.payload;
            })

            //FAIL
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch products"; 
            });
    }
})

export default productSlice.reducer;