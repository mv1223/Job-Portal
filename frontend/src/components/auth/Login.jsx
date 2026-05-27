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
import { Loader2 } from 'lucide-react'
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
            toast.error(error.response?.data?.message || "An error occurred");
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
        <div className='bg-[#F8FAFC] min-h-screen'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-20'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='w-full max-w-md'
                >
                    <form onSubmit={submitHandler} className='bg-white border border-slate-100 rounded-[2rem] p-10 shadow-xl shadow-slate-200/50'>
                        <div className='text-center mb-10'>
                            <h1 className='font-black text-4xl text-slate-900 mb-2'>Welcome Back</h1>
                            <p className='text-slate-500 font-medium'>Please enter your details to sign in</p>
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
                                    className="h-12 rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/50 font-bold"
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
                                    className="h-12 rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/50 font-bold"
                                />
                            </div>

                            <div className='py-2'>
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1 block mb-4">Select Your Role</Label>
                                <RadioGroup className="flex items-center gap-6">
                                    <div className="flex items-center space-x-2 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 cursor-pointer hover:border-indigo-100 transition-all">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="h-4 w-4 cursor-pointer accent-indigo-600"
                                        />
                                        <Label className="font-bold text-sm text-slate-600 cursor-pointer">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100 cursor-pointer hover:border-indigo-100 transition-all">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="h-4 w-4 cursor-pointer accent-indigo-600"
                                        />
                                        <Label className="font-bold text-sm text-slate-600 cursor-pointer">Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {
                                loading ? (
                                    <Button className='w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2'>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                        Authenticating...
                                    </Button>
                                ) : (
                                    <Button type="submit" className='w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-[0.98] shadow-xl shadow-slate-200'>
                                        Sign In
                                    </Button>
                                )
                            }

                            <p className='text-center text-sm font-medium text-slate-500 pt-4'>
                                Don't have an account? <Link to="/signup" className='text-indigo-600 font-black hover:underline ml-1'>Create one</Link>
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default Login