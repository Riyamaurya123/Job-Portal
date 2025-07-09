import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "job id is required",
      });
    }
    //check if the user has already apply for job
    const existingdApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingdApplication) {
      return res.status(400).json({
        message: "You have already apply for this job",
        success: false,
      });
    }

    //check for job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    //create anew application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "job Applied successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAppliedJob = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID missing",
      });
    }

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    // Check if the user has applied for any jobs
    if (applications.length === 0) {
      return res.status(404).json({
        message: "No applications found",
        success: false,
      });
    }

    // Return successful response
    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("Error in getAppliedJob:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//admin see the applicats are applied on thier job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "job not found.",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res.status(404).json({
        message: "status is required.",
        success: false,
      });
    }
    //find the application by application id
    const application = await Application.findOne({ _id: applicationId });
    if (!application) {
      return res.status(404).json({
        message: "application not found.",
        success: false,
      });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
