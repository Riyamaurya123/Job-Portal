import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant'
import { setSingleJob } from '../redux/jobSlice'
import { toast } from 'react-toastify'

const JobDescription = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const jobId = params.id
    const {singleJob} = useSelector(store=>store.job)
    const {user} = useSelector(store =>store.auth)
    const isInitiallyApplied = singleJob?.applications?.some(application=> application.applicant === user._id) || false
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    const applyJobHandler = async()=>{
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true})
            console.log(res.data)
            if(res.data.success){
                setIsApplied(true)  //update its local state
                const updateSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant:user?._id}]}
                dispatch(setSingleJob(updateSingleJob))  //help us to real time Ui update
                toast.success(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

        useEffect(()=>{
            const fetchSingleJobs = async()=>{
                try {
                    const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true})
                    if(res.data.success){
                        dispatch(setSingleJob(res.data.job))
                        setIsApplied(res.data.applications.some(application => application.applicant === user?._id))  //ensure the state is in sync with fetch data
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            fetchSingleJobs()
        },[jobId, dispatch,user?._id])
    
  return (
    <div className='max-w-7xl mx-auto my-10'>
        <div className='flex items-center justify-between'>
            <div>
            <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
        <div className='flex items-center gap-2 mt-4'>
            <button className='px-2 py-0.5 border border-gray-400 rounded-full text-blue font-bold shadow-lg'>{singleJob?.position} Position</button>
            <button className='px-2 py-0.5 border border-gray-400 rounded-full text-[#F83002] font-bold shadow-lg'>{singleJob?.jobType}</button>
            <button className='px-2 py-0.5 border border-gray-400 rounded-full text-[#7209b7] font-bold shadow-lg'>{singleJob?.salary
            } LPA</button>
        </div>

            </div>
        <button onClick={isApplied ? null : applyJobHandler} disabled={isApplied} className={`${isApplied?"bg-gray-600 cursor-not-allowed":"bg-[#7209b7] hover:bg-[#5F32ab]"} px-5 py-3 border rounded-lg text-white`}>
            {
                isApplied?"Already Applied":"Apply Now"
            }
        </button>
        </div>
        <h1 className='border-b-2 border-b-gray-300 font-medium my-4 py-4'>Job Description</h1>
        <div className='my-4'>
            <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
            <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
            <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description}</span></h1>
            <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel} years</span></h1>
            <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary            } LPA</span></h1>
            <h1 className='font-bold my-1'>Total Application: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
            <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>

        </div>
    </div>
  )
}

export default JobDescription