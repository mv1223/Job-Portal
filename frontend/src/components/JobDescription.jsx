import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    return (
        <div className='bg-[#0a0a0a] min-h-screen'>
            <Navbar />
            <div className='noise-bg' />
            <div className='max-w-7xl mx-auto pt-32 px-6 pb-20 relative z-10'>
                <div className='bg-[#0e0e0e] border border-[#1a1a1a] rounded-3xl p-10 md:p-16'>
                    <div className='flex flex-col md:flex-row items-start justify-between gap-10 mb-12'>
                        <div className='flex-1'>
                            <h1 className='text-4xl md:text-5xl font-bold text-white tracking-tighter mb-6'>{singleJob?.title}</h1>
                            <div className='flex flex-wrap items-center gap-3'>
                                <Badge className='bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-lg font-bold uppercase text-[10px] tracking-widest'>{singleJob?.postion} Positions</Badge>
                                <Badge className='bg-sky-500/10 text-sky-400 border-sky-500/20 px-4 py-1.5 rounded-lg font-bold uppercase text-[10px] tracking-widest'>{singleJob?.jobType}</Badge>
                                <Badge className='bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-1.5 rounded-lg font-bold uppercase text-[10px] tracking-widest'>{singleJob?.salary}LPA</Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`h-14 px-10 rounded-xl font-bold uppercase tracking-widest transition-all ${isApplied ? 'bg-[#1a1a1a] text-[#444] cursor-not-allowed border border-[#2a2a2a]' : 'bg-primary hover:bg-[#5558e8] text-white shadow-xl shadow-primary/20 active:scale-95'}`}>
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>

                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-16'>
                        <div className='lg:col-span-2 space-y-10'>
                            <div>
                                <h2 className='text-[11px] font-bold uppercase tracking-[0.2em] text-[#444] mb-6'>Role Overview</h2>
                                <p className='text-[#666] text-lg leading-relaxed whitespace-pre-line'>{singleJob?.description}</p>
                            </div>
                        </div>

                        <div className='bg-[#111] border border-[#1a1a1a] rounded-2xl p-8 h-fit space-y-8'>
                            <h3 className='text-white font-bold text-lg tracking-tight'>Job Details</h3>
                            <div className='space-y-6'>
                                <div className='flex items-start gap-4'>
                                    <div className='w-10 h-10 rounded-lg bg-[#161616] border border-[#222] flex items-center justify-center shrink-0'>
                                        <MapPin className='text-primary w-5 h-5' />
                                    </div>
                                    <div>
                                        <p className='text-[10px] font-bold uppercase tracking-widest text-[#444] mb-1'>Location</p>
                                        <p className='text-white font-medium'>{singleJob?.location || "Remote"}</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-4'>
                                    <div className='w-10 h-10 rounded-lg bg-[#161616] border border-[#222] flex items-center justify-center shrink-0'>
                                        <Briefcase className='text-primary w-5 h-5' />
                                    </div>
                                    <div>
                                        <p className='text-[10px] font-bold uppercase tracking-widest text-[#444] mb-1'>Experience</p>
                                        <p className='text-white font-medium'>{singleJob?.experience} Years</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-4'>
                                    <div className='w-10 h-10 rounded-lg bg-[#161616] border border-[#222] flex items-center justify-center shrink-0'>
                                        <Users className='text-primary w-5 h-5' />
                                    </div>
                                    <div>
                                        <p className='text-[10px] font-bold uppercase tracking-widest text-[#444] mb-1'>Applicants</p>
                                        <p className='text-white font-medium'>{singleJob?.applications?.length} Candidates</p>
                                    </div>
                                </div>
                                <div className='flex items-start gap-4'>
                                    <div className='w-10 h-10 rounded-lg bg-[#161616] border border-[#222] flex items-center justify-center shrink-0'>
                                        <Clock className='text-primary w-5 h-5' />
                                    </div>
                                    <div>
                                        <p className='text-[10px] font-bold uppercase tracking-widest text-[#444] mb-1'>Posted Date</p>
                                        <p className='text-white font-medium'>{singleJob?.createdAt.split("T")[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default JobDescription