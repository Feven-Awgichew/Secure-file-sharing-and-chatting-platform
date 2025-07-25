import { axiosInstance } from './index';

export const getAllChats = async () => {
    try{
        const response = await axiosInstance.get('http://localhost:5000/api/chat/get-all-chats');
        return response.data;
    }catch(error){
        return error;
    }
}

export const createNewChat = async ( members ) => {
    try{
        const response = await axiosInstance.post( 'http://localhost:5000/api/chat/create-new-chat', { members });
        return response.data;
    }catch(error){
        return error;
    }
}
export const createNewGroupChat = async ( name, members ) => {
    try{
        const response = await axiosInstance.post( 'http://localhost:5000/api/chat/create-group', { name, members });
        return response.data;
    }catch(error){
        return error;
    }
}



export const clearUnreadMessageCount = async ( chatId ) => {
    try{
        const response = await axiosInstance.post('http://localhost:5000/api/chat/clear-unread-message', { chatId: chatId });
        return response.data;
    }catch(error){
        return error;
    }
}