import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Briefcase, MapPin } from 'lucide-react'

const salariesData = [
    { role: "Frontend Developer", range: "₹6L - ₹18L", average: "₹10.5L", trend: "+12%" },
    { role: "Backend Developer", range: "₹7L - ₹22L", average: "₹12L", trend: "+15%" },
    { role: "Full Stack Developer", range: "₹8L - ₹25L", average: "₹14L", trend: "+18%" },
    { role: "Data Scientist", range: "₹10L - ₹30L", average: "₹16.5L", trend: "+20%" },
    { role: "UI/UX Designer", range: "₹5L - ₹15L", average: "₹8.5L", trend: "+10%" },
    { role: "DevOps Engineer", range: "₹9L - ₹24L", average: "₹13.5L", trend: "+14%" },
]

const Salaries = () => {
    return (
        <div className='bg-[#0a0a0a] min-h-screen font-sans'>
            <Navbar />
            <div className='noise-bg' />
            <div className='max-w-7xl mx-auto pt-32 px-6 pb-20 relative z-10'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-center mb-20'
                >
                    <h1 className='text-5xl md:text-6xl font-bold text-white tracking-tighter mb-6'>Market <span className='text-primary'>Intelligence</span></h1>
                    <p className='text-[#666] text-lg max-w-2xl mx-auto'>Explore real-time salary benchmarks across the industry to ensure your compensation matches your expertise.</p>
                </motion.div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {salariesData.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className='p-8 rounded-2xl bg-[#0e0e0e] border border-[#1a1a1a] hover:border-primary/30 transition-all group'
                        >
                            <div className='flex items-center justify-between mb-6'>
                                <div className='w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary'>
                                    <Briefcase size={22} />
                                </div>
                                <div className='flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest'>
                                    <TrendingUp size={12} /> {item.trend}
                                </div>
                            </div>
                            <h3 className='text-white font-bold text-xl mb-2 tracking-tight'>{item.role}</h3>
                            <div className='flex items-center gap-2 text-[#555] text-sm mb-8 font-medium'>
                                <MapPin size={14} /> India · Market Average
                            </div>
                            
                            <div className='space-y-4'>
                                <div className='flex items-center justify-between'>
                                    <span className='text-[11px] font-bold uppercase tracking-widest text-[#444]'>Average</span>
                                    <span className='text-white font-bold text-lg'>{item.average}</span>
                                </div>
                                <div className='w-full h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden'>
                                    <div className='h-full bg-primary w-2/3' />
                                </div>
                                <div className='flex items-center justify-between text-[#555] text-[11px] font-bold'>
                                    <span>Range</span>
                                    <span>{item.range}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Salaries
