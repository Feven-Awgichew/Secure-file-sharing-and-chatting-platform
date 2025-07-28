
import { useDispatch, useSelector } from "react-redux";
import { createNewMessage, getAllMessages } from "../../../apiCalls/message";
import { hideLoader, showLoader } from "../../../redux/loaderSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { clearUnreadMessageCount } from './../../../apiCalls/chat';
import moment from "moment";
import store from './../../../redux/store';
import { setAllChats, setSelectedChat } from "../../../redux/usersSlice";
import EmojiPicker from "emoji-picker-react";
/*
async function createChatAndStoreKey() {
    try {
        const response = await fetch('http://localhost:5000/api/chat/create-new-chat', { method: 'POST' });
        const data = await response.json();
        const chatId = data.generatedId;

        // Now fetch and store the key
        await fetchAndStoreKey(chatId);
    } catch (error) {
        console.error('Error creating chat:', error);
    }
}

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

*/

function ChatArea({ socket }){
    const dispatch = useDispatch();
    const { selectedChat, user, allChats } = useSelector(state => state.userReducer);
    const selectedUser = selectedChat.members.find( u => u._id !== user._id);
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [data, setData] = useState(null);
      
 const [fileName, setFileName] = useState('');
   const sendMessage = async (image,file) => {
    try {
        // Ensure the message state is not empty
       
        //if (!message.trim() && !image) return;
      const storedAesKey = localStorage.getItem(selectedChat._id);
        console.log(storedAesKey); 
        
            const newMessage = {
                chatId: selectedChat._id,
                sender: user._id,
                text: message,
                image: image,
                file:file,
                aesKey: storedAesKey,
                
            }
        // Emit the message via socket
        socket.emit('send-message', {
            ...newMessage,
            members: selectedChat.members.map(m => m._id),
             aesKey: storedAesKey,
            read: false,
           // createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
        });

        // Create the new message in the database
        const response = await createNewMessage(newMessage);
       // console.log('api response:', response);

        
        if (response.success) {
            // Immediately update the UI with the new message
           setAllMessages((prevMessages) => [
              ...prevMessages,
                {
                    ...newMessage,
                    _id: response.data._id, // Assuming you get the message ID back
                    decryptedMessage: message, // Include the decrypted message
                    image: image,
                    file: file

                }
            ]);


           /* 

setAllMessages((prevMessages) => [
                ...prevMessages,
                {
                    ...newMessage,
                    _id: response.data._id, // Assuming you get the message ID back
                    decryptedMessage: message, // Include the decrypted message
                },
            ]);
            */
            // Clear the input fields
            setMessage(''); // Reset message state
            setShowEmojiPicker(false);
        }
    } catch (error) {
        toast.error(error.message);
    }
};
/*
            if(response.success){
                setMessage('');
                setShowEmojiPicker(false);
                
            }
        }catch(error){
            toast.error(error.message);
        }
    }

    */
const sendMessage1 = async (file) => {
        try{
            const newMessage1 = {
                chatId: selectedChat._id,
                sender: user._id,
                text: message,
                file: file
            }

            socket.emit('send-message', {
                ...newMessage1,
                members: selectedChat.members.map(m => m._id),
                read: false,
                createdAt: moment().format("YYYY-MM-DD HH:mm:ss")
            })

            const response = await createNewMessage(newMessage1);

            if(response.success){
                setMessage('');
                setShowEmojiPicker(false);
            }
        }catch(error){
            toast.error(error.message);
        }
    }


    const formatTime = (timestamp) => {
        const now = moment();
        const diff = now.diff(moment(timestamp), 'days')

        if(diff < 1){
            return `Today ${moment(timestamp).format('hh:mm A')}`;
        }else if(diff === 1){
            return `Yesterday ${moment(timestamp).format('hh:mm A')}`;
        }else {
            return moment(timestamp).format('MMM D, hh:mm A');
        }
    }

    const getMessages = async () => {
        try{
            dispatch(showLoader())
            const storedAesKey = localStorage.getItem(selectedChat._id);
        console.log(storedAesKey); 
            const response = await getAllMessages(selectedChat._id, storedAesKey);

            dispatch(hideLoader())

            if(response.success){
                setAllMessages(response.data);
            }
        }catch(error){
            dispatch(hideLoader());
            toast.error(error.message);
        }
    }

    const clearUnreadMessages = async () => {
        try{
            socket.emit('clear-unread-messages', {
                chatId: selectedChat._id,
                members: selectedChat.members.map(m => m._id)
            })
            const response = await clearUnreadMessageCount(selectedChat._id);

            if(response.success){
                allChats.map(chat => {
                    if(chat._id === selectedChat._id){
                        return response.data;
                    }
                    return chat;
                })
            }
        }catch(error){
            toast.error(error.message);
        }
    }

    function formatName(user){
        let fname = user.firstname.at(0).toUpperCase() + user.firstname.slice(1).toLowerCase();
        let lname = user.lastname.at(0).toUpperCase() + user.lastname.slice(1).toLowerCase();
        return fname + ' ' + lname;
    }

    const sendImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader(file);
        

         // Handle no file selected

    reader.onloadend = async () => {
         const imageData = reader.result;
        //console.log('Image data:', imageData); 
        
            sendMessage(imageData);
        }
        reader.readAsDataURL(file);
    }

    const sendImage1 = async(e) => {
    //const fileInput = document.getElementById('imageInput');
    const file =  e.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageData = event.target.result;
            sendMessage(reader.result);
        };
        reader.readAsDataURL(file);
    }
}

