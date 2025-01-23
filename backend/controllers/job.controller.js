import {Job} from '../models/job.js'
import mongoose from 'mongoose';

export const postJob = async (req, res) => {
    try {
        // Destructure from req.body instead of req.id
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userID = req.id; // Assuming req.id is still your user ID

        // Check for missing fields
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary,
            location,
            jobType,
            experience,
            position,
            company: companyId,
            created_by: userID
        });

        return res.status(201).json({
            message: "New job created successfully",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


export const getAllJobs = async (req,res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or:[
                {title:{$regex:keyword , $options:"i"}},
                {description:{$regex:keyword , $options:"i"}}
            ]
        }

        const jobs = await Job.find(query).populate({
            path:'company'
        }).sort({ createdAt : -1 })
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.error("Error in getAllJobs:", error);
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Validate if the jobId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Invalid Job ID format",
                success: false
            });
        }

        // Query the database to find the job by ID
        const job = await Job.findById(jobId).populate({
            path:"application"
        }).populate({
            path:"company"
        })

        // If no job is found, return a 404 response
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // If job is found, return the job in the response
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export const getAdminJobs = async (req,res) => {
    try {
        const adminID = req.id 
        const jobs = await Job.find({created_by:adminID}).populate({
            path:'company',
            createdAt:-1
        })
        if(!jobs){
            return res.status(404).json({
                message:"Jobs not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
        
    }
}

// Backend Controller for editing a job
export const editJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userID = req.id; // Assuming req.id is the logged-in user's ID

        const updateJob = {title, description, requirements, salary, location, jobType, experience, position, companyId}

        // Find the job by ID
        const job = await Job.findByIdAndUpdate(jobId, updateJob , { new: true });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Update job fields
        return res.status(200).json({
            message: "Job updated successfully",
            job,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while updating the job.");
    }
};