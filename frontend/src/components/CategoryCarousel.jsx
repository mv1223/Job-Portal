import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from './ui/carousel';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

import {
    Palette,
    Users,
    Landmark,
    Headphones,
    Briefcase,
    Zap,
    Database,
    Cloud,
    ShieldCheck,
    ArrowUpRight
} from 'lucide-react';

import { motion } from 'framer-motion';

const category = [
    {
        name: "Design & Development",
        icon: Palette
    },
    {
        name: "Human Research",
        icon: Users
    },
    {
        name: "Finance Management",
        icon: Landmark
    },
    {
        name: "Customer Support",
        icon: Headphones
    },
    {
        name: "Project Management",
        icon: Briefcase
    },
    {
        name: "Marketing & Sales",
        icon: Zap
    },
    {
        name: "Data Science",
        icon: Database
    },
    {
        name: "DevOps",
        icon: Cloud
    },
    {
        name: "Cybersecurity",
        icon: ShieldCheck
    }
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-14"
            >
                <span className="bg-[#B7F34D] text-[#111827] px-5 py-2 rounded-full text-sm font-semibold">
                    Explore Categories
                </span>

                <h2 className="text-5xl md:text-6xl font-bold text-[#111827] mt-6 tracking-tight">
                    Discover Career Paths
                </h2>

                <p className="text-gray-500 text-lg mt-4 max-w-2xl mx-auto">
                    Explore opportunities across industries and
                    find the role that fits your passion.
                </p>
            </motion.div>

            {/* Carousel */}
            <Carousel className="relative">

                <CarouselContent className="-ml-2">

                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-2"
                        >
                            <motion.div
                                whileHover={{
                                    y: -10
                                }}
                                transition={{
                                    duration: 0.25
                                }}
                            >
                                <button
                                    onClick={() =>
                                        searchJobHandler(cat.name)
                                    }
                                    className="
                                        w-full
                                        bg-white
                                        rounded-[30px]
                                        border
                                        border-[#ececec]
                                        p-8
                                        hover:shadow-2xl
                                        transition-all
                                        duration-300
                                        text-left
                                        group
                                    "
                                >

                                    {/* Icon */}
                                    <div className="w-16 h-16 rounded-[22px] bg-[#B7F34D] flex items-center justify-center mb-8">

                                        <cat.icon
                                            size={28}
                                            className="text-[#111827]"
                                        />
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-[#111827] leading-snug mb-3">
                                        {cat.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Explore jobs and opportunities
                                        in {cat.name.toLowerCase()}.
                                    </p>

                                    {/* Arrow */}
                                    <div className="mt-8 flex justify-end">

                                        <div className="
                                            w-12 h-12
                                            rounded-full
                                            bg-[#f5f7f4]
                                            flex
                                            items-center
                                            justify-center
                                            group-hover:bg-[#B7F34D]
                                            transition
                                        ">
                                            <ArrowUpRight
                                                size={18}
                                                className="text-[#111827]"
                                            />
                                        </div>
                                    </div>
                                </button>
                            </motion.div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Arrows */}
                <CarouselPrevious
                    className="
                        hidden md:flex
                        -left-5
                        bg-white
                        border-[#ececec]
                        shadow-md
                        hover:bg-[#B7F34D]
                        transition
                    "
                />

                <CarouselNext
                    className="
                        hidden md:flex
                        -right-5
                        bg-white
                        border-[#ececec]
                        shadow-md
                        hover:bg-[#B7F34D]
                        transition
                    "
                />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;