const sendFile = async (e) => {
   
        const file = e.target.files[0]; // Correct way to access the file
        if (!file) return; // Ensure a file is selected
        
            setFileName(file.name);

        const reader1 = new FileReader(); // Create a new FileReader instance
    
        reader1.readAsDataURL(file);
    
        reader1.onloadend = async () => {
            sendMessage(null, reader1.result); // Send the file data
            
        }
    }
    /*
     const sendFile = async (e) => {
        const file = e.target.files[0]; // Correct way to access the file
        const reader1 = new FileReader(); // Create a new FileReader instance
    
        reader1.readAsDataURL(file);
    
        reader1.onloadend = async () => {
            sendMessage1(reader1.result); // Send the file data
        }
    }
*/
    useEffect(() => {
        getMessages();
        if(selectedChat?.lastMessage?.sender !== user._id){
         clearUnreadMessages();
        }

        socket.off('receive-message').on('receive-message', (message) => {
            const selectedChat = store.getState().userReducer.selectedChat;
            if(selectedChat._id === message.chatId){
                setAllMessages(prevmsg => [...prevmsg, message]);
            }

            if(selectedChat._id === message.chatId && message.sender !== user._id){
                clearUnreadMessages();
            }
        })

        socket.on('message-count-cleared', data => {
            const selectedChat = store.getState().userReducer.selectedChat;
            const allChats = store.getState().userReducer.allChats;

            if(selectedChat._id === data.chatId){
                //UPDATING UNREAD MESSAGE COUNT IN CHAT OBJECT
                const updatedChats = allChats.map(chat => {
                    if(chat._id === data.chatId){
                        return { ...chat, unreadMessageCount: 0}
                    }
                    return chat;
                })
                dispatch(setAllChats(updatedChats));

                //UPDATING READ PROPRTY IN MESSAGE OBJECT
                setAllMessages(prevMsgs => {
                    return prevMsgs.map(msg => {
                        return {...msg, read: true}
                    })
                })
            }
        });

        socket.on('started-typing', (data) => {
            setData(data);
            if(selectedChat._id === data.chatId && data.sender !== user._id){
                setIsTyping(true);
                setTimeout(() => {
                    setIsTyping(false);
                }, 2000)
            }
        })
    }, [selectedChat])

    useEffect(() => {
        const msgContainer = document.getElementById('main-chat-area');
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }, [allMessages, isTyping])

    return <>
            {selectedChat && <div class="app-chat-area">
                    <div class="app-chat-area-header">
                        { formatName(selectedUser)}
                    </div>

                    <div className="main-chat-area" id="main-chat-area">
                        { allMessages.map(msg => {
                           
                             const isCurrentUserSender = msg.sender === user._id;
                             //if (!msg.decryptedMessage) return null;
                        
                            return (
                                <>
   
                <div className="message-container" style={isCurrentUserSender ? { justifyContent: 'end' } : { justifyContent: 'start' }}>
                    <div>
                        <div className={isCurrentUserSender ? "send-message" : "received-message"}>
                            
                            <div>{msg.decryptedMessage}</div> {/* Display decrypted message */}
                            <div>{msg.image && <img src={msg.image} alt="image" height="120" width="120" />}</div>
                            
                            {msg.file && (
                            <a href={msg.file} target="_blank" rel="noopener noreferrer">
                                <i className="fa fa-file" aria-hidden="true"></i> 
                                {msg.file.split('/').pop()} {/* Display full file name */}
                            </a>
                        )}
                                                </div>
                            {/**<div>msg.file && (
                
                                                    <a href={msg.file} target="_blank" rel="noopener noreferrer">
                                                        <i className="fa fa-file" aria-hidden="true"></i>  {/* Display file name 
                                                    </a> )
                        </div>
                        */}
                        </div>
                        <div className="message-timestamp" 
                             style={isCurrentUserSender ? { float: 'right' } : { float: 'left' }}
                        >
                            {formatTime(msg.createdAt)} 
                            {isCurrentUserSender && msg.read && 
                                <i className="fa fa-check-circle" aria-hidden="true" style={{ color: '#e74c3c' }}></i>
                            }
                        </div>
                    </div>
                
    </>
);
                        })}
                        
                        <div className="typing-indicator">
                            {isTyping && selectedChat?.members.map(m => m._id).includes(data?.sender) && <i>typing...</i>}
                        </div>
                    </div>

                    {showEmojiPicker && 
                        <div style={{width: '100%', display: 'flex', padding: '0px 20px', justifyContent: 'right'}}>
                            <EmojiPicker style={{width: '300px', height: '400px'}} onEmojiClick={(e) => setMessage(message + e.emoji)}></EmojiPicker>
                        </div>
                    }
                    <div className="send-message-div">
                        <input type="text" 
                            className="send-message-input" 
                            placeholder="Type a message"
                            value={message}
                            onChange={ (e) => { 
                                setMessage(e.target.value)
                                console.log('Current message:', e.target.value);
                                socket.emit('user-typing', {
                                    
                                    chatId: selectedChat._id,
                                    members: selectedChat.members.map(m => m._id),
                                    sender: user._id
                                })
                            } 
                        }
                        />
                        
                        <label for="file">
                            <i className="fa fa-file send-file-btn"></i>
                            <input
                                type="file"
                                id="file"
                                style={{display: 'none'}}
                                accept=".pdf, ./docx, .doc, ./pptx, .txt"                               
                                onChange={sendFile}
                            >
                            </input>
                        </label>
                        <label for="image">
                            <i className="fa fa-picture-o send-image-btn"></i>
                            <input
                                type="file"
                                id="image"
                                style={{display: 'none'}}
                                accept="image/jpg,image/png,image/jpeg,image/gif"
                                onChange={sendImage}
                            >
                            </input>
                        </label>

                        <button 
                            className="fa fa-smile-o send-emoji-btn" 
                            aria-hidden="true"
                            onClick={ () => { setShowEmojiPicker(!showEmojiPicker)} }>
                        </button>
                        <button 
                            className="fa fa-paper-plane send-message-btn" 
                            aria-hidden="true"
                            onClick={ () => sendMessage('') }>
                        </button>
                    </div>
                </div>}
        </>
}

export default ChatArea;    





