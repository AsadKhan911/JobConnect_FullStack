import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Navbar from "../ui/Navbar"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchCompanyByText } from "@/redux/companySlice"
import AdminJobsTable from "./AdminJobsTable"
import useGetAllAdminJobs from "@/customHooks/useGetAllAdminJobs"

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input,setInput] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setSearchCompanyByText(input))
  },[input])
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between">
            <Input
            className="w-fit"
            placeholder='Filter by company name' 
            onChange={(e)=> setInput(e.target.value)}/>
            <Button onClick={()=>navigate('/admin/jobs/create')}>New Jobs</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs
