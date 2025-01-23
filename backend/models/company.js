import mongoose from 'mongoose'

const companySchema = mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    website:{
        type:String,
    },
    location:{
        type:String
    },
    logo:{
        type:String //URL to company logo
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
} , {timestamps:true})

export const Company = mongoose.model('company' , companySchema)