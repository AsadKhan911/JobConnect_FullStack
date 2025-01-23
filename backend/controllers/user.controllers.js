import { User } from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDataUri } from '../utils/dataURI.js';
import cloudinary from '../utils/cloudinary.js';

//Business logic for Registartion
export const register = async (req, res) => {
    try {
        const { name, email, phone, password, role } = req.body;

        // Validate input fields
        if (!name || !email || !phone || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        // Check for duplicate email (case-insensitive)
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                message: "A user with this email already exists",
                success: false,
            });
        }

        let profilePic = null;
        let file = req.file;

        if (file) {
            // Convert the file to a data URI using getDataUri
            const fileUri = getDataUri(file);

            // Upload the image to Cloudinary
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

            // Save the Cloudinary URL for the profile picture
            profilePic = cloudResponse.secure_url;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            name,
            email: email.toLowerCase(), // Store email in lowercase
            phone,
            password: hashedPassword,
            role,
            profile: {
                profilePic // Add profile picture if available
            },
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true,
            userId: newUser._id, // Optionally return the user ID
        });
    } catch (error) {
        console.error("Registration error:", error); // Log the error for debugging
        return res.status(500).json({
            message: "An error occurred while creating the account",
            success: false,
        });
    }
};



//Business logic for login
export const login = async (req, res) => {
    try {
        //Checking for empty fields
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        //If email is not valid while login in.
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        //Comparing passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password) //user.password is the schema value which is stored in the database
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            })
        }
        //Checking role is correct or not , means koi student glti se recruiter ko select kr k agar login krta h and vice versa
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesnot exists with current role",
                success: false
            })
        }

        //Gernerating jwt Token
        const tokenData = {
            userID: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        }
        if (token) {
            res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
                message: `Welcome back ${user.name}`,
                user,
                success: true
            })
        }
    }
    catch (error) {
        res.send(error)
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0, httpOnly: true, sameSite: 'strict' }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        res.send(error);
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { name, email, phone, bio, skills } = req.body;
        const file = req.file; // If you're handling files, but not in this snippet
        //Cloudinary
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content , {
            resource_type: "raw",
            format: "pdf",
            type: "upload"
        })

        const userID = req.id; // Comes from middleware authentication
        let user = await User.findById(userID);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false // This should be false if the user is not found
            });
        }

        // The purpose of these ifs is that the user can update one key or all
        if (name) user.name = name;
        if (email) user.email = email;
        if (phone) user.phone = phone;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skills.split(","); // Convert skills to array

        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url //save the cloudinary url
            // user.profile.resume = file.originalname //save the orignal file name
        }

        await user.save();

        // Return the updated user details
        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                profile: user.profile
            },
            success: true
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
