import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto py-24 px-4'>
            <div className='flex flex-col md:flex-row items-end justify-between mb-12 gap-6'>
                <div>
                    <h1 className='text-4xl font-black text-slate-900 mb-2'>Popular <span className='text-indigo-600'>Jobs</span></h1>
                    <p className='text-slate-500 font-medium'>Top companies are hiring now - and you could be their next great hire.</p>
                </div>
                <Link to="/jobs">
                    <Button variant="outline" className="rounded-xl border-slate-200 font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 px-8 h-12 shadow-sm">
                        View All Jobs
                    </Button>
                </Link>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    allJobs.length <= 0 ? (
                        <div className='col-span-full py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200'>
                            <h2 className='text-2xl font-bold text-slate-400'>No Jobs Available at the moment.</h2>
                            <p className='text-slate-400'>Check back soon for fresh opportunities!</p>
                        </div>
                    ) : (
                        allJobs?.slice(0,6).map((job) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3 }}
                            >
                                <LatestJobCards job={job}/>
                            </motion.div>
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs