import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
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
                        skills: ["Syntax", "Data Types", "Control Flow"],
                        progress: 100
                    },
                    {
                        step: "Step 2",
                        title: "Data Structures & Algorithms",
                        desc: "Learn how to organize data efficiently and solve complex problems.",
                        courses: ["Data Structures and Algorithms Specialization (UC San Diego)", "LeetCode Explore"],
                        duration: "6 Weeks",
                        skills: ["Arrays", "Linked Lists", "Sorting", "Complexity"],
                        progress: 60
                    },
                    {
                        step: "Step 3",
                        title: "Core Domain Knowledge",
                        desc: "Deep dive into the specific technologies for " + role,
                        courses: ["Machine Learning Specialization (DeepLearning.AI)", "Fast.ai"],
                        duration: "8 Weeks",
                        skills: ["Numpy", "Pandas", "Scikit-Learn"],
                        progress: 30
                    },
                    {
                        step: "Step 4",
                        title: "Advanced Specialization",
                        desc: "Focus on professional-grade tools and industry standards.",
                        courses: ["Deep Learning Specialization", "TensorFlow Developer Certificate"],
                        duration: "8 Weeks",
                        skills: ["Neural Networks", "PyTorch", "Deployment"],
                        progress: 0
                    },
                    {
                        step: "Step 5",
                        title: "Portfolio & Projects",
                        desc: "Build real-world applications to showcase your expertise.",
                        courses: ["Full Stack Open", "Kaggle Competitions"],
                        duration: "Ongoing",
                        skills: ["Git", "System Design", "API Integration"],
                        progress: 0
                    }
                ]
            };
            setRoadmap(mockRoadmap);
            setGenerating(false);
        }, 2000);
    };

    return (
        <div className='min-h-screen bg-[#0a0a0a] selection:bg-primary selection:text-white font-sans'>
            <Navbar />
            <div className='noise-bg' />
            <div className='max-w-7xl mx-auto px-6 py-32 relative'>
                {/* HireSync-style Background Blurs */}
                <div className='absolute inset-0 pointer-events-none overflow-hidden'>
                    <div className='absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]' />
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className='text-center mb-24 relative z-10'
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='inline-flex items-center gap-2 bg-[#111] px-4 py-1.5 rounded-full border border-[#2a2a2a] mb-8'
                    >
                        <Sparkles className='h-3 w-3 text-primary' />
                        <span className='text-[11px] font-bold uppercase tracking-widest text-[#888]'>AI Career Roadmap Generator</span>
                    </motion.div>
                    <h1 className='text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter leading-tight'>
                        Architect Your <br />
                        <span className='text-primary'>Professional Path</span>
                    </h1>
                    <p className='text-lg text-[#666] max-w-2xl mx-auto font-medium leading-relaxed'>
                        Define your destination. Our neural networks architect the most efficient trajectory to your professional peak.
                    </p>
                </motion.div>

                <div className='max-w-2xl mx-auto mb-32 relative z-10'>
                    <div className='flex flex-col md:flex-row items-center gap-4 bg-[#111] border border-[#2a2a2a] p-2 rounded-2xl shadow-2xl'>
                        <Input 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="What's your dream role? (e.g. AI Engineer)" 
                            className='flex-1 border-none bg-transparent text-white placeholder:text-[#444] text-[15px] px-6 h-12 focus-visible:ring-0'
                        />
                        <Button 
                            onClick={generateRoadmap}
                            disabled={generating || !role}
                            className='w-full md:w-auto bg-primary hover:bg-[#5558e8] text-white px-8 h-12 rounded-xl font-bold transition-all active:scale-95'
                        >
                            {generating ? <BrainCircuit className='animate-spin mr-2 h-4 w-4' /> : <Target className='mr-2 h-4 w-4' />}
                            {generating ? "Architecting..." : "Generate Path"}
                        </Button>
                    </div>
                </div>

                <AnimatePresence>
                    {roadmap && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className='relative z-10'
                        >
                            <div className='flex flex-col md:flex-row items-center justify-between gap-8 mb-16'>
                                <div className='text-left'>
                                    <h2 className='text-3xl font-bold text-white tracking-tighter mb-2'>Neural Path: {roadmap.title}</h2>
                                    <div className='flex items-center gap-4'>
                                        <p className='text-[12px] text-[#555] font-medium flex items-center gap-2'>
                                            <Clock className='w-3.5 h-3.5 text-primary' /> {roadmap.duration}
                                        </p>
                                        <div className='w-[1px] h-4 bg-[#2a2a2a]' />
                                        <p className='text-[12px] text-[#555] font-medium flex items-center gap-2'>
                                            <CheckCircle2 className='w-3.5 h-3.5 text-emerald-500' /> AI Verified
                                        </p>
                                    </div>
                                </div>
                                <Button onClick={() => setRoadmap(null)} variant="outline" className="border-[#2a2a2a] bg-[#111] text-[#888] hover:text-white hover:border-[#444] rounded-xl px-6 h-11 text-[12px] font-bold uppercase tracking-widest">
                                    New Roadmap
                                </Button>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {roadmap.steps.map((step, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className={`p-8 rounded-2xl bg-[#0e0e0e] border border-[#1a1a1a] hover:border-[#2a2a2a] transition-all group ${idx === 0 || idx === 4 ? 'md:col-span-2' : ''}`}
                                    >
                                        <div className='flex items-center justify-between mb-8'>
                                            <div className='flex items-center gap-4'>
                                                <div className='w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-sm font-bold'>
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <h3 className='font-bold text-white text-[15px]'>{step.title}</h3>
                                                    <span className='text-[10px] font-bold text-[#444] uppercase tracking-widest'>{step.duration}</span>
                                                </div>
                                            </div>
                                            <div className='flex items-center gap-2'>
                                                <span className='text-[10px] font-bold text-[#444]'>{step.progress}%</span>
                                                <div className='w-12 h-1 bg-[#1a1a1a] rounded-full overflow-hidden'>
                                                    <div className='h-full bg-primary' style={{ width: `${step.progress}%` }} />
                                                </div>
                                            </div>
                                        </div>

                                        <p className='text-[13px] text-[#666] font-medium mb-8 leading-relaxed'>{step.desc}</p>

                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                            <div>
                                                <h4 className='text-[10px] font-bold uppercase tracking-widest text-[#444] mb-3 flex items-center gap-2'>
                                                    <BookOpen className='w-3 h-3' /> Resources
                                                </h4>
                                                <div className='flex flex-wrap gap-2'>
                                                    {step.courses.map((course, i) => (
                                                        <span key={i} className='px-3 py-1 rounded-md bg-[#111] border border-[#1e1e1e] text-[10px] font-medium text-[#888]'>{course}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className='text-[10px] font-bold uppercase tracking-widest text-[#444] mb-3 flex items-center gap-2'>
                                                    <Target className='w-3 h-3' /> Core Skills
                                                </h4>
                                                <div className='flex flex-wrap gap-2'>
                                                    {step.skills.map((skill, i) => (
                                                        <span key={i} className='px-3 py-1 rounded-md bg-primary/10 text-[10px] font-bold text-primary'>{skill}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    );
};

export default AiRoadmap;
