import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { TiltCard } from './ui/tilt-card'

const Job = ({job}) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <TiltCard>
            <div className='p-8 rounded-[2.5rem] bg-zinc-900/50 backdrop-blur-3xl border border-white/5 hover:border-primary/50 transition-all duration-700 group'>
                <div className='flex items-center justify-between mb-8'>
                    <p className='text-[10px] font-black text-white/20 uppercase tracking-[0.2em]'>
                        {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                    </p>
                    <Button variant="ghost" className="rounded-full h-10 w-10 p-0 bg-white/5 hover:bg-primary/20 text-white transition-colors" size="icon">
                        <Bookmark className='h-4 w-4' />
                    </Button>
                </div>

                <div className='flex items-center gap-5 mb-8'>
                    <div className='w-16 h-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center p-3 group-hover:bg-primary/10 transition-colors duration-500'>
                        <Avatar className="h-full w-full rounded-none">
                            <AvatarImage src={job?.company?.logo || "https://www.vectorlogo.zone/logos/google/google-icon.svg"} className="object-contain" />
                        </Avatar>
                    </div>
                    <div>
                        <h1 className='font-black text-xl text-white leading-tight group-hover:text-primary transition-colors duration-500'>{job?.company?.name}</h1>
                        <div className='flex items-center gap-1 mt-1 text-white/20 font-bold text-[10px] uppercase tracking-widest'>
                            <MapPin className='h-3 w-3' />
                            {job?.location || "Global"}
                        </div>
                    </div>
                </div>

                <div className='mb-8'>
                    <h1 className='font-black text-2xl text-white mb-3 leading-tight tracking-tighter'>{job?.title}</h1>
                    <p className='text-sm text-white/40 line-clamp-2 leading-relaxed font-medium'>{job?.description}</p>
                </div>

                <div className='flex flex-wrap items-center gap-3 mb-10'>
                    <Badge className='bg-primary/10 text-primary border-none font-bold text-[10px] px-4 py-2 rounded-xl uppercase tracking-widest' variant="outline">{job?.position} Positions</Badge>
                    <Badge className='bg-blue-500/10 text-blue-400 border-none font-bold text-[10px] px-4 py-2 rounded-xl uppercase tracking-widest' variant="outline">{job?.jobType}</Badge>
                    <Badge className='bg-emerald-500/10 text-emerald-400 border-none font-bold text-[10px] px-4 py-2 rounded-xl uppercase tracking-widest' variant="outline">{job?.salary}LPA</Badge>
                </div>

                <div className='flex items-center gap-4 pt-8 border-t border-white/5'>
                    <Button 
                        onClick={() => navigate(`/description/${job._id}`)} 
                        variant="outline" 
                        className="flex-1 h-12 rounded-xl border-white/5 bg-white/5 font-black text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all uppercase text-[10px] tracking-widest"
                    >
                        Intelligence
                    </Button>
                    <Button className="flex-1 h-12 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all active:scale-95 text-white">
                        Engage
                    </Button>
                </div>
            </div>
        </TiltCard>
    )
}

export default Job