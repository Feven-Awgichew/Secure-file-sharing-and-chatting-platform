import { axiosInstance } from './index';

export const signupUser = async (user) => {
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/auth/signup', user);
        return response.data;
    }catch(error){
        return error;
    }
}

export const sendOtpToUser = async (email) => {
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/auth/SendOtp', email);
        return response.data;
    }catch(error){
        return error;
    }
}

export const VerifyUserOtp = async (email,otp) => {
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/auth/Verify-Otp', email,otp);
        return response.data;
    }catch(error){
        return error;
    }
}

export const PasswordReset = async (email) => {
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/auth/password-reset', email);
        return response.data;
    }catch(error){
        return error;
    }
}
export const loginUser = async (user) => {
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/auth/login', user);
        return response.data;
    }catch(error){
        return error;
    }
}