import {signOut} from "next-auth/react"
import React from 'react';

import { useAppSelector} from "../store/index";

interface AccountMenuPorps {
    visible?: boolean;
}
const AccountMenu:React.FC<AccountMenuPorps> = ({visible}) => {
    const currentUser = useAppSelector((state) => state.profile.profile);
    
    if(!visible){
        return null;
    }


    return (
        <div className="absolute bg-black w-56 top-14 right-0 py-5 flex-col border-gray-800 border-2">
            <div className="flex flex-col gap-3">
                <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
                    <img className="w-8 rounded-md" src="/images/default-blue.png" alt="Profile pic" />
                    <p className="text-white tm-sm group-hover/item:underline">
                        {currentUser?.name}
                    </p>
                </div>
                <hr  className="bg-gray-600 border-0 h-px my-4"/>
                <div onClick={() => {signOut()}}className="px-3 text-center text-sm text-white hover:underline">
                    Sign out of Netflix
                </div>
            </div>
        </div>
    )
}

export default AccountMenu 
