import { NavLink } from "react-router-dom"
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

const Header=()=>{
    const [open,setOpen]=useState(false)
    return(
        <nav className="flex justify-between items-center p-3 bg-white text-black font-semibold">
            <h1 className="text-xl md:text-2xl font-bold">Recipe World</h1>
            <ul className={`${open?"flex":"hidden"} z-10 flex-col gap-3 transition-all duration-300 ease-in-out absolute top-12 pb-6 pt-5 left-0 items-center bg-white/40 backdrop-blur-sm w-full 
            
            lg:static
            lg:flex
            lg:flex-row 
            lg:top-0
            lg:w-auto
            lg:bg-transparent
            lg:p-0
            `}>
                <li
                
                ><NavLink onClick={()=>setOpen(false)} className={({isActive})=>isActive?"text-blue-500":""} to="/">Home</NavLink></li>
                <li
                
                ><NavLink onClick={()=>setOpen(false)} className={({isActive})=>isActive?"text-blue-500":""} to="/about">About</NavLink></li>
                <li
                
                ><NavLink onClick={()=>setOpen(false)} className={({isActive})=>isActive?"text-blue-500":""} to="/collection">Collection</NavLink></li>
                <li
                
                ><NavLink onClick={()=>setOpen(false)} className={({isActive})=>isActive?"text-blue-500":""} to="/create">Create recipe</NavLink></li>
                <li
                
                ><NavLink onClick={()=>setOpen(false)} className={({isActive})=>isActive?"text-blue-500":""} to="/fvrt">Favourite</NavLink></li>
            </ul>
            <IoMenu className="text-3xl lg:hidden" onClick={()=>setOpen(!open)}/>
                
        </nav>
    )
}   

export default Header