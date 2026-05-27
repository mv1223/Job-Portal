import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_rgba(79,70,229,0.12)] hover:border-indigo-100 transition-all duration-500 cursor-pointer flex flex-col h-full'
        >
            <div className='flex items-center gap-4 mb-6'>
                <div className='w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 group-hover:border-indigo-100 transition-colors'>
                    <img src={job?.company?.logo || "https://www.vectorlogo.zone/logos/google/google-icon.svg"} alt={job?.company?.name} className='w-full h-full object-contain' />
                </div>
                <div>
                    <h3 className='font-black text-slate-900 group-hover:text-indigo-600 transition-colors'>{job?.company?.name}</h3>
                    <div className='flex items-center gap-1 text-slate-400 font-bold text-[10px] uppercase tracking-wider'>
                        <MapPin className='h-3 w-3' />
                        {job?.location}
                    </div>
                </div>
            </div>

            <div className='flex-grow'>
                <h2 className='text-xl font-black text-slate-800 mb-3 leading-tight'>{job?.title}</h2>
                <p className='text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed mb-6'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 pt-6 border-t border-slate-50'>
                <Badge className='bg-indigo-50 text-indigo-600 border-none font-bold text-[10px] px-3 py-1 rounded-lg uppercase tracking-tight' variant="outline">
                    {job?.jobType}
                </Badge>
                <Badge className='bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] px-3 py-1 rounded-lg uppercase tracking-tight' variant="outline">
                    {job?.salary}LPA
                </Badge>
                <Badge className='bg-amber-50 text-amber-600 border-none font-bold text-[10px] px-3 py-1 rounded-lg uppercase tracking-tight' variant="outline">
                    {job?.position} Positions
                </Badge>
            </div>
        </div>
    )
}

export default LatestJobCards