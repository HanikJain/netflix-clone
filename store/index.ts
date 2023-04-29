'use client';

import { configureStore } from "@reduxjs/toolkit";
import {useDispatch , useSelector, TypedUseSelectorHook } from "react-redux"
import profileSlice from "./profile";
import movieSlice from "./movies";



const store = configureStore({
    reducer: {
        profile: profileSlice.reducer,
        movies: movieSlice.reducer,
    }
})

export const useAppDispatch: () => typeof store.dispatch = useDispatch 
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector

export type RootState = ReturnType<typeof store.getState>

export default store;