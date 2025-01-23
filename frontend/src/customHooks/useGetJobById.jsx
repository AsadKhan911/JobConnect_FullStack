import { setSingleJobById } from "@/redux/jobSlice.js"
import { JOB_API_ENDPOINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetJobById = (JobId) => {
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchSingleCompany = async () => {
        try {
            const res = await axios.get(`${JOB_API_ENDPOINT}/get/${JobId}` , {withCredentials:true})
            if(res.data.success){
                dispatch(setSingleJobById(res.data.job))
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchSingleCompany()
   }, [JobId , dispatch])
}

export default useGetJobById
