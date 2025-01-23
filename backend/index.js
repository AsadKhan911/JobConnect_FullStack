import express from 'express'
const app = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config()
const port = process.env.PORT || 3000

import dbConnection from './utils/conn.js' 
import userRoute from './routes/user.route.js' 
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/jobs.route.js'
import applicationRoute from './routes/application.route.js'

//Middleware
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//Path
const _dirname = path.resolve()

const corsOptions = {
    origin:'https://jobconnect-fullstack.onrender.com',
    credentials:true
}
app.use(cors(corsOptions))

app.use('/api/v1/user' , userRoute)
app.use('/api/v1/company' , companyRoute)
app.use('/api/v1/jobs' , jobRoute)
app.use('/api/v1/application' , applicationRoute)

app.use(express.static(path.join(_dirname , "/frontend/dist")))
app.get('*' , (_ , res) => {
    res.sendFile(path.resolve(_dirname , "frontend" , "dist" , "index.html"))
})

app.listen(port , ()=>{
    console.log(`listening server at port ${port}`)
    dbConnection()
})