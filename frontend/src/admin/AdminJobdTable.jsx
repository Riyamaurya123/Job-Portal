import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchJobByText } from "../redux/jobSlice";
import { IoEyeOutline } from "react-icons/io5";

const AdminJobdTable = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const {allAdminJobs,searchJobByText} = useSelector(store=>store.job) 
  const [filterJobs, setFilterJobs] = useState(allAdminJobs)
  const navigate = useNavigate()

  useEffect(()=>{
   const filteredjobs = allAdminJobs.length>=0 && allAdminJobs.filter((job)=>{
    if(!searchJobByText){
      return true
    }
    return job?.title.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
   })
   setFilterJobs(filteredjobs)
  },[allAdminJobs, searchJobByText ])

  const handleMouseEnter = (id) => {
    setOpenDropdownId(id);
  };

  const handleMouseLeave = () => {
    setOpenDropdownId(null);
  };

  return (
    <div style={{ margin: "auto", marginTop: "20px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2", textAlign: "center" }}>
            <th style={{ padding: "10px" }}>Company Name</th>
            <th style={{ padding: "10px" }}>Role</th>
            <th style={{ padding: "10px" }}>Date</th>
            <th style={{ padding: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
           {
            filterJobs.length <=0 ?<span>No Company not found</span>:(
                filterJobs.map((job)=>{
                return (
                  <>
            <tr>

            <td style={{ padding: "17px" }}>{job?.company?.name}</td>
            <td style={{ padding: "17px" }}>{job?.title}</td>
            <td style={{ padding: "17px" }}>{job?.createdAt.split("T")[0]}</td>
            <td style={{ padding: "17px", textAlign: "right" }}>
              <div
                style={{ display: "inline-block", position: "relative" }}
                onMouseEnter={() => handleMouseEnter(job.id)}
                onMouseLeave={handleMouseLeave}              >
                <HiDotsHorizontal className="cursor-pointer hover:" />
                {openDropdownId === job.id && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      // marginTop: "10px",
                      padding: "10px",
                      border: "1px solid gray",
                      backgroundColor: "white",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                      zIndex: 1,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer"}}>
                      <FiEdit2 style={{ marginRight: "5px" }} />
                      <span onClick={()=>navigate(`/admin/companies/${job?.company?._id}`)}>Edit</span>
                    </div>
                    <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-1">
                      <IoEyeOutline/>
                      <span>Applicants</span>
                    </div>
                  </div>
                )}
              </div>
            </td>
          </tr>


                  </>
                )
              })
            )
          }
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobdTable;
