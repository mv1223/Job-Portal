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
        <div className='bg-black min-h-screen'>
            <Navbar />
            <div className='noise-bg' />
            <div className='max-w-7xl mx-auto pt-32 px-6'>
                <motion.div 
                    initial={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className='flex flex-col lg:flex-row gap-16 relative z-10'
                >
                    <div className='w-full lg:w-1/4'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? (
                            <div className='flex-1 flex flex-col items-center justify-center py-32 bg-zinc-900/30 rounded-[3rem] border border-dashed border-white/5'>
                                <h2 className='text-2xl font-bold text-white/20 tracking-tighter'>No resonance found in the neural net.</h2>
                                <p className='text-white/10 font-medium'>Adjust your search parameters.</p>
                            </div>
                        ) : (
                            <div className='flex-1 h-[80vh] overflow-y-auto pb-20 custom-scrollbar pr-4'>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                                    {
                                        filterJobs.map((job, idx) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                                transition={{ 
                                                    duration: 1, 
                                                    delay: idx * 0.05,
                                                    ease: [0.16, 1, 0.3, 1]
                                                }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </motion.div>
            </div>
            <Footer />
        </div>
    )
}

export default Jobs