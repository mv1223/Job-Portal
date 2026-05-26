import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='my-20 max-w-7xl mx-auto px-4'>
            <div className='flex items-center justify-between mb-10'>
                <div>
                    <h2 className='text-3xl font-black text-slate-900'>Explore by <span className='text-indigo-600'>Category</span></h2>
                    <p className='text-slate-500 font-medium mt-1'>Find your specialty among 1,000+ active listings</p>
                </div>
                <div className='flex gap-2'>
                    <CarouselPrevious className="static translate-y-0 h-10 w-10 border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600" />
                    <CarouselNext className="static translate-y-0 h-10 w-10 border-slate-200 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600" />
                </div>
            </div>
            <Carousel className="w-full">
                <CarouselContent className="-ml-4">
                    {
                        category.map((cat, index) => (
                            <CarouselItem key={index} className="pl-4 md:basis-1/3 lg:basis-1/5">
                                <Button 
                                    onClick={() => searchJobHandler(cat)} 
                                    variant="outline" 
                                    className="w-full h-16 rounded-2xl border-slate-100 bg-white shadow-sm hover:border-indigo-200 hover:bg-indigo-50/50 hover:shadow-indigo-100 transition-all font-bold text-slate-700"
                                >
                                    {cat}
                                </Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default CategoryCarousel