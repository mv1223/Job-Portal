import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
         
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        const file = req.file;
        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email.',
                success: false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: cloudResponse ? cloudResponse.secure_url : "",
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { 
            maxAge: 1 * 24 * 60 * 60 * 1000, 
            httpOnly: true, 
            sameSite: 'none', 
            secure: true 
        }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { 
            maxAge: 0,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        }).json({
            message: "Logged out successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const file = req.file;
        // cloudinary ayega idhar
        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray

        // resume comes later here...
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }


        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const analyzeResume = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // If a file is uploaded, we'd normally parse it here.
        // For now, we simulate analysis based on the uploaded file name and user profile.
        const file = req.file;
        const fileName = file ? file.originalname : "current_resume.pdf";

        const userSkills = user.profile.skills || [];
        
        // Mock ATS Analysis logic based on resume and profile
        const commonATSKeywords = ["Project Management", "Agile", "Teamwork", "Communication", "Problem Solving", "Leadership", "React", "Node.js", "JavaScript", "Python", "SQL", "Cloud", "Git"];
        const foundKeywords = commonATSKeywords.filter(kw => 
            user.profile.bio?.toLowerCase().includes(kw.toLowerCase()) || 
            user.profile.skills?.some(skill => skill.toLowerCase().includes(kw.toLowerCase()))
        );
        
        const score = Math.min(100, (userSkills.length * 5) + (foundKeywords.length * 5) + 50);
        
        let feedback = "";
        if (score < 60) feedback = "Your resume is missing critical industry keywords. Focus on adding technical skills relevant to your target roles.";
        else if (score < 85) feedback = "Solid resume! To reach 90%+, quantify your achievements with metrics and add more specialized certifications.";
        else feedback = "Outstanding! Your resume is in the top 5% of applicants for your field. It is highly optimized for modern ATS systems.";

        return res.status(200).json({
            success: true,
            score,
            feedback,
            keywordsMatched: foundKeywords,
            fileName: fileName
        });
    } catch (error) {
            feedback,
            skillsAnalyzed: userSkills.length,
            keywordsMatched: foundKeywords
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export const getJobMatches = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const userSkills = user.profile.skills.map(s => s.toLowerCase());
        const allJobs = await Job.find().populate('company');

        const matchedJobs = allJobs.map(job => {
            const jobRequirements = job.requirements.map(r => r.toLowerCase());
            const commonSkills = userSkills.filter(skill => jobRequirements.includes(skill));
            const matchPercentage = Math.round((commonSkills.length / Math.max(1, jobRequirements.length)) * 100);
            
            return {
                ...job._doc,
                matchPercentage
            };
        }).filter(job => job.matchPercentage > 20) // Only show jobs with some match
          .sort((a, b) => b.matchPercentage - a.matchPercentage);

        return res.status(200).json({
            success: true,
            matchedJobs
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}