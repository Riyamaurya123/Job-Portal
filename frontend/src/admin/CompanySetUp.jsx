import React, { useEffect, useState } from 'react';
import Navbar from '../component/shared/Navbar';
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { COMPANY_API_END_POINT } from '../utils/constant';
import { useSelector } from 'react-redux';
import useSetCompanyId from '../hooks/useSetCompanyId';

// Ensure COMPANY_API_END_POINT is defined or imported correctly
// import { COMPANY_API_END_POINT } from 'your-config-file';

const CompanySetUp = () => {
  const { id } = useParams(); // Retrieve the 'id' parameter from the URL
  useSetCompanyId(id)
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });
  const {singleCompany} = useSelector(store=>store.company)
  // console.log(singleCompany)
  const [loading, setLoading] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description); // Corrected the key from 'desccription' to 'description'
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });
      if (res?.data?.success) {
        console.log(res.data)
        toast.success(res?.data?.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(()=>{
   setInput({
    name:singleCompany.name ||"",
    description:singleCompany.description || "",
    website:singleCompany.website || "",
    location:singleCompany.location ||"",
    file:singleCompany.file || null
   })
  },[singleCompany])

  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-10'>
        <form onSubmit={submitHandler}>
          <div className='flex items-center gap-5 p-8'>
            <button
              type='button'
              onClick={() => navigate("/admin/companies")} // Navigate back to the previous page
              className='flex items-center gap-2 text-gray-500 font-semibold border border-gray-300 p-2.5 rounded-sm shadow-2xs'
            >
              <FaArrowLeft /><span>Back</span>
            </button>
            <h1 className='font-bold text-xl'>Company Setup</h1>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label>Company Name</label>
              <input
                type="text"
                name='name'
                value={input.name}
                className='border border-gray-400 p-2 rounded-sm w-full'
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                name='description'
                value={input.description}
                className='border border-gray-400 p-2 rounded-sm w-full'
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label>Website</label>
              <input
                type="text"
                name='website'
                value={input.website}
                className='border border-gray-400 p-2 rounded-sm w-full'
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label>Location</label>
              <input
                type="text"
                name='location'
                value={input.location}
                className='border border-gray-400 p-2 rounded-sm w-full'
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <label>Logo</label>
              <input
                type="file"
                accept='image/*'
                className='border border-gray-400 p-2 rounded-sm w-full'
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {
            loading
              ? <button className='w-full my-4 bg-black text-white py-2 rounded-2xl flex gap-3 items-center justify-center h-full' disabled>
                  {/* Add a spinner or loading indicator here */}
                  Please wait...
                </button>
              : <button type='submit' className='w-full my-4 bg-black text-white py-2 rounded-2xl'>
                  Update
                </button>
          }
        </form>
      </div>
    </div>
  );
};

export default CompanySetUp;
