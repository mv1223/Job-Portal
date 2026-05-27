import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className='p-8 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-[0_30px_60px_rgba(79,70,229,0.12)] hover:border-indigo-100 transition-all duration-500 group'>
            <div className='flex items-center justify-between mb-6'>
                <p className='text-xs font-bold text-slate-400 uppercase tracking-[0.15em]'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="ghost" className="rounded-full h-10 w-10 p-0 hover:bg-indigo-50 hover:text-indigo-600 transition-colors" size="icon">
                    <Bookmark className='h-5 w-5' />
                </Button>
            </div>

            <div className='flex items-center gap-5 mb-8'>
                <div className='w-16 h-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center p-3 group-hover:border-indigo-100 transition-colors'>
                    <Avatar className="h-full w-full rounded-none">
                        <AvatarImage src={job?.company?.logo} className="object-contain" />
                    </Avatar>
                </div>
                <div>
                    <h1 className='font-black text-xl text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors'>{job?.company?.name}</h1>
                    <div className='flex items-center gap-1 mt-1 text-slate-400 font-bold text-[10px] uppercase tracking-wider'>
                        <MapPin className='h-3 w-3' />
                        {job?.location}
                    </div>
                </div>
            </div>

            <div className='mb-8'>
                <h1 className='font-black text-2xl text-slate-800 mb-3 leading-tight'>{job?.title}</h1>
                <p className='text-sm text-slate-500 line-clamp-2 leading-relaxed font-medium'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mb-8'>
                <Badge className='bg-indigo-50 text-indigo-600 border-none font-bold text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-tight' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-tight' variant="ghost">{job?.jobType}</Badge>
                <Badge className='bg-amber-50 text-amber-600 border-none font-bold text-[10px] px-3 py-1.5 rounded-lg uppercase tracking-tight' variant="ghost">{job?.salary}LPA</Badge>
            </div>

            <div className='flex items-center gap-4 pt-8 border-t border-slate-50'>
                <Button 
                    onClick={() => navigate(`/description/${job._id}`)} 
                    variant="outline" 
                    className="flex-1 h-12 rounded-xl border-slate-200 font-black text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100 transition-all uppercase text-[10px] tracking-widest"
                >
                    Details
                </Button>
                <Button className="flex-1 h-12 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95">
                    Apply
                </Button>
            </div>
        </div>
    )
}

export default Job