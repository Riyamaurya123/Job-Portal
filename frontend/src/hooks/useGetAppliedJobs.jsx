import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { APPLICATION_API_END_POINT } from '../utils/constant'
import { setAllAppliedJobs } from '../redux/jobSlice'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch()

    useEffect(()=>{
        const fetchAppliedJob = async ()=>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setAllAppliedJobs(res?.data?.applications))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAppliedJob()
    },[])
}

export default useGetAppliedJobs