import React from 'react'
import { LuBookmark } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';

const Jobs = ({job}) => {
    const navigate = useNavigate()

    const daysAgoFunction = (mongodbTime)=>{
        const createdAt = new Date(mongodbTime)
        const currentTime = new Date()
        const timeDifference = currentTime - createdAt
        return Math.floor(timeDifference /(1000*24*60*60))

    }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{daysAgoFunction(job?.createdAt) === 0? "Today": `${daysAgoFunction(job?.createdAt)}`} days ago</p>
        <button className='rounded-full'><LuBookmark/></button>
        </div>
        <div className='flex items-center gap-2 my-2'>
        <button className='border border-gray-400 w-11 h-11'>
           <img className='w-full h-full object-cover' src={job?.company?.logo} alt="" />
        </button>
    <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job?.location}</p>
    </div>
        </div>
        <div>
            <h1 className='font-bold text-lg mt-2 '>{job?.title}</h1>
            <p className='text-sm text-gray-600'>{job?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <button className='px-2 py-0.5 border border-gray-400 rounded-full text-blue font-bold shadow-lg'>{job?.position} Position</button>
            <button className='px-2 py-0.5 border border-gray-400 rounded-full text-[#F83002] font-bold shadow-lg'>{job?.jobType}</button>
            <button className='px-2 py-0.5 border border-gray-400 rounded-full text-[#7209b7] font-bold shadow-lg'>{job?.salary}LPA</button>
        </div>
        <div className='flex items-center gap-4 mt-4'>
        <button className='my-4 py-2 px-2 rounded-sm border border-gray-400 ' onClick={()=>navigate(`/description/${job?._id}`)}>Details</button>
        <button className='my-4 bg-[#6A38C2] text-white py-2 px-2 rounded-sm  '>Save For Later</button>
        </div>
        </div>
  )
}

export default Jobs