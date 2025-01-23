import { useDispatch, useSelector } from "react-redux"
import Job from "./Job"
import Navbar from "./ui/Navbar"
import useGetAllJobs from "@/customHooks/useGetAllJobs"
import { useEffect } from "react"
import { setSearchQuery } from "@/redux/jobSlice"

const Browse = () => {
 useGetAllJobs()
  const {allJobs} = useSelector(store=>store.job)
  const dispatch = useDispatch()

  useEffect(()=>{
    return () => {
      dispatch(setSearchQuery(""))
    }
  },[])
  return (
    <div>
      <Navbar/>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">Search Results {allJobs.length}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                allJobs.map((job)=>{
                    return(
                        <Job key={job._id} job={job}/>
                    )
                })
            }
        </div>
      </div>
    </div>
  )
}

export default Browse
