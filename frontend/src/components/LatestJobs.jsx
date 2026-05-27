import React from 'react'
import { useSelector } from 'react-redux'; 
import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import { TiltCard } from './ui/tilt-card';

import LatestJobCards from './LatestJobCards';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    const navigate = useNavigate();

    return (
        <div className='max-w-7xl mx-auto my-32 px-6'>
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className='mb-16'
            >
                <h2 className='text-[11px] font-bold uppercase tracking-[0.5em] text-primary mb-4'>Featured</h2>
                <h1 className='text-5xl md:text-6xl font-bold text-white tracking-tighter'>Prime Selections</h1>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    allJobs.length <= 0 ? (
                        <div className='col-span-full py-32 text-center bg-[#0e0e0e] rounded-xl border border-dashed border-[#181818]'>
                            <p className='text-[#444] font-bold text-xl'>The intelligence is gathering data. Check back shortly.</p>
                        </div>
                    ) : (
                        allJobs?.slice(0, 6).map((job) => (
                            <LatestJobCards key={job._id} job={job} />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs