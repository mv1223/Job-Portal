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
        <div className='py-24 bg-slate-50/50'>
            <div className='max-w-7xl mx-auto px-4'>
                <div className='text-center mb-16'>
                    <h2 className='text-4xl font-black text-slate-900 mb-4'>Explore Careers Across Every Field</h2>
                    <p className='text-slate-500 font-medium'>Discover a wide range of career opportunities across every industry.</p>
                </div>
                
                <Carousel className="w-full">
                    <CarouselContent className="-ml-4">
                        {
                            category.map((cat, index) => (
                                <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Button 
                                            onClick={() => searchJobHandler(cat)} 
                                            variant="outline" 
                                            className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-2xl border-slate-100 bg-white shadow-sm hover:border-indigo-200 hover:bg-white hover:shadow-xl hover:shadow-indigo-100/50 transition-all group p-4"
                                        >
                                            <div className='w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 transition-colors'>
                                                <Zap className='h-5 w-5 text-indigo-600 group-hover:text-white transition-colors' />
                                            </div>
                                            <span className='font-bold text-slate-700 text-xs tracking-tight'>{cat}</span>
                                        </Button>
                                    </motion.div>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <div className='flex justify-center gap-4 mt-12'>
                        <CarouselPrevious className="static translate-y-0 h-12 w-12 border-slate-200 text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm" />
                        <CarouselNext className="static translate-y-0 h-12 w-12 border-slate-200 text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm" />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel