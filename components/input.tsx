import React from "react";
interface InputProps {
    id: string;
    onChange: any,
    type?: string;
    label: string;
    value: string;
}

const Input: React.FC<InputProps> = ({
    id,
    onChange,
    type,
    label,
    value,

}) => {
    return (
        <div className="relative">

            <input 
            id={id}
            type={type ? type : 'text'}
            onChange={onChange}
            value={value}
            className="
                block
                rounded-md
                px-6
                pt-6
                pb-1
                w-full
                text-md
                text-white
                bg-neutral-700
                apperance-700
                focus:outline-none
                focus:ring-0
                peer
            " 
            placeholder=" "
            />
            <label 
            className="
                absolute
                text-zinc-400
                duration-150
                transform
                -translate-y-3
                scale-75
                top-4
                origin-[0]
                left-6
                peer-placeholder-shown:scale-100
                peer-placeholder-shown:translate-y-0
                peer-focus:scale-75
                peer-focus:-translate-y-3
            "
            htmlFor={id}>
                {label}
            </label>
        </div>
    );

}

export default Input;