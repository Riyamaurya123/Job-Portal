import React, { useState } from 'react'
import Navbar from '../component/shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../redux/companySlice'
import { COMPANY_API_END_POINT } from '../utils/constant'

const CompanyCreate = () => {
    const navigate  = useNavigate()
    const dispatch = useDispatch()

    const [companyName, setCompanyName] = useState()
    const registerNewCompany = async()=>{
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName}, {
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            })
            if(res?.data?.success){
                dispatch(setSingleCompany(res.data.company))
                toast.success(res.data.message)
                console.log(res.data)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto'>
            <div className='my-10'>
            <h1 className='font-bold text-2xl'>Your Company Name</h1>
            <p className='text-gray-500'>What would you like to give your comapny name? you can change this later.</p>
            </div>
            
            <div className='flex flex-col'>
            <label>Comany Name</label>
            <input type="text" onChange={(e)=>setCompanyName(e.target.value)} className='my-2 border border-gray-500 p-2.5 rounded-sm ' placeholder='JobHunt, Microsoft etc' />
            </div>
            <div className='flex items-center gap-2 my-10'>
            <button className='border border-gray-500 py-2 px-3 cursor-pointer rounded-sm' onClick={()=>navigate('/admin/companies')}>Cancel</button>
            <button className='bg-black text-white py-2 px-4 cursor-pointer rounded-sm' onClick={registerNewCompany}>Continue</button>
            </div>
        </div>
    </div>
  )
}

export default CompanyCreate