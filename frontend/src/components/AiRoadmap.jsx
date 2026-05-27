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
        <div className='min-h-screen bg-[#FDFCFD]'>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 py-20'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='text-center mb-16'
                >
                    <div className='inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-6'>
                        <Sparkles className='h-4 w-4 text-indigo-600' />
                        <span className='text-sm font-semibold text-indigo-700 uppercase tracking-wider'>Powered by Gemini AI</span>
                    </div>
                    <h1 className='text-6xl font-black text-slate-900 mb-6'>AI Career <span className='text-indigo-600'>Roadmap</span></h1>
                    <p className='text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed'>
                        Tell us your dream role, and our AI will craft a personalized step-by-step path to help you achieve it.
                    </p>
                </motion.div>

                <div className='max-w-3xl mx-auto mb-20'>
                    <div className='relative flex items-center p-2 bg-white rounded-[2rem] border border-slate-200 shadow-xl group hover:border-indigo-200 transition-all duration-500'>
                        <Input 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g. I want to become an AI Engineer" 
                            className='flex-1 border-none shadow-none text-lg font-bold h-16 pl-8 focus-visible:ring-0 placeholder:text-slate-300'
                        />
                        <Button 
                            onClick={generateRoadmap}
                            disabled={generating || !role}
                            className='h-14 px-10 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg transition-all active:scale-95'
                        >
                            {generating ? <BrainCircuit className='animate-spin mr-2' /> : <Target className='mr-2' />}
                            {generating ? "Crafting..." : "Generate"}
                        </Button>
                    </div>
                </div>

                <AnimatePresence>
                    {roadmap && (
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            className='grid grid-cols-1 lg:grid-cols-3 gap-10'
                        >
                            {/* Roadmap Steps */}
                            <div className='lg:col-span-2 space-y-8'>
                                {roadmap.steps.map((step, idx) => (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        key={idx}
                                        className='relative pl-12 group'
                                    >
                                        {idx !== roadmap.steps.length - 1 && (
                                            <div className='absolute left-[23px] top-10 bottom-[-40px] w-1 bg-slate-100 group-hover:bg-indigo-100 transition-colors' />
                                        )}
                                        <div className='absolute left-0 top-0 w-12 h-12 rounded-2xl bg-white border-4 border-indigo-50 flex items-center justify-center z-10 shadow-sm group-hover:border-indigo-600 group-hover:bg-indigo-600 transition-all duration-500'>
                                            <span className='text-indigo-600 font-black group-hover:text-white'>{idx + 1}</span>
                                        </div>
                                        
                                        <div className='bg-white p-8 rounded-3xl border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:border-indigo-100 transition-all duration-500'>
                                            <div className='flex items-center justify-between mb-4'>
                                                <h3 className='text-2xl font-black text-slate-900'>{step.title}</h3>
                                                <div className='flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider'>
                                                    <Clock size={14} />
                                                    {step.duration}
                                                </div>
                                            </div>
                                            <p className='text-slate-500 font-medium mb-6 leading-relaxed'>{step.desc}</p>
                                            
                                            <div className='grid md:grid-cols-2 gap-6'>
                                                <div>
                                                    <h4 className='text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2'>
                                                        <BookOpen size={12} /> Recommended Courses
                                                    </h4>
                                                    <ul className='space-y-2'>
                                                        {step.courses.map((c, i) => (
                                                            <li key={i} className='flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-indigo-600 cursor-pointer transition-colors'>
                                                                <ChevronRight size={14} className='text-indigo-400' />
                                                                {c}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className='text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2'>
                                                        <CheckCircle2 size={12} /> Core Skills
                                                    </h4>
                                                    <div className='flex flex-wrap gap-2'>
                                                        {step.skills.map((s, i) => (
                                                            <span key={i} className='px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-xs font-bold border border-slate-100'>
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
                            <div className='space-y-8'>
                                <div className='bg-slate-900 p-8 rounded-[2.5rem] text-white sticky top-28'>
                                    <div className='flex items-center gap-4 mb-8'>
                                        <div className='w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center'>
                                            <Rocket className='h-6 w-6' />
                                        </div>
                                        <div>
                                            <h3 className='text-xl font-black'>Path to Success</h3>
                                            <p className='text-indigo-400 text-xs font-bold uppercase tracking-wider'>{roadmap.duration} Estimate</p>
                                        </div>
                                    </div>
                                    
                                    <div className='space-y-6'>
                                        <div>
                                            <div className='flex justify-between text-sm font-bold mb-2'>
                                                <span className='text-slate-400 uppercase tracking-widest'>Progress tracking</span>
                                                <span className='text-indigo-400'>0%</span>
                                            </div>
                                            <div className='w-full bg-white/10 h-3 rounded-full overflow-hidden'>
                                                <div className='w-0 h-full bg-indigo-500 rounded-full' />
                                            </div>
                                        </div>

                                        <div className='p-6 bg-white/5 rounded-2xl border border-white/5'>
                                            <h4 className='text-sm font-black uppercase tracking-widest mb-4'>Quick Tips</h4>
                                            <ul className='space-y-4'>
                                                <li className='flex gap-3 text-sm text-slate-300 font-medium'>
                                                    <CheckCircle2 size={18} className='text-indigo-500 shrink-0' />
                                                    Consistency is more important than speed.
                                                </li>
                                                <li className='flex gap-3 text-sm text-slate-300 font-medium'>
                                                    <CheckCircle2 size={18} className='text-indigo-500 shrink-0' />
                                                    Build one project for every step you complete.
                                                </li>
                                            </ul>
                                        </div>

                                        <Button className='w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black'>
                                            Download Roadmap PDF
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
