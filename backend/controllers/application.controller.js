import { Application } from "../models/application.js"
import { Job } from "../models/job.js"


export const applyJob = async (req , res) => {
    try {
        const userId = req.id
        const JobId = req.params.id
        if(!JobId) {
            return res.status(400).json({
                messgae:"Job id is required",
                success:false
            })
        }
        //Check if the user has already applied for this job
        const existingApplication = await Application.findOne({job:JobId , applicant:userId})

        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false
            })
        }

        //Check if the job exists or not
        const job = await Job.findById(JobId)
        if(!job){
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }

        //Create a new application
        const newApplication = await Application.create({
            job: JobId,
            applicant: userId
        })

        job.application.push(newApplication._id)
        await job.save()
        return res.status(201).json({
            message:"Job applied successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

//Get all applications

export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}
            }
        }
        })
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        }
        //else
        return res.status(200).json({
            application,
            success:true
        })
       
    } catch (error) {
        console.log(error)
    }
}

export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id 
        const job = await Job.findById(jobId).populate({
            path : 'application',
            option:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        })
        if(!job) {
            return res.status(404).json({
                message:"Job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}



//Update status of an application pending,success,fail etc
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body
        const applicationId = req.params.id 
        if(!status){
            return res.status(400).json({
                message:"status is required",
                success:false
            })
        }

        //find the application by application id
        const application = await Application.findOne({_id:applicationId})
        if(!application){
            res.status(404).json({
                message:"application not found",
                status:false
            })
        }

        //update the status
        application.status = status.toLowerCase()
        await application.save()
        return res.status(200).json({
            message:"Status updated successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}