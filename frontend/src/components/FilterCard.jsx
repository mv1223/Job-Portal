import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

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

    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);

    return (
        <div className='w-full bg-[#0a0a0a] p-0'>
            <div className='flex items-center justify-between mb-8'>
                <h1 className='font-bold text-[15px] text-white'>Filters</h1>
                <button 
                    onClick={() => setSelectedValue('')}
                    className='text-[10px] font-bold text-primary hover:text-primary/80 uppercase tracking-widest transition-colors'
                >
                    Clear All
                </button>
            </div>
            
            <div className='space-y-10'>
                {
                    fitlerData.map((data, index) => (
                        <div key={index} className='sidebar-section'>
                            <h1 className='text-[11px] font-bold text-[#444] uppercase tracking-[0.8px] mb-4'>{data.fitlerType}</h1>
                            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="gap-2">
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div key={itemId} className='flex items-center justify-between group cursor-pointer py-1.5'>
                                                <div className='flex items-center space-x-3'>
                                                    <RadioGroupItem value={item} id={itemId} className="border-[#2a2a2a] bg-[#111] text-primary focus:ring-primary h-4 w-4" />
                                                    <Label 
                                                        htmlFor={itemId} 
                                                        className="text-[13px] font-medium text-[#888] cursor-pointer group-hover:text-white transition-colors"
                                                    >
                                                        {item}
                                                    </Label>
                                                </div>
                                                <span className='text-[11px] text-[#444] font-medium'>{Math.floor(Math.random() * 1000)}+</span>
                                            </div>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FilterCard