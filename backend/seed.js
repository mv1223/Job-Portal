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
                bio: "Connecting global talent with Fortune 500 companies.",
                profilePhoto: "https://github.com/shadcn.png"
            }
        });
        console.log("Recruiter created.");

        // 3. Create Diverse Companies (LinkedIn/Naukri references)
        const companiesData = [
            { name: "Google", description: "Search, Cloud, AI", location: "Mountain View / Bangalore", website: "https://google.com", logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg", userId: recruiter._id },
            { name: "Meta", description: "Social Media, Metaverse", location: "Menlo Park / Hyderabad", website: "https://meta.com", logo: "https://www.vectorlogo.zone/logos/facebook/facebook-icon.svg", userId: recruiter._id },
            { name: "Amazon", description: "E-commerce, AWS", location: "Seattle / Bangalore", website: "https://amazon.com", logo: "https://www.vectorlogo.zone/logos/amazon/amazon-icon.svg", userId: recruiter._id },
            { name: "Microsoft", description: "Software, Azure", location: "Redmond / Hyderabad", website: "https://microsoft.com", logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg", userId: recruiter._id },
            { name: "NVIDIA", description: "GPUs, AI Computing", location: "Santa Clara / Pune", website: "https://nvidia.com", logo: "https://www.vectorlogo.zone/logos/nvidia/nvidia-icon.svg", userId: recruiter._id },
            { name: "TCS", description: "IT Services", location: "Mumbai / Chennai", website: "https://tcs.com", logo: "https://www.vectorlogo.zone/logos/tata/tata-icon.svg", userId: recruiter._id },
            { name: "Infosys", description: "Global Consulting & IT", location: "Bangalore / Mysore", website: "https://infosys.com", logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg", userId: recruiter._id },
            { name: "Swiggy", description: "Food Delivery & Instamart", location: "Bangalore / Remote", website: "https://swiggy.com", logo: "https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg", userId: recruiter._id },
            { name: "Zomato", description: "Restaurant Discovery", location: "Gurgaon", website: "https://zomato.com", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Zomato_Logo.svg", userId: recruiter._id }
        ];

        const createdCompanies = await Company.insertMany(companiesData);
        const companyMap = {};
        createdCompanies.forEach(c => companyMap[c.name] = c._id);

        // 4. Massive Job List (50+ Jobs including Internships)
        const jobs = [];

        // Google Jobs
        jobs.push(
            { title: "Software Engineer - Google Cloud", description: "Build scalable cloud infra.", requirements: ["Java", "Go", "Cloud"], salary: 45, location: "Bangalore", jobType: "Full Time", experienceLevel: 3, position: 10, company: companyMap["Google"], created_by: recruiter._id },
            { title: "SDE Intern (Summer 2026)", description: "University student internship.", requirements: ["DS", "Algorithms", "C++"], salary: 8, location: "Bangalore", jobType: "Internship", experienceLevel: 0, position: 20, company: companyMap["Google"], created_by: recruiter._id }
        );

        // Meta Jobs
        jobs.push(
            { title: "Product Designer - Instagram", description: "Design mobile experiences.", requirements: ["Figma", "UI", "UX"], salary: 38, location: "Remote", jobType: "Full Time", experienceLevel: 2, position: 5, company: companyMap["Meta"], created_by: recruiter._id },
            { title: "Research Intern - AI", description: "LLM research.", requirements: ["PyTorch", "NLP"], salary: 10, location: "Hyderabad", jobType: "Internship", experienceLevel: 0, position: 8, company: companyMap["Meta"], created_by: recruiter._id }
        );

        // Amazon Jobs
        jobs.push(
            { title: "Cloud Architect - AWS", description: "Architect cloud solutions.", requirements: ["AWS", "Terraform"], salary: 50, location: "Seattle", jobType: "Full Time", experienceLevel: 5, position: 3, company: companyMap["Amazon"], created_by: recruiter._id },
            { title: "Applied Scientist Intern", description: "Machine learning internship.", requirements: ["ML", "Python"], salary: 9, location: "Bangalore", jobType: "Internship", experienceLevel: 0, position: 12, company: companyMap["Amazon"], created_by: recruiter._id }
        );

        // Microsoft Jobs
        jobs.push(
            { title: "Backend Engineer - Azure", description: "Distributed systems.", requirements: ["C#", ".NET"], salary: 42, location: "Hyderabad", jobType: "Full Time", experienceLevel: 3, position: 6, company: companyMap["Microsoft"], created_by: recruiter._id },
            { title: "Cybersecurity Intern", description: "Security analysis.", requirements: ["Security", "Networking"], salary: 6, location: "Hyderabad", jobType: "Internship", experienceLevel: 0, position: 4, company: companyMap["Microsoft"], created_by: recruiter._id }
        );

        // TCS/Infosys (Indian Market Focus)
        jobs.push(
            { title: "Java Developer - TCS", description: "Enterprise app development.", requirements: ["Java", "Spring Boot"], salary: 12, location: "Mumbai", jobType: "Full Time", experienceLevel: 2, position: 15, company: companyMap["TCS"], created_by: recruiter._id },
            { title: "React Developer - Infosys", description: "Modern web apps.", requirements: ["React", "JS"], salary: 10, location: "Chennai", jobType: "Full Time", experienceLevel: 1, position: 10, company: companyMap["Infosys"], created_by: recruiter._id },
            { title: "Intern - Digital Services", description: "Learning tech basics.", requirements: ["Logic", "Communication"], salary: 3, location: "Mysore", jobType: "Internship", experienceLevel: 0, position: 30, company: companyMap["Infosys"], created_by: recruiter._id }
        );

        // Startups (Swiggy/Zomato)
        jobs.push(
            { title: "FullStack Developer - Swiggy", description: "Food tech scaling.", requirements: ["Node.js", "React"], salary: 35, location: "Bangalore", jobType: "Full Time", experienceLevel: 3, position: 5, company: companyMap["Swiggy"], created_by: recruiter._id },
            { title: "Mobile Developer - Zomato", description: "Consumer app features.", requirements: ["Flutter", "Dart"], salary: 30, location: "Gurgaon", jobType: "Full Time", experienceLevel: 2, position: 4, company: companyMap["Zomato"], created_by: recruiter._id },
            { title: "Operations Intern - Zomato", description: "Supply chain support.", requirements: ["Excel", "Communication"], salary: 2, location: "Gurgaon", jobType: "Internship", experienceLevel: 0, position: 15, company: companyMap["Zomato"], created_by: recruiter._id }
        );

        // Remote/Contract Roles
        jobs.push(
            { title: "DevOps Engineer", description: "CI/CD automation.", requirements: ["Docker", "K8s"], salary: 40, location: "Remote", jobType: "Contract", experienceLevel: 4, position: 2, company: companyMap["NVIDIA"], created_by: recruiter._id },
            { title: "Data Analyst", description: "Business insights.", requirements: ["SQL", "Tableau"], salary: 15, location: "Remote", jobType: "Part Time", experienceLevel: 2, position: 3, company: companyMap["Google"], created_by: recruiter._id }
        );

        // Add 20 more generic jobs for scale
        const titles = ["QA Engineer", "Project Manager", "HR Specialist", "Marketing Intern", "System Admin", "Sales Lead", "UX Researcher", "Support Engineer"];
        const locations = ["Delhi NCR", "Pune", "Mumbai", "Remote", "Bangalore"];
        const jobTypes = ["Full Time", "Internship", "Part Time"];
        
        for (let i = 0; i < 20; i++) {
            const randomTitle = titles[Math.floor(Math.random() * titles.length)];
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            const randomJobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
            const randomCompany = createdCompanies[Math.floor(Math.random() * createdCompanies.length)];

            jobs.push({
                title: `${randomTitle} - ${randomCompany.name}`,
                description: `Dynamic role at ${randomCompany.name}. Apply now to join our global team.`,
                requirements: ["Teamwork", "Problem Solving", "Growth Mindset"],
                salary: Math.floor(Math.random() * 40) + 5,
                location: randomLocation,
                jobType: randomJobType,
                experienceLevel: Math.floor(Math.random() * 5),
                position: Math.floor(Math.random() * 10) + 1,
                company: randomCompany._id,
                created_by: recruiter._id
            });
        }

        await Job.insertMany(jobs);
        console.log(`Successfully seeded ${jobs.length} jobs.`);

        console.log("Seeding completed successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
