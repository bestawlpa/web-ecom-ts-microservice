const server: string = import.meta.env.VITE_SERVER2;
import { AppDispatch } from "../store";
import { logoutUser } from "../reduces/userSlice"
import { NavigateFunction } from "react-router-dom";

export const handleLogout = async (dispatch: AppDispatch, navigate: NavigateFunction) => {
    try {
        await fetch(`${server}api/logout`, {
            method: "POST",
            credentials: "include",
        })
        dispatch(logoutUser());
        navigate('/'); 
    } catch (error) {
        console.error("Logout failed", error)
    }
};