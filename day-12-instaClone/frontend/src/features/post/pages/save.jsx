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
    <div className='h-full w-full flex flex-wrap gap-1 p-4'>
{
  save.length>0?(
    save.map((item)=>{

      return(

    <section className='relative'>
  <img src={item.post_url} className='h-69 min-w-50' alt="" />
  <FaBookmark onClick={()=>unsaveHandle(item._id)} className='absolute top-3 right-2'/>
</section>
)

  })
):(
  <p>no saved post Found</p>
)
}
    </div>
  )
}

export default Save