import {Company} from '../models/company.js'
import {getDataUri} from '../utils/dataURI.js'
import cloudinary from '../utils/cloudinary.js';

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false,
            });
        }

        let company = await Company.findOne({ companyName });
        if (company) {
            return res.status(400).json({
                message: "Company already registered",
                success: false,
            });
        }

        // Use the correct field names from your schema
        company = await Company.create({
            companyName,  // Updated to match schema
            userID: req.id, // Make sure req.id corresponds to a valid user ID
            // Add other fields if necessary
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
            success: false,
        });
    }
};


//This is for the user who wants to see his companies registered in his account
export const getCompany = async (req,res) => {
    try {
        const userID = req.id //logged in user id
        const companies = await Company.find({userID})
        if(!companies){
            return res.status(404).json({
                message:"companies not found",
                success:false
            })
        }
        else{
            res.status(200).json({
                companies,
                success:true
            })
        }
    } catch (error) {
        res.send(error)
    }
}

//Get company by id
export const getCompanyById = async (req , res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(404).json({
                message:"company not found",
                success:false
        })
    }
        else{
            res.status(200).json({
                company,
                success:true
            })
        }
    }
    catch (error) {
        res.send(error)
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;
        const file = req.file; // Ensure the file exists

        let logo;

        // If a file is uploaded, proceed with file upload
        if (file) {
            const fileUri = getDataUri(file); // Assuming getDataUri properly handles multer's buffer
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url; // Get the uploaded logo URL
        }

        // Prepare data for update, include logo only if it's available
        const updateData = { companyName, description, website, location };
        if (logo) {
            updateData.logo = logo; // Only include logo if it's updated
        }

        // Find the company and update it
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated",
            company,
            success: true
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while updating the company.");
    }
};


