import React, { useEffect } from 'react'
import { Useauth } from '../../auth/hooks/auth.hook'
import { useNavigate } from 'react-router-dom'
const Save = () => {
    const navigate = useNavigate()

    const { handlegetallpost, allpost } = Useauth()

    useEffect(() => {
        handlegetallpost()
    }, [])

    return (
        <div className='w-full grid grid-cols-3 gap-1'>


            {allpost.filter(item => item.save === true).length > 0 ? (
                allpost.filter(item => item.save === true).map((item) => (
                    <div key={item._id} className='w-full' onClick={() => navigate(`/feed/${item._id}`)}>
                        {item.mediatype === "non-image" ? (
                            <video src={item.post_url} muted autoPlay loop className='min-w-full h-50 md:h-80 object-cover' />
                        ) : (
                            <img src={item.post_url} alt="" className='min-w-full h-50 md:h-80 object-cover' />
                        )}
                    </div>
                ))
            ) : (
                <div className='col-span-3 flex justify-center w-full'>
                    <p className='text-center w-full text-white text-xl font-semibold whitespace-nowrap p-5'>No saved post found</p>
                </div>
            )}
        </div>
    )


}

export default Save