import React from 'react'
import LatestJobCart from './LatestJobCart'
import { useSelector } from 'react-redux'
import store from '../redux/store'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


const LatestJob = () => {
    const navigate = useNavigate()
  const { allJobs} = useSelector(store => store.job);  // Default to empty array

  return (
      <div className='max-w-7xl mx-auto my-20'>
          <h1 className='text-4xl font-bold'>
              <span className='text-[#6A38C2]'>Latest & Top </span>Job Openings
          </h1>
          
          {/* Job cards display */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5'>
              {allJobs.length === 0 ? (
                  <span>No Job Available</span>
              ) : (
                
                  allJobs.slice(0, 6).map((job, index) => (
                    <motion.div
                    key={job._id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                            <LatestJobCart key={index} job={job} />
                            </motion.div>
                  ))
              )
              
              }
          </div>
      </div>
  );
};

export default LatestJob;
