import { axiosInstance} from "./index";

export const getLoggedUser = async () => {
    try{
        const response = await axiosInstance.get('http://localhost:5000/api/user/get-logged-user');
        return response.data;
    }catch(error){
        return error;
    }
}

export const getAllUsers = async () => {
    try{
        const response = await axiosInstance.get('http://localhost:5000/api/user/get-all-users');
        
        return response.data;
    }catch(error){
        return error;
    }
}


export const Changepassword = async (email,newPassword,confirmPassword) => {
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/user/change-password', {email,newPassword,confirmPassword});
        return response.data;
    }catch(error){
        return error;
    }
}


export const uploadProfilePic = async (image) => {
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/user/upload-profile-pic', { image });
        return response.data;
    }catch(error){
        return error;
    }
}