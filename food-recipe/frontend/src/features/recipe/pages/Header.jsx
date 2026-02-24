import { NavLink } from "react-router-dom"

const Header=()=>{
    return(
        <nav className="flex justify-between items-center p-3 bg-white text-black font-semibold">
            <h1 className="text-2xl font-bold">Recipe World</h1>
            <ul className="flex gap-4 text-black font-semibold">
                <li
                
                ><NavLink className={({isActive})=>isActive?"text-blue-500":""} to="/">Home</NavLink></li>
                <li
                
                ><NavLink className={({isActive})=>isActive?"text-blue-500":""} to="/about">About</NavLink></li>
                <li
                
                ><NavLink className={({isActive})=>isActive?"text-blue-500":""} to="/collection">Collection</NavLink></li>
                <li
                
                ><NavLink className={({isActive})=>isActive?"text-blue-500":""} to="/create">Create recipe</NavLink></li>
                <li
                
                ><NavLink className={({isActive})=>isActive?"text-blue-500":""} to="/fvrt">Favourite</NavLink></li>
            </ul>
                
        </nav>
    )
}   

export default Header