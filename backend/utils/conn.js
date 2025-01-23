import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DATABASE CONNECTION SUCCESSFULL")
    } catch (error) {
        console.log(error)
    }
}

export default dbConnection;