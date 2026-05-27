import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: "I used to struggle with job platforms, but JobPortal AI made it feel easy and personal. It actually understands what I'm looking for and helped me land my role at Meta.",
        name: "Esther Howard",
        role: "Marketing Coordinator at Meta",
        avatar: "https://i.pravatar.cc/150?u=esther"
    },
    {
        quote: "The AI matching is incredible. I received three interview calls within the first week of using JobPortal. It's a game-changer for tech professionals.",
        name: "Robert Fox",
        role: "Software Engineer at Google",
        avatar: "https://i.pravatar.cc/150?u=robert"
    },
    {
        quote: "As a designer, I appreciate the clean interface and the precise filters. Finding companies that align with my creative vision has never been easier.",
        name: "Jane Cooper",
        role: "Product Designer at Apple",
        avatar: "https://i.pravatar.cc/150?u=jane"
    },
    {
        quote: "The ATS analyzer helped me optimize my resume perfectly. I could see exactly what I was missing and fixed it before applying to Amazon.",
        name: "Albert Flores",
        role: "Data Scientist at Amazon",
        avatar: "https://i.pravatar.cc/150?u=albert"
    },
    {
        quote: "JobPortal simplifies the hiring process. The quality of candidates we get here is far superior to other platforms we've tried in the past.",
        name: "Wade Warren",
        role: "HR Manager at Microsoft",
        avatar: "https://i.pravatar.cc/150?u=wade"
    }
];

const Testimonials = () => {
    // Duplicate the array for a seamless loop
    const duplicatedTestimonials = [...testimonials, ...testimonials];

    return (
        <div className='py-32 bg-black overflow-hidden'>
            <div className='max-w-7xl mx-auto px-6 mb-24'>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className='text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6'>Voices</h2>
                    <h3 className='text-5xl md:text-6xl font-bold text-white tracking-tighter'>Global Resonance</h3>
                </motion.div>
            </div>

            <div className='relative flex overflow-hidden'>
                <motion.div
                    className='flex gap-12'
                    animate={{
                        x: ['0%', '-50%'],
                    }}
                    transition={{
                        duration: 40,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {duplicatedTestimonials.map((item, index) => (
                        <div 
                            key={index} 
                            className='flex-shrink-0 w-[500px] p-12 rounded-[3rem] bg-zinc-900/50 backdrop-blur-3xl border border-white/5 flex flex-col gap-10 hover:border-white/10 transition-colors duration-700 shadow-2xl'
                        >
                            <div className='relative'>
                                <p className='text-xl text-white/60 font-medium leading-relaxed tracking-tight italic'>
                                    "{item.quote}"
                                </p>
                            </div>
                            
                            <div className='flex items-center gap-5 mt-auto pt-10 border-t border-white/5'>
                                <img 
                                    src={item.avatar} 
                                    className='w-12 h-12 rounded-2xl border border-white/10' 
                                    alt={item.name} 
                                />
                                <div>
                                    <h4 className='font-bold text-sm text-white'>{item.name}</h4>
                                    <p className='text-white/20 text-[10px] font-bold uppercase tracking-widest mt-0.5'>{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Testimonials;
