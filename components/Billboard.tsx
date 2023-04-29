import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useAppSelector, useAppDispatch} from "../store/index";
import { movieActions } from "../store/movies";
import {useGetMovie} from "../hooks/useMovieList"
import PlayButton from "./PlayButton"

const RANDOM_NUMBER = Math.floor(Math.random() * 4);

const Billboard: React.FC = () => {

    const moviesList = useAppSelector((state) => state.movies.movies);
    const randomMovie = moviesList ? moviesList[RANDOM_NUMBER] : undefined;
    
    const dispatch = useAppDispatch();
    const getMovie = useGetMovie();

    function clickInfoHandler(e: any){
        e.preventDefault();
        const id = e.target.id;
        const movie = getMovie(id);
        dispatch(movieActions.showModal(movie));
    
    }

  return (
    <div className="top-[66px] sm:top-0 relative h-[56.25vw]">
        <video 
        className="
            w-full
            h-[56.25vw]
            object-cover
            brightness-[60%]
        "
        autoPlay
        muted
        loop
        poster={randomMovie?.thumbnailUrl} 
        src={randomMovie?.videoUrl}>
        </video>
        <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
                <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
                    {randomMovie?.title}
                </p>
                <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[90%] lg:w-[50%] drop-shadow-xl ">
                {randomMovie?.description}
                </p>
                <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
                    <PlayButton movieId={randomMovie?.id as string} />
                    <button 
                    onClick={clickInfoHandler}
                    id={randomMovie?.id}
                    className="
                        bg-white
                        text-white
                        bg-opacity-30 
                        rounded-md 
                        py-1 md:py-2 
                        px-2 md:px-4
                        w-auto 
                        text-xs lg:text-lg 
                        font-semibold
                        flex
                        flex-row
                        gap-1
                        items-center
                        hover:bg-opacity-20
                        transition
                    ">
                        <AiOutlineInfoCircle />
                        More info
                    </button>
                </div>
        </div>
    </div>
  )
}

export default Billboard;