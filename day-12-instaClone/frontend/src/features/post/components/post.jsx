
import { useNavigate } from 'react-router-dom'

const Post = ({content}) => {
  const navigate=useNavigate()


    if(!content || content.length===0){
      return(
             <div className='col-span-3 flex justify-center w-full'>
                    <p className='text-center w-full text-white text-xl font-semibold whitespace-nowrap p-5'>No post found</p>
                </div>
      )
    }
  return (
    <div className='w-full   grid grid-cols-3 gap-1'>
      {
        content.map((item)=>{
          return(
            <div className=' w-full'
            onClick={()=>navigate(`/feed/${item._id}`)}
            >
          {item.mediatype==="non-image"?<video src={item.post_url} muted autoPlay loop className='min-w-full h-40 md:h-80 xl:h-130 object-cover' />:          <img src={item.post_url} alt="" className='min-w-full h-40 md:h-80 xl:h-130 object-cover' />
}
       </div>
            
          )
        })
      }  
    </div>
  )
}

export default Post