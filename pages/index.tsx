
import React, {useEffect} from 'react';
import  Head from "next/head";
import type { NextPage, NextPageContext } from 'next'
import { getSession, signOut } from "next-auth/react"
;
import { profileActions } from "../store/profile";
import { movieActions } from "../store/movies";
import { useAppDispatch} from "../store/index";
import useCurrentUser from "../hooks/useCurrentUser";
import useMovieList from "../hooks/useMovieList";
import useFavorites from "../hooks/useFavorites";

import Navbar from '../components/Navbar'
import Billboard from '../components/Billboard'
import MovieList from "../components/MovieList"
import InfoModal from '../components/InfoModal';

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);
  if(!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }

}

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { data: currentUser } = useCurrentUser();
  const {data: moviesList = []} = useMovieList();
  const {data: favorites = []} = useFavorites();
  


  useEffect(() => {
    dispatch(profileActions.updateProfile(currentUser));
  }, [currentUser, dispatch])

  useEffect(() => {
    dispatch(movieActions.updateMovieList(moviesList));
  }, [moviesList, dispatch])

  if(moviesList.length === 0){
    return (<div className="relative w-[100vw] h-[100vh] bg-black">
       <img className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]" src="images/loading.gif" alt="Loading spinner" />
    </div>)
  } else {
   
  return (
  <>
    <Head>
        <link rel="shortcut icon" href="/images/favicon.png" />
        <title>Netflix</title>
        <meta name="description" content="Netflix-clone is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries"/>
    </Head>
    <InfoModal onClose={() => {}} />
    <Navbar />
    <Billboard />
    <div className="pb-40">
      <MovieList title="Trending Now" data={moviesList}/>
      <MovieList title="My List" data={favorites}/>
    </div>
  </>
  )

}

}

export default Home
