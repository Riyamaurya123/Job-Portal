import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiEdit2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const {companies,searchCompanyByText} = useSelector(store=>store.company)  
  const [filterCompany, setFilterCompany] = useState(companies)
  const navigate = useNavigate()
  useEffect(()=>{
   const filteredCompany = companies.length>=0 && companies.filter((company)=>{
    if(!searchCompanyByText){
      return true
    }
    return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
   })
   setFilterCompany(filteredCompany)
  },[companies, searchCompanyByText ])

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
          <tr style={{ backgroundColor: "#f2f2f2", textAlign: "right" }}>
            <th style={{ padding: "10px" }}>Logo</th>
            <th style={{ padding: "10px" }}>Name</th>
            <th style={{ padding: "10px" }}>Date</th>
            <th style={{ padding: "10px" }}>Action</th>
          </tr>
        </thead>
        <tbody className="text-right">
           {
            filterCompany.length <=0 ?<span>No Company not found</span>:(
              filterCompany.map((company)=>{
                return (
                  <>
                            <tr>
            <td style={{ padding: "10px" }}>
              <button className="w-10 h-10">
                <img
                  className="w-full h-full object-cover"
                  src={company?.logo}
                  alt="Company Logo"
                />
              </button>
            </td>
            <td style={{ padding: "10px" }}>{company.name}</td>
            <td style={{ padding: "10px" }}>{company?.createdAt.split("T")[0]}</td>
            <td style={{ padding: "10px", textAlign: "right" }}>
              <div
                style={{ display: "inline-block", position: "relative" }}
                onMouseEnter={() => handleMouseEnter(company.id)}
                onMouseLeave={handleMouseLeave}              >
                <HiDotsHorizontal className="cursor-pointer hover:" />
                {openDropdownId === company.id && (
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
                      <span onClick={()=>navigate(`/admin/companies/${company._id}`)}>Edit</span>
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

export default CompaniesTable;
