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
        <div className='fixed top-0 left-0 right-0 z-50 flex justify-center p-6'>
            <motion.div 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className='w-full max-w-5xl h-16 bg-zinc-900/50 backdrop-blur-3xl border border-white/5 rounded-2xl shadow-2xl px-8 flex items-center justify-between'
            >
                <Link to="/" className='flex items-center gap-3 group'>
                    <h1 className='text-xl font-bold tracking-tighter text-white'>
                        Hire<span className='text-primary'>Sync</span>
                    </h1>
                </Link>
                
                <div className='flex items-center gap-8'>
                    <ul className='hidden md:flex items-center gap-8 text-[12px] font-medium tracking-tight text-white/50'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='hover:text-white transition-colors'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='hover:text-white transition-colors'><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-white transition-colors'><Link to="/">Find Jobs</Link></li>
                                    <li className='hover:text-white transition-colors'><Link to="/jobs">Companies</Link></li>
                                    <li className='hover:text-white transition-colors'><Link to="/browse">Salaries</Link></li>
                                    <li className='hover:text-white transition-colors'><Link to="/">Career Advice</Link></li>
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
                                        <Button variant="ghost" className="font-medium text-[13px] text-white/60 hover:text-white">Sign In</Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-primary hover:bg-primary/90 text-white px-5 h-9 rounded-md font-medium text-[13px] transition-all active:scale-95">
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
                                    <PopoverContent className="w-64 mt-4 p-0 rounded-2xl overflow-hidden shadow-2xl border-white/5 bg-zinc-950">
                                        <div className='p-6 border-b border-white/5'>
                                            <div className='flex items-center gap-4 mb-4'>
                                                <Avatar className="h-10 w-10 rounded-xl">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-bold text-white text-sm'>{user?.fullname}</h4>
                                                    <p className='text-[10px] font-bold text-white/20 uppercase tracking-widest'>{user?.role}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                {
                                                    user && user.role === 'student' && (
                                                        <Link to="/profile" className='flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group'>
                                                            <User2 className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
                                                            <span className='text-xs font-bold text-white/60 group-hover:text-white transition-colors'>View Profile</span>
                                                        </Link>
                                                    )
                                                }
                                                <button onClick={logoutHandler} className='flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/5 transition-colors group w-full text-left'>
                                                    <LogOut className="w-4 h-4 text-white/40 group-hover:text-red-500 transition-colors" />
                                                    <span className='text-xs font-bold text-white/60 group-hover:text-white transition-colors'>Sign Out</span>
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