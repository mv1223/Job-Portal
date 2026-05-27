import React, { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Search, Briefcase, Zap, Trophy, TrendingUp, Target, Sparkles, Rocket, Star } from 'lucide-react'
import gsap from 'gsap'
import { Spotlight } from './ui/spotlight'
import { GridBackground } from './ui/grid-background'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const words = "Search, Apply & Get Your Dream Jobs".split(" ");
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth - 0.5) * 40;
        const y = (clientY / innerHeight - 0.5) * 40;
        setMousePos({ x, y });
    };

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
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div 
            ref={containerRef} 
            onMouseMove={handleMouseMove}
            className='relative overflow-hidden bg-black min-h-[95vh] flex items-center justify-center selection:bg-primary selection:text-white'
        >
            <GridBackground className="absolute inset-0">
                <Spotlight
                    className="-top-40 left-0 md:left-60 md:-top-20"
                    fill="white"
                />
                
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
                </div>
            </GridBackground>

            {/* Floating 3D Icons */}
            <div className='absolute inset-0 pointer-events-none overflow-hidden z-0'>
                <motion.div style={{ x: mousePos.x * 1.5, y: mousePos.y * 1.5 }} className='absolute top-1/4 left-1/4 opacity-20'><Briefcase size={40} className='text-primary' /></motion.div>
                <motion.div style={{ x: -mousePos.x * 2, y: -mousePos.y * 2 }} className='absolute top-1/3 right-1/4 opacity-20'><Zap size={30} className='text-cyan-400' /></motion.div>
                <motion.div style={{ x: mousePos.x * 2.5, y: -mousePos.y * 2.5 }} className='absolute bottom-1/4 left-1/3 opacity-20'><Trophy size={35} className='text-purple-500' /></motion.div>
                <motion.div style={{ x: -mousePos.x * 1.8, y: mousePos.y * 1.8 }} className='absolute bottom-1/3 right-1/3 opacity-20'><Sparkles size={45} className='text-blue-500' /></motion.div>
            </div>

            <div className='max-w-7xl mx-auto px-6 relative z-10 text-center'>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ rotateX: -mousePos.y / 5, rotateY: mousePos.x / 5 }}
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
                    
                    <p className='max-w-2xl text-white/40 font-medium text-lg leading-relaxed'>
                        Experience the next generation of career development. 
                        Powered by AI, designed for excellence.
                    </p>

                    <div className='w-full max-w-2xl relative group'>
                        <div className='absolute -inset-1 bg-gradient-to-r from-primary to-cyan-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200' />
                        <div className='relative flex items-center bg-zinc-900/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-2 pr-4 shadow-2xl'>
                            <div className='flex items-center flex-1 px-6'>
                                <Search className='h-5 w-5 text-white/20' />
                                <input
                                    type="text"
                                    placeholder='Search for titles, companies, or skills...'
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/20 px-4 py-4 font-medium'
                                />
                            </div>
                            <Button 
                                onClick={searchJobHandler}
                                className='bg-primary hover:bg-primary/90 text-white rounded-2xl px-8 py-6 font-bold shadow-xl shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95'
                            >
                                Discover
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default HeroSection
