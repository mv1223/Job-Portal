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
        <div className='max-w-7xl mx-auto my-32 px-6'>
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className='mb-16'
            >
                <h2 className='text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6'>Featured</h2>
                <h1 className='text-5xl md:text-6xl font-bold text-white tracking-tighter'>Prime Selections</h1>
            </motion.div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    allJobs.length <= 0 ? (
                        <div className='col-span-full py-32 text-center bg-zinc-900/30 rounded-[3rem] border border-dashed border-white/5'>
                            <p className='text-white/20 font-bold text-xl'>The intelligence is gathering data. Check back shortly.</p>
                        </div>
                    ) : (
                        allJobs?.slice(0,6).map((job, idx) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
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