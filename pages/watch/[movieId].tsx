import React from 'react';
import Head from "next/head"
import {useRouter} from "next/router"
import { AiOutlineArrowLeft } from 'react-icons/ai';
import type { NextPage } from 'next'
import useMovie from '../../hooks/useMovie';

const Watch:NextPage = () => {
    const router =  useRouter();
    const {movieId} = router.query;
    const {data} = useMovie(movieId as string);

    const redirectToHome = () => router.push("/");

    
    return (
        <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Netflix</title>
        </Head>
        <div 
        className="
            h-screen
            w-screen
            bg-black

        ">
            <nav
            className="
                fixed
                w-full
                p-4
                z-10
                flex
                flex-row
                items-center
                gap-8
                bg-black
                bg-opacity-70
            ">
                <AiOutlineArrowLeft onClick={redirectToHome} className="text-white cursor-pointer" size={30} />
                <p className="text-white text-1xl md:text-3xl font-bold">
                    <span className="font-light">
                        Watching:
                    </span>
                    {data?.title}
                </p>
            </nav>
            <video className="
                h-full
                w-full
            "
                autoPlay
                controls
            src={data?.videoUrl}>

            </video>
        </div>
        </>
    );
}

export default Watch