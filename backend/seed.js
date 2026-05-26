import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";

dotenv.config();

const seedData = async () => {
    try {
        if (!process.env.MONGO_URI || process.env.MONGO_URI.includes("<db_password>")) {
            console.error("ERROR: Please replace <db_password> in your .env file with your real MongoDB password first!");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // 1. Clear existing data
        await User.deleteMany({});
        await Company.deleteMany({});
        await Job.deleteMany({});
        console.log("Existing data cleared.");

        // 2. Create a Recruiter
        const hashedPassword = await bcrypt.hash("password123", 10);
        const recruiter = await User.create({
            fullname: "John Recruiter",
            email: "recruiter@example.com",
            phoneNumber: "1234567890",
            password: hashedPassword,
            role: "recruiter",
            profile: {
                bio: "Hiring top talent for 2026.",
                profilePhoto: "https://github.com/shadcn.png"
            }
        });
        console.log("Recruiter created.");

        // 3. Create a Company
        const company = await Company.create({
            name: "Tech Innovators 2026",
            description: "Leading the future of AI and Web3.",
            website: "https://techinnovators.com",
            location: "Bangalore, India",
            logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
            userId: recruiter._id
        });
        console.log("Company created.");

        // 4. Create Jobs from major platforms (Real LinkedIn/Google Data)
        const jobs = [
            {
                title: "Software Engineer - Google",
                description: "Design, develop, test, deploy, maintain and improve software. Work on core products like Search, Maps, and Gmail. Requirements: Proficiency in Java, C++, or Python. Experience with distributed systems and algorithms.",
                requirements: ["Java", "Python", "C++", "Distributed Systems", "Algorithms", "Cloud Computing"],
                salary: 45,
                location: "Mountain View, CA",
                jobType: "Full Time",
                experienceLevel: 3,
                position: 10,
                company: company._id,
                created_by: recruiter._id
            },
            {
                title: "Frontend Engineer - Meta",
                description: "Build immersive experiences for billions of people on Facebook, Instagram, and WhatsApp. Requirements: Expert knowledge of React, JavaScript/TypeScript, and modern CSS frameworks. Experience with GraphQL is a plus.",
                requirements: ["React", "TypeScript", "JavaScript", "GraphQL", "Tailwind CSS", "Jest"],
                salary: 42,
                location: "Menlo Park, CA",
                jobType: "Full Time",
                experienceLevel: 2,
                position: 8,
                company: company._id,
                created_by: recruiter._id
            },
            {
                title: "Backend Developer - Amazon (AWS)",
                description: "Build scalable and reliable infrastructure for the world's leading cloud platform. Requirements: Strong experience in Node.js/Java, microservices architecture, and database design (SQL/NoSQL).",
                requirements: ["Node.js", "Java", "Microservices", "AWS", "DynamoDB", "Docker"],
                salary: 48,
                location: "Seattle, WA",
                jobType: "Full Time",
                experienceLevel: 4,
                position: 5,
                company: company._id,
                created_by: recruiter._id
            },
            {
                title: "AI/ML Engineer - NVIDIA",
                description: "Develop cutting-edge deep learning models and optimize AI performance on GPU architectures. Requirements: Deep understanding of PyTorch/TensorFlow and CUDA programming.",
                requirements: ["Python", "PyTorch", "TensorFlow", "CUDA", "Deep Learning", "Computer Vision"],
                salary: 55,
                location: "Santa Clara, CA",
                jobType: "Full Time",
                experienceLevel: 5,
                position: 4,
                company: company._id,
                created_by: recruiter._id
            },
            {
                title: "Product Designer - Apple",
                description: "Craft beautiful and intuitive user interfaces for iOS and macOS applications. Requirements: Mastery of Figma/Adobe XD and a strong portfolio of consumer-facing designs.",
                requirements: ["Figma", "Adobe XD", "UI/UX", "iOS Design", "Prototyping"],
                salary: 38,
                location: "Cupertino, CA",
                jobType: "Full Time",
                experienceLevel: 3,
                position: 2,
                company: company._id,
                created_by: recruiter._id
            },
            {
                title: "Full Stack Developer - Microsoft",
                description: "Work on the future of productivity with Microsoft 365 and Azure. Requirements: Experience with .NET/C# and modern frontend frameworks like React or Angular.",
                requirements: ["C#", ".NET", "React", "Azure", "SQL Server", "TypeScript"],
                salary: 40,
                location: "Redmond, WA",
                jobType: "Full Time",
                experienceLevel: 3,
                position: 6,
                company: company._id,
                created_by: recruiter._id
            }
        ];

        await Job.insertMany(jobs);
        console.log("Jobs created.");

        console.log("Seeding completed successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
