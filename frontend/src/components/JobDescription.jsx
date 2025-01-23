import { useParams, useNavigate } from "react-router-dom"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import axios from "axios"
import { useEffect, useState } from "react"
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { setSingleJob } from "@/redux/jobSlice"
import { toast } from "sonner"
import Navbar from "./ui/Navbar"
import { ArrowLeft } from "lucide-react" // Import the back arrow icon

const JobDescription = () => {

    const params = useParams()
    const jobId = params.id
    const navigate = useNavigate()

    const {singleJob} = useSelector(store => store.job)
    const {user} = useSelector(store => store.auth)

    const isInitiallyApplied = singleJob?.application?.some(application => application.applicant === user?._id) || false; //The || false part ensures that if some() does not find any matching application, it will return false instead of undefined. 
    const [isApplied, setIsApplied] = useState(isInitiallyApplied)

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_ENDPOINT}/get/${jobId}`, { withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
                }
            } catch (error) {
                toast.error(error.response.data.message)
            }
        }
        fetchSingleJob()
    }, [jobId, dispatch, user?._id])

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_ENDPOINT}/apply/${jobId}`, { withCredentials: true })
            if (res.data.success) {
                setIsApplied(true) //update local state
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
                dispatch(setSingleJob(updateSingleJob))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
        <Navbar />
        <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <button 
                onClick={() => navigate(-1)} 
                className="text-blue-500 hover:text-blue-700 mb-4 inline-flex items-center gap-2">
                <ArrowLeft size={20} /> {/* Using the ArrowLeft icon from lucide-react */}
                Back
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-bold text-2xl sm:text-3xl text-left">{singleJob?.title}</h1>
                    <div className="flex items-center gap-2 mt-4 flex-wrap">
                        <Badge className="text-blue-700 font-bold bg-white hover:bg-slate-50 border border-gray-400">{singleJob?.position} Positions</Badge>
                        <Badge className="text-red-600 font-bold bg-white hover:bg-slate-50 border border-gray-400">{singleJob?.jobType} Part Time</Badge>
                        <Badge className="text-[#7209b7] font-bold bg-white hover:bg-slate-50 border border-gray-400">{singleJob?.position} Positions</Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg mt-4 sm:mt-0 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h1 className="border-b-2 border-b-gray-300 font-medium py-4 text-left">{singleJob?.company?.companyName}</h1>
            <div className="text-left my-3">
                <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span></h1>
                <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span></h1>
                <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span></h1>
                <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} years</span></h1>
                <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span></h1>
                <h1 className="font-bold my-1">Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.application?.length}</span></h1>
                <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split('T')[0]}</span></h1>
            </div>
        </div>
        </>
    )
}

export default JobDescription
