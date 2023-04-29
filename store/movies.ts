'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface movieState {
    title: string,
    description: string,
    videoUrl: string,
    thumbnailUrl: string,
    genre: string,
    duration: string,
    id:  string,
}

interface initialState {
    movies: movieState[],
    showModal: boolean,
    movie: movieState[]
}

const  initialState:initialState = {
    movies: [],
    showModal: false,
    movie: [{
        title: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: "",
        genre: "",
        duration:"",
        id:  "",
    }],
}

  
const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        updateMovieList(state, action:PayloadAction<movieState[]>) {
            state.movies = action.payload 
        },
        updateMovie(state, action:PayloadAction<movieState[]>) {
            state.movie = action.payload 
        },
        showModal(state, action:PayloadAction<movieState[]>) {
            state.showModal = true;
            state.movie = action.payload;
        },
        hideModal(state) {
            state.showModal = false;
            state.movie = [{
                title: "",
                description: "",
                videoUrl: "",
                thumbnailUrl: "",
                genre: "",
                duration:"",
                id:  "",
            }]
        }
    }

});

const movieActions = movieSlice.actions;

export default movieSlice;
export { movieActions };