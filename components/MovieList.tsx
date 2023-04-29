import React from 'react'
import {isEmpty} from "lodash";
import MovieCard from "./MovieCard";
import { movieActions } from "../store/movies";
import { useAppDispatch} from "../store/index";
import {useGetMovie} from "../hooks/useMovieList"



interface MovieListProps {
    data: Record<string, any>[],
    title: string
}

const MovieList: React.FC<MovieListProps> = ({data, title}) => {
    const dispatch = useAppDispatch();
    const getMovie = useGetMovie();
    
    if(isEmpty(data)){
        return null
    }

    function clickHandler(id: string){
        const movie = getMovie(id);
        dispatch(movieActions.showModal(movie));
    
    }

  return (
    <div className="relative top-[66px] sm:top-0 px-4 md:px-12 mt-4 space-y-8 ">
        <div className="">
            <p className="text-white mb-3 text-md md:text-xl lg:text-2xl font-semibold">
                {title}
            </p>
            <div className="flex flex-row overflow-x-auto  gap-2 scrollbar-hide">
            {/* <div className="grid grid-cols-4 gap-2"> */}
                {data.map((movie) => 
                <MovieCard key={movie.id} data={movie} onClick={clickHandler} />
                )}
            </div>
        </div>
    </div>
  )
}


export default MovieList