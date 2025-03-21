import { Company } from "../models/company.model.js"
import getDataUri from "../utils/dataUri.js"
import cloudinary from "../utils/cloudunary.js"


// register company

export const registerCompany = async (req,res)=>{
    try {
        const {companyName} = req.body
        if(!companyName){
            return res.status(400).json({
                success:false,
                message:"Company name is required"
            })
        }
        let company = await Company.findOne({name:companyName})
        if(company){
            return res.status(404).json({
                success:false,
                message:"you can't register same company"
            })
        }
        company = await Company.create({
            name:companyName,
            userId:req.id
        })
        return res.status(201).json({
            success:true,
            company,
            message:"Company registerd successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

//get all Company

export const getCompany = async (req,res)=>{
    try {
        const userId = req.id
        const companies = await Company.find({userId})
        if(!companies){
            return res.status(404).json({
                success:false,
                message:"Companies not found"
            })
        }
        return res.status(200).json({
            success:true,
            companies
        })
    } catch (error) {
        console.log(error)
    }

}

//get Company by Id

export const getCompanyById = async(req, res)=>{
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company not found"
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}

//update Company

export const updateCompany = async(req,res)=>{
    try {
        const {name, description, website, location} = req.body
        const file = req.file
        //cloudinary
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const logo = cloudResponse.secure_url


        const updateData =  {name,description, website, location,logo}

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true})

        if(!company){
            return res.status(404).json({
                success:false,
                message:"Company not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Company information updated."
        })

    } catch (error) {
        console.log(error)
    }
}