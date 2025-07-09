import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudunary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, PhoneNumber, password, role } = req.body;
    if (!fullname || !email || !PhoneNumber || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Somthing is missing",
      });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Somthing is missing",
      });
    }
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist with this email.",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      PhoneNumber,
      password: hashPassword,
      role,
      profile: {
        ProfilePhoto: cloudResponse.secure_url,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//login

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Somthing is missing",
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }
    //check role is correct or not

    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "Account doesn't with exist with current role",
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      PhoneNumber: user.PhoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};

//logout

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logout successFully",
    });
  } catch (error) {
    console.log(error);
  }
};

//update profile

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, PhoneNumber, bio, skills } = req.body;
    const file = req.file;
    //cloudinary
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; //middleware Authentication
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    //updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (PhoneNumber) user.PhoneNumber = PhoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    //resume
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; //save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; //save original file
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      PhoneNumber: user.PhoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
