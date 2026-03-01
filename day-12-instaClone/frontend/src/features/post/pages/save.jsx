import React, { useEffect, useState } from 'react'
import { Useauth } from '../../auth/hooks/auth.hook'
import { FaBookmark } from "react-icons/fa";
import { usePost } from '../hooks/post.hook';


const Save = () => {

const{setallpost,allpost,handlegetallpost}=Useauth()
const [save, setsave] = useState([])
const {unsaveHandle}=usePost()

useEffect(()=>{
  const savePost=allpost.filter((item)=>item.save)
  setsave(savePost)

},[allpost])


  return (
    <>
      <h1 className='text-6xl px-5 text-center md:text-start font-semibold text-white'>Saved</h1>
    <div className=' md:w-full w-[80%] m-auto flex flex-wrap gap-1 p-4'>
{
  save.length>0?(
    save.map((item)=>{

      return(

    <section className='relative ' key={item._id}>
      {
        item.mediatype==="non-image"?<video className='h-69 md:max-w-60 object-cover w-full' src={item.post_url}  autoPlay
        loop
        muted
        />: <img src={item.post_url} className='h-69 md:max-w-60 object-cover w-full' alt="" />
      }
 
  <FaBookmark onClick={()=>unsaveHandle(item._id)} className='absolute top-3 text-white text-3xl right-2'/>
</section>
)

  })
):(
  <p>no saved post Found</p>
)
}
    </div>
  </>
  )
}

export default Save