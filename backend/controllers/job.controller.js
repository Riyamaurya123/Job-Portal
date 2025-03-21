import { Job } from "../models/job.model.js"

export const postJob = async(req,res)=>{
    try {
        const {title, description, requirements, salary, location, jobType, position, experience, companyId} = req.body
        const userId = req.id
        if(!title || !description || !requirements || !salary || !location || !jobType || !position || !experience || !companyId){
            return res.status(400).json({
                message:"something missing",
                success:false
            })
        }
        const job = await Job.create({
            title, 
            description, 
            requirements: requirements.split(","), 
            salary: Number(salary), 
            location, 
            jobType, 
            position, 
            experienceLevel:experience, 
            company:companyId,
            created_by:userId
        })
        return res.status(201).json({
            message:"new job created successfully",
            success:true,
            job
        })
    } catch (error) {
        console.log(error)
    }
}

//student
export const getAllJob = async(req,res)=>{
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or:[
                {title:{$regex :keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        }

        const job = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1})
        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

//for studend
export const getJobById = async(req,res)=>{
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path:"applications"
        })

        if(!job){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

//how many job created by admin
export const getAdminJob = async(req,res)=>{
    try {
        const adminId = req.id
        const jobs = await Job.find({created_by:adminId}).populate({
            path:'company'
        })
        if(!jobs){
            return res.status(404).json({
                message:"job not found",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}