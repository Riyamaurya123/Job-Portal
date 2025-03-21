import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import userRoutes from './routes/user.route.js'
import companyRoutes from './routes/companu.route.js'
import jobRoutes from './routes/job.route.js'
import applicationRoutes from './routes/application.route.js'
dotenv.config({})

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption = {
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOption))


const PORT =process.env.PORT || 3100

app.get('/', (req, res) => {
    res.send("Hello, this is a GET request!");
});


app.use('/api/user',userRoutes)
app.use('/api/company', companyRoutes)
app.use('/api/job', jobRoutes)
app.use('/api/application',applicationRoutes)

app.listen(PORT,()=>{
    connectDB()
    console.log(`server running on port ${PORT}`)
})