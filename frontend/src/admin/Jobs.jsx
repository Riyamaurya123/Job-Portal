import React, { useEffect, useState } from 'react'
import Navbar from '../component/shared/Navbar'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '../hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../redux/companySlice'
import AdminJobdTable from './AdminJobdTable'
import useGetAllAdminJobs from '../hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '../redux/jobSlice'

const Jobs = () => {
    useGetAllAdminJobs()
  useGetAllCompany()
  const dispatch =  useDispatch()
  const [input, setInput] = useState("")
  
  useEffect(()=>{
    dispatch(setSearchJobByText(input))
  },[input])
  const navigate = useNavigate()
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='max-w-6xl mx-auto my-5 flex items-center justify-between'>
            <input onChange={(e)=>setInput(e.target.value)} type="text" className='border border-gray-500 p-2 rounded-sm' placeholder='filter by name or role' />
            <button className='bg-black text-white p-2 rounded-sm' onClick={()=>navigate('/admin/jobs/post')}> New Job</button>
            </div>
            <AdminJobdTable/>
        </div>
    </div>
  )
}

export default Jobs