import axios from 'axios';
import React, { useState } from 'react'
import { HiDotsHorizontal } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { APPLICATION_API_END_POINT } from '../utils/constant';


const ApplicantsTable = () => {
    const shortListingStatus = ["Accepted", "Rejected"] 
    const {allApplicants} = useSelector(store=>store.application)

    const [open, setOpen] = useState(false)
    const handleToggle=()=>{
        setOpen(!open)
    }
    const statuaUpdate = async(status,id)=>{
      try {
        const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true})
        if(res.data.success){
          toast.success(res.data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
      }
    }
    
      return (
        <div className="max-w-7xl mx-auto my-10 p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">List of Your Applied Users</h2>
          <div>
            <table className="min-w-full  text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2">Full Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Contact</th>
                  <th className="px-4 py-2">Resume</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {allApplicants?.applications.length > 0 ? (
                  allApplicants?.applications.map((user) => (
                    <tr key={user._id}>
                      <td className="px-4 py-5">{user?.applicant.fullname}</td>
                      <td className="px-4 py-5">{user?.applicant.email}</td>
                      <td className="px-4 py-5">{user?.applicant?.PhoneNumber}</td>
                      <td className="px-4 py-6">
                        <a href={user?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                          {user?.applicant?.profile?.resumeOriginalName                          }
                        </a>
                      </td>
                      <td className="px-4 py-5">{user?.applicant?.createdAt.split("T")[0]}</td>
                      <td className="px-4 py-5">
                        <div
                          className=" px-3 py-1 rounded relative"
                        >
                            <HiDotsHorizontal className='cursor-pointer' onClick={handleToggle}/>
                            <div className={`${open?"border":""} py-1 px-2 absolute top-4.5 left-0`}>
                            {open && (
                                shortListingStatus.map((staus,index)=>{
                                    return (
                                        <div className='cursor-pointer' key={index} onClick={()=>statuaUpdate(staus,user._id)}>
                                            <span className='hover:text-green-500'>{staus}</span>

                                        </div>
                                    )
                                })
                            )
                            }
                            </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">No applied users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

export default ApplicantsTable