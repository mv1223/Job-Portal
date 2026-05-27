import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Briefcase } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='fixed top-0 left-0 right-0 z-50 flex justify-center p-4'>
            <motion.div 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className='w-full max-w-7xl h-20 bg-white/70 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] px-8 flex items-center justify-between'
            >
                <Link to="/" className='flex items-center gap-2 group'>
                    <div className='w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12'>
                        <Briefcase className='text-white h-5 w-5' />
                    </div>
                    <h1 className='text-2xl font-black tracking-tighter text-slate-900'>
                        Job<span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600'>Portal</span>
                    </h1>
                </Link>
                
                <div className='flex items-center gap-10'>
                    <ul className='hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.25em] text-slate-400'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='hover:text-slate-900 transition-colors'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='hover:text-slate-900 transition-colors'><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-slate-900 transition-colors'><Link to="/">Home</Link></li>
                                    <li className='hover:text-slate-900 transition-colors'><Link to="/jobs">Jobs</Link></li>
                                    <li className='hover:text-slate-900 transition-colors'><Link to="/browse">Browse</Link></li>
                                    <li><Link to="/ai-roadmap" className="text-indigo-600">AI Roadmap</Link></li>
                                </>
                            )
                        }
                    </ul>

                    <div className='h-8 w-[1px] bg-slate-100 hidden md:block' />

                    <div className='flex items-center gap-4'>
                        {
                            !user ? (
                                <>
                                    <Link to="/login">
                                        <Button variant="ghost" className="font-black text-[11px] uppercase tracking-widest text-slate-500 hover:text-slate-900">Sign In</Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-slate-900 hover:bg-black text-white px-8 h-12 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-slate-200">
                                            Join Now
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className='p-1 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all cursor-pointer bg-white shadow-sm'>
                                            <Avatar className="h-10 w-10 rounded-xl">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 mt-4 p-0 rounded-[2.5rem] overflow-hidden shadow-2xl border-slate-100 border-none">
                                        <div className='bg-slate-900 p-8 text-white'>
                                            <div className='flex items-center gap-4'>
                                                <Avatar className="h-14 w-14 border-4 border-white/10 rounded-2xl shadow-xl">
                                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-black text-xl tracking-tight'>{user?.fullname}</h4>
                                                    <p className='text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1'>{user?.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-4 bg-white'>
                                            <div className='flex flex-col gap-1'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <Link to="/profile" className='flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-all font-black text-xs uppercase tracking-widest'>
                                                            <User2 size={18} />
                                                            <span>Profile</span>
                                                        </Link>
                                                    )
                                                }
                                                <button onClick={logoutHandler} className='flex items-center gap-4 p-4 rounded-2xl hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-all font-black text-xs uppercase tracking-widest text-left'>
                                                    <LogOut size={18} />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Navbar