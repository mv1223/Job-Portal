import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FDFCFD]'>
            {/* Background Elements */}
            <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 100, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className='absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-100/40 blur-[100px]'
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, -45, 0],
                        y: [0, 50, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className='absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-violet-100/30 blur-[80px]'
                />
            </div>

            <div className='max-w-7xl mx-auto px-6 relative z-10'>
                <div className='flex flex-col items-center text-center'>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className='mb-10 px-5 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-3'
                    >
                        <span className='flex h-2 w-2 rounded-full bg-indigo-600 animate-ping'></span>
                        <span className='text-xs font-black text-slate-800 uppercase tracking-[0.2em]'>Discover Your Career Path</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className='text-7xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-[-0.04em] mb-10'
                    >
                        Crafting Your <br />
                        <span className='italic font-serif font-light text-indigo-600 pr-2'>Future</span> With Intent
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className='text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-14 font-medium'
                    >
                        We've built a bridge between your unique talents and the world's most visionary companies. No noise, just meaningful connections.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className='w-full max-w-2xl group'
                    >
                        <div className='relative flex items-center p-3 bg-white rounded-[2.5rem] border border-slate-200 shadow-[0_30px_100px_rgba(0,0,0,0.06)] group-hover:border-indigo-200 group-hover:shadow-[0_30px_100px_rgba(79,70,229,0.1)] transition-all duration-500'>
                            <div className='flex-1 flex items-center gap-4 pl-6'>
                                <Search className='text-indigo-600 h-6 w-6' />
                                <input
                                    type="text"
                                    placeholder='What role are you looking for?'
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='w-full bg-transparent outline-none border-none text-slate-900 font-bold placeholder:text-slate-300 text-lg'
                                />
                            </div>
                            <Button 
                                onClick={searchJobHandler} 
                                className="h-16 px-12 rounded-[2rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg shadow-xl shadow-indigo-100 transition-all active:scale-95"
                            >
                                Find Jobs
                            </Button>
                        </div>
                        
                        <div className='mt-8 flex items-center justify-center gap-6 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]'>
                            <span className='hover:text-indigo-600 cursor-pointer transition-colors'>Frontend Developer</span>
                            <span className='hover:text-indigo-600 cursor-pointer transition-colors'>Backend Developer</span>
                            <span className='hover:text-indigo-600 cursor-pointer transition-colors'>Data Scientist</span>
                            <span className='hover:text-indigo-600 cursor-pointer transition-colors'>UI/UX Designer</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection