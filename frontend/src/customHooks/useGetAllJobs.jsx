import { setAllJobs } from "@/redux/jobSlice"
import { JOB_API_ENDPOINT } from "@/utils/constant"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGetAllJobs = () => {

    const dispatch = useDispatch()
    const {searchQuery} = useSelector(store=>store.job)

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get?keyword=${searchQuery}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                }
                
            } catch (error) {
                console.log("Error fetching jobs:", error);
            }
        };
        fetchAllJobs();
    }, [searchQuery]); // Add searchQuery as a dependency
    
}

export default useGetAllJobs
