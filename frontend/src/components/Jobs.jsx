import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import FilterCard from './FilterCard'
import HeroSection from './HeroSection'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return (
                    job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.jobType.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.salary.toString().includes(searchedQuery.toLowerCase())
                )
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className='bg-[#f5f7f4] min-h-screen'>
            <Navbar />

            {/* Hero Section */}
            <div className='bg-gradient-to-r from-[#d8f78d] to-[#c8f169] py-20 rounded-b-[50px] shadow-sm'>
                <div className='max-w-7xl mx-auto px-6 text-center'>
                    <h1 className='text-5xl font-bold text-[#1d1d1d] mb-4'>
                        Search Results ({filterJobs.length})
                    </h1>

                    <p className='text-[#5f5f5f] text-lg'>
                        Find your perfect opportunity from premium companies
                    </p>
                </div>
            </div>

            {/* Category Pills */}
            <div className='py-8 px-6 overflow-x-auto whitespace-nowrap'>
                <div className='max-w-7xl mx-auto flex items-center gap-3'>
                    {[
                        "All Jobs",
                        "Engineering",
                        "Design",
                        "Product",
                        "Marketing",
                        "Data & AI",
                        "Finance",
                        "Remote",
                        "Internships"
                    ].map((tag, idx) => (
                        <button
                            key={tag}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                                idx === 0
                                    ? 'bg-[#b8f34c] text-black'
                                    : 'bg-white border border-[#e5e5e5] text-[#555] hover:bg-[#b8f34c] hover:text-black'
                            }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Section */}
            <div className='max-w-7xl mx-auto px-6 py-16'>
                <div className='grid lg:grid-cols-[280px_1fr] gap-10'>

                    {/* Sidebar */}
                    <aside className='bg-white rounded-[30px] p-6 border border-[#ebebeb] shadow-sm h-fit sticky top-28'>
                        <FilterCard />
                    </aside>

                    {/* Jobs Section */}
                    <main>

                        {/* Header */}
                        <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4'>
                            <div>
                                <h2 className='text-4xl font-bold text-[#1d1d1d]'>
                                    Search Results ({filterJobs.length})
                                </h2>
                                <p className='text-[#666] mt-2'>
                                    Discover premium opportunities for your career
                                </p>
                            </div>

                            <select className='bg-white border border-[#dddddd] rounded-xl px-4 py-3 text-sm text-[#555] outline-none shadow-sm'>
                                <option>Most Relevant</option>
                                <option>Newest First</option>
                                <option>Salary: High to Low</option>
                                <option>Best Match</option>
                            </select>
                        </div>

                        {/* Jobs */}
                        {filterJobs.length <= 0 ? (
                            <div className='bg-white rounded-[30px] border border-dashed border-[#dcdcdc] py-32 text-center shadow-sm'>
                                <h2 className='text-2xl font-bold text-[#222]'>
                                    No positions found
                                </h2>
                                <p className='text-[#777] mt-2'>
                                    Adjust filters to explore more jobs.
                                </p>
                            </div>
                        ) : (
                            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
                                {filterJobs.map((job, idx) => (
                                    <motion.div
                                        key={job?._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: idx * 0.04
                                        }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        <div className='flex justify-center gap-3 mt-14'>
                            <button className='px-5 py-3 rounded-xl border bg-white border-[#ddd] hover:bg-[#b8f34c] transition-all'>
                                Prev
                            </button>

                            <button className='w-12 h-12 rounded-xl bg-[#b8f34c] font-semibold'>
                                1
                            </button>

                            <button className='w-12 h-12 rounded-xl bg-white border border-[#ddd]'>
                                2
                            </button>

                            <button className='w-12 h-12 rounded-xl bg-white border border-[#ddd]'>
                                3
                            </button>

                            <button className='px-5 py-3 rounded-xl border bg-white border-[#ddd] hover:bg-[#b8f34c] transition-all'>
                                Next
                            </button>
                        </div>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Jobs