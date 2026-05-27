import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const category = [
    "Design & Development",
    "Human Research",
    "Finance Management",
    "Customer Support",
    "Project Management",
    "Marketing & Sales",
    "Data Science",
    "DevOps",
    "Cybersecurity"
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
                className='text-center mb-20'
            >
                <h2 className='text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-6'>Explore</h2>
                <h3 className='text-5xl md:text-6xl font-bold text-white tracking-tighter'>Infinite Opportunities</h3>
            </motion.div>
            
            <Carousel className="w-full relative group">
                <CarouselContent className="gap-8 px-4">
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-0">
                            <motion.div
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    className="w-full h-48 flex flex-col items-center justify-center gap-6 rounded-3xl border border-white/5 bg-zinc-900/50 backdrop-blur-3xl hover:bg-zinc-800 hover:border-white/10 transition-all duration-700 shadow-2xl"
                                >
                                    <div className='p-4 rounded-2xl bg-white/5 group-hover:bg-primary/20 transition-colors duration-500'>
                                        <Zap size={24} className='text-primary' />
                                    </div>
                                    <span className='font-bold text-[10px] uppercase tracking-[0.2em] text-white/60 group-hover:text-white'>{cat}</span>
                                </Button>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 border-white/10 bg-zinc-900/50 backdrop-blur-3xl text-white hover:bg-white hover:text-black transition-all duration-500" />
                <CarouselNext className="hidden md:flex -right-12 border-white/10 bg-zinc-900/50 backdrop-blur-3xl text-white hover:bg-white hover:text-black transition-all duration-500" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel