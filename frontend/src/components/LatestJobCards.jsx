import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={()=> navigate(`/description/${job._id}`)} 
            className='group p-8 rounded-[2.5rem] bg-zinc-900/50 backdrop-blur-3xl border border-white/5 hover:border-white/10 cursor-pointer transition-all duration-700 hover:shadow-2xl hover:shadow-primary/5 h-full flex flex-col'
        >
            <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center p-2 group-hover:bg-primary/20 transition-colors duration-500'>
                        <img src={job?.company?.logo || "https://www.vectorlogo.zone/logos/google/google-icon.svg"} alt={job?.company?.name} className='w-full h-full object-contain' />
                    </div>
                    <div>
                        <h1 className='font-bold text-sm text-white group-hover:text-primary transition-colors'>{job?.company?.name}</h1>
                        <div className='flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/20'>
                            <MapPin className='h-3 w-3' />
                            {job?.location || "Global"}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex-grow'>
                <h1 className='font-bold text-2xl text-white mb-3 tracking-tight group-hover:translate-x-1 transition-transform duration-500'>{job?.title}</h1>
                <p className='text-sm text-white/40 font-medium line-clamp-2 leading-relaxed'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-3 mt-8 pt-8 border-t border-white/5'>
                <Badge className='bg-primary/10 text-primary border-none font-bold text-[10px] px-4 py-2 rounded-xl uppercase tracking-widest' variant="outline">{job?.position} Positions</Badge>
                <Badge className='bg-blue-500/10 text-blue-400 border-none font-bold text-[10px] px-4 py-2 rounded-xl uppercase tracking-widest' variant="outline">{job?.jobType}</Badge>
                <Badge className='bg-emerald-500/10 text-emerald-400 border-none font-bold text-[10px] px-4 py-2 rounded-xl uppercase tracking-widest' variant="outline">{job?.salary}LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards