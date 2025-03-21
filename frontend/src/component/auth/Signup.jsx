import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { USER_API_END_POINT } from '../../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'
import { LuLoaderCircle } from "react-icons/lu";


const Signup = () => {
        const {user} = useSelector(store=>store.auth)
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: null
    })
    const dispatch = useDispatch()
    const {loading} = useSelector(store=>store.auth)


    const navigate = useNavigate()

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async(e) => {
        e.preventDefault()  
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("PhoneNumber", input.phoneNumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if(input.file){
            formData.append("file", input.file)
        }

        try {
                dispatch(setLoading(true))            
            const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                withCredentials:true
            })
            if(res.data.success){
                navigate('/login')
                toast.success(res.data.message)
                console.log(res.data)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }finally{
            dispatch(setLoading(false))
        }
    }

            useEffect(()=>{
                if(user){
                    navigate("/")
                }
            },[])
    
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-300 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    
                    <div className='my-2'>
                        <label>Full Name</label>
                        <input className='w-full p-2.5 rounded-sm border border-gray-300' 
                            type="text" 
                            onChange={changeEventHandler} 
                            name="fullname" 
                            value={input.fullname} 
                            placeholder='Enter your name' />
                    </div>

                    <div className='my-2'>
                        <label>Email</label>
                        <input className='w-full p-2.5 rounded-sm border border-gray-300' 
                            type="email" 
                            onChange={changeEventHandler} 
                            name="email" 
                            value={input.email} 
                            placeholder='Enter your email' />
                    </div>

                    <div className='my-2'>
                        <label>Phone Number</label>
                        <input className='w-full p-2.5 rounded-sm border border-gray-300' 
                            type="text" 
                            onChange={changeEventHandler} 
                            name="phoneNumber" 
                            value={input.phoneNumber} 
                            placeholder='Enter your phone number' />
                    </div>

                    <div className='my-2'>
                        <label>Password</label>
                        <input className='w-full p-2.5 rounded-sm border border-gray-300' 
                            type="password"  // ✅ Fix: Corrected spelling
                            onChange={changeEventHandler} 
                            name="password" 
                            value={input.password} 
                            placeholder='Enter your password' />
                    </div>

                    <div className='flex items-center gap-4 my-5'>
                        <div>
                            <input type="radio" 
                                id="student" 
                                name="role" 
                                value="student" 
                                checked={input.role === "student"} 
                                onChange={changeEventHandler} 
                                className='cursor-pointer' />
                            <label className='mx-2' htmlFor="student">Student</label>
                        </div>

                        <div>
                            <input type="radio" 
                                id="recruiter" 
                                name="role" 
                                value="recruiter" 
                                checked={input.role === "recruiter"} 
                                onChange={changeEventHandler} 
                                className='cursor-pointer' />
                            <label className='mx-2' htmlFor="recruiter">Recruiter</label>
                        </div>
                    </div>

                    <div className='flex items-center gap-2 ml-10'>
                        <label>Profile</label>
                        <input type="file" 
                            accept='image/*' 
                            onChange={changeFileHandler} 
                            className='cursor-pointer border border-gray-300 p-2.5 rounded-sm' />
                    </div>
                    {
                    loading?<button className='w-full my-4 bg-black text-white py-2 rounded-2xl flex gap-3 items-center justify-center h-full'><LuLoaderCircle className='h-4 w-4 animate-spin'/>  please wait</button>:<button type='submit' className='w-full my-4 bg-black text-white py-2 rounded-2xl'>Signup</button>

                    }                    

                    <span className='text-sm'>
                        Already have an account? <Link to={'/login'} className='text-blue-600'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup
