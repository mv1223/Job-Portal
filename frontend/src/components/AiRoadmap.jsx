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
        <div className='min-h-screen bg-black selection:bg-primary selection:text-white'>
            <Navbar />
            <div className='noise-bg' />
            <div className='max-w-7xl mx-auto px-6 py-40 relative'>
                {/* Sui-style Background Blurs */}
                <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                    <div className='absolute top-0 right-[-10%] w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px]' />
                    <div className='absolute bottom-0 left-[-10%] w-[800px] h-[800px] rounded-full bg-blue-500/10 blur-[120px]' />
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className='text-center mb-32 relative z-10'
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='inline-flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10 backdrop-blur-md shadow-2xl mb-10'
                    >
                        <Sparkles className='h-4 w-4 text-primary' />
                        <span className='text-[10px] font-black uppercase tracking-[0.5em] text-white/60'>Architecting Your Legacy</span>
                    </motion.div>
                    <h1 className='text-7xl md:text-9xl font-bold text-white mb-10 tracking-tighter leading-none'>
                        AI Career <br />
                        <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-emerald-400'>Intelligence</span>
                    </h1>
                    <p className='text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight'>
                        Define your destination. Our neural networks architect the most efficient trajectory to your professional peak.
                    </p>
                </motion.div>

                <div className='max-w-4xl mx-auto mb-40 relative z-10'>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className='relative group'
                    >
                        <div className='absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-[2rem] blur opacity-10 group-hover:opacity-30 transition duration-1000' />
                        <div className='relative flex items-center p-3 bg-zinc-900/50 backdrop-blur-3xl rounded-[2rem] border border-white/10 shadow-2xl'>
                            <Input 
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="What's your dream role? (e.g. AI Engineer)" 
                                className='flex-1 border-none shadow-none text-xl font-bold h-16 pl-8 focus-visible:ring-0 bg-transparent text-white placeholder:text-white/10'
                            />
                            <Button 
                                onClick={generateRoadmap}
                                disabled={generating || !role}
                                className='h-16 px-12 rounded-[1.5rem] bg-white text-black hover:bg-white/90 font-black text-lg transition-all active:scale-95 shadow-xl'
                            >
                                {generating ? <BrainCircuit className='animate-spin mr-3' /> : <Target className='mr-3' />}
                                {generating ? "Architecting..." : "Generate Path"}
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <AnimatePresence>
                    {roadmap && (
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className='grid grid-cols-1 lg:grid-cols-12 gap-20 relative z-10'
                        >
                            {/* Roadmap Steps */}
                            <div className='lg:col-span-8 space-y-20'>
                                {roadmap.steps.map((step, idx) => (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.2 }}
                                        key={idx}
                                        className='relative pl-24'
                                    >
                                        {idx !== roadmap.steps.length - 1 && (
                                            <div className='absolute left-[39px] top-20 bottom-[-60px] w-[1px] bg-white/10' />
                                        )}
                                        <div className='absolute left-0 top-0 w-20 h-20 rounded-[2.5rem] bg-zinc-900 border border-white/10 flex items-center justify-center z-10 shadow-2xl group hover:border-primary transition-colors duration-700'>
                                            <span className='text-white font-bold text-2xl'>{idx + 1}</span>
                                        </div>
                                        
                                        <div className='bg-zinc-900/50 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-white/5 shadow-sm hover:border-white/10 transition-all duration-1000 group'>
                                            <div className='flex items-center justify-between mb-10'>
                                                <h3 className='text-3xl font-bold text-white tracking-tight group-hover:text-primary transition-colors'>{step.title}</h3>
                                                <div className='flex items-center gap-2 text-primary bg-primary/10 px-5 py-2 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em]'>
                                                    <Clock size={14} />
                                                    {step.duration}
                                                </div>
                                            </div>
                                            <p className='text-lg text-white/40 font-medium mb-12 leading-relaxed'>{step.desc}</p>
                                            
                                            <div className='grid md:grid-cols-2 gap-12'>
                                                <div className='p-10 rounded-[2.5rem] bg-white/5 border border-white/5'>
                                                    <h4 className='text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-8 flex items-center gap-2'>
                                                        <BookOpen size={14} className='text-primary' /> Curriculum
                                                    </h4>
                                                    <ul className='space-y-5'>
                                                        {step.courses.map((c, i) => (
                                                            <li key={i} className='flex items-center gap-4 text-sm font-bold text-white/60 hover:text-primary cursor-pointer transition-colors'>
                                                                <ChevronRight size={16} className='text-primary/40' />
                                                                {c}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className='p-10 rounded-[2.5rem] bg-white/5 border border-white/5'>
                                                    <h4 className='text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-8 flex items-center gap-2'>
                                                        <CheckCircle2 size={14} className='text-emerald-500' /> Core Competencies
                                                    </h4>
                                                    <div className='flex flex-wrap gap-4'>
                                                        {step.skills.map((s, i) => (
                                                            <span key={i} className='px-5 py-2 bg-zinc-800 text-white/60 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-white/5 shadow-xl'>
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
                                <div className='bg-zinc-900 p-12 rounded-[4rem] text-white sticky top-40 shadow-2xl border border-white/5'>
                                    <div className='flex items-center gap-6 mb-16'>
                                        <div className='w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20'>
                                            <Rocket className='h-8 w-8 text-white' />
                                        </div>
                                        <div>
                                            <h3 className='text-2xl font-bold tracking-tight'>Success Path</h3>
                                            <p className='text-primary text-[10px] font-bold uppercase tracking-[0.3em] mt-1'>{roadmap.duration} Estimate</p>
                                        </div>
                                    </div>
                                    
                                    <div className='space-y-12'>
                                        <div>
                                            <div className='flex justify-between text-[10px] font-bold uppercase tracking-[0.4em] mb-5'>
                                                <span className='text-white/20'>Momentum</span>
                                                <span className='text-primary'>Initializing</span>
                                            </div>
                                            <div className='w-full bg-white/5 h-4 rounded-full overflow-hidden border border-white/5'>
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: '15%' }}
                                                    className='h-full bg-gradient-to-r from-primary to-blue-600 rounded-full' 
                                                />
                                            </div>
                                        </div>

                                        <div className='p-10 rounded-[3rem] bg-white/5 border border-white/5'>
                                            <h4 className='text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-8'>Strategist's Log</h4>
                                            <ul className='space-y-8'>
                                                <li className='flex gap-5 text-sm text-white/60 font-medium leading-relaxed'>
                                                    <div className='w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center shrink-0'><CheckCircle2 size={16} className='text-primary' /></div>
                                                    Build proof-of-work systems for every milestone.
                                                </li>
                                                <li className='flex gap-5 text-sm text-white/60 font-medium leading-relaxed'>
                                                    <div className='w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0'><CheckCircle2 size={16} className='text-blue-400' /></div>
                                                    Engage with architects in your target industry.
                                                </li>
                                            </ul>
                                        </div>

                                        <Button className='w-full h-16 rounded-[2rem] bg-white hover:bg-white/90 text-black font-bold text-xs uppercase tracking-[0.3em] shadow-2xl transition-all active:scale-95'>
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
