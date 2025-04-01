import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const server = import.meta.env.VITE_SERVER2;

export interface IUser {
    _id?:string
    username: string;
    email: string;
    password?: string;
}

interface UserState {
    currentUser: IUser| null;
    loading: boolean;
    error: string | null;
}

const loadUserFromLocalStorage = ():IUser | null => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

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

export const getUserProfile = createAsyncThunk<IUser>(
    "user/getUserProfile",
    async () => {
        const response = await fetch(`${server}api/profile`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",  
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch user profile");
        }
        const data = await response.json();
        localStorage.setItem("currentUser", JSON.stringify(data));
        return data;
    }
);

const userSlice = createSlice({
    name:"user",
    initialState: {
        currentUser: loadUserFromLocalStorage(), 
        loading: false,
        error: null, 
    } as UserState,
    reducers:{
        logoutUser: (state) => {
            state.currentUser = null;
            localStorage.removeItem("currentUser"); 
        },
    },

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

            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            }) 
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch Profile"
            })
    }
})

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;