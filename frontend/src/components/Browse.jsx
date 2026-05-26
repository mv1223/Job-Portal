import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

// const randomJobs = [1, 2,45];

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[])
    return (
        <div className='bg-[#F8FAFC] min-h-screen'>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-2xl my-10 text-slate-900'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job}/>
                            )
                        })
                    }
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default Browse