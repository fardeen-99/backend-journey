import React, { useEffect, useState } from 'react'
import { Useauth } from '../../auth/hooks/auth.hook'
import { FaBookmark } from "react-icons/fa";
import { usePost } from '../hooks/post.hook';
import { useNavigate } from 'react-router-dom'

const Save = () => {
const navigate=useNavigate()
const{setallpost,allpost,handlegetallpost,savepost}=Useauth()

const {unsaveHandle}=usePost()

useEffect(()=>{
  handlegetallpost()  
},[])


  return (
    <>
      <h1 className='text-6xl px-5 text-center md:text-start font-semibold text-white mb-7'>Saved Post</h1>
    <div className=' md:w-full w-[100%] grid-cols-2 md:grid-cols-3 grid m-auto gap-1 md:p-4'>
{
  allpost.filter(item => item.save === true).length > 0 ? (

    allpost
      .filter(item => item.save === true)
      .map((item) => (
        <section className='relative ' key={item._id}>

          {
            item.mediatype === "non-image"
              ? (
                <video
                  onClick={() => navigate(`/feed/${item._id}`)}
                  className='h-50 md:h-70 object-cover w-full'
                  src={item.post_url}
                  autoPlay
                  loop
                  muted
                />
              )
              : (
                <img
                  onClick={() => navigate(`/feed/${item._id}`)}
                  src={item.post_url}
                  className='h-50 md:h-70 object-cover w-full'
                  alt=""
                />
              )
          }

          <FaBookmark
            onClick={() => unsaveHandle(item._id)}
            className='absolute top-3 text-white text-3xl right-2'
          />

        </section>
      ))

  ) : (
    <p>No saved post found</p>
  )
}
    </div>
  </>
  )
}

export default Save