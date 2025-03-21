import React, { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../redux/store';
import { toast } from 'react-toastify';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant';
import { setUser } from '../../redux/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useSelector(store=>store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async()=>{
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true})
      if(res.data.success){
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='bg-white'>
      <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
      <div>
      <h1 className='text-2xl font-bold'>Job<span className='text-[#F83992]'>Portal</span></h1>
      </div>
      <div className='flex gap-5'>
        <ul className='flex font-medium items-center gap-5'>
          {
            user && user.role === "recruiter" ?(
              <>
          <li><Link to='/admin/companies'>Companies</Link></li>
          <li><Link to='/admin/jobs'>Job</Link></li>
              </>
            ):(
              <>
          <li><Link to='/'>home</Link></li>
          <li><Link to='/job'>Job</Link></li>
          <li><Link to='/browse'>Browse</Link></li>

              </>

            )
          }
        </ul>
        {
          !user ? (
            <div className='flex items-center gap-3 ml-10 '>
              <Link to={'/login'}>
              <button className='cursor-pointer px-4 py-2 border border-gray-400'>Login</button>
              </Link>
              <Link to={'/signup'}>
              <button className='bg-[#6A38C2] hover:bg-[#5e4982e9] text-white px-4 py-2 rounded-sm cursor-pointer'>Signup</button>
              </Link>
            </div>
          ):(
            <div 
            className="relative inline-block"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            {/* User Icon */}
            <div className="cursor-pointer">
              <div style={{width:"40px", height:"40px", borderRadius:"50%"}}>
                {
                  user?.profile?.ProfilePhoto ?(
                    <img src={user?.profile?.ProfilePhoto} style={{width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%"}} alt="" /> 
                  ):(
                        <FaUserCircle size={40} /> 
                  )
                }
              </div>
            </div>
            {/* ||  <FaUserCircle size={28} />       */}
            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-[-2px] w-[270px] bg-white border rounded-lg shadow-lg">
                <ul className="py-2 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <div className='flex gap-3'>
                    <FaUserCircle size={28}/>
                    <div className='text-sm' >
                      <h2 className='font-bold'>{user.fullname}</h2>
                    <p className=''>{user?.profile?.bio}</p>
                    </div>
                  </div>
                  </li>
                  {
                    user?.role !== "recruiter" && (
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <button className='ml-1 flex gap-4 items-center '><LuUserRound size={25} className='cursor-pointer'/><Link to='/profile'>View Profile</Link></button>
                    </li>  
                    )
                  }
                  <li onClick={logoutHandler} className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-4">
                    <HiOutlineLogout size={25}/>
                    logout
                  </li>
                </ul>
              </div>
            )}
          </div>      
          )
        }

        {/* avtar */}
      </div>
      </div>
    </div>
  )
}

export default Navbar