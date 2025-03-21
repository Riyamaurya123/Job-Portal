import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { FaPen } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import AppliedJodTable from './AppliedJodTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs()
    const [open, setOpen] = useState(false)
    const {user} = useSelector(store=>store.auth)
    const skills = ["Html", "CSS", "JavaScript", "ReactJs"]
    const isResume = true
  return (
    <div className='relative'>
        <Navbar/>
        <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
            <div className='flex justify-between'>
            <div className='flex items-center gap-4'>
            <button className='border border-gray-400 w-24 h-24'>
           <img className='w-full h-full object-cover' src={user?.profile?.ProfilePhoto} alt="" />
        </button>
        <div>
        <h1 className='font-medium text-xl'>{user?.fullname}</h1>
        <p>{user?.profile?.bio}</p>
        </div>
            </div>
        <button className='text-right cursor-pointer' onClick={()=>setOpen(true)}><FaPen/></button>

            </div>
            <div className='my-5'>
                <div className='flex items-center gap-3 my-2'>
                <IoMail/>
                <span>{user?.email}</span>
                </div>
                <div className='flex items-center gap-3 my-2'>
                <FaPhone/>
                <span>{user?.PhoneNumber    }</span>
                </div>
            </div>
            <div className='my-5'>
                <h1>Skills</h1>
                <div className='flex items-center gap-1'>
                {
                    user?.profile?.skills.length !==0 ?user?.profile?.skills.map((item,index)=> (
                        <button key={index} className='px-5 rounded-2xl py-0.5 my-4 bg-black text-white'>{item}</button>
                    )):(
                        <span>NA</span>
                    )
                }
                </div>
            </div>
            <div className='grid w-full max-w-sm items-center gap-1.5'>
                <label className='text-md font-bold'>Resume</label>
                {user?.profile?.resume ? (
  <a
    href={user?.profile?.resume}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
  >
    {user?.profile?.resumeOriginalName || "View Resume"}
  </a>
) : (
  <span>NA</span>
)}            </div>
        </div>
        <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* application Table */}

                <AppliedJodTable/>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile