import React, { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { Search, Briefcase, Zap, Trophy, TrendingUp, Target, Sparkles, Rocket, Star } from 'lucide-react'
import gsap from 'gsap'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const words = "Search, Apply & Get Your Dream Jobs".split(" ");
    const containerRef = useRef(null);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-title-word", {
                opacity: 0,
                y: 50,
                filter: "blur(10px)",
                duration: 1,
                stagger: 0.1,
                ease: "power4.out"
            });
            
            gsap.to(".floating-icon", {
                y: "random(-20, 20)",
                x: "random(-20, 20)",
                rotation: "random(-15, 15)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className='relative overflow-hidden bg-black min-h-[95vh] flex items-center justify-center selection:bg-primary selection:text-white'>
            {/* High-end Cinematic Background */}
            <div className='absolute inset-0 pointer-events-none'>
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 100, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className='absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-600/20 to-indigo-700/20 blur-[120px]'
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.3, 1],
                        rotate: [0, -45, 0],
                        x: [0, -80, 0],
                        y: [0, 100, 0]
                    }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className='absolute bottom-[-30%] right-[-10%] w-[900px] h-[900px] rounded-full bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-rose-700/20 blur-[150px]'
                />
                
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
            </div>

            <div className='max-w-7xl mx-auto px-6 relative z-10 text-center'>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex flex-col items-center gap-10'
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl'
                    >
                        <Sparkles className='h-4 w-4 text-cyan-400 animate-pulse' />
                        <span className='text-[10px] font-black uppercase tracking-[0.4em] text-white/60'>The Future of Professional Growth</span>
                    </motion.div>
                    
                    <h1 className='text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white'>
                        {words.map((word, i) => (
                            <span key={i} className='hero-title-word inline-block mr-4'>
                                {word === "Dream" || word === "Jobs" ? (
                                    <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600'>
                                        {word}
                                    </span>
                                ) : word}
                            </span>
                        ))}
                    </h1>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className='text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight'
                    >
                        Experience a seamless, AI-driven journey to your next career milestone. Built for speed, precision, and your global success.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className='w-full max-w-3xl relative group mt-4'
                    >
                        <div className='absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000' />
                        <div className='relative flex items-center p-3 bg-zinc-900/50 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl'>
                            <div className='flex-1 flex items-center gap-6 pl-8'>
                                <Search className='text-cyan-400' size={28} />
                                <input
                                    type="text"
                                    placeholder='Search for roles, skills, or companies...'
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='w-full bg-transparent outline-none border-none text-xl font-bold text-white placeholder:text-white/10'
                                />
                            </div>
                            <Button 
                                onClick={searchJobHandler} 
                                className="h-16 px-14 rounded-[1.8rem] bg-white text-black hover:bg-white/90 font-black text-lg transition-all active:scale-95 shadow-2xl"
                            >
                                Discover
                            </Button>
                        </div>
                    </motion.div>

                    <div className='flex flex-wrap items-center justify-center gap-12 mt-12'>
                        {[
                            { label: "Fast Response", val: "Zap Response", icon: <Zap className='text-amber-400' />, color: "bg-amber-400/10" },
                            { label: "Career Growth", val: "98% Growth", icon: <TrendingUp className='text-emerald-400' />, color: "bg-emerald-400/10" },
                            { label: "AI Matching", val: "Neural Match", icon: <Target className='text-cyan-400' />, color: "bg-cyan-400/10" },
                            { label: "Top Rated", val: "5-Star Platform", icon: <Star className='text-purple-400' />, color: "bg-purple-400/10" }
                        ].map((item, idx) => (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.2 + idx * 0.1 }}
                                key={idx} 
                                className='flex items-center gap-5 group cursor-default'
                            >
                                <div className={`p-4 rounded-2xl ${item.color} border border-white/5 transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                                    {item.icon}
                                </div>
                                <div className='text-left'>
                                    <p className='text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-1'>{item.label}</p>
                                    <p className='text-sm font-black text-white group-hover:text-cyan-400 transition-colors'>{item.val}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Floating High-end Icons */}
            <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                <div className='floating-icon absolute top-[15%] left-[10%] text-cyan-500/20'><Rocket size={48} /></div>
                <div className='floating-icon absolute top-[20%] right-[15%] text-purple-500/20'><Trophy size={64} /></div>
                <div className='floating-icon absolute bottom-[20%] left-[20%] text-emerald-500/20'><Star size={56} /></div>
                <div className='floating-icon absolute bottom-[15%] right-[10%] text-blue-500/20'><Briefcase size={42} /></div>
            </div>
        </div>
    )
}

export default HeroSection
