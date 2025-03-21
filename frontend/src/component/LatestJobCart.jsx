import React from 'react'
import { useNavigate } from 'react-router-dom'

const LatestJobCart = ({job}) => {
  const navigate = useNavigate()
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>{job.location}</p>
        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{job?.title}</h1>         
            <p className='text-sm text-gray-600'>{job.description}</p>
        </div>
        <div className='flex item-center gap-2 mt-4'>
            <button className='px-2 py-0.5 border border-gray-400 rounded-full text-blue font-bold shadow-lg'>{job?.position} positions</button>
            <button className='px-2 py-0.5 border border-gray-400 rounded-full text-[#F83002] font-bold shadow-lg'>{job?.jobType}</button>
            <button className='px-2 py-0.5 border border-gray-400 rounded-full text-[#7209b7] font-bold shadow-lg'>{job.salary}LPA</button>

        </div>
    </div>
  )
}

export default LatestJobCart