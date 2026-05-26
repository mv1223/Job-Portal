import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
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
        <div className='p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-100 hover:border-indigo-100 transition-all group'>
            <div className='flex items-center justify-between mb-4'>
                <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="ghost" className="rounded-full h-8 w-8 p-0 hover:bg-indigo-50 hover:text-indigo-600" size="icon"><Bookmark className='h-4 w-4' /></Button>
            </div>

            <div className='flex items-center gap-4 mb-6'>
                <div className='p-2 bg-slate-50 rounded-xl border border-slate-100 group-hover:border-indigo-100 transition-colors'>
                    <Avatar className="h-12 w-12 rounded-lg">
                        <AvatarImage src={job?.company?.logo} className="object-contain" />
                    </Avatar>
                </div>
                <div>
                    <h1 className='font-bold text-lg text-slate-900 leading-tight'>{job?.company?.name}</h1>
                    <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>{job?.location}</p>
                </div>
            </div>

            <div className='mb-6'>
                <h1 className='font-black text-xl text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors'>{job?.title}</h1>
                <p className='text-sm text-slate-500 line-clamp-2 leading-relaxed'>{job?.description}</p>
            </div>

            <div className='flex items-center gap-3 mb-6'>
                <Badge className={'text-indigo-600 bg-indigo-50 border-none font-bold px-3 py-1'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-emerald-600 bg-emerald-50 border-none font-bold px-3 py-1'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-amber-600 bg-amber-50 border-none font-bold px-3 py-1'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

            <div className='flex items-center gap-4 pt-4 border-t border-slate-50'>
                <Button onClick={() => navigate(`/description/${job._id}`)} variant="outline" className="flex-1 rounded-xl border-slate-200 font-bold text-slate-600 hover:bg-slate-50">Details</Button>
                <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 rounded-xl font-bold">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job