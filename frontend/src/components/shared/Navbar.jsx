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
        <div className='fixed top-0 left-0 right-0 z-50 flex justify-center p-6'>
            <motion.div 
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className='w-full max-w-5xl h-16 bg-zinc-900/50 backdrop-blur-3xl border border-white/5 rounded-2xl shadow-2xl px-8 flex items-center justify-between'
            >
                <Link to="/" className='flex items-center gap-3 group'>
                    <div className='w-8 h-8 bg-white rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12'>
                        <Briefcase className='text-black h-4 w-4' />
                    </div>
                    <h1 className='text-xl font-bold tracking-tighter text-white'>
                        Job<span className='text-primary'>Portal</span>
                    </h1>
                </Link>
                
                <div className='flex items-center gap-8'>
                    <ul className='hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='hover:text-white transition-colors'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='hover:text-white transition-colors'><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-white transition-colors'><Link to="/">Home</Link></li>
                                    <li className='hover:text-white transition-colors'><Link to="/jobs">Jobs</Link></li>
                                    <li className='hover:text-white transition-colors'><Link to="/browse">Browse</Link></li>
                                    <li><Link to="/ai-roadmap" className="text-primary">Roadmap</Link></li>
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
                                        <Button variant="ghost" className="font-bold text-[10px] uppercase tracking-widest text-white/60 hover:text-white">Sign In</Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-white hover:bg-white/90 text-black px-6 h-10 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all active:scale-95">
                                            Join
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
                                            <div className='flex items-center gap-3'>
                                                <Avatar className="h-10 w-10 rounded-xl">
                                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-bold text-sm text-white'>{user?.fullname}</h4>
                                                    <p className='text-white/40 text-[9px] font-bold uppercase tracking-widest mt-0.5'>{user?.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-2'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link to="/profile" className='flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-all font-bold text-[10px] uppercase tracking-widest'>
                                                        <User2 size={16} />
                                                        <span>Profile</span>
                                                    </Link>
                                                )
                                            }
                                            <button onClick={logoutHandler} className='w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 text-white/60 hover:text-red-500 transition-all font-bold text-[10px] uppercase tracking-widest text-left'>
                                                <LogOut size={16} />
                                                <span>Logout</span>
                                            </button>
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