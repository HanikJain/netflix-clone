'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface profileState {
    createdAt:string,
    email:string,
    emailVerified:string,
    favoriteIds?: string[],
    image:string,
    name:string,
    updatedAt:string    
}

interface initialState {
    profile: profileState
}

const  initialState:initialState = {
    profile: {
        createdAt:"",
        email:"",
        emailVerified:"",
        favoriteIds: [],
        image:"",
        name:"",
        updatedAt:""
    }
}

  
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile(state, action:PayloadAction<profileState>) {
           
            state.profile = action.payload 
        }
    }

});

const profileActions = profileSlice.actions;

export default profileSlice;
export { profileActions };