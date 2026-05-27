import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { SlidersHorizontal } from 'lucide-react'

const fitlerData = [
    {
        fitlerType: "Job Type",
        array: ["Full-time", "Remote", "Part-time", "Contract", "Internship", "Freelance"]
    },
    {
        fitlerType: "Work Mode",
        array: ["Online", "Offline", "Hybrid"]
    },
    {
        fitlerType: "Experience Level",
        array: ["Entry Level", "Mid Level", "Senior", "Director+"]
    },
    {
        fitlerType: "Salary Range (LPA)",
        array: ["0-8L", "8L-20L", "20L-50L", "50L+"]
    },
    {
        fitlerType: "Company Size",
        array: ["Startup (1–50)", "Mid-size (51–500)", "Enterprise (500+)"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full bg-white rounded-[30px] border border-[#ececec] p-7 shadow-sm'>

            {/* Header */}
            <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-xl bg-[#eef8d8] flex items-center justify-center'>
                        <SlidersHorizontal className='w-5 h-5 text-[#7baa2d]' />
                    </div>

                    <div>
                        <h1 className='font-bold text-lg text-[#1d1d1d]'>
                            Filters
                        </h1>
                        <p className='text-sm text-[#777]'>
                            Narrow your search
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => setSelectedValue('')}
                    className='text-sm font-medium text-[#7baa2d] hover:text-[#64891f] transition-colors'
                >
                    Clear
                </button>
            </div>

            {/* Filter Sections */}
            <div className='space-y-8'>
                {fitlerData.map((data, index) => (
                    <div
                        key={index}
                        className='border-b border-[#f1f1f1] pb-6 last:border-none'
                    >
                        <h1 className='text-sm font-semibold text-[#1d1d1d] mb-5'>
                            {data.fitlerType}
                        </h1>

                        <RadioGroup
                            value={selectedValue}
                            onValueChange={changeHandler}
                            className="space-y-3"
                        >
                            {data.array.map((item, idx) => {
                                const itemId = `id${index}-${idx}`

                                return (
                                    <div
                                        key={itemId}
                                        className='flex items-center justify-between bg-[#fafafa] hover:bg-[#eef8d8] transition-all rounded-2xl px-4 py-3 cursor-pointer group'
                                    >
                                        <div className='flex items-center gap-3'>
                                            <RadioGroupItem
                                                value={item}
                                                id={itemId}
                                                className="border-[#cfcfcf] text-[#7baa2d]"
                                            />

                                            <Label
                                                htmlFor={itemId}
                                                className="text-sm font-medium text-[#555] cursor-pointer group-hover:text-black transition-colors"
                                            >
                                                {item}
                                            </Label>
                                        </div>

                                        <span className='text-xs text-[#999] font-medium'>
                                            {Math.floor(Math.random() * 1000)}+
                                        </span>
                                    </div>
                                )
                            })}
                        </RadioGroup>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterCard