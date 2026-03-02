
import { useNavigate } from 'react-router-dom'

const Post = ({userprofile}) => {
  const navigate=useNavigate()


    
  return (
    <div className='w-full  grid grid-cols-3 gap-1'>
      {
        userprofile.map((item)=>{
          return(
            <div className=' w-full'
            onClick={()=>navigate(`/feed/${item._id}`)}
            >
          {item.mediatype==="non-image"?<video src={item.post_url} muted autoPlay loop className='min-w-full h-40 md:h-80 object-cover' />:          <img src={item.post_url} alt="" className='min-w-full h-40 md:h-80 object-cover' />
}
       </div>
            
          )
        })
      }  
    </div>
  )
}

export default Post