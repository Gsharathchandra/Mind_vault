import type { ReactElement } from "react";

interface ButtonProps{
    variant: "primary" | "secondary";
    size ?: "sm" | "md" | "lg";
    StartIcon ?: ReactElement ;
    text : string;
    EndIcon ?: ReactElement;
    onClick ?: () => void;
    fullWidth ?: boolean;
    loading ?: boolean;
}


const  variantClasses = {
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-200 text-purple-600",
}
 
const defaultStyles = "px-4 py-2 rounded-lg font-light flex items-center" 

export function Button(props:ButtonProps){
    return <button onClick={props.onClick} className={`${variantClasses[props.variant]} ${defaultStyles} ${props.StartIcon} 
    ${props.fullWidth ? "w-full flex justify-center items-center ": ""} ${props.loading ? "opacity-45" : "" }`} disabled={props.loading}>
    {props.StartIcon}
    {props.text}
    </button>

} 