import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark, MapPin, Clock, Users } from 'lucide-react'

const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)}
            className='job-card bg-[#0e0e0e] border border-[#181818] rounded-xl p-5 flex flex-col md:flex-row items-start gap-4 cursor-pointer hover:bg-[#111] hover:border-[#2a2a2a] transition-all relative group'
        >
            <div className='job-logo w-11 h-11 rounded-lg bg-[#161616] border border-[#222] flex items-center justify-center shrink-0 overflow-hidden p-2'>
                <img src={job?.company?.logo || "https://www.vectorlogo.zone/logos/google/google-icon.svg"} alt={job?.company?.name} className='w-full h-full object-contain' />
            </div>
            
            <div className='job-info flex-1 min-w-0'>
                <div className='job-title-row flex items-center gap-2 mb-1'>
                    <span className='job-title text-[14px] font-bold text-white truncate'>{job?.title}</span>
                    {daysAgoFunction(job?.createdAt) <= 1 && (
                        <span className='bg-primary text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm'>New</span>
                    )}
                </div>
                <div className='job-company text-[12px] text-[#555] mb-3'>{job?.company?.name} · {job?.location || "Global"}</div>
                
                <div className='job-meta flex items-center gap-4 flex-wrap'>
                    <span className='job-tag flex items-center gap-1.5 text-[11px] text-[#555]'>
                        <MapPin className='w-3 h-3 opacity-60' />
                        Remote / Hybrid
                    </span>
                    <span className='job-tag flex items-center gap-1.5 text-[11px] text-[#555]'>
                        <Clock className='w-3 h-3 opacity-60' />
                        Posted {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)}d ago`}
                    </span>
                    <span className='job-tag flex items-center gap-1.5 text-[11px] text-[#555]'>
                        <Users className='w-3 h-3 opacity-60' />
                        {Math.floor(Math.random() * 500)} applicants
                    </span>
                </div>
            </div>

            <div className='job-right flex flex-col items-end gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0'>
                <div className='text-right'>
                    <div className='job-salary text-[14px] font-bold text-white'>₹{job?.salary}L</div>
                    <div className='job-salary-label text-[10px] text-[#444]'>per year</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                    job?.jobType?.toLowerCase().includes('full') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    job?.jobType?.toLowerCase().includes('remote') ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' :
                    'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                }`}>
                    {job?.jobType}
                </span>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        // bookmark logic
                    }}
                    className='save-btn border border-[#1e1e1e] text-[#444] w-8 h-8 rounded-md flex items-center justify-center hover:border-primary hover:text-primary transition-all'
                >
                    <Bookmark className='w-3.5 h-3.5' />
                </button>
            </div>
        </div>
    )
}

export default Job