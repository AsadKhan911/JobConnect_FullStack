import { APPLICATION_API_ENDPOINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {setAllAppliedJobs} from '../redux/jobSlice.js'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchAppliedJobs = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/get` , {withCredentials:true})
            if(res.data.success){
                dispatch(setAllAppliedJobs(res.data.application))
            }
        } catch (error) {
            console.log("Error: ",error)
        }
    }
    fetchAppliedJobs()
  },[])
}

export default useGetAppliedJobs
