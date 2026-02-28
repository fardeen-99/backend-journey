import React from 'react'
import { NavLink } from 'react-router-dom'

const Aside = () => {
  return (
    <div className=' w-full h-full'>
  <ul className='flex flex-col  text-white text-3xl w-full text-center h-full items-center justify-center font-semibold'>
    <li className='hover:bg-zinc-600/20 py-4 w-full'><NavLink to="/">Feed</NavLink></li>
    <li className='hover:bg-zinc-600/20 py-4 w-full'><NavLink to="/create">Create post</NavLink></li>
    <li className='hover:bg-zinc-600/20 py-4 w-full'><NavLink to="/save">Saved</NavLink></li>
    <li className='hover:bg-zinc-600/20 py-4 w-full'><NavLink to="/profile">Profile</NavLink></li>
  </ul>


    </div>
  )
}

export default Aside