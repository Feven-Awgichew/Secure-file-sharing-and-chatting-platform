import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from './../../../apiCalls/chat';
import { createNewGroupChat } from './../../../apiCalls/chat';
import { hideLoader, showLoader } from "../../../redux/loaderSlice";

import { setAllChats, setSelectedChat } from './../../../redux/usersSlice';
import moment from "moment";
import { useEffect } from "react";
import store from "../../../redux/store";

function UsersList({searchKey, socket, onlineUser}){
    const { allUsers, allChats, user: currentUser, selectedChat } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const startNewChat = async (searchedUserId) => {
        let response = null;
        const response1 = await fetch('http://localhost:5000/api/chat/create-new-chat', { method: 'POST' });
        try{
            dispatch(showLoader());
            response =await createNewChat([currentUser._id, searchedUserId]);
            dispatch(hideLoader());

            if(response.success){
                toast.success(response.message);
                const newChat = response.data;
                const chatid= newChat._id;
                const updatedChat = [...allChats, newChat]
                dispatch(setAllChats(updatedChat));
                dispatch(setSelectedChat(newChat));
                localStorage.setItem(chatid , response.aeskey);
                const data = await response1.json();

    if (data.success) {
        // Store chat ID and AES key in localStorage
        localStorage.setItem(data.chatId, data.aeskey);
        console.log(`Chat ID: ${data.chatId}, AES Key: ${data.aeskey}`);
    } else {
        console.error('Error creating chat:', data.message);
    }
}
            }
        catch(error){
            toast.error(response.message);
            dispatch(hideLoader());
        }
    }
/*
    const createChatAndStoreKey = async () => {
    try {
        
        

    const data = await response.json();

    if (data.success) {
        // Store chat ID and AES key in localStorage
        localStorage.setItem(data.chatId, data.aeskey);
        console.log(`Chat ID: ${data.chatId}, AES Key: ${data.aeskey}`);
    } else {
        console.error('Error creating chat:', data.message);
    }
}
catch(error){
    console.log("error");
    }
}
    */

// Call the function
        


    async function fetchAndStoreKey(chatId) {
    try {
        const response = await fetch(`http://localhost:5000/api/create-new-chat/${chatId}`);
        const data = await response.json();

        // Store the key in localStorage
        localStorage.setItem(data.chatId, data.base64Key2);
        console.log(`Key for ${data.chatId} stored in localStorage.`);
    } catch (error) {
        console.error('Error fetching the key:', error);
    }
}
    //const storekey = createChatAndStoreKey();

    const handleClick = (userId) => {
    startNewChat(userId); // First operation
   // createChatAndStoreKey();
    // console.log(`Starting chat for user ID: ${userId}`); // Second operation
};
/*
    const createNewGroupChat = async (name, searchedUserId) => {
        let response = null;
        try {
            
            dispatch(showLoader());
            const members= Array.from(new Set([currentUser._id, ...searchedUserId]));
            response = await createNewGroupChat({ name , members });
            dispatch(hideLoader());
    
            if (response.success) {
                toast.success(response.message);
                const newGroupChat = response.data;
                const updatedGroupChats = [...allChats, newGroupChat];
                dispatch(setAllChats(updatedGroupChats));
                dispatch(setSelectedChat(newGroupChat));
            }
        } catch (error) {
            toast.error(error.message || 'An error occurred while creating the group chat.');
            dispatch(hideLoader());
        }
    };

*/
    const openChat = (selectedUserId) => {
        const chat = allChats.find(chat => 
            chat.members.map(m => m._id).includes(currentUser._id) && 
            chat.members.map(m => m._id).includes(selectedUserId)
        )

        if(chat){
            dispatch(setSelectedChat(chat));
        }
    }




    const IsSelectedChat = (user) => {
        if(selectedChat){
            return selectedChat.members.map(m => m._id).includes(user._id);
        }
        return false;
    }

    const getLastMessageTimeStamp = (userId) => {
        const chat = allChats.find(chat => chat.members.map(m => m._id).includes(userId));

        if(!chat || !chat?.lastMessage){
            return "";
        }else{
            return moment(chat?.lastMessage?.createdAt).format('hh:mm A');
        }
    }

    const getlastMessage = (userId) => {
        const chat = allChats.find(chat => chat.members.map(m => m._id).includes(userId));

        if(!chat || !chat.lastMessage){
            return "";
        }else{
            const msgPrefix = chat?.lastMessage?.sender === currentUser._id ? "You: " : "";
            //console.log("chat last message: ",  chat.lastMessage);
            return msgPrefix + chat?.lastMessage?.text?.substring(0, 25);
        }
    }

    function formatName(user){
        let fname = user.firstname.at(0).toUpperCase() + user.firstname.slice(1).toLowerCase();
        let lname = user.lastname?.at(0).toUpperCase() + user.lastname.slice(1).toLowerCase();
        return fname + ' ' + lname;
    }

    useEffect(() => {
        socket.off('set-message-count').on('set-message-count', (message) => {
            const selectedChat = store.getState().userReducer.selectedChat;
            let allChats = store.getState().userReducer.allChats;

            if(selectedChat?._id !== message.chatId){
                const updatedchats = allChats.map(chat => {
                    if(chat._id === message.chatId){
                        return {
                            ...chat,
                            unreadMessageCount: (chat?.unreadMessageCount || 0) + 1,
                            lastMessage: message
                        };
                    }
                    return chat;
                });
                allChats = updatedchats;
            }
            //1. FIND THE LATEST CHAT
            const latestChat = allChats.find(chat => chat._id === message.chatId);


            //2. GET ALL OTHER CHATS
            const otherChats = allChats.filter(chat => chat._id !== message.chatId);

            //3. CREATE A NEW ARRAY LATEST CHA ON TOP & THN OTHER CHATS
            allChats = [latestChat, ...otherChats];

            dispatch(setAllChats(allChats));
        })
    }, [])

    const getUnreadMessageCount = (userId) => {
        const chat = allChats.find(chat => 
            chat.members.map(m => m._id).includes(userId)
        );

        if(chat && chat.unreadMessageCount && chat.lastMessage?.sender !== currentUser._id){
            return <div className="unread-message-counter"> {chat.unreadMessageCount} </div>;
        }else{
            return "";
        }
    }

    function getData(){
        if(searchKey === ""){
            return allChats;
        }else{
            return allUsers.filter(user => {
                return user.firstname?.toLowerCase().includes(searchKey?.toLowerCase()) ||
                    user.lastname?.toLowerCase().includes(searchKey?.toLowerCase());
            });
        }
    }
    
    return (
        getData()
        .map(obj => {
            let user = obj;
            if(obj.members){
                user = obj.members.find(mem => mem._id !== currentUser._id);
            }
            
            return <div className="user-search-filter" onClick={() => openChat(user._id)} key={user._id}>
                <div className={IsSelectedChat(user) ? "selected-user": "filtered-user"}>
                    <div className="filter-user-display">
                        {user.profilePic && <img src={user.profilePic} 
                                                alt="Profile Pic" 
                                                className="user-profile-image" 
                                                style={onlineUser.includes(user._id) ? {border: '#82e0aa 3px solid'} : {}} 
                                            />}

                        {!user.profilePic &&<div 
                                                className={IsSelectedChat(user)? "user-selected-avatar" : "user-default-avatar"}
                                                style={onlineUser.includes(user._id) ? {border: '#82e0aa 3px solid'} : {}}
                                            >
                            {
                                user.firstname.charAt(0).toUpperCase() + 
                                user.lastname.charAt(0).toUpperCase()
                            }
                        </div>}
                        <div className="filter-user-details">
                            <div className="user-display-name">{ formatName(user)}</div>
                            <div className="user-display-email">{ getlastMessage(user._id) || user.email }</div>
                        </div>
                        <div>
                            { getUnreadMessageCount(user._id) }
                            <div className="last-message-timestamp">{ getLastMessageTimeStamp(user._id)}</div>
                        </div>
                        { !allChats.find(chat => chat.members.map(m => m._id).includes(user._id)) &&
                            <div className="user-start-chat">
                                <button className="user-start-chat-btn" onClick={() => startNewChat(user._id)}>
                                    Start Chat
                                </button>
                            </div>
                        }
                        </div>
                    </div>                        
            </div>
        })
    )

}
export default UsersList;