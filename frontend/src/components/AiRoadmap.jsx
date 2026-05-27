import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Map, BookOpen, Clock, CheckCircle2, ChevronRight, BrainCircuit, Rocket, Target } from 'lucide-react';

const AiRoadmap = () => {
    const [role, setRole] = useState("");
    const [generating, setGenerating] = useState(false);
    const [roadmap, setRoadmap] = useState(null);

    const generateRoadmap = () => {
        if (!role) return;
        setGenerating(true);
        
        // Simulate AI Generation
        setTimeout(() => {
            const mockRoadmap = {
                title: role,
                duration: "6-8 Months",
                steps: [
                    {
                        step: "Step 1",
                        title: "Foundations & Core Language",
                        desc: "Master the fundamental programming concepts and syntax of the primary language.",
                        courses: ["Python for Everybody (Coursera)", "CS50P (Harvard)"],
                        duration: "4 Weeks",
                        skills: ["Syntax", "Data Types", "Control Flow"]
                    },
                    {
                        step: "Step 2",
                        title: "Data Structures & Algorithms",
                        desc: "Learn how to organize data efficiently and solve complex problems.",
                        courses: ["Data Structures and Algorithms Specialization (UC San Diego)", "LeetCode Explore"],
                        duration: "6 Weeks",
                        skills: ["Arrays", "Linked Lists", "Sorting", "Complexity"]
                    },
                    {
                        step: "Step 3",
                        title: "Core Domain Knowledge",
                        desc: "Deep dive into the specific technologies for " + role,
                        courses: ["Machine Learning Specialization (DeepLearning.AI)", "Fast.ai"],
                        duration: "8 Weeks",
                        skills: ["Numpy", "Pandas", "Scikit-Learn"]
                    },
                    {
                        step: "Step 4",
                        title: "Advanced Specialization",
                        desc: "Focus on professional-grade tools and industry standards.",
                        courses: ["Deep Learning Specialization", "TensorFlow Developer Certificate"],
                        duration: "8 Weeks",
                        skills: ["Neural Networks", "PyTorch", "Deployment"]
                    },
                    {
                        step: "Step 5",
                        title: "Portfolio & Projects",
                        desc: "Build real-world applications to showcase your expertise.",
                        courses: ["Full Stack Open", "Kaggle Competitions"],
                        duration: "Ongoing",
                        skills: ["Git", "System Design", "API Integration"]
                    }
                ]
            };
            setRoadmap(mockRoadmap);
            setGenerating(false);
        }, 2000);
    };

    return (
        <div className='min-h-screen bg-white selection:bg-cyan-100 selection:text-cyan-900'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-6 py-32 relative'>
                {/* Sui-style Background Blurs */}
                <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                    <div className='absolute top-0 right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-50/40 blur-[100px]' />
                    <div className='absolute bottom-0 left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-50/40 blur-[100px]' />
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className='text-center mb-24 relative z-10'
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='inline-flex items-center gap-3 bg-white px-6 py-2 rounded-full border border-slate-100 shadow-sm mb-8'
                    >
                        <Sparkles className='h-4 w-4 text-cyan-500' />
                        <span className='text-[10px] font-black uppercase tracking-[0.3em] text-slate-500'>Sui-Powered Career Intelligence</span>
                    </motion.div>
                    <h1 className='text-7xl md:text-9xl font-black text-slate-900 mb-8 tracking-tighter leading-none'>
                        AI Career <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600'>Roadmap</span>
                    </h1>
                    <p className='text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight'>
                        Define your destination. Our AI architects the most efficient path to your career goals.
                    </p>
                </motion.div>

                <div className='max-w-4xl mx-auto mb-32 relative z-10'>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className='relative group'
                    >
                        <div className='absolute -inset-1 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-[2.5rem] blur opacity-10 group-hover:opacity-30 transition duration-1000' />
                        <div className='relative flex items-center p-3 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50'>
                            <Input 
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="What's your dream role? (e.g. AI Engineer)" 
                                className='flex-1 border-none shadow-none text-xl font-bold h-16 pl-8 focus-visible:ring-0 placeholder:text-slate-300'
                            />
                            <Button 
                                onClick={generateRoadmap}
                                disabled={generating || !role}
                                className='h-16 px-12 rounded-[2rem] bg-slate-900 hover:bg-black text-white font-black text-lg transition-all active:scale-95 shadow-xl'
                            >
                                {generating ? <BrainCircuit className='animate-spin mr-3' /> : <Target className='mr-3' />}
                                {generating ? "Mapping..." : "Generate Path"}
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {roadmap && (
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className='grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10'
                        >
                            {/* Roadmap Steps */}
                            <div className='lg:col-span-8 space-y-12'>
                                {roadmap.steps.map((step, idx) => (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.15 }}
                                        key={idx}
                                        className='relative pl-20'
                                    >
                                        {idx !== roadmap.steps.length - 1 && (
                                            <div className='absolute left-[31px] top-16 bottom-[-48px] w-[2px] bg-slate-100' />
                                        )}
                                        <div className='absolute left-0 top-0 w-16 h-16 rounded-3xl bg-white border border-slate-100 flex items-center justify-center z-10 shadow-xl shadow-slate-100 group hover:border-cyan-500 transition-colors duration-500'>
                                            <span className='text-slate-900 font-black text-xl'>{idx + 1}</span>
                                        </div>
                                        
                                        <div className='bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-700 group'>
                                            <div className='flex items-center justify-between mb-8'>
                                                <h3 className='text-3xl font-black text-slate-900 tracking-tight group-hover:text-cyan-500 transition-colors'>{step.title}</h3>
                                                <div className='flex items-center gap-2 text-cyan-600 bg-cyan-50 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest'>
                                                    <Clock size={14} />
                                                    {step.duration}
                                                </div>
                                            </div>
                                            <p className='text-lg text-slate-400 font-medium mb-10 leading-relaxed'>{step.desc}</p>
                                            
                                            <div className='grid md:grid-cols-2 gap-10'>
                                                <div className='p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100'>
                                                    <h4 className='text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2'>
                                                        <BookOpen size={14} className='text-cyan-500' /> Learning Resources
                                                    </h4>
                                                    <ul className='space-y-4'>
                                                        {step.courses.map((c, i) => (
                                                            <li key={i} className='flex items-center gap-3 text-sm font-bold text-slate-700 hover:text-cyan-500 cursor-pointer transition-colors'>
                                                                <ChevronRight size={16} className='text-cyan-300' />
                                                                {c}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className='p-8 rounded-[2rem] bg-slate-50/50 border border-slate-100'>
                                                    <h4 className='text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-2'>
                                                        <CheckCircle2 size={14} className='text-indigo-500' /> Mastered Skills
                                                    </h4>
                                                    <div className='flex flex-wrap gap-3'>
                                                        {step.skills.map((s, i) => (
                                                            <span key={i} className='px-4 py-2 bg-white text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100 shadow-sm'>
                                                                {s}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Summary Sidebar */}
                            <div className='lg:col-span-4'>
                                <div className='bg-slate-900 p-10 rounded-[3.5rem] text-white sticky top-32 shadow-2xl shadow-indigo-900/20'>
                                    <div className='flex items-center gap-5 mb-12'>
                                        <div className='w-16 h-16 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-cyan-500/20'>
                                            <Rocket className='h-8 w-8 text-white' />
                                        </div>
                                        <div>
                                            <h3 className='text-2xl font-black tracking-tight'>Success Path</h3>
                                            <p className='text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1'>{roadmap.duration} Plan</p>
                                        </div>
                                    </div>
                                    
                                    <div className='space-y-10'>
                                        <div>
                                            <div className='flex justify-between text-[10px] font-black uppercase tracking-widest mb-4'>
                                                <span className='text-slate-400'>Current Momentum</span>
                                                <span className='text-cyan-400'>Preparing...</span>
                                            </div>
                                            <div className='w-full bg-white/5 h-4 rounded-full overflow-hidden border border-white/5'>
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '15%' }}
                                                    className='h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full' 
                                                />
                                            </div>
                                        </div>

                                        <div className='p-8 rounded-[2.5rem] bg-white/5 border border-white/10'>
                                            <h4 className='text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6'>Architect's Advice</h4>
                                            <ul className='space-y-6'>
                                                <li className='flex gap-4 text-sm text-slate-300 font-medium leading-relaxed'>
                                                    <div className='w-6 h-6 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0'><CheckCircle2 size={16} className='text-cyan-500' /></div>
                                                    Build proof-of-work projects for every milestone.
                                                </li>
                                                <li className='flex gap-4 text-sm text-slate-300 font-medium leading-relaxed'>
                                                    <div className='w-6 h-6 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0'><CheckCircle2 size={16} className='text-indigo-500' /></div>
                                                    Network with architects in your target domain.
                                                </li>
                                            </ul>
                                        </div>

                                        <Button className='w-full h-16 rounded-[2rem] bg-white hover:bg-slate-100 text-slate-900 font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95'>
                                            Export Strategy
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AiRoadmap;
