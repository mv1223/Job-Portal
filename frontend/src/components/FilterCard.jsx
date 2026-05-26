import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Remote", "Chennai", "Gurgaon", "Noida"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "UI/UX Designer", "Data Science", "DevOps", "Mobile Developer", "Machine Learning", "Software Testing"]
    },
    {
        fitlerType: "Job Type",
        array: ["Full Time", "Part Time", "Internship", "Freelance", "Contract", "Temporary", "Volunteer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh", "5lakh to 10lakh", "10-20 Lakhs", "20-50 Lakhs"]
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
        <div className='w-full bg-white p-6 rounded-2xl shadow-sm border border-slate-200'>
            <div className='flex items-center justify-between mb-4'>
                <h1 className='font-bold text-xl text-slate-900'>Filters</h1>
                <button 
                    onClick={() => setSelectedValue('')}
                    className='text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wider transition-colors'
                >
                    Reset
                </button>
            </div>
            
            <div className='space-y-8'>
                {
                    fitlerData.map((data, index) => (
                        <div key={index} className='border-t border-slate-100 pt-6 first:border-t-0 first:pt-0'>
                            <h1 className='font-bold text-sm text-slate-400 uppercase tracking-widest mb-4'>{data.fitlerType}</h1>
                            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="gap-3">
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div key={itemId} className='flex items-center space-x-3 group cursor-pointer'>
                                                <RadioGroupItem value={item} id={itemId} className="border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                                                <Label 
                                                    htmlFor={itemId} 
                                                    className="text-sm font-medium text-slate-600 cursor-pointer group-hover:text-indigo-600 transition-colors py-0.5"
                                                >
                                                    {item}
                                                </Label>
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