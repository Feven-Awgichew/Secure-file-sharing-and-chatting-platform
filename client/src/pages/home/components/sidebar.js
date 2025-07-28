/*
import Search from "./search";
import UsersList from "./userList";
import GroupChatMembers from "./group"
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Sidebar({ socket, onlineUser }){
    const [searchKey, setSearchKey] = useState('');
    const [isOpen, setIsOpen] = useState(false);
   
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

const GroupChatMembers=() => {
    const [members, setMembers] = useState(['']);
    const [fetchedMembers, setFetchedMembers] = useState([]);

    const handleInputChange = (index, value) => {
        const newMembers = [...members];
        newMembers[index] = value;
        setMembers(newMembers);
    };

    const addMemberInput = () => {
        setMembers([...members, '']);
    };

    const submitMembers = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/chat/members', members.filter(Boolean));
            alert('Members submitted successfully!');
        } catch (error) {
            console.error('Error submitting members:', error);
        }
    };

    const fetchMembers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/chat/members');
            setFetchedMembers(response.data);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);
   

    return (
        <div>
            <h2>Add Members to Group Chat</h2>
            <form onSubmit={submitMembers}>
                
                {members.map((member, index) => (
                    <div key={index}>
                        <label>Member {index + 1}:</label>
                        <input
                            type="text"
                            value={member}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={addMemberInput}>Add Member</button>
                <button type="submit">Submit Members</button>
            </form>
            <h3>Current Members:</h3>
            <ul>
                {fetchedMembers.map((member, index) => (
                    <li key={index}>{member}</li>
                ))}
            </ul>
        </div>
    );

}
const clicked=()=>{
    const groups=GroupChatMembers();
    
    }

    return (
        <div className="app-sidebar">
            <div className="flex_contents" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Search 
                searchKey={searchKey} 
                setSearchKey={setSearchKey}>               
            </Search> 
            
            <button className="group_button" onClick={togglePopup}>
           Create Group 
          </button>
          

            </div>
             
        
        
        
           

          {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h1>New Group</h1>
                        <input type="text" placeholder="Group Name" required />
                        <br /><br />
                        <p>Select members</p>
                        <button onClick={togglePopup}>Close</button>
                    </div>
                </div>
            )}
          <br />
<br />            <UsersList 
                searchKey={searchKey} 
                socket={socket}
                onlineUser={onlineUser}
            >
            </UsersList>
        </div>
    )
}

export default Sidebar;
*/
import { useState } from "react";
import Search from "./search";
import UsersList from "./userList";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from './../../../apiCalls/chat';
import { createNewGroupChat } from './../../../apiCalls/chat';
import { hideLoader, showLoader } from "../../../redux/loaderSlice";

import { setAllChats, setSelectedChat } from './../../../redux/usersSlice';
import moment from "moment";
import { useEffect } from "react";
import store from "../../../redux/store";
import axios from 'axios';
import GroupChatModel from "../../../components/layout/groupchat";

function Sidebar({ socket, onlineUser }){
    
    const [groupName, setGroupName] = useState('');
    const [members, setMembers] = useState('');
    const [message, setMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
   
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    const [searchKey, setSearchKey] = useState('');
/*
    const createNewGroupChat = async (name, searchedUserId) => {
        let response = null;
        const dispatch= useDispatch(); 
          const { user: currentUser } = useSelector(state => state.userReducer);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const memberList = members.split(',').map(member => member.trim());

        try {
            const response = await axios.post('http://localhost:5000/api/chat/create-group', { groupName, members: memberList });
            if (response.data.success) {
                setMessage('Group created successfully!');
            }
        } catch (error) {
            setMessage('Error creating group: ' + error.response.data.message);
        }
    };




    /* useEffect(() => {
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
        */
    return (
        <div className="app-sidebar">
            <Search 
                searchKey={searchKey} 
                setSearchKey={setSearchKey}>               
            </Search>
         
            
            
          

        
            <UsersList 
                searchKey={searchKey} 
                socket={socket}
                onlineUser={onlineUser}
            >
            </UsersList>
            
          
        </div>
    )
}

export default Sidebar;