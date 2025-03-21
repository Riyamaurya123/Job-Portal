import React, { useState } from 'react'
import Navbar from '../component/shared/Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { JOB_API_END_POINT } from '../utils/constant'
import { LuLoaderCircle } from 'react-icons/lu'

const PostJob = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState({
        title:"",
        description:"",
        requirements:"",
        salary:"",
        location:"",
        jobType:"",
        experience:"",
        position:0,
        companyId:""
    })
    const [loading, setLoading] = useState(false)
    const {companies} = useSelector(store=>store.company)
    const changeEventHandler = (e)=>{
        setInput({...input, [e.target.name]:e.target.value})
    }

    const selectChangeHandler = (value)=>{
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value)
        setInput({...input, companyId:selectedCompany._id})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            const res = await axios.post(`${JOB_API_END_POINT}/post`,input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            })
            if(res.data.success){
                toast.success(res.data.message)
                navigate('/admin/jobs')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='flex items-center justify-center w-screen my-5'>
            <form onSubmit={handleSubmit} className='p-8 max-w-4xl border border-gray-300 shadow-lg rounded-md'>
            <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col'>
                <label>Title</label>
                <input type="text" name='title' value={input.title} onChange={changeEventHandler} className='border border-gray-400 p-1 focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div className='flex flex-col'>
                <label>Description</label>
                <input type="text" name='description' value={input.description} onChange={changeEventHandler} className='border border-gray-400 p-1 focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div className='flex flex-col'>
                <label>Requirements</label>
                <input type="text" name='requirements' value={input.requirements} onChange={changeEventHandler} className='border border-gray-400 p-1 focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div className='flex flex-col'>
                <label>Salary</label>
                <input type="text" name='salary' value={input.salary} onChange={changeEventHandler} className='border border-gray-400 p-1 focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div className='flex flex-col'>
                <label>Location</label>
                <input type="text" name='location' value={input.location} onChange={changeEventHandler} className='border border-gray-400 p-1 focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div className='flex flex-col'>
                <label>JobType</label>
                <input type="text" name='jobType' value={input.jobType} onChange={changeEventHandler} className='border border-gray-400 p-1 focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div className='flex flex-col'>
                <label>Experience</label>
                <input type="text" name='experience' value={input.experience} onChange={changeEventHandler} className='border border-gray-400 p-1 focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            <div className='flex flex-col'>
                <label>Position</label>
                <input type="number" name='position' value={input.position} onChange={changeEventHandler} className='border border-gray-400 p-1 focus-visible:ring-offset-0 focus-visible:right-0 my-1' />
            </div>
            {
  companies.length > 0 && (
    <>
      <label htmlFor="company">Choose a company:</label>
      <select name="company" onChange={(e) => selectChangeHandler(e.target.value)}>
        <option value="">Select a company</option>
        {companies.map((company) => (
          <option key={company._id} value={company?.name.toLowerCase()}>
            {company.name}
          </option>
        ))}
      </select>
    </>
  )
}
            </div>
                    {
                    loading?<button className='w-full my-4 bg-black text-white py-2 rounded-2xl flex gap-3 items-center justify-center h-full'><LuLoaderCircle className='h-4 w-4 animate-spin'/>  please wait</button>:<button className='w-full bg-black text-white p-2 rounded-2xl mt-4'>Post New Job</button>
                    }

            {
          companies.length=== 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>* Please register a company first, before posting a jobs.</p>
            }
            </form>
        </div>
    </div>
  )
}

export default PostJob