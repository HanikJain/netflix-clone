import axios from 'axios';
import React, { useCallback, useMemo, useState } from 'react';
import { AiOutlinePlus, AiOutlineCheck, AiOutlineLoading3Quarters} from 'react-icons/ai';

import useCurrentUser from '../hooks/useCurrentUser';
import useFavorites from '../hooks/useFavorites';

interface FavoriteButtonProps {
  movieId: string
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const [isLoading, setIsLoading] = useState(false);

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    setIsLoading(true);
    if (isFavorite) {
      response = await axios.post('/api/deletefavorite', { movieId } );
    } else {
      response = await axios.post('/api/favorite', { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({ 
      ...currentUser, 
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
    setIsLoading(false);
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  
    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
    
  
  if(isLoading) {
    return (<div className="w-6 h-6 lg:w-10 lg:h-10 flex justify-center items-center transition"> 
        <AiOutlineLoading3Quarters  className="text-white w-4 lg:w-6 animate-spin"/>
    </div>)
  } else {
      
      return (
        <div onClick={toggleFavorites} className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
          <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
        </div>
      )
  }
}

export default FavoriteButton;
