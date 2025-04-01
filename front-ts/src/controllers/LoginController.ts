import { getUserProfile } from "../reduces/userSlice";
import Swal from "sweetalert2";
import { AppDispatch } from "../store";
import { NavigateFunction } from "react-router-dom";

const server: string = import.meta.env.VITE_SERVER2;

export const handleSubmit = async (e:React.FormEvent<HTMLFormElement>, email: string, password: string, dispatch: AppDispatch, navigate: NavigateFunction) => {
    e.preventDefault();
    
    try {
        const response = await fetch(`${server}api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });
        if (response.ok) {
            Swal.fire({
            title: 'SUCCESS',
            text: 'Login Success',
            icon: 'success'
            }).then(async () => {
                await dispatch(getUserProfile());
                navigate('/'); 
            });
        } 
    } catch (err) {
            Swal.fire({
            title: 'ERROR',
            text: 'Login Failed',
            icon: 'error'
        });
    }
};