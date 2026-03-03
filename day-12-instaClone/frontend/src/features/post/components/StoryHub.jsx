import React, { useEffect } from 'react'
import { usePost } from '../hooks/post.hook'
import { Useauth } from '../../auth/hooks/auth.hook'
import { useNavigate } from 'react-router-dom'

const StoryHub = () => {

  const { storyHandle, story } = usePost()
const {user}=Useauth()
const navigate=useNavigate()
  useEffect(() => {
      storyHandle()
  }, [])


  return (
    <div className=' flex  gap-4 w-full shrink-0'>

      {
        story?.filter((item)=>item.username !==user.username).map((item)=>{
          return(
            <>
            <div className='flex gap-1 flex-col shrink-0 items-center'
            onClick={()=>navigate(`/personprofile/${item._id}`)}
            >
              <img src={item.profile_image} className='h-20 w-20 rounded-full ' alt="" />
              <span className=' w-full text-center text-sm font-semibold'>{item.username.slice(0,10)}
      <span className=' w-full text-center text-sm font-semibold'>{item.username.length>10 &&"..."}</span>
      </span>
            </div>
            </>
          )
        })
      }
      {/* {story?.map((item) => {
        return (
          <>
            <div className='flex gap-1 flex-col shrink-0'>
              <img src={item.profile_image} className='h-20 w-20 rounded-full ' alt="" />
              <p>{item.username}</p>
            </div>
          </>
        )
      })} */}
    </div>
  )
}

export default StoryHub