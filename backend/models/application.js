import mongoose from 'mongoose'

const applicationSchema = new mongoose.Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'job',
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    status:{
        type:String,
        enum:['pending' , 'accepted' , 'rejected'],
        default:'pending'
    }
} , {timestamps:true})

export const Application = new mongoose.model('application' , applicationSchema)