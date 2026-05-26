import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-6 my-16'>
                <div className='mx-auto px-6 py-2 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm'>
                    <span className='text-indigo-700 font-semibold tracking-wide uppercase text-xs'>🚀 India's Most Advanced AI Job Portal</span>
                </div>
                <h1 className='text-6xl font-extrabold text-slate-900 tracking-tight leading-tight'>
                    Your Next <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600'>Career Breakthrough</span> <br /> 
                    Powered by AI
                </h1>
                <p className='text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed'>
                    Beyond job searching. Our AI-driven platform analyzes your unique skills to match you with top-tier opportunities at companies like Google, Meta, and NVIDIA.
                </p>
                <div className='flex w-[50%] shadow-2xl shadow-indigo-100/50 border border-slate-200 pl-6 pr-2 py-2 rounded-full items-center gap-4 mx-auto bg-white group focus-within:border-indigo-400 transition-all'>
                    <input
                        type="text"
                        placeholder='Search roles, skills, or companies...'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full text-slate-700 placeholder:text-slate-400 font-medium bg-transparent'
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="rounded-full bg-indigo-600 hover:bg-indigo-700 h-12 w-12 p-0 flex items-center justify-center shadow-lg shadow-indigo-200"
                    >
                        <Search className='h-5 w-5 text-white' />
                    </Button>
                </div>
                <div className='flex items-center justify-center gap-8 mt-4 text-slate-400'>
                    <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></div>
                        <span className='text-xs font-bold uppercase tracking-widest'>84+ Active Roles</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-2 h-2 rounded-full bg-indigo-400'></div>
                        <span className='text-xs font-bold uppercase tracking-widest'>AI Career Suite Ready</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection