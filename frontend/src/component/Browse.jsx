import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Jobs from './Jobs'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '../redux/jobSlice'
import useGetAllJobs from '../hooks/useGetAllJobs'
import { motion } from 'framer-motion';


const randomJobs = [1,2,3]
const Browse = () => {
  useGetAllJobs()
  const dispatch = useDispatch()
  const {allJobs} = useSelector(store=>store.job)
  useEffect(()=>{
    return()=>{
      dispatch(setSearchedQuery(""))

    }
  },[])
  return (
    <div>
      <Navbar/> 
      <div className='max-w-7xl mx-auto my-10 '>
        <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4 mt-5'>
        {
          allJobs.map((job,index)=>{
            return (
              <motion.div
              key={job._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Jobs job={job}/>
              </motion.div>
            )
          })
        }
        </div>
      </div>
    </div>
  )
}

export default Browse