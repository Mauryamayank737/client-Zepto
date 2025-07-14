import React from 'react'
import UserProfile from '../component/UserProfile'
import { Outlet } from 'react-router'
import AdminProfile from '../component/admin/AdminProfile'
import { useSelector } from 'react-redux'

const Dashboard = () => {
  const user = useSelector(state=>state.user)
  // console.log("deshboardUser",user)
  return (
   <>
   <section className=''>
    <div className='mx-auto container p-3 flex  '>
{/* left user menu */}
<div className='w-[280px] py-4 hidden md:block sticky top-24 '>
 {user.role =="ADMIN" ?<AdminProfile />:<UserProfile />}
  
</div>
{/* User content */}
<div className='md:border-l-1 border-neutral-300 w-full p-4'>
 <Outlet />
</div>
    </div>
   </section>
   </>
  )
}

export default Dashboard