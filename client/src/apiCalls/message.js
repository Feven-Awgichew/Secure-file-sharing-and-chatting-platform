import { axiosInstance } from './index';

export const createNewMessage = async ( message ) => {
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/message/new-message', message);
        return response.data;
    }catch(error){
        return error;
    }
}

export const getAllMessages = async ( chatId, aeskey ) => {
    try{
        const response = await axiosInstance.get(`http://localhost:5000/api/message/get-all-messages/${chatId}`,{
                 params: { aeskey }
        });
        
        return response.data;
    }catch(error){
        return error;
    }
}