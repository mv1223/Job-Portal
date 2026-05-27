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
        <div className='py-24 bg-white overflow-hidden'>
            <div className='max-w-7xl mx-auto px-4 mb-16 text-center'>
                <h2 className='text-4xl font-bold'>What Our <span className='text-[#6A38C2]'>Users Say</span></h2>
            </div>

            <div className='relative flex overflow-hidden'>
                <motion.div
                    className='flex gap-8'
                    animate={{
                        x: ['0%', '-50%'],
                    }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {duplicatedTestimonials.map((item, index) => (
                        <div 
                            key={index} 
                            className='flex-shrink-0 w-[450px] p-8 rounded-2xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col gap-6'
                        >
                            <div className='relative'>
                                <span className='text-6xl text-gray-100 font-serif leading-none absolute -top-4 -left-2'>"</span>
                                <p className='text-gray-600 font-medium leading-relaxed relative z-10'>
                                    {item.quote}
                                </p>
                            </div>
                            
                            <div className='flex items-center gap-4 mt-auto'>
                                <img 
                                    src={item.avatar} 
                                    className='w-12 h-12 rounded-full border-2 border-[#6A38C2]/10' 
                                    alt={item.name} 
                                />
                                <div>
                                    <h4 className='font-bold text-gray-900'>{item.name}</h4>
                                    <p className='text-gray-500 text-xs font-semibold uppercase tracking-wider'>{item.role}</p>
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
