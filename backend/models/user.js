import mongoose from 'mongoose'
// const validator = require('validator');
// import validator from 'validator'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter']
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        company: { //This approach is used to create a relationship between two different documents or collections. SEARCH WHILE MAKING ANOTHER PROJECT
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        }, 
        profilePic: {
            type: String,
            default: ""
        }
    }
}, { timestamps: true })

export const User = mongoose.model('user', userSchema)


/*When you include { timestamps: true } in your schema definition, Mongoose automatically adds two fields to each document:

createdAt: Records the date and time when the document was first created.
updatedAt: Records the date and time when the document was last updated. */