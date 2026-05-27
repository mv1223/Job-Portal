import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Zap, Palette, Users, Landmark, Headphones, Briefcase, Database, Cloud, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { TiltCard } from './ui/tilt-card';

const category = [
    { name: "Design & Development", icon: Palette },
    { name: "Human Research", icon: Users },
    { name: "Finance Management", icon: Landmark },
    { name: "Customer Support", icon: Headphones },
    { name: "Project Management", icon: Briefcase },
    { name: "Marketing & Sales", icon: Zap },
    { name: "Data Science", icon: Database },
    { name: "DevOps", icon: Cloud },
    { name: "Cybersecurity", icon: ShieldCheck }
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='w-full max-w-7xl mx-auto my-32 px-6'>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className='text-center mb-16'
            >
                <h2 className='text-[11px] font-bold uppercase tracking-[0.5em] text-primary mb-4'>Explore</h2>
                <h3 className='text-5xl md:text-6xl font-bold text-white tracking-tighter'>Infinite Opportunities</h3>
            </motion.div>
            
            <Carousel className="w-full relative group">
                <CarouselContent className="gap-6 px-4">
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-0">
                            <motion.div
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Button 
                                    onClick={() => searchJobHandler(cat.name)} 
                                    className="w-full h-40 flex flex-col items-center justify-center gap-4 rounded-2xl border border-[#1a1a1a] bg-[#0e0e0e] hover:bg-[#111] hover:border-primary transition-all duration-300 group/card shadow-none"
                                >
                                    <div className='p-3 rounded-xl bg-[#161616] border border-[#222] group-hover/card:bg-primary/10 group-hover/card:border-primary/20 transition-all'>
                                        <cat.icon size={20} className='text-primary' />
                                    </div>
                                    <span className='font-bold text-[11px] uppercase tracking-widest text-[#555] group-hover/card:text-white transition-colors'>{cat.name}</span>
                                </Button>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-6 border-[#1a1a1a] bg-[#0e0e0e] text-white hover:bg-white hover:text-black transition-all" />
                <CarouselNext className="hidden md:flex -right-6 border-[#1a1a1a] bg-[#0e0e0e] text-white hover:bg-white hover:text-black transition-all" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel