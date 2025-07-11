
import axios from 'axios'
import React, { useEffect } from 'react'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '../redux/jobSlice'
import { setSingleCompany } from '../redux/companySlice'

const useSetCompanyId = (companyId) => {
    const dispatch = useDispatch()
    useEffect(()=>{
        const fetchSingleCompany = async()=>{
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true})
                if(res.data.success){
                    dispatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchSingleCompany()
    },[companyId, dispatch])
}

export default useSetCompanyId