import React, { useEffect, useState } from 'react'
import { Useauth } from '../../auth/hooks/auth.hook'
import { useNavigate } from 'react-router-dom'
import { FaRegBookmark } from "react-icons/fa";
import Post from '../components/post';
import Save from '../components/save';
import Tag from './Tag';
const Profile = () => {
const navigate=useNavigate()

const {user,allpost,fetchUser,handlegetallpost}=Useauth()

const [userprofile, setuserprofile] = useState([])
const[tab,settab]=useState("post")

useEffect(() => {
  if (user && allpost.length > 0) {
    const res = allpost.filter(
      (item) => item.user._id === user.id
    )
    setuserprofile(res)
    console.log(res)
  }
}, [user, allpost])

useEffect(()=>{


fetchUser()
handlegetallpost()

},[])


  return (
    <>
{user?(   <div className='max-w-120  py-6'>

            <div className='flex gap-5 w-[90%] md:w-[50%] m-auto    text-white mt-8 ' >
                <img src={user.profile_image} alt="" className='h-30 w-30 md:h-40 md:w-40 rounded-full object-cover' />
                <div className='flex flex-col gap-2 md:gap-4 justify-center'>
<h1 className='text-2xl md:text-4xl font-semibold uppercase'>{user.username}</h1>

<div className='flex gap-3 w-full'>
<p className='text-sm md:text-base whitespace-nowrap'>{user.postcount} posts</p>
<p className='text-sm md:text-base whitespace-nowrap'>{user.follower} followers</p>
<p className='text-sm md:text-base whitespace-nowrap'>{user.following} following</p>
</div>
<p className='text-sm md:text-base text-zinc-500'>{user.bio}</p>
                </div>
            </div>



    </div>
):(<p>loading...</p>)} 
<div className='w-[80%] m-auto flex gap-3  text-white pb-6 '>
  <button className='w-full text-center py-3 rounded-xl bg-zinc-900 active:scale-95 transition-all duration-200'
  onClick={()=>navigate("/profileUpdate/"+user.id)}
  >Edit Profile</button>
  <button className='w-full text-center py-3 rounded-xl bg-zinc-900 active:scale-95 transition-all duration-200' >View Archieve</button>
</div>

<div className='flex overflow-x-scroll py-4 w-[80%] m-auto snap-x snap-mandatory'>
  {
    userprofile?.map((item)=>{
      return(
        <>
        <div className='h-20 w-20 rounded-full shrink-0 bg-zinc-900 '
        onClick={()=>navigate(`/feed/${item._id}`)}>
          {item.mediatype==="non-image"?<video src={item.post_url} muted autoPlay loop className='h-full shrink-0 w-full p-1 rounded-full object-cover' />:          <img src={item.post_url} alt="" className='h-full w-full p-1 rounded-full object-cover' />
}
       </div>
       
        </>
      )
    })
  }
  <div className='h-20 w-20 rounded-full  p-3 shrink-0 bg-zinc-900 '
  
  onClick={()=>navigate("/create")}
  >
        <div className='h-full w-full p-2 border-2 border-white rounded-full'>
<img src="/plus.png" className='h-full w-full object-cover' alt="" />
        </div>
       </div>
</div>

<div className='w-[80%]  flex  justify-between m-auto max-w-120 text-white py-6 '

>
  <svg 
  onClick={()=>settab("post")}
  className={tab==="post"?"text-white cursor-pointer active:text-white active:scale-95 duration-200 transition-all":"text-gray-500 cursor-pointer active:text-white active:scale-95 duration-200 transition-all"}
  aria-label="Posts" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Posts</title><rect height="6" rx="1" ry="1" width="4.667" x="3" y="1"></rect><rect height="6" rx="1" ry="1" width="4.667" x="16.333" y="1"></rect><rect height="6" rx="1" ry="1" width="4.667" x="9.667" y="1"></rect><rect height="6" rx="1" ry="1" width="4.667" x="3" y="9"></rect><rect height="6" rx="1" ry="1" width="4.667" x="16.333" y="9"></rect><rect height="6" rx="1" ry="1" width="4.667" x="9.667" y="9"></rect><rect height="6" rx="1" ry="1" width="4.667" x="3" y="17"></rect><rect height="6" rx="1" ry="1" width="4.667" x="16.333" y="17"></rect><rect height="6" rx="1" ry="1" width="4.667" x="9.667" y="17"></rect></svg>
  <FaRegBookmark onClick={()=>settab("saved")}
    className={`${tab==="saved"?"text-white":"text-gray-500"} text-2xl cursor-pointer active:text-white active:scale-95 duration-200 transition-all`}
    />
  <svg
  onClick={()=>settab("tagged")}
  className={`${tab==="tagged"?"text-white":"text-gray-500"} text-2xl cursor-pointer active:text-white active:scale-95 duration-200 transition-all`}
  
  aria-label="Tagged" class="x1lliihq x1n2onr6 x1cp0k07 __web-inspector-hide-shortcut__" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Tagged</title><path d="M21 7.48a2 2 0 0 0-2-2h-3.046a2.002 2.002 0 0 1-1.506-.683l-1.695-1.939a1 1 0 0 0-1.506 0L9.552 4.797c-.38.434-.93.682-1.506.682H5a2 2 0 0 0-2 2V19l.01.206A2 2 0 0 0 5 21h14a2 2 0 0 0 2-2V7.48ZM23 19a4 4 0 0 1-4 4H5a4 4 0 0 1-3.995-3.794L1 19V7.48a4 4 0 0 1 4-4h3.046l1.696-1.94a3 3 0 0 1 4.516 0l1.696 1.94H19a4 4 0 0 1 4 4V19Z" fill="currentColor"></path><path d="M14.5 10.419a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Zm2 0a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM12 16.003c3.511 0 6.555 1.99 8.13 4.906a1 1 0 0 1-1.76.95c-1.248-2.31-3.64-3.857-6.37-3.857S6.878 19.55 5.63 21.86a1 1 0 0 1-1.76-.951c1.575-2.915 4.618-4.906 8.13-4.906Z" fill="currentColor"></path></svg>
</div>
{tab==="post"?
<Post userprofile={userprofile}/>
:tab==="saved"?<Save/>:<Tag/>
}


</>
  )
}

export default Profile