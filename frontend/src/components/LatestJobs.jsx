import React from 'react'
import { useSelector } from 'react-redux'; 
import { motion } from 'framer-motion';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { useNavigate } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import { TiltCard } from './ui/tilt-card';

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
                <h2 className='text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6'>Featured</h2>
                <h1 className='text-5xl md:text-6xl font-bold text-white tracking-tighter'>Prime Selections</h1>
            </motion.div>

            <BentoGrid className="max-w-7xl mx-auto">
                {
                    allJobs.length <= 0 ? (
                        <div className='col-span-full py-32 text-center bg-zinc-900/30 rounded-[3rem] border border-dashed border-white/5'>
                            <p className='text-white/20 font-bold text-xl'>The intelligence is gathering data. Check back shortly.</p>
                        </div>
                    ) : (
                        allJobs?.slice(0, 6).map((job, i) => (
                            <TiltCard key={job._id} className={i === 3 || i === 6 ? "md:col-span-2" : ""}>
                                <BentoGridItem
                                    title={job.title}
                                    description={job.description}
                                    header={<Skeleton logo={job?.company?.logo} company={job?.company?.name} location={job?.location} />}
                                    icon={<JobIcons job={job} />}
                                    onClick={() => navigate(`/description/${job._id}`)}
                                />
                            </TiltCard>
                        ))
                    )
                }
            </BentoGrid>
        </div>
    )
}

const Skeleton = ({ logo, company, location }) => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 p-4 border border-white/5 group-hover/bento:border-primary/50 transition-colors duration-500 overflow-hidden relative">
        <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center p-2">
                <img src={logo || "https://www.vectorlogo.zone/logos/google/google-icon.svg"} alt={company} className="w-full h-full object-contain" />
            </div>
            <div>
                <h3 className="text-sm font-bold text-white">{company}</h3>
                <div className="flex items-center gap-1 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                    <MapPin className="w-3 h-3" />
                    {location || "Global"}
                </div>
            </div>
        </div>
        <div className="absolute top-0 right-0 p-4">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </div>
        {/* Animated Background Element */}
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl group-hover/bento:bg-primary/20 transition-all duration-500 rounded-full" />
    </div>
);

const JobIcons = ({ job }) => (
    <div className="flex gap-2 mb-2">
        <Badge className="bg-white/5 text-[10px] font-bold border-none text-white/60 px-2 py-0.5">{job?.jobType}</Badge>
        <Badge className="bg-primary/10 text-[10px] font-bold border-none text-primary px-2 py-0.5">{job?.salary}LPA</Badge>
    </div>
);

export default LatestJobs