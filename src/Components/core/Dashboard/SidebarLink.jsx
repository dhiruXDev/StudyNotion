import React from 'react'
import * as Icons from "react-icons/vsc"
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';
export const SidebarLink = ({links, IconName ,setIsOpen}) => {
    const Icon = Icons[IconName] ;          // By using the name og Icon as string i imported Icon 
    const dispatch = useDispatch();
    const location = useLocation();
    
    const matchRoute = (route)=>{
          return matchPath({path:route} , location.pathname)
    }

  return (
    <NavLink   to={links.path} className={` ${matchRoute(links.path) ? " bg-yellow-800 border-l-[3px] border-yellow-200 text-yellow-25" : " bg-transparent hover:bg-richblack-700"}  py-3 relative px-2   duration-200 `}>
            {/* <span> border ke liye</span> */}
            <div onClick={()=>setIsOpen(false)} className=' flex gap-x-4 items-center font-medium pl-4'>
                    <Icon className='text-xl' />
                    <p className=' text-base '>{links.name}</p>
            </div>
    </NavLink>
  )
}
