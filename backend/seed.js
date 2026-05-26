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
            fullname: "Global Talent Partner",
            email: "recruiter@example.com",
            phoneNumber: "1234567890",
            password: hashedPassword,
            role: "recruiter",
            profile: {
                bio: "Connecting global talent with Fortune 500 companies and high-growth startups.",
                profilePhoto: "https://github.com/shadcn.png"
            }
        });
        console.log("Recruiter created.");

        // 3. Create Diverse Companies
        const companiesData = [
            { name: "Google", description: "Search, Cloud, AI", location: "Mountain View / Bangalore", website: "https://google.com", logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg", userId: recruiter._id },
            { name: "Meta", description: "Social Media, Metaverse", location: "Menlo Park / Hyderabad", website: "https://meta.com", logo: "https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg", userId: recruiter._id },
            { name: "Amazon", description: "E-commerce, AWS", location: "Seattle / Bangalore", website: "https://amazon.com", logo: "https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg", userId: recruiter._id },
            { name: "Microsoft", description: "Software, Azure", location: "Redmond / Hyderabad", website: "https://microsoft.com", logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg", userId: recruiter._id },
            { name: "NVIDIA", description: "GPUs, AI Computing", location: "Santa Clara / Pune", website: "https://nvidia.com", logo: "https://www.vectorlogo.zone/logos/nvidia/nvidia-icon.svg", userId: recruiter._id },
            { name: "Netflix", description: "Streaming, Content", location: "Los Gatos / Remote", website: "https://netflix.com", logo: "https://www.vectorlogo.zone/logos/netflix/netflix-icon.svg", userId: recruiter._id },
            { name: "Apple", description: "Hardware, Software", location: "Cupertino / Bangalore", website: "https://apple.com", logo: "https://www.vectorlogo.zone/logos/apple/apple-icon.svg", userId: recruiter._id },
            { name: "Uber", description: "Mobility, Delivery", location: "San Francisco / Bangalore", website: "https://uber.com", logo: "https://www.vectorlogo.zone/logos/uber/uber-icon.svg", userId: recruiter._id },
            { name: "TCS", description: "IT Services", location: "Mumbai / Chennai", website: "https://tcs.com", logo: "https://www.vectorlogo.zone/logos/tata/tata-icon.svg", userId: recruiter._id },
            { name: "Infosys", description: "Global Consulting & IT", location: "Bangalore / Mysore", website: "https://infosys.com", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg", userId: recruiter._id },
            { name: "Swiggy", description: "Food Delivery & Instamart", location: "Bangalore / Remote", website: "https://swiggy.com", logo: "https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg", userId: recruiter._id },
            { name: "Zomato", description: "Restaurant Discovery", location: "Gurgaon", website: "https://zomato.com", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg", userId: recruiter._id }
        ];

        const createdCompanies = await Company.insertMany(companiesData);
        const companyMap = {};
        createdCompanies.forEach(c => companyMap[c.name] = c._id);

        // 4. Massive Job List (80+ Jobs including Internships, Freelance, Contract)
        const jobs = [];

        // --- REALISTIC INTERNSHIPS ---
        const internships = [
            { title: "Software Engineering Intern", company: "Google", location: "Bangalore", salary: 8, requirements: ["Data Structures", "Algorithms", "C++", "Java"], description: "Join Google for a 12-week summer internship. Work on real-world projects that impact billions of users." },
            { title: "Frontend Developer Intern", company: "Meta", location: "Remote", salary: 7, requirements: ["React", "JavaScript", "HTML/CSS"], description: "Help build the future of social connection. Work with our React teams on Instagram and Facebook features." },
            { title: "Data Science Intern", company: "Amazon", location: "Hyderabad", salary: 6, requirements: ["Python", "SQL", "Statistics", "Machine Learning"], description: "Apply ML models to optimize supply chain and delivery networks at Amazon scale." },
            { title: "UI/UX Design Intern", company: "Apple", location: "Bangalore", salary: 9, requirements: ["Figma", "Sketch", "Prototyping", "Design Thinking"], description: "Design beautiful and intuitive interfaces for next-gen iOS and macOS applications." },
            { title: "Cybersecurity Intern", company: "Microsoft", location: "Hyderabad", salary: 5, requirements: ["Networking", "Security Fundamentals", "Python"], description: "Learn how to defend global infrastructure from advanced cyber threats at Microsoft." },
            { title: "Product Management Intern", company: "Uber", location: "Bangalore", salary: 10, requirements: ["Analytical Thinking", "Communication", "Problem Solving"], description: "Shadow PMs and help define the roadmap for mobility features used by millions." },
            { title: "Marketing Intern", company: "Swiggy", location: "Bangalore", salary: 4, requirements: ["Social Media", "Content Writing", "Market Research"], description: "Execute creative marketing campaigns for Swiggy's food and grocery delivery services." },
            { title: "HR Intern", company: "Zomato", location: "Gurgaon", salary: 3, requirements: ["People Skills", "Recruitment", "Excel"], description: "Support our talent acquisition team in hiring top candidates for Zomato's engineering teams." }
        ];

        internships.forEach(i => {
            jobs.push({
                ...i,
                jobType: "Internship",
                experienceLevel: 0,
                position: 10,
                company: companyMap[i.company],
                created_by: recruiter._id
            });
        });

        // --- REALISTIC FREELANCE / CONTRACT ---
        const freelanceJobs = [
            { title: "Freelance React Developer", company: "Netflix", location: "Remote", salary: 25, requirements: ["React", "Redux", "Tailwind CSS"], description: "Short-term project to build a custom internal dashboard for content analytics." },
            { title: "Contract Backend Engineer", company: "Uber", location: "Remote", salary: 30, requirements: ["Node.js", "Go", "Distributed Systems"], description: "6-month contract to help scale our real-time tracking microservices." },
            { title: "Freelance Technical Writer", company: "Google", location: "Remote", salary: 15, requirements: ["Technical Documentation", "API Docs", "Developer Advocacy"], description: "Create high-quality documentation for Google Cloud's new developer tools." },
            { title: "Contract Mobile Developer", company: "Meta", location: "Remote", salary: 35, requirements: ["React Native", "Swift", "Kotlin"], description: "Help our team migrate legacy components to modern React Native architecture." },
            { title: "Freelance Graphic Designer", company: "Apple", location: "Remote", salary: 20, requirements: ["Photoshop", "Illustrator", "Brand Identity"], description: "Design promotional materials for our upcoming retail store launches." }
        ];

        freelanceJobs.forEach(f => {
            jobs.push({
                ...f,
                jobType: "Freelance",
                experienceLevel: 2,
                position: 2,
                company: companyMap[f.company],
                created_by: recruiter._id
            });
        });

        // --- REALISTIC FULL-TIME ROLES ---
        const fullTimeRoles = [
            { title: "Staff Software Engineer", company: "Google", location: "Mountain View", salary: 120, requirements: ["Distributed Systems", "L6+ Level", "System Design"], description: "Lead architectural decisions for Google Search infrastructure." },
            { title: "Senior Data Scientist", company: "Meta", location: "Menlo Park", salary: 95, requirements: ["PyTorch", "Big Data", "PhD in CS/Stats"], description: "Develop advanced ranking algorithms for Facebook News Feed." },
            { title: "Cloud Architect", company: "Amazon", location: "Seattle", salary: 110, requirements: ["AWS", "Infrastructure as Code", "Terraform"], description: "Design multi-region cloud architectures for Fortune 500 AWS customers." },
            { title: "Senior Security Engineer", company: "Microsoft", location: "Redmond", salary: 90, requirements: ["Penetration Testing", "Azure Security", "C++"], description: "Secure the core Windows kernel against emerging zero-day vulnerabilities." },
            { title: "AI/ML Specialist", company: "NVIDIA", location: "Santa Clara", salary: 130, requirements: ["CUDA", "Deep Learning", "GPU Optimization"], description: "Optimize LLM training performance on the latest H100 GPU clusters." },
            { title: "Distributed Systems Engineer", company: "Netflix", location: "Los Gatos", salary: 105, requirements: ["Java", "Cassandra", "Microservices"], description: "Build the reliable backend services that power Netflix streaming worldwide." },
            { title: "iOS Frameworks Engineer", company: "Apple", location: "Cupertino", salary: 100, requirements: ["Swift", "Objective-C", "Operating Systems"], description: "Work on the core frameworks that power the iOS user experience." },
            { title: "Full Stack Lead", company: "Swiggy", location: "Bangalore", salary: 45, requirements: ["Node.js", "React", "Scalability"], description: "Lead the team building Swiggy's next-gen delivery partner app." },
            { title: "SDE-2 (Backend)", company: "Zomato", location: "Gurgaon", salary: 40, requirements: ["Go", "Redis", "MySQL"], description: "Scale Zomato's order processing engine to handle 1M+ orders per hour." },
            { title: "Technical Consultant", company: "Infosys", location: "London", salary: 55, requirements: ["Client Management", "ERP", "Cloud Strategy"], description: "Help European banking clients migrate their legacy systems to the cloud." },
            { title: "Enterprise Architect", company: "TCS", location: "New York", salary: 85, requirements: ["Java EE", "Solution Architecture", "Agile"], description: "Design large-scale enterprise solutions for global insurance providers." }
        ];

        fullTimeRoles.forEach(ft => {
            jobs.push({
                ...ft,
                jobType: "Full Time",
                experienceLevel: 4,
                position: 5,
                company: companyMap[ft.company],
                created_by: recruiter._id
            });
        });

        // --- NEW TYPES: TEMPORARY & VOLUNTEER ---
        const otherRoles = [
            { title: "Temporary IT Support", company: "Infosys", location: "Bangalore", salary: 12, requirements: ["Hardware", "Windows", "Networking"], description: "3-month temporary role to assist with hardware upgrades across the campus." },
            { title: "Volunteer Open Source Contributor", company: "Meta", location: "Remote", salary: 0, requirements: ["Git", "React", "Open Source"], description: "Volunteer role to help maintain our core open-source libraries like PyTorch and React." }
        ];

        otherRoles.forEach(o => {
            jobs.push({
                ...o,
                jobType: o.title.includes("Temporary") ? "Temporary" : "Volunteer",
                experienceLevel: 1,
                position: 5,
                company: companyMap[o.company],
                created_by: recruiter._id
            });
        });

        // --- ADDING VARIETY (60 more jobs) ---
        const genericTitles = ["QA Automation Engineer", "DevOps Specialist", "System Administrator", "Data Analyst", "Blockchain Developer", "SRE Engineer", "Security Analyst", "Marketing Manager", "HR Specialist", "Business Analyst"];
        const genericLocations = ["Delhi NCR", "Pune", "Mumbai", "Remote", "Bangalore", "Hyderabad", "Chennai", "Gurgaon", "Noida", "Kolkata"];
        const genericJobTypes = ["Full Time", "Internship", "Part Time", "Freelance", "Contract", "Temporary", "Volunteer"];
        
        for (let i = 0; i < 60; i++) {
            const randomTitle = genericTitles[Math.floor(Math.random() * genericTitles.length)];
            const randomLocation = genericLocations[Math.floor(Math.random() * genericLocations.length)];
            const randomJobType = genericJobTypes[Math.floor(Math.random() * genericJobTypes.length)];
            const randomCompany = createdCompanies[Math.floor(Math.random() * createdCompanies.length)];

            jobs.push({
                title: `${randomTitle} - ${randomCompany.name}`,
                description: `Dynamic and challenging role at ${randomCompany.name}. Join our fast-paced team and help us build the future of ${randomCompany.description}.`,
                requirements: ["Problem Solving", "Team Collaboration", "Growth Mindset", "Strong Communication"],
                salary: Math.floor(Math.random() * 50) + 5,
                location: randomLocation,
                jobType: randomJobType,
                experienceLevel: Math.floor(Math.random() * 6),
                position: Math.floor(Math.random() * 15) + 1,
                company: randomCompany._id,
                created_by: recruiter._id
            });
        }

        await Job.insertMany(jobs);
        console.log(`Successfully seeded ${jobs.length} realistic jobs.`);

        console.log("Seeding completed successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
