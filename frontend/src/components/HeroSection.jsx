import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { Search, ArrowRight, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const [query, setQuery] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const heroRef = useRef(null);
    const textRef = useRef(null);

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Text reveal animation
            const lines = textRef.current.querySelectorAll('.reveal-line');
            gsap.from(lines, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
                delay: 0.2
            });

            // Subtle parallax for background orbs
            gsap.to('.hero-orb', {
                y: (i, el) => el.dataset.speed * 100,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={heroRef} className='relative min-h-screen flex items-center justify-center bg-black overflow-hidden'>
            <div className='noise-bg' />
            
            {/* High-end Background Orbs (Lusion Style) */}
            <div className='absolute inset-0 pointer-events-none'>
                <div 
                    data-speed="0.2"
                    className='hero-orb absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full bg-primary/20 blur-[120px] mix-blend-screen opacity-50' 
                />
                <div 
                    data-speed="-0.3"
                    className='hero-orb absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[100px] mix-blend-screen opacity-30' 
                />
            </div>

            <div className='max-w-7xl mx-auto px-6 relative z-10 w-full'>
                <div className='flex flex-col items-center text-center space-y-12'>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl'
                    >
                        <Sparkles className='h-4 w-4 text-primary' />
                        <span className='text-[10px] font-bold uppercase tracking-[0.4em] text-white/60'>AI-Powered Career Intelligence</span>
                    </motion.div>

                    <div ref={textRef} className='space-y-4'>
                        <h1 className='text-reveal-container text-7xl md:text-9xl font-bold leading-[0.85] tracking-tighter text-white'>
                            <span className='reveal-line block overflow-hidden py-2'>Search. Apply.</span>
                            <span className='reveal-line block overflow-hidden py-2'>
                                <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-emerald-400'>
                                    Transform
                                </span>
                            </span>
                            <span className='reveal-line block overflow-hidden py-2'>Your Future.</span>
                        </h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1 }}
                        className='max-w-2xl mx-auto text-xl text-white/40 font-medium leading-relaxed'
                    >
                        Experience the next generation of job hunting. Precision-engineered for professionals who demand excellence and clarity.
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className='w-full max-w-2xl group relative'
                    >
                        <div className='absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000' />
                        <div className='relative flex items-center p-2 bg-zinc-900/50 backdrop-blur-3xl rounded-2xl border border-white/10 shadow-2xl'>
                            <div className='flex-1 flex items-center gap-4 pl-6'>
                                <Search className='text-white/20 group-focus-within:text-primary transition-colors' size={24} />
                                <input
                                    type="text"
                                    placeholder='What is your next challenge?'
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='w-full bg-transparent outline-none border-none text-xl font-medium text-white placeholder:text-white/10'
                                />
                            </div>
                            <Button 
                                onClick={searchJobHandler} 
                                className="h-14 px-10 rounded-xl bg-white text-black hover:bg-white/90 font-bold text-lg transition-all active:scale-95 flex items-center gap-2 group/btn"
                            >
                                Discover
                                <ArrowRight className='h-5 w-5 group-hover/btn:translate-x-1 transition-transform' />
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
