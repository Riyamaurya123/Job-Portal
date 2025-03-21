import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import {useDispatch} from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice';
import {useNavigate} from 'react-router-dom'

const HeroSection = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  
  const searchJobHandler = ()=>{
    dispatch(setSearchedQuery(query))
    navigate("/browse")
    
  }
  return (
    <div className='text-center'>
        <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
        <h1 className='text-5xl font-bold'>Search, Apply & <br/> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi perferendis debitis neque quibusdam inventore?</p>
        <div className='flex w-[40%] shadow-lg border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
            <input type="text" onChange={(e)=>setQuery(e.target.value)} placeholder='Find your dream jobs' className='outline-none border-none w-full' />
            <button onClick={searchJobHandler}><CiSearch className='h-8 w-11 bg-[#6A38C2] text-white rounded-r-full'/></button>
        </div>
        </div>
    </div>
  )
}

export default HeroSection