import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: 'user',
    initialState: { 
        user: null, 
        allUsers: [],
        allChats: [],
        allGroups: [],
        selectedChat: null,
        selctedGroup: null
    },
    reducers: {
        setUser: (state, action) => { state.user = action.payload; },
        setAllUsers: (state, action) => { state.allUsers = action.payload; },
        setAllChats: (state, action) => { state.allChats = action.payload; },
        setAllGroups: (state, action) => { state.allGroups = action.payload; },
        setSelectedChat: (state, action) => { state.selectedChat = action.payload; },
        setSelectedGroup: (state, action) => { state.selctedGroup = action.payload; }
    }
});

export const { setUser, setAllUsers,  setAllGroups ,setAllChats, setSelectedChat} = usersSlice.actions;
export default usersSlice.reducer;