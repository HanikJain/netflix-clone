import React from 'react'


interface MovieCardProps {
    data: Record<string, any>;
    onClick: (id: string) => void;
}

const MovieCard:React.FC<MovieCardProps> = ({data, onClick}) => {
    function clickHandler(e: any){
        onClick(e.target.id)
    }

  return (
    <div onClick={clickHandler} id={data?.id} 
        className="
            group 
            bg-zinc-900 
            col-span 
            relative 
            max-w-[273px] max-h-[154px]
            min-w-[200px] min-h-[112px] 
            h-[12vw] 
        ">
        <img 
        id={data?.id}
        className="
            cursor-pointer
            object-cover
            transition
            duration
            delay-100
            shadow-xl
            rounded-md
            opacity-90
            min-w-[200px]
            min-h-[112px]
            max-w-[273px] 
            max-h-[154px]
            w-full
            h-[12vw]
            border-solid border-2 
            border-zinc-900
            group-hover:opacity-100
            group-hover:border-white
            group-hover:brightness-125
        "
        src={data?.thumbnailUrl} alt="Thumbnail" />
    </div>
  )
}

export default MovieCard;
