import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    requirements:[{ //Array because it will be an array of skills
        type: String
    }],
    salary: {
        type:String,
        required:true
    },
    location: {
        type:String,
        required:true
    },
    jobType: {
        type:String,
        required:true
    },
    experience:{
        type:String
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'company', //reference from company schema
        required:true
    },
    created_by: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user' //refrence from user schema
    },
    application: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"application" //Reference from applications schema
    }]
} , {timestamps:true})

export const Job = mongoose.model('job' , jobSchema)