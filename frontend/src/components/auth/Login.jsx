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
import { Loader2, Search, Briefcase, Trophy, Clock, Sparkles } from 'lucide-react'
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
        <div className='bg-black min-h-screen flex flex-col selection:bg-primary selection:text-white'>
            <Navbar />
            <div className='noise-bg' />
            <div className='flex-1 flex relative z-10'>
                {/* Left Side: Animated Illustration */}
                <div className='hidden lg:flex lg:w-1/2 bg-zinc-950 items-center justify-center p-20 relative overflow-hidden border-r border-white/5'>
                    <div className='absolute inset-0 pointer-events-none'>
                        <motion.div 
                            animate={{ 
                                scale: [1, 1.2, 1],
                                rotate: [0, 90, 0],
                            }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className='absolute top-[-20%] left-[-10%] w-[800px] h-[800px] rounded-full bg-primary/10 blur-[120px]'
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
                            className='bg-white/5 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/10 mb-10 inline-block shadow-2xl'
                        >
                            <Sparkles size={80} className='text-primary animate-pulse' />
                        </motion.div>
                        <h2 className='text-6xl font-black mb-6 tracking-tighter'>Welcome Back</h2>
                        <p className='text-xl text-white/40 font-medium max-w-md mx-auto leading-relaxed'>Continue your professional journey with our neural-matching intelligence.</p>
                    </motion.div>

                    {/* Floating elements */}
                    <div className='absolute bottom-20 left-10 flex gap-4'>
                        <div className='px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40'>AI Powered</div>
                        <div className='px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white/40'>Real-time Tracking</div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className='w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 bg-black'>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='w-full max-w-md'
                    >
                        <div className='mb-12'>
                            <h3 className='text-4xl font-bold text-white mb-2 tracking-tighter'>Sign In</h3>
                            <p className='text-white/40 font-medium'>Access your dashboard and applications.</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div className='space-y-2'>
                                <Label className="text-white/60">Email Address</Label>
                                <div className='relative group'>
                                    <Input
                                        type="email"
                                        value={input.email}
                                        name="email"
                                        onChange={changeEventHandler}
                                        placeholder="name@company.com"
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

                            {
                                loading ? (
                                    <Button disabled className="w-full bg-primary h-14 rounded-2xl text-white font-bold uppercase tracking-widest shadow-xl shadow-primary/20">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Authenticating
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 h-14 rounded-2xl text-white font-bold uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95">
                                        Sign In
                                    </Button>
                                )
                            }
                            
                            <p className='text-center text-sm text-white/40 font-medium'>
                                New here? <Link to="/signup" className='text-primary hover:underline'>Create an account</Link>
                            </p>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Login