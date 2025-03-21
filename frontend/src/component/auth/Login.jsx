import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '../../utils/constant.js'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useDispatch, useSelector} from 'react-redux'
import { setLoading, setUser } from '../../redux/authSlice.js'
import store from '../../redux/store.js'
import { LuLoaderCircle } from "react-icons/lu";

const Login = () => {
        const {user} = useSelector(store=>store.auth)
        const [input, setInput] = useState({
            email: "",
            password: "",
            role: "",
        })
        const {loading} = useSelector(store=>store.auth)
        const navigate = useNavigate()
        const dispatch = useDispatch()
    
        const changeEventHandler = (e) => {
            setInput({ ...input, [e.target.name]: e.target.value })
        }
    
    
        const submitHandler = async(e) => {
            e.preventDefault() 
            // console.log(input)
            try {
                dispatch(setLoading(true))
                const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
                    headers:{
                        "Content-Type":"application/json"
                    },
                    withCredentials:true
                })
                if(res.data.success){
                    dispatch(setUser(res.data.user))
                    console.log(res.data.user)
                    navigate('/')
                    toast.success(res.data.message)
                }
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message)
            } finally{
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
        <Navbar/>
        <div className='flex items-center justify-center max-w-7xl mx-auto'>
            <form onSubmit={submitHandler} className='w-1/2 border border-gray-300 rounded-md p-4 my-10'>
                <h1 className='font-bold text-xl mb-5'>Login</h1>
                <div className='my-2'>
                    <label>Email</label>
                    <div>
                    <input className='w-full p-2.5 rounded-sm border border-gray-300' type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder='Enter your email'/>
                    </div>
                </div>
                <div className='my-2'>
                    <label>Password</label>
                    <div>
                    <input className='w-full p-2.5 rounded-sm border border-gray-300' type="passsword" name="password" value={input.password} onChange={changeEventHandler} placeholder='Enter your name'/>
                    </div>
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

                    {
                    loading?<button className='w-full my-4 bg-black text-white py-2 rounded-2xl flex gap-3 items-center justify-center h-full'><LuLoaderCircle className='h-4 w-4 animate-spin'/>  please wait</button>:<button type='submit' className='w-full my-4 bg-black text-white py-2 rounded-2xl'>Login</button>

                    }
                <span className='text-sm'>Don't have an account? <Link to={'/signup'} className='text-blue-600'> signup</Link></span>
            </form>
        </div>
    </div>
  )
}

export default Login