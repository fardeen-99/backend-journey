import React from 'react'
import Aside from './Aside'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Applayout = () => {
  return (
<>
    <div className='h-full w-full flex'>
<div className='w-60 left-[-100%] overflow-y-hidden h-full fixed md:static bg-[#0C1014] '>
   <Aside/>
</div>
  <div className='flex-1 h-full overflow-y-scroll md:pb-0 pb-18 bg-[#0C1014]'>
  <Outlet/>
</div>
    </div>
    <Footer/>
    </>
  )
}

export default Applayout