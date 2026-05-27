import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    MapPin,
    Briefcase,
    IndianRupee,
    ArrowUpRight
} from 'lucide-react'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() =>
                navigate(`/description/${job._id}`)
            }
            className="
                bg-white
                rounded-[32px]
                border
                border-[#ececec]
                p-7
                cursor-pointer
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                group
                h-full
                flex
                flex-col
            "
        >

            {/* Company */}
            <div className="flex items-start justify-between mb-6">

                <div className="flex items-center gap-4">

                    <div className="w-16 h-16 rounded-[22px] bg-[#f5f7f4] border border-[#ececec] p-3 flex items-center justify-center overflow-hidden">

                        <img
                            src={
                                job?.company?.logo ||
                                "https://www.vectorlogo.zone/logos/google/google-icon.svg"
                            }
                            alt={job?.company?.name}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div>
                        <h2 className="font-bold text-lg text-[#111827]">
                            {job?.company?.name}
                        </h2>

                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                            <MapPin size={15} />
                            {job?.location || "Remote"}
                        </div>
                    </div>
                </div>

                <div className="w-11 h-11 rounded-full bg-[#B7F34D] flex items-center justify-center group-hover:scale-110 transition">
                    <ArrowUpRight
                        size={18}
                        className="text-[#111827]"
                    />
                </div>
            </div>

            {/* Job Title */}
            <div className="flex-grow">

                <h1 className="text-2xl font-bold text-[#111827] leading-tight mb-4 group-hover:text-black transition">
                    {job?.title}
                </h1>

                <p className="text-gray-500 leading-relaxed line-clamp-3">
                    {job?.description}
                </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mt-8">

                <div className="bg-[#f5f7f4] rounded-full px-5 py-2 flex items-center gap-2 text-sm font-medium text-[#111827]">
                    <Briefcase size={15} />
                    {job?.jobType}
                </div>

                <div className="bg-[#B7F34D] rounded-full px-5 py-2 flex items-center gap-2 text-sm font-semibold text-[#111827]">
                    <IndianRupee size={15} />
                    {job?.salary} LPA
                </div>
            </div>
        </div>
    )
}

export default LatestJobCards