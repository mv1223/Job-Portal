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
        <div className='bg-white min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex-1 flex'>
                {/* Left Side: Animated Content */}
                <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-500 items-center justify-center p-20 relative overflow-hidden'>
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
                            className='bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 mb-10 inline-block shadow-2xl'
                        >
                            <UserPlus size={80} className='text-white' />
                        </motion.div>
                        <h2 className='text-5xl font-black mb-6'>Join the Journey</h2>
                        <p className='text-xl text-white/80 font-medium max-w-md mx-auto'>Create your profile today and unlock personalized job matches, AI career tools, and more.</p>
                        
                        <div className='mt-12 flex items-center justify-center gap-6'>
                            <div className='flex flex-col items-center gap-2'>
                                <div className='w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10'><ShieldCheck size={24} /></div>
                                <span className='text-[10px] font-bold uppercase tracking-widest'>Secure</span>
                            </div>
                            <div className='flex flex-col items-center gap-2'>
                                <div className='w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/10'><Rocket size={24} /></div>
                                <span className='text-[10px] font-bold uppercase tracking-widest'>Fast</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating icons */}
                    <motion.div animate={{ y: [0, 30, 0], rotate: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity }} className='absolute top-20 left-20 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10'><Search className='text-white' /></motion.div>
                    <motion.div animate={{ y: [0, -40, 0], rotate: [0, -10, 0] }} transition={{ duration: 9, repeat: Infinity }} className='absolute bottom-20 right-20 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10'><Briefcase className='text-white' /></motion.div>
                    <motion.div animate={{ scale: [1, 1.3, 1], x: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity }} className='absolute top-1/2 left-5 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10'><Trophy className='text-white' /></motion.div>
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className='absolute top-1/2 right-5 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10'><Clock className='text-white' /></motion.div>
                </div>

                {/* Right Side: Signup Form */}
                <div className='w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50/50 overflow-y-auto'>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='w-full max-w-2xl'
                    >
                        <form onSubmit={submitHandler} className='bg-white border border-slate-100 rounded-[3rem] p-12 shadow-2xl shadow-indigo-100 my-10'>
                            <div className='text-center mb-10'>
                                <h1 className='font-black text-4xl text-slate-900 mb-2'>Create Account</h1>
                                <p className='text-slate-500 font-medium'>Join our community of professionals</p>
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='space-y-2'>
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                                    <Input
                                        type="text"
                                        value={input.fullname}
                                        name="fullname"
                                        onChange={changeEventHandler}
                                        placeholder="John Doe"
                                        className="h-14 rounded-2xl border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/50 font-bold px-6"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="name@example.com"
                                        className="h-14 rounded-2xl border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/50 font-bold px-6"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</Label>
                                    <Input
                                        type="text"
                                        value={input.phoneNumber}
                                        name="phoneNumber"
                                        onChange={changeEventHandler}
                                        placeholder="1234567890"
                                        className="h-14 rounded-2xl border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/50 font-bold px-6"
                                    />
                                </div>
                                <div className='space-y-2'>
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Password</Label>
                                    <Input
                                        type="password"
                                        value={input.password}
                                        name="password"
                                        onChange={changeEventHandler}
                                        placeholder="••••••••"
                                        className="h-14 rounded-2xl border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/50 font-bold px-6"
                                    />
                                </div>
                            </div>

                            <div className='mt-8 space-y-6'>
                                <div>
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 block mb-4">Select Your Role</Label>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center space-x-2 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 cursor-pointer hover:border-indigo-100 transition-all flex-1">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="student"
                                                checked={input.role === 'student'}
                                                onChange={changeEventHandler}
                                                className="cursor-pointer w-4 h-4 accent-indigo-600"
                                            />
                                            <Label className="font-bold text-slate-600 cursor-pointer">Student</Label>
                                        </div>
                                        <div className="flex items-center space-x-2 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 cursor-pointer hover:border-indigo-100 transition-all flex-1">
                                            <input
                                                type="radio"
                                                name="role"
                                                value="recruiter"
                                                checked={input.role === 'recruiter'}
                                                onChange={changeEventHandler}
                                                className="cursor-pointer w-4 h-4 accent-indigo-600"
                                            />
                                            <Label className="font-bold text-slate-600 cursor-pointer">Recruiter</Label>
                                        </div>
                                    </div>
                                </div>

                                <div className='space-y-2'>
                                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Profile Photo</Label>
                                    <Input
                                        accept="image/*"
                                        type="file"
                                        onChange={changeFileHandler}
                                        className="h-14 rounded-2xl border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/50 font-bold px-6 pt-3"
                                    />
                                </div>

                                {
                                    loading ? <Button className="w-full h-14 rounded-2xl bg-indigo-600"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button type="submit" className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black text-lg shadow-xl shadow-indigo-100 transition-all active:scale-95">Signup</Button>
                                }
                                <div className='text-center pt-4'>
                                    <span className='text-slate-500 font-bold text-sm'>Already have an account? <Link to="/login" className='text-indigo-600 hover:underline'>Login</Link></span>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Signup