import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, UserPlus, ShieldCheck, Rocket, Search, Briefcase, Trophy, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!input.role) {
            toast.error("Please select a role (Student or Recruiter)");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])

    return (
        <div className='bg-black min-h-screen flex flex-col selection:bg-primary selection:text-white'>
            <Navbar />
            <div className='noise-bg' />
            <div className='flex-1 flex relative z-10'>
                {/* Left Side: Animated Content */}
                <div className='hidden lg:flex lg:w-1/2 bg-zinc-950 items-center justify-center p-20 relative overflow-hidden border-r border-white/5'>
                    <div className='absolute inset-0 pointer-events-none'>
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className='absolute top-[-20%] left-[-20%] w-[100%] h-[100%] border-[60px] border-white/5 rounded-[4rem]'
                        />
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className='text-center text-white relative z-10'
                    >
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className='bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 mb-10 inline-block shadow-2xl'
                        >
                            <Rocket size={80} className='text-primary' />
                        </motion.div>
                        <h2 className='text-6xl font-black mb-6 tracking-tighter'>Join the Future</h2>
                        <p className='text-xl text-white/40 font-medium max-w-md mx-auto leading-relaxed'>Create your account and start matching with elite opportunities globally.</p>
                    </motion.div>

                    {/* Floating icons */}
                    <div className='absolute top-20 right-20 flex flex-col gap-4'>
                        <div className='p-4 rounded-2xl bg-white/5 border border-white/10'><ShieldCheck className='text-primary' /></div>
                        <div className='p-4 rounded-2xl bg-white/5 border border-white/10'><Trophy className='text-primary' /></div>
                    </div>
                </div>

                {/* Right Side: Signup Form */}
                <div className='w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 bg-black'>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='w-full max-w-md'
                    >
                        <div className='mb-12'>
                            <h3 className='text-4xl font-bold text-white mb-2 tracking-tighter'>Create Account</h3>
                            <p className='text-white/40 font-medium'>Join our community of professionals.</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div className='space-y-2'>
                                <Label className="text-white/60">Full Name</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="John Doe"
                                    className="bg-zinc-900/50 border-white/5 h-14 px-6 rounded-2xl text-white placeholder:text-white/10 focus:ring-primary focus:border-primary transition-all"
                                />
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <Label className="text-white/60">Email</Label>
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="john@example.com"
                                        className="bg-zinc-900/50 border-white/5 h-14 px-6 rounded-2xl text-white placeholder:text-white/10 focus:ring-primary focus:border-primary transition-all"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-white/60">Phone</Label>
                                    <Input
                                        type="text"
                                        value={input.phoneNumber}
                                        name="phoneNumber"
                                        onChange={changeEventHandler}
                                        placeholder="1234567890"
                                        className="bg-zinc-900/50 border-white/5 h-14 px-6 rounded-2xl text-white placeholder:text-white/10 focus:ring-primary focus:border-primary transition-all"
                                    />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-white/60">Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className="bg-zinc-900/50 border-white/5 h-14 px-6 rounded-2xl text-white placeholder:text-white/10 focus:ring-primary focus:border-primary transition-all"
                                />
                            </div>

                            <div className='space-y-4'>
                                <Label className="text-white/60">I am a</Label>
                                <div className='grid grid-cols-2 gap-4'>
                                    <label className={`flex items-center justify-center p-4 rounded-2xl border cursor-pointer transition-all ${input.role === 'student' ? 'bg-primary/10 border-primary text-primary' : 'bg-zinc-900/50 border-white/5 text-white/40 hover:border-white/10'}`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="hidden"
                                        />
                                        <span className='font-bold text-[10px] uppercase tracking-widest'>Student</span>
                                    </label>
                                    <label className={`flex items-center justify-center p-4 rounded-2xl border cursor-pointer transition-all ${input.role === 'recruiter' ? 'bg-primary/10 border-primary text-primary' : 'bg-zinc-900/50 border-white/5 text-white/40 hover:border-white/10'}`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="hidden"
                                        />
                                        <span className='font-bold text-[10px] uppercase tracking-widest'>Recruiter</span>
                                    </label>
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-white/60">Profile Photo</Label>
                                <div className='flex items-center gap-4'>
                                    <Input
                                        accept="image/*"
                                        type="file"
                                        onChange={changeFileHandler}
                                        className="bg-zinc-900/50 border-white/5 h-14 px-6 rounded-2xl text-white file:bg-primary file:text-white file:border-none file:px-4 file:py-1 file:rounded-lg file:mr-4 file:cursor-pointer hover:file:bg-primary/90 transition-all cursor-pointer"
                                    />
                                </div>
                            </div>

                            {
                                loading ? (
                                    <Button disabled className="w-full bg-primary h-14 rounded-2xl text-white font-bold uppercase tracking-widest shadow-xl shadow-primary/20">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Processing
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-14 rounded-2xl text-white font-bold uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95">
                                        Create Account
                                    </Button>
                                )
                            }
                            
                            <p className='text-center text-sm text-white/40 font-medium'>
                                Already have an account? <Link to="/login" className='text-primary hover:underline'>Sign In</Link>
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Signup