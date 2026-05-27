import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'
import HeroSection from './HeroSection'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.jobType.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.salary.toString().includes(searchedQuery.toLowerCase())
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='bg-[#0a0a0a] min-h-screen'>
            <Navbar />
            <div className='noise-bg' />
            
            <HeroSection />

            <div className='border-y border-[#111] py-8 px-6'>
                <div className='max-w-7xl mx-auto'>
                    <p className='text-[11px] text-[#333] uppercase tracking-[0.8px] mb-6 text-center font-bold'>Trusted by teams at</p>
                    <div className='flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700'>
                        {["Google", "Stripe", "Airbnb", "Notion", "Figma", "Linear", "Vercel", "Shopify"].map((co) => (
                            <span key={co} className='text-lg font-bold text-white tracking-tighter cursor-pointer'>{co}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className='border-b border-[#111] py-4 px-6 overflow-x-auto whitespace-nowrap scrollbar-hide'>
                <div className='max-w-7xl mx-auto flex items-center gap-2'>
                    <span className='text-[12px] text-[#444] mr-2 font-medium'>Explore:</span>
                    {["All Jobs", "Engineering", "Design", "Product", "Marketing", "Data & AI", "Finance", "Operations", "Remote Only", "Internships"].map((tag, idx) => (
                        <button 
                            key={tag} 
                            className={`px-4 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                                idx === 0 ? 'bg-primary text-white' : 'bg-[#111] border border-[#1e1e1e] text-[#777] hover:border-primary hover:text-white'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            <div className='max-w-7xl mx-auto pt-20 px-6 pb-20 relative z-10'>
                <div className='flex flex-col lg:grid lg:grid-cols-[260px_1fr] gap-12'>
                    <aside className='sidebar'>
                        <FilterCard />
                    </aside>
                    
                    <main className='jobs-column'>
                        <div className='jobs-header flex items-center justify-between mb-8'>
                            <div>
                                <h2 className='text-[15px] font-bold text-white'>{filterJobs.length} open positions</h2>
                                <p className='text-[12px] text-[#555] mt-1'>Showing results for India · Remote</p>
                            </div>
                            <select className='bg-[#111] border border-[#1e1e1e] text-[#888] px-3 py-1.5 rounded-md text-[12px] outline-none cursor-pointer font-sans'>
                                <option>Most Relevant</option>
                                <option>Newest First</option>
                                <option>Salary: High to Low</option>
                                <option>Best Match</option>
                            </select>
                        </div>

                        {
                            filterJobs.length <= 0 ? (
                                <div className='flex flex-col items-center justify-center py-32 bg-[#0e0e0e] rounded-xl border border-dashed border-[#181818]'>
                                    <h2 className='text-xl font-bold text-[#444] tracking-tight'>No positions found</h2>
                                    <p className='text-[#333] text-sm mt-2'>Adjust your filters to see more results.</p>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-3'>
                                    {
                                        filterJobs.map((job, idx) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ 
                                                    duration: 0.5, 
                                                    delay: idx * 0.05,
                                                    ease: "easeOut"
                                                }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                    
                                    <div className='flex items-center justify-center gap-2 mt-12'>
                                        <button className='px-4 py-2 bg-[#111] border border-[#1e1e1e] rounded-lg text-[12px] text-[#666] hover:bg-primary hover:text-white transition-all'>← Prev</button>
                                        <button className='w-9 h-9 flex items-center justify-center bg-primary text-white rounded-lg text-[12px] font-bold'>1</button>
                                        <button className='w-9 h-9 flex items-center justify-center bg-[#111] border border-[#1e1e1e] text-[#666] rounded-lg text-[12px] hover:border-primary hover:text-white transition-all'>2</button>
                                        <button className='w-9 h-9 flex items-center justify-center bg-[#111] border border-[#1e1e1e] text-[#666] rounded-lg text-[12px] hover:border-primary hover:text-white transition-all'>3</button>
                                        <span className='text-[#333] text-[12px] px-1'>...</span>
                                        <button className='w-9 h-9 flex items-center justify-center bg-[#111] border border-[#1e1e1e] text-[#666] rounded-lg text-[12px] hover:border-primary hover:text-white transition-all'>42</button>
                                        <button className='px-4 py-2 bg-[#111] border border-[#1e1e1e] rounded-lg text-[12px] text-[#666] hover:bg-primary hover:text-white transition-all'>Next →</button>
                                    </div>
                                </div>
                            )
                        }
                    </main>
                </div>
            </div>

            <div className='scroll-section px-6 mb-20'>
                <div className='max-w-7xl mx-auto bg-[#0e0e0e] border border-[#1a1a1a] rounded-2xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10'>
                    <div className='max-w-xl'>
                        <h2 className='text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight'>Are you hiring? Post your role for free.</h2>
                        <p className='text-[#666] text-lg leading-relaxed'>Reach 2M+ active candidates. Your first job post is completely free — no credit card needed.</p>
                    </div>
                    <div className='flex items-center gap-4 shrink-0'>
                        <button className='bg-white text-black px-8 py-3 rounded-lg font-bold text-[14px] hover:bg-[#e5e5e5] transition-all'>Post a Job Free</button>
                        <button className='bg-transparent border border-[#2a2a2a] text-[#ccc] px-8 py-3 rounded-lg font-bold text-[14px] hover:border-[#555] hover:text-white transition-all'>See Pricing Plans</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Jobs