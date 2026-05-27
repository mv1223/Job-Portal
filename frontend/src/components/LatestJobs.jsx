import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import LatestJobCards from './LatestJobCards'

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job)

    return (
        <div className="max-w-7xl mx-auto px-6 py-20">

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16"
            >
                <span className="bg-[#B7F34D] text-[#111827] px-5 py-2 rounded-full text-sm font-semibold">
                    Featured Jobs
                </span>

                <h1 className="text-5xl md:text-6xl font-bold text-[#111827] tracking-tight mt-6">
                    Latest Job Opportunities
                </h1>

                <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto">
                    Discover premium job opportunities from top companies
                    hiring talented professionals right now.
                </p>
            </motion.div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                {
                    allJobs?.length <= 0 ? (
                        <div className="col-span-full">

                            <div className="bg-white rounded-[35px] border border-[#ececec] p-16 text-center shadow-sm">

                                <div className="w-20 h-20 bg-[#B7F34D] rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl">
                                        💼
                                    </span>
                                </div>

                                <h2 className="text-2xl font-bold text-[#111827]">
                                    No Jobs Available Yet
                                </h2>

                                <p className="text-gray-500 mt-3">
                                    We are collecting premium opportunities.
                                    Please check back shortly.
                                </p>
                            </div>
                        </div>
                    ) : (
                        allJobs
                            ?.slice(0, 6)
                            .map((job) => (
                                <LatestJobCards
                                    key={job._id}
                                    job={job}
                                />
                            ))
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs