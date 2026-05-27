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
        <div className='w-full max-w-7xl mx-auto my-20 px-4'>
            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className='text-center mb-12'
            >
                <h2 className='text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 mb-4'>Categories</h2>
                <h3 className='text-4xl font-black text-slate-900 tracking-tight'>Browse by Interest</h3>
            </motion.div>
            
            <Carousel className="w-full relative">
                <CarouselContent className="gap-6 px-4">
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/4 lg:basis-1/5 pl-0">
                            <motion.div
                                whileHover={{ y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    variant="outline" 
                                    className="w-full h-32 flex flex-col items-center justify-center gap-4 rounded-[2rem] border-slate-100 bg-white hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-slate-200"
                                >
                                    <div className='p-3 rounded-xl bg-slate-50 group-hover:bg-white/10 transition-colors'>
                                        <Zap size={20} className='text-cyan-500' />
                                    </div>
                                    <span className='font-black text-xs uppercase tracking-widest'>{cat}</span>
                                </Button>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12 border-none bg-slate-50 hover:bg-white shadow-sm" />
                <CarouselNext className="hidden md:flex -right-12 border-none bg-slate-50 hover:bg-white shadow-sm" />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel