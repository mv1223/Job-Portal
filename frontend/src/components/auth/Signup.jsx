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
import { Loader2 } from 'lucide-react'
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
        const formData = new FormData();    //formdata object
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
        <div className='bg-[#F8FAFC] min-h-screen'>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto px-4 py-20'>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='w-full max-w-2xl'
                >
                    <form onSubmit={submitHandler} className='bg-white border border-slate-100 rounded-[2.5rem] p-12 shadow-xl shadow-slate-200/50'>
                        <div className='text-center mb-12'>
                            <h1 className='font-black text-4xl text-slate-900 mb-2'>Create Account</h1>
                            <p className='text-slate-500 font-medium'>Join our community of professionals</p>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='space-y-2'>
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                                <Input
                                    type="text"
                                    value={input.fullname}
                                    name="fullname"
                                    onChange={changeEventHandler}
                                    placeholder="John Doe"
                                    className="h-12 rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/50 font-bold"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</Label>
                                <Input
                                    type="email"
                                    value={input.email}
                                    name="email"
                                    onChange={changeEventHandler}
                                    placeholder="john@example.com"
                                    className="h-12 rounded-xl border-slate-200 focus-visible:ring-indigo-500 bg-slate-50/50 font-bold"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</Label>
                                <Input
                                    type="text"
                                    value={input.phoneNumber}
                                    name="phoneNumber"
                                    onChange={changeEventHandler}
                                    placeholder="+91 8080808080"
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
                        </div>

                        <div className='mt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8'>
                            <div className='space-y-4'>
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Select Your Role</Label>
                                <RadioGroup className="flex items-center gap-4">
                                    <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 cursor-pointer hover:border-indigo-100 transition-all">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="h-4 w-4 cursor-pointer accent-indigo-600"
                                        />
                                        <Label className="font-bold text-xs text-slate-600 cursor-pointer">Student</Label>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100 cursor-pointer hover:border-indigo-100 transition-all">
                                        <Input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="h-4 w-4 cursor-pointer accent-indigo-600"
                                        />
                                        <Label className="font-bold text-xs text-slate-600 cursor-pointer">Recruiter</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            
                            <div className='space-y-4 w-full md:w-auto'>
                                <Label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Profile Photo</Label>
                                <div className='flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-100'>
                                    <Input
                                        accept="image/*"
                                        type="file"
                                        onChange={changeFileHandler}
                                        className="cursor-pointer border-none bg-transparent shadow-none h-auto file:bg-indigo-600 file:text-white file:rounded-lg file:border-none file:px-4 file:py-1.5 file:font-bold file:text-xs"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='mt-12'>
                            {
                                loading ? (
                                    <Button className='w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2'>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                        Creating Account...
                                    </Button>
                                ) : (
                                    <Button type="submit" className='w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-[0.98] shadow-xl shadow-slate-200'>
                                        Get Started
                                    </Button>
                                )
                            }
                        </div>

                        <p className='text-center text-sm font-medium text-slate-500 mt-8'>
                            Already have an account? <Link to="/login" className='text-indigo-600 font-black hover:underline ml-1'>Sign In</Link>
                        </p>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default Signup