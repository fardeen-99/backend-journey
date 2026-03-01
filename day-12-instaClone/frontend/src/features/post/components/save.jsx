import React, { useEffect } from 'react'
import { Useauth } from '../../auth/hooks/auth.hook'

const Save = () => {

    const{handlegetallpost,allpost} =Useauth()

    useEffect(()=>{
        handlegetallpost()
    },[])

  return (
    <div className='w-full h-full grid grid-cols-3 gap-1'>

        {
            allpost?.map((item)=>{
                return(
                        <>
                    {
                        item.save?
                    <div className='h-full w-full'>
                        {item.mediatype==="non-image"?
                        <video src={item.post_url} muted autoPlay loop className='min-w-full h-80 object-cover' />:          <img src={item.post_url} alt="" className='min-w-full h-80 object-cover' />}
                    </div>
                        :null
                    }
                        </>
                )
            })
        }
    </div>
  )
}

export default Save