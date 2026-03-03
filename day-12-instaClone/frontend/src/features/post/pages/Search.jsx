import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePost } from "../hooks/post.hook";
import { Useauth } from "../../auth/hooks/auth.hook";


const Search=()=>{

const{storyHandle,story}=usePost()
const {fetchUser,user}=Useauth()
useEffect(()=>{
storyHandle()
fetchUser()
},[])
console.log(user)
console.log(story)
    const [search,setSearch]=useState("")
    return(
        <div className="max-w-100 w-full h-full m-auto">
            <div className="flex items-center gap-2 relative">
<FaSearch className="text-2xl text-white absolute left-3" />
            <input type="text" placeholder="Search" className="w-full px-10 text-white text-xl  h-15 outline-none border-2 border-gray-200 rounded-xl" />

            </div>
            <div>
                {story?.map((item)=>{
                    return(
                        <div className="flex items-center gap-2">
                            <img src={item.profile_image} alt="" />
                            <button className={`${item._id===user._id?"hidden":""} ${item.isfollowing ? "bg-blue-500 text-white px-4 py-2 rounded-lg" : "bg-gray-500 text-white px-4 py-2 rounded-lg"}`}
                            
                            >{item.isfollowing ? "following" : "follow"}</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Search