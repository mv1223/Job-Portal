import React, { useState } from 'react'
import { Button } from './ui/button'
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

    const words = "Search, Apply & Get Your Dream Jobs".split(" ");

    return (
        <div className='relative overflow-hidden bg-white min-h-[90vh] flex items-center justify-center'>
            {/* Sui-inspired Background: Deep Blurs and Floating Orbs */}
            <div className='absolute inset-0 pointer-events-none'>
                <motion.div 
                    animate={{ 
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className='absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-[#E0F2FE]/50 blur-[120px]'
                />
                <motion.div 
                    animate={{ 
                        x: [0, -80, 0],
                        y: [0, 100, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className='absolute bottom-[-20%] right-[-10%] w-[900px] h-[900px] rounded-full bg-[#F5F3FF]/60 blur-[150px]'
                />
                
                {/* Sui-style Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
            </div>

            <div className='max-w-7xl mx-auto px-6 relative z-10 text-center'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex flex-col items-center gap-8'
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className='inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'
                    >
                        <span className='w-2 h-2 rounded-full bg-cyan-500 animate-pulse' />
                        <span className='text-[10px] font-black uppercase tracking-[0.3em] text-slate-500'>The Future of Job Hunting</span>
                    </motion.div>
                    
                    <h1 className='text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-slate-900'>
                        {words.map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: i * 0.1,
                                    ease: [0.21, 1.11, 0.81, 0.99]
                                }}
                                className='inline-block mr-4'
                            >
                                {word === "Dream" || word === "Jobs" ? (
                                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600'>
                                        {word}
                                    </span>
                                ) : word}
                            </motion.span>
                        ))}
                    </h1>
                    
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className='text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight'
                    >
                        Experience a seamless, AI-driven journey to your next career milestone. Built for speed, precision, and your success.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className='w-full max-w-3xl relative group mt-4'
                    >
                        <div className='absolute -inset-1 bg-gradient-to-r from-cyan-400 to-indigo-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000' />
                        <div className='relative flex items-center p-2 bg-white rounded-full border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)]'>
                            <div className='flex-1 flex items-center gap-4 pl-8'>
                                <Search className='text-cyan-500' size={24} />
                                <input
                                    type="text"
                                    placeholder='Search for roles, skills, or companies...'
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='w-full bg-transparent outline-none border-none text-xl font-bold text-slate-900 placeholder:text-slate-300'
                                />
                            </div>
                            <Button 
                                onClick={searchJobHandler} 
                                className="h-16 px-12 rounded-full bg-slate-900 hover:bg-black text-white font-black text-lg transition-all active:scale-95 shadow-xl"
                            >
                                Discover
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className='flex gap-12 mt-8'
                    >
                        {[
                            { label: "Trusted by", val: "500+ Companies", icon: <Trophy className='text-amber-400' /> },
                            { label: "Success rate", val: "98% Match", icon: <Target className='text-cyan-500' /> }
                        ].map((item, idx) => (
                            <div key={idx} className='flex items-center gap-4'>
                                <div className='p-3 rounded-2xl bg-slate-50 border border-slate-100'>{item.icon}</div>
                                <div className='text-left'>
                                    <p className='text-[10px] font-black uppercase tracking-widest text-slate-400'>{item.label}</p>
                                    <p className='text-sm font-black text-slate-900'>{item.val}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection