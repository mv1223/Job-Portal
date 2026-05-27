import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Briefcase, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import MagneticButton from '../ui/magnetic-button'

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
        <nav className='sticky top-0 z-[100] bg-[#0a0a0a]/95 backdrop-blur-[10px] border-b border-[#1a1a1a] px-10 h-[60px] flex items-center justify-between'>
                <Link to="/" className='flex items-center gap-3 group'>
                    <h1 className='text-xl font-bold tracking-tighter text-white'>
                        Hire<span className='text-primary'>Sync</span>
                    </h1>
                </Link>
                
                <div className='flex items-center gap-8'>
                    <ul className='hidden md:flex items-center gap-8 text-[13px] font-normal text-[#888]'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='hover:text-white transition-colors'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='hover:text-white transition-colors'><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='text-white'><Link to="/">Find Jobs</Link></li>
                                    <li className='hover:text-white transition-colors'><Link to="/jobs">Companies</Link></li>
                                    <li className='hover:text-white transition-colors'><Link to="/browse">Salaries</Link></li>
                                    <li className='hover:text-white transition-colors'><Link to="/">Career Advice</Link></li>
                                    <li className='hover:text-white transition-colors'><Link to="/">For Employers</Link></li>
                                </>
                            )
                        }
                    </ul>

                    <div className='h-6 w-[1px] bg-white/10 hidden md:block' />

                    <div className='flex items-center gap-4'>
                        {
                            !user ? (
                                <>
                                    <Link to="/login">
                                        <Button variant="ghost" className="bg-transparent border border-[#2a2a2a] text-[#ccc] px-4 py-1.5 rounded-md text-[13px] font-medium hover:border-[#444] hover:text-white transition-all">Sign In</Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-primary hover:bg-[#5558e8] text-white px-4 py-1.5 h-auto rounded-md text-[13px] font-medium transition-all">
                                            Post a Job
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className='p-0.5 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer bg-white/5'>
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                            </Avatar>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-64 mt-4 p-0 rounded-2xl overflow-hidden shadow-2xl border border-[#1a1a1a] bg-[#0e0e0e]">
                                        <div className='p-6 border-b border-[#1a1a1a]'>
                                            <div className='flex items-center gap-4 mb-4'>
                                                <div className='p-0.5 rounded-lg border border-white/10 bg-white/5'>
                                                    <Avatar className="h-10 w-10 rounded-lg">
                                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                                    </Avatar>
                                                </div>
                                                <div>
                                                    <h4 className='font-bold text-white text-sm'>{user?.fullname}</h4>
                                                    <p className='text-[10px] font-bold text-[#444] uppercase tracking-widest'>{user?.role}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <Link to="/profile" className='flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group'>
                                                            <User2 className="w-4 h-4 text-[#444] group-hover:text-primary transition-colors" />
                                                            <span className='text-xs font-bold text-[#888] group-hover:text-white transition-colors'>View Profile</span>
                                                        </Link>
                                                    )
                                                }
                                                {
                                                    user && user.role === 'recruiter' && (
                                                        <Link to="/admin/companies" className='flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group'>
                                                            <Briefcase className="w-4 h-4 text-[#444] group-hover:text-primary transition-colors" />
                                                            <span className='text-xs font-bold text-[#888] group-hover:text-white transition-colors'>Dashboard</span>
                                                        </Link>
                                                    )
                                                }
                                                <button onClick={logoutHandler} className='flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/5 transition-colors group w-full text-left'>
                                                    <LogOut className="w-4 h-4 text-[#444] group-hover:text-red-500 transition-colors" />
                                                    <span className='text-xs font-bold text-[#888] group-hover:text-white transition-colors'>Sign Out</span>
                                                </button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>
        </nav>
    )
}

export default Navbar