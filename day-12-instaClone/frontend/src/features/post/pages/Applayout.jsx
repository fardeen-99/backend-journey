import React from 'react'
import Aside from './Aside'
import { Outlet } from 'react-router-dom'

const Applayout = () => {
  return (
    <div className='h-full w-full flex'>
<div className='w-60 left-[-100%] overflow-y-hidden h-full fixed md:static bg-[#0C1014] '>
   <Aside/>
</div>
<div className='flex-1 h-full overflow-y-scroll bg-[#0C1014]'>
<Outlet/>
</div>
    </div>
  )
}

export default Applayout