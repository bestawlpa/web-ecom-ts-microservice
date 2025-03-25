import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const server = import.meta.env.VITE_SERVER2;

export interface IUser {
    _id?:string
    username: string;
    email: string;
    password: string;
}

interface UserState {
    currentUser: IUser| null;
    loading: boolean;
    error: string | null;
}

export const createUser = createAsyncThunk<IUser, IUser>(
    "users/createUser", 
    async (user: IUser) => {
        const response = await fetch(`${server}api/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
        }
        const data = await response.json();
        return data;
    }
);

const userSlice = createSlice({
    name:"user",
    initialState: {
        currentUser: null, 
        loading: false,
        error: null, 
    } as UserState,
    reducers:{},

    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to create user";
            })
    }
})

export default userSlice.reducer;