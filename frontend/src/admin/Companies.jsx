import React, { useEffect, useState } from 'react'
import Navbar from '../component/shared/Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompany from '../hooks/useGetAllCompany'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '../redux/companySlice'

const Companies = () => {
  useGetAllCompany()
  const dispatch =  useDispatch()
  const [input, setInput] = useState("")
  
  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])
  const navigate = useNavigate()
  return (
    <div>
        <Navbar/>
        <div className='max-w-6xl mx-auto my-10'>
            <div className='max-w-6xl mx-auto my-5 flex items-center justify-between'>
            <input onChange={(e)=>setInput(e.target.value)} type="text" className='border border-gray-500 p-2 rounded-sm' placeholder='filter by name' />
            <button className='bg-black text-white p-2 rounded-sm' onClick={()=>navigate('/admin/companies/create')}>New compnay</button>
            </div>
            <CompaniesTable/>
        </div>
    </div>
  )
}

export default Companies