import React, {useCallback, useState, useEffect} from 'react'
import { useRouter } from 'next/router';
import {AiOutlineClose} from "react-icons/ai"
import FavoriteButton from "./FavoriteButton"
import { BsFillPlayFill } from 'react-icons/bs';

import { movieActions } from "../store/movies";
import { useAppDispatch, useAppSelector} from "../store/index";

interface InfoModalProps {
    onClose: any;
}
const InfoModal: React.FC<InfoModalProps> = ({onClose}) => {
    const movies = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const router = useRouter();


    const isVisible = movies.showModal
    if(!isVisible) return null;

    const data  = movies.movie[0];


    const handleClose = () => {
      dispatch(movieActions.hideModal())
    }

    const redirectToWatch = () => router.push(`/watch/${data.id}`);

  return (
    <div className="
      z-50
      transition
      bg-black
      duration-300
      bg-opacity-80
      flex
      justify-center
      items-center
      overflow-x-hidden
      overflow-y-auto
      fixed
      inset-0

    ">
      <div className="
      relative
      w-auto
      mx-2
      max-w-2xl
      rounded-md
      overflow-hidden
      ">
        <div className={`
          ${isVisible ? 'scale-100': 'scale-0'}  
          transform
          duration-300
          relative
          flex-auto
          bg-zinc-900
          drop-shadow-md

        `}>
            <div className="relative h-auto">
                  <video 
                  className='
                    w-full
                    brightness-[60%]
                    object-coverh-full
                  '
                  autoPlay
                  muted
                  loop
                  poster={data?.thumbnailUrl}
                  src={data?.videoUrl}></video>

                  <div 
                  className='
                    cursor-pointer
                    absolute
                    top-3
                    right-3
                    h-10
                    w-10
                    rounded-full
                    bg-black
                    bg-opacity-70
                    flex
                    items-center
                    justify-center
                  '
                  onClick={handleClose}>

                      <AiOutlineClose className="text-white" size={20} />
                  </div>

                  <div className="absolute bottom-[7%] left-5 sm:bottom-[10%] sm:left-10">
                      <p className="text-white text-2xl md:text-4xl h-full lg:text-5xl font-bold mb-5 sm:mb-8">
                        {data?.title}
                      </p>
                      <div className="flex flex-row gap-4 items-center">
                      <div onClick={redirectToWatch} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
                          <BsFillPlayFill className="text-black w-4 lg:w-6" />
                      </div>
                        <FavoriteButton movieId={data?.id} />
                      </div>
                  </div>

            </div>

            <div className="py-6 px-6 sm:py-8 sm:px-12">
            <div className="flex flex-row items-center gap-2 mb-8">
              <p className="text-green-400 font-semibold text-lg">
                New
              </p>
              <p className="text-white text-lg">
                {data?.duration}
              </p>
              <p className="text-white text-lg">
                {data?.genre}
              </p>
            </div>
            <p className="text-white text-lg">
              {data?.description}
            </p>
          </div>

                 
        </div>


      </div>
    </div>

  )
}


export default InfoModal
