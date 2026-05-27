import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';


import { motion } from 'framer-motion'
import { Search, Briefcase, Zap, Trophy, TrendingUp, Target } from 'lucide-react'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative overflow-hidden bg-white'>
            {/* Animated Background Elements */}
            <div className='absolute top-0 left-0 w-full h-full pointer-events-none'>
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className='absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-indigo-200/30 to-purple-200/30 blur-[80px]'
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.3, 1],
                        x: [0, -40, 0],
                        y: [0, 60, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className='absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-200/30 to-emerald-200/30 blur-[100px]'
                />
                
                {/* Floating Job Journey Icons */}
                <motion.div 
                    animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className='absolute top-[15%] right-[15%] p-4 bg-white rounded-2xl shadow-xl text-indigo-600 border border-indigo-50'
                >
                    <Search size={32} />
                </motion.div>
                <motion.div 
                    animate={{ y: [0, 25, 0], rotate: [0, -15, 0] }}
                    transition={{ duration: 7, repeat: Infinity }}
                    className='absolute bottom-[20%] left-[10%] p-4 bg-white rounded-2xl shadow-xl text-emerald-600 border border-emerald-50'
                >
                    <Trophy size={32} />
                </motion.div>
                <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className='absolute top-[40%] left-[5%] text-purple-200'
                >
                    <Briefcase size={80} />
                </motion.div>
            </div>

            <div className='text-center relative z-10 py-24'>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className='flex flex-col gap-6'
                >
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className='mx-auto px-6 py-2 rounded-full bg-gradient-to-r from-orange-50 to-red-50 text-[#F83002] font-black text-xs uppercase tracking-[0.3em] border border-orange-100 shadow-sm'
                    >
                        No. 1 Job Hunt Website
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className='text-6xl md:text-7xl font-black leading-tight text-slate-900'
                    >
                        Search, Apply & <br />
                        Get Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#9333ea]'>Dream Jobs</span>
                    </motion.h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className='text-slate-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed'
                    >
                        Your career journey starts here. From searching to landing your dream role, we provide the AI-powered tools to make your professional dreams a reality.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className='flex w-full max-w-2xl shadow-[0_20px_50px_rgba(106,56,194,0.15)] border-4 border-white pl-6 rounded-full items-center gap-4 mx-auto bg-white h-20'
                    >
                        <Search className='text-slate-400' size={24} />
                        <input
                            type="text"
                            placeholder='Find your dream jobs'
                            onChange={(e) => setQuery(e.target.value)}
                            className='outline-none border-none w-full font-bold text-lg text-slate-900 placeholder:text-slate-300'
                        />
                        <Button 
                            onClick={searchJobHandler} 
                            className="rounded-full bg-gradient-to-r from-[#6A38C2] to-[#9333ea] hover:scale-105 transition-all duration-300 h-16 px-10 mr-1 shadow-lg shadow-purple-200"
                        >
                            <Search className='h-6 w-6' />
                        </Button>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className='flex items-center justify-center gap-8 mt-4 text-slate-400 font-bold text-[10px] uppercase tracking-widest'
                    >
                        <div className='flex items-center gap-2'><Zap size={14} className='text-amber-500' /> Fast Response</div>
                        <div className='flex items-center gap-2'><TrendingUp size={14} className='text-emerald-500' /> Career Growth</div>
                        <div className='flex items-center gap-2'><Target size={14} className='text-blue-500' /> Precise Matching</div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection