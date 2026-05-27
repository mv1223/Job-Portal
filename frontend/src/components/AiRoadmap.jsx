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
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className='relative z-10'
                        >
                            <div className='flex flex-col md:flex-row items-center justify-between gap-8 mb-20'>
                                <div className='text-left'>
                                    <h2 className='text-4xl md:text-5xl font-bold text-white tracking-tighter mb-4'>Path for {roadmap.title}</h2>
                                    <p className='text-white/40 font-medium flex items-center gap-2'>
                                        <Clock className='w-4 h-4 text-primary' /> Estimated Duration: {roadmap.duration}
                                    </p>
                                </div>
                                <Button onClick={() => setRoadmap(null)} variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-2xl px-8 h-12 font-bold uppercase tracking-widest text-[10px]">
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
                                        className={`p-8 rounded-[2.5rem] bg-zinc-900/50 backdrop-blur-3xl border border-white/5 hover:border-primary/50 transition-all duration-700 group ${idx === 0 || idx === 4 ? 'md:col-span-2' : ''}`}
                                    >
                                        <div className='flex items-center justify-between mb-8'>
                                            <div className='flex items-center gap-4'>
                                                <div className='w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black'>
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <h3 className='font-bold text-white text-lg'>{step.title}</h3>
                                                    <span className='text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]'>{step.duration}</span>
                                                </div>
                                            </div>
                                            <CheckCircle2 className='w-6 h-6 text-white/5 group-hover:text-primary transition-colors' />
                                        </div>

                                        <p className='text-sm text-white/40 font-medium mb-8 leading-relaxed'>{step.desc}</p>

                                        <div className='space-y-6'>
                                            <div>
                                                <h4 className='text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-3 flex items-center gap-2'>
                                                    <BookOpen className='w-3 h-3' /> Resources
                                                </h4>
                                                <div className='flex flex-wrap gap-2'>
                                                    {step.courses.map((course, i) => (
                                                        <span key={i} className='px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-white/60'>{course}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className='text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-3 flex items-center gap-2'>
                                                    <Target className='w-3 h-3' /> Skills
                                                </h4>
                                                <div className='flex flex-wrap gap-2'>
                                                    {step.skills.map((skill, i) => (
                                                        <span key={i} className='px-3 py-1 rounded-lg bg-primary/10 text-[10px] font-bold text-primary'>{skill}</span>
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
        </div>
    );
};

export default AiRoadmap;
