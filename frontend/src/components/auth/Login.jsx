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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, Search, Briefcase, Trophy, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!input.email || !input.password || !input.role) {
            toast.error("All fields are required");
            return;
        }
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            const errorMsg = error.response?.data?.message || "Invalid credentials or server error";
            toast.error(errorMsg);
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
                {/* Left Side: Animated Illustration */}
                <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 items-center justify-center p-20 relative overflow-hidden'>
                    <div className='absolute inset-0 pointer-events-none'>
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className='absolute top-[-10%] left-[-10%] w-[120%] h-[120%] border-[40px] border-white/5 rounded-full'
                        />
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className='text-center text-white relative z-10'
                    >
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className='bg-white/10 backdrop-blur-md p-10 rounded-[3rem] border border-white/20 mb-10 inline-block shadow-2xl'
                        >
                            <Loader2 size={80} className='text-white animate-spin-slow' />
                        </motion.div>
                        <h2 className='text-5xl font-black mb-6'>Find Your Future</h2>
                        <p className='text-xl text-white/80 font-medium max-w-md mx-auto'>Join thousands of professionals who have found their dream roles using our AI platform.</p>
                    </motion.div>

                    {/* Floating icons */}
                    <motion.div animate={{ y: [0, -30, 0], x: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity }} className='absolute top-20 right-20 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10'><Search className='text-white' /></motion.div>
                    <motion.div animate={{ y: [0, 40, 0], x: [0, -30, 0] }} transition={{ duration: 8, repeat: Infinity }} className='absolute bottom-20 left-20 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10'><Briefcase className='text-white' /></motion.div>
                    <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 5, repeat: Infinity }} className='absolute top-1/2 right-10 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10'><Trophy className='text-white' /></motion.div>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className='absolute top-1/2 left-10 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10'><Clock className='text-white' /></motion.div>
                </div>

                {/* Right Side: Login Form */}
                <div className='w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50/50'>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='w-full max-w-md'
                    >
                        <form onSubmit={submitHandler} className='bg-white border border-slate-100 rounded-[2.5rem] p-12 shadow-2xl shadow-indigo-100'>
                            <div className='text-center mb-10'>
                                <h1 className='font-black text-4xl text-slate-900 mb-2'>Welcome Back</h1>
                                <p className='text-slate-500 font-medium'>Sign in to your account</p>
                            </div>

                            <div className='space-y-6'>
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

                                <div className='py-2'>
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

                                {
                                    loading ? <Button className="w-full h-14 rounded-2xl bg-indigo-600"><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait</Button> : <Button type="submit" className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black text-lg shadow-xl shadow-indigo-100 transition-all active:scale-95">Login</Button>
                                }
                                <div className='text-center pt-4'>
                                    <span className='text-slate-500 font-bold text-sm'>Don't have an account? <Link to="/signup" className='text-indigo-600 hover:underline'>Signup</Link></span>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Login