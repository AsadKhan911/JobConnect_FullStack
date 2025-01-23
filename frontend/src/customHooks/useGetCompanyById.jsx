import { setSingleCompany } from "@/redux/companySlice.js"
import { COMPANY_API_ENDPOINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchSingleCompany = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_ENDPOINT}/get/${companyId}` , {withCredentials:true})
            if(res.data.success){
                dispatch(setSingleCompany(res.data.company))
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchSingleCompany()
   }, [companyId , dispatch])
}

export default useGetCompanyById
