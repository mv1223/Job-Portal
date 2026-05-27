import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={()=> navigate(`/description/${job._id}`)} 
            className='group p-6 rounded-2xl bg-[#0e0e0e] border border-[#181818] hover:bg-[#111] hover:border-[#2a2a2a] cursor-pointer transition-all duration-300 h-full flex flex-col'
        >
            <div className='flex items-center gap-4 mb-6'>
                <div className='w-11 h-11 rounded-lg bg-[#161616] border border-[#222] flex items-center justify-center p-2 shrink-0'>
                    <img src={job?.company?.logo || "https://www.vectorlogo.zone/logos/google/google-icon.svg"} alt={job?.company?.name} className='w-full h-full object-contain' />
                </div>
                <div>
                    <h1 className='font-bold text-[13px] text-white'>{job?.company?.name}</h1>
                    <div className='flex items-center gap-1 text-[11px] font-medium text-[#555]'>
                        <MapPin className='h-3 w-3' />
                        {job?.location || "Global"}
                    </div>
                </div>
            </div>

            <div className='flex-grow mb-6'>
                <h1 className='font-bold text-lg text-white mb-2 tracking-tight'>{job?.title}</h1>
                <p className='text-[13px] text-[#666] font-medium line-clamp-2 leading-relaxed'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 pt-6 border-t border-[#1a1a1a]'>
                <span className='bg-primary/10 text-primary font-bold text-[10px] px-3 py-1 rounded-md uppercase tracking-widest'>{job?.jobType}</span>
                <span className='bg-emerald-500/10 text-emerald-400 font-bold text-[10px] px-3 py-1 rounded-md uppercase tracking-widest'>{job?.salary}LPA</span>
            </div>
        </div>
    )
}

export default LatestJobCards