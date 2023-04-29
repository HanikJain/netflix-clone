import useSwr from 'swr'
import fetcher from '../libs/fetcher';
import {useGetMovie} from "./useMovieList"


const useMovie = (id: string) => {

    const getMovie = useGetMovie();
    const movie = getMovie(id);
    if(movie.length > 0) {
        return {data: movie[0]}
    }


    const { data, error, isLoading } = useSwr(id ? `/api/movies/${id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      });
      return {
        data,
      }
};

export default useMovie;
