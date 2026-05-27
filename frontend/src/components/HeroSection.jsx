import React, { useState } from 'react'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, ArrowRight } from 'lucide-react'

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <section className="px-6 pt-10 pb-20 bg-[#f5f7f4]">
            <div className="max-w-7xl mx-auto">

                {/* Main Hero Card */}
                <div className="bg-[#B7F34D] rounded-[45px] overflow-hidden relative px-8 md:px-16 py-16 md:py-24 shadow-xl">

                    {/* Top Badge */}
                    <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 shadow-sm mb-8">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-[#111827]">
                            2,400+ new jobs added this week
                        </span>
                    </div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center">

                        {/* Left Content */}
                        <div>

                            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-[#111827] tracking-tight">
                                Find work
                                <br />
                                that actually
                                <span className="block text-white">
                                    fits you.
                                </span>
                            </h1>

                            <p className="text-[#374151] text-lg mt-8 max-w-xl leading-relaxed">
                                Search through thousands of verified jobs
                                from top companies and discover career
                                opportunities built for your future.
                            </p>

                            {/* Search Box */}
                            <div className="bg-white rounded-[28px] shadow-xl p-3 mt-10 max-w-2xl">

                                <div className="flex flex-col lg:flex-row items-center gap-3">

                                    <div className="flex items-center flex-1 w-full px-4">
                                        <Search className="w-5 h-5 text-gray-400" />

                                        <input
                                            type="text"
                                            placeholder="Job title, keyword or company"
                                            onChange={(e) =>
                                                setQuery(e.target.value)
                                            }
                                            className="w-full border-none outline-none bg-transparent px-4 py-4 text-[#111827]"
                                        />
                                    </div>

                                    <div className="hidden lg:block w-[1px] h-10 bg-gray-200" />

                                    <div className="flex items-center flex-1 w-full px-4">
                                        <MapPin className="w-5 h-5 text-gray-400" />

                                        <input
                                            type="text"
                                            placeholder="Location or Remote"
                                            className="w-full border-none outline-none bg-transparent px-4 py-4 text-[#111827]"
                                        />
                                    </div>

                                    <Button
                                        onClick={searchJobHandler}
                                        className="bg-[#111827] hover:bg-black text-white rounded-full px-8 py-6 text-base font-semibold h-auto"
                                    >
                                        Search Jobs
                                    </Button>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-10 mt-12">

                                <div>
                                    <h3 className="text-3xl font-bold text-[#111827]">
                                        84K+
                                    </h3>
                                    <p className="text-gray-700 mt-1">
                                        Active Jobs
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold text-[#111827]">
                                        12K+
                                    </h3>
                                    <p className="text-gray-700 mt-1">
                                        Companies Hiring
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold text-[#111827]">
                                        1.4M+
                                    </h3>
                                    <p className="text-gray-700 mt-1">
                                        Candidates Placed
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Cards */}
                        <div className="relative hidden lg:flex justify-center">

                            <div className="bg-white rounded-[32px] p-8 shadow-xl w-[340px] rotate-[-6deg] absolute left-0 top-10">
                                <h3 className="font-bold text-xl text-[#111827]">
                                    Top Companies Hiring
                                </h3>

                                <div className="space-y-4 mt-6">
                                    {[
                                        "Google",
                                        "Microsoft",
                                        "Amazon",
                                        "Meta"
                                    ].map((company) => (
                                        <div
                                            key={company}
                                            className="flex items-center justify-between border-b pb-3"
                                        >
                                            <span className="font-medium">
                                                {company}
                                            </span>

                                            <ArrowRight
                                                size={18}
                                                className="text-[#B7F34D]"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#111827] text-white rounded-[32px] p-8 shadow-xl w-[320px] rotate-[8deg] ml-32 mt-40">
                                <h3 className="font-bold text-2xl">
                                    10,000+
                                </h3>

                                <p className="text-gray-300 mt-2">
                                    Companies trust HireSync for hiring
                                    top talent globally.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;