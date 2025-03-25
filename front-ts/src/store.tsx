import productSlice from "./reduces/productSlice";
import userSlice from "./reduces/userSlice"
import { configureStore } from "@reduxjs/toolkit";


const store = configureStore({
    reducer:{
        product: productSlice,
        user: userSlice
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
