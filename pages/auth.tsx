import Head from "next/head"
import axios from 'axios';
import { useCallback, useState } from "react";
import type { NextPage } from 'next'
import {signIn} from "next-auth/react"
import Input from "../components/input";

import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from "react-icons/fa"
import { sign } from 'crypto';

const Auth: NextPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [variant, setVariant] = useState("login");
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
            setVariant((currVariant) => currVariant === 'login' ? 'register' : 'login')
    }, [])

    
    const login = useCallback(async () => {
        setIsLoading(true)
        try {
            const response = await signIn('credentials', {
                email,
                password,
                callbackUrl: "/profiles"
            })

            if(!response?.ok) {
                throw new Error(response?.error)
            } 
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false);
    }, [email, password]);


    const register = useCallback(async () => {
        setIsLoading(true)
        try {
            await axios.post('/api/register', {
                email,
                name: username,
                password,
            })

            login();
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false)
    }, [email, username, password, login]);


    const guestLogin = useCallback(async () => {
        const guestEmail: string[] = ["test1@gmail.com", "test2@gmail.com", 
        "test3@gmail.com", "test4@gmail.com", "test5@gmail.com", "test6@gmail.com"];
        const randomNumber: number =  Math.floor(Math.random() * 6);
        setIsLoading(true)

        try {
            await signIn('credentials', {
                email: guestEmail[randomNumber],
                password: "123321",
                callbackUrl: "/profiles"
            })
        } catch (error) {
            
        }
        setIsLoading(false)
    }, [])

    const googleLogin = useCallback(async () => {
        const response = await signIn('google', {callbackUrl: '/profiles'})
        console.log(response);
    }, [])

    const githubLogin = useCallback(async () => {
        const response = await signIn('github', {callbackUrl: '/profiles'})
        console.log(response);
    }, [])

    return (
        <>
        <Head>
            <link rel="shortcut icon" href="/images/favicon.png" />
            <title>Authenticate</title>
        </Head>
        <div className="relative w-full h-full bg-[url('../public/images/hero.jpg')]  bg-no-repeat bg-fixed bg-cover bg-center">
            <div className=" w-full h-full bg-black lg:bg-opacity-50">
                <nav className="px-3 sm:px-12 py-4">
                    <img src="images/logo.png" alt="logo" className="h-5 sm:h-10" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-6 py-6 self-cnter mt-1 lg:w-2/5 lg:max-w-md rounded-md w-full sm:px-16">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? 'Sign In': 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4 sm:gap-4">
                            {variant === 'register' &&  
                            <Input
                                label="Username"
                                onChange={(e: React.ChangeEvent<HTMLInputElement> ) => { setUsername(e.target.value); }}
                                id="username"
                                type="text"
                                value={username}
                            />}
                           

                            <Input
                                label="Email"
                                onChange={(e: React.ChangeEvent<HTMLInputElement> ) => { setEmail(e.target.value); }}
                                id="email"
                                type="email"
                                value={email}
                            />

                            <Input
                                label="Password"
                                onChange={(e: React.ChangeEvent<HTMLInputElement> ) => { setPassword(e.target.value); }}
                                id="passowrd"
                                type="password"
                                value={password}
                            />

                        </div>
                
                        <button onClick={isLoading ? () => {} : (variant === 'login'? login : register)} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"> 
                            {isLoading ? "Loading..." : (variant === 'login' ? 'Login' : 'Sign Up')} 
                        </button>

                        <div className="flex flex-row gap-4 items-center mt-6 justify-center">
                            <div 
                            onClick={googleLogin}
                            className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                            "><FcGoogle size={30}/></div>
                            <div 
                            onClick={githubLogin}
                            className="
                                w-10
                                h-10
                                bg-white
                                rounded-full
                                flex
                                items-center
                                justify-center
                                cursor-pointer
                                hover:opacity-80
                                transition
                            "><FaGithub size={30}/></div>

                        </div>


                        <p className="text-neutral-500 mt-8 sm:mt-6">
                        {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'} 
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Create an account': 'Login' }
                            </span>
                        </p>

            

                        {variant === 'login' &&  (
                            <p className="bg-transparent  text-neutral-500 text-xl text-center rounded-md w-full mt-3 transition">OR</p>
                        )}
                        {variant === 'login' &&  (

                            <button onClick={guestLogin} className="bg-transparent  text-red-600 rounded-md w-full mt-3 hover:underline transition"> 
                                Login as a guest
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </>

    );
}

export default Auth;