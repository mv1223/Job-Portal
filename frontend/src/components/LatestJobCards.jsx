import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className='p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100 hover:border-indigo-100 transition-all cursor-pointer group'
        >
            <div className='flex items-center justify-between mb-4'>
                <h1 className='font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors'>{job?.company?.name}</h1>
                <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>{job?.location}</p>
            </div>
            <div className='mb-6'>
                <h2 className='font-black text-xl text-slate-800 mb-2'>{job?.title}</h2>
                <p className='text-sm text-slate-500 line-clamp-2 leading-relaxed'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge className={'text-indigo-600 bg-indigo-50 border-none font-bold px-3 py-1'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-emerald-600 bg-emerald-50 border-none font-bold px-3 py-1'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-amber-600 bg-amber-50 border-none font-bold px-3 py-1'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards