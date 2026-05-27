import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'
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
            <div className='max-w-7xl mx-auto pt-32 px-6 pb-20 relative z-10'>
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
                            <select className='bg-[#111] border border-[#1e1e1e] text-[#888] px-3 py-1.5 rounded-md text-[12px] outline-none cursor-pointer'>
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
                                </div>
                            )
                        }
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Jobs