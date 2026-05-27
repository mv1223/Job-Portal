import React, { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Search, MapPin, Briefcase, Zap, Trophy, TrendingUp, Target, Sparkles, Rocket, Star } from 'lucide-react'
import gsap from 'gsap'
import { Spotlight } from './ui/spotlight'
import { GridBackground } from './ui/grid-background'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        <section 
            ref={containerRef} 
            className='bg-[#0a0a0a] py-20 px-10'
        >
            <div className='max-w-4xl mx-auto text-center'>
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='flex flex-col items-center'
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111] border border-[#2a2a2a] text-[12px] text-[#888] mb-8'
                    >
                        <div className='w-1.5 h-1.5 bg-[#22c55e] rounded-full' />
                        <span>2,400+ new jobs added this week</span>
                    </motion.div>
                    
                    <h1 className='text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-6'>
                        Find work that<br />actually <em className='not-italic text-primary'>fits you</em>
                    </h1>
                    
                    <p className='max-w-lg text-[#666] text-lg leading-relaxed mb-10'>
                        Search through thousands of verified job listings from top companies. 
                        Your next role is one search away.
                    </p>

                    <div className='w-full max-w-2xl relative'>
                        <div className='flex items-center bg-[#111] border border-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl'>
                            <div className='flex items-center flex-1 px-4'>
                                <Search className='h-4 w-4 text-[#444] shrink-0' />
                                <input
                                    type="text"
                                    placeholder='Job title, keyword or company...'
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-[#444] px-4 py-4 text-[14px]'
                                />
                            </div>
                            <div className='w-[1px] h-6 bg-[#2a2a2a]' />
                            <div className='flex items-center flex-1 px-4'>
                                <MapPin className='h-4 w-4 text-[#444] shrink-0' />
                                <input
                                    type="text"
                                    placeholder='Location or Remote'
                                    className='w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-[#444] px-4 py-4 text-[14px]'
                                />
                            </div>
                            <Button 
                                onClick={searchJobHandler}
                                className='bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-2 h-auto m-1 font-semibold text-[13px] transition-all'
                            >
                                Search Jobs
                            </Button>
                        </div>
                    </div>

                    <div className='flex items-center justify-center gap-8 md:gap-12 mt-12'>
                        <div className='text-center'>
                            <strong className='block text-2xl font-bold text-white tracking-tight'>84,500+</strong>
                            <span className='text-[12px] text-[#555]'>Active Jobs</span>
                        </div>
                        <div className='w-[1px] h-8 bg-[#1e1e1e]' />
                        <div className='text-center'>
                            <strong className='block text-2xl font-bold text-white tracking-tight'>12,000+</strong>
                            <span className='text-[12px] text-[#555]'>Companies Hiring</span>
                        </div>
                        <div className='w-[1px] h-8 bg-[#1e1e1e]' />
                        <div className='text-center'>
                            <strong className='block text-2xl font-bold text-white tracking-tight'>1.4M+</strong>
                            <span className='text-[12px] text-[#555]'>Candidates Placed</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default HeroSection
