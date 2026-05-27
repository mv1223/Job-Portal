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
        <div className='bg-[#0a0a0a] min-h-screen flex flex-col selection:bg-primary selection:text-white'>
            <Navbar />
            <div className='noise-bg' />
            <div className='flex-1 flex relative z-10'>
                {/* Left Side: Brand Content */}
                <div className='hidden lg:flex lg:w-1/2 bg-[#0a0a0a] items-center justify-center p-20 relative overflow-hidden border-r border-[#1a1a1a]'>
                    <div className='absolute inset-0 pointer-events-none opacity-20'>
                        <div className='absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px]' />
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className='text-center text-white relative z-10'
                    >
                        <h2 className='text-6xl font-bold mb-6 tracking-tighter leading-tight'>Welcome Back to<br /><em className='not-italic text-primary'>HireSync</em></h2>
                        <p className='text-lg text-[#666] font-medium max-w-md mx-auto leading-relaxed'>Continue your professional journey with our neural-matching intelligence.</p>
                    </motion.div>
                </div>

                {/* Right Side: Login Form */}
                <div className='w-full lg:w-1/2 flex items-center justify-center p-8 md:p-20 bg-[#0a0a0a]'>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className='w-full max-w-md'
                    >
                        <div className='mb-12'>
                            <h3 className='text-4xl font-bold text-white mb-2 tracking-tighter'>Sign In</h3>
                            <p className='text-[#555] font-medium'>Access your dashboard and applications.</p>
                        </div>

                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div className='space-y-2'>
                                <Label className="text-[#888] text-[13px] font-medium uppercase tracking-widest">Email Address</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="name@company.com"
                                    className="bg-[#111] border-[#2a2a2a] h-12 px-6 rounded-xl text-white placeholder:text-[#444] focus:ring-primary focus:border-primary transition-all font-sans"
                                />
                            </div>

                            <div className='space-y-2'>
                                <Label className="text-[#888] text-[13px] font-medium uppercase tracking-widest">Password</Label>
                                <Input
                                    type="password"
                                    value={input.password}
                                    name="password"
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className="bg-[#111] border-[#2a2a2a] h-12 px-6 rounded-xl text-white placeholder:text-[#444] focus:ring-primary focus:border-primary transition-all font-sans"
                                />
                            </div>

                            <div className='space-y-4'>
                                <Label className="text-[#888] text-[13px] font-medium uppercase tracking-widest">I am a</Label>
                                <div className='grid grid-cols-2 gap-4'>
                                    <label className={`flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all ${input.role === 'student' ? 'bg-primary/10 border-primary text-primary' : 'bg-[#111] border-[#2a2a2a] text-[#555] hover:border-[#444]'}`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="hidden"
                                        />
                                        <span className='font-bold text-[11px] uppercase tracking-widest'>Student</span>
                                    </label>
                                    <label className={`flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all ${input.role === 'recruiter' ? 'bg-primary/10 border-primary text-primary' : 'bg-[#111] border-[#2a2a2a] text-[#555] hover:border-[#444]'}`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="hidden"
                                        />
                                        <span className='font-bold text-[11px] uppercase tracking-widest'>Recruiter</span>
                                    </label>
                                </div>
                            </div>

                            {
                                loading ? (
                                    <Button disabled className="w-full bg-primary h-12 rounded-xl text-white font-bold uppercase tracking-widest">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Authenticating
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-primary hover:bg-[#5558e8] h-12 rounded-xl text-white font-bold uppercase tracking-widest transition-all active:scale-95">
                                        Sign In
                                    </Button>
                                )
                            }
                            
                            <p className='text-center text-sm text-[#555] font-medium'>
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