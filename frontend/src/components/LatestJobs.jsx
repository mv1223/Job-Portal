import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-24 px-4'>
            <div className='flex items-center justify-between mb-12'>
                <div>
                    <h1 className='text-4xl font-black text-slate-900'>Latest & Top <span className='text-indigo-600'>Job Openings</span></h1>
                    <p className='text-slate-500 font-medium mt-2 text-lg'>Hand-picked opportunities from global tech leaders</p>
                </div>
                <Button variant="link" className="text-indigo-600 font-bold text-lg hover:no-underline flex items-center gap-2 group">
                    View All Jobs <ArrowRight className='h-5 w-5 group-hover:translate-x-1 transition-transform' />
                </Button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    allJobs.length <= 0 ? <div className='col-span-full py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200'>
                        <h2 className='text-2xl font-bold text-slate-400'>No Jobs Available at the moment.</h2>
                        <p className='text-slate-400'>Check back soon for fresh opportunities!</p>
                    </div> : allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                }
            </div>
        </div>
    )
}

export default LatestJobs