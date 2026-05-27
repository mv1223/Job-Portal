import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

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
        <div className='bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100/60'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-24 px-6'>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className='flex items-center gap-2'
                >
                    <div className='w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200'>
                        <Briefcase className='text-white h-6 w-6' />
                    </div>
                    <h1 className='text-2xl font-black tracking-tight text-slate-900'>
                        Job<span className='text-indigo-600'>Portal</span>
                    </h1>
                </motion.div>
                
                <div className='flex items-center gap-12'>
                    <ul className='hidden md:flex items-center gap-10 text-slate-500 font-bold text-[11px] uppercase tracking-[0.2em]'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='hover:text-indigo-600 transition-colors cursor-pointer'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='hover:text-indigo-600 transition-colors cursor-pointer'><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-indigo-600 transition-colors cursor-pointer'><Link to="/">Home</Link></li>
                                    <li className='hover:text-indigo-600 transition-colors cursor-pointer'><Link to="/jobs">Jobs</Link></li>
                                    <li className='hover:text-indigo-600 transition-colors cursor-pointer'><Link to="/browse">Browse</Link></li>
                                    <li className='text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full'><Link to="/ai-tools">AI Suite</Link></li>
                                </>
                            )
                        }
                    </ul>

                    <div className='flex items-center gap-6'>
                        {
                            !user ? (
                                <div className='flex items-center gap-3'>
                                    <Link to="/login">
                                        <Button variant="ghost" className="font-black text-[11px] uppercase tracking-widest text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50">Login</Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-200 rounded-[1.25rem] px-8 h-12 font-black text-[11px] uppercase tracking-widest transition-all active:scale-95">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div className='p-1 rounded-2xl border border-slate-100 hover:border-indigo-100 transition-all cursor-pointer bg-white shadow-sm'>
                                            <Avatar className="h-10 w-10 rounded-xl">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                            </Avatar>
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 mt-4 p-0 rounded-[2rem] overflow-hidden shadow-2xl border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                                        <div className='bg-indigo-600 p-8 text-white'>
                                            <div className='flex items-center gap-4'>
                                                <Avatar className="h-14 w-14 border-4 border-white/10 rounded-2xl shadow-xl">
                                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-black text-xl leading-tight'>{user?.fullname}</h4>
                                                    <p className='text-white/60 text-[10px] font-bold uppercase tracking-widest mt-1'>{user?.role}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='p-4 bg-white'>
                                            <div className='flex flex-col gap-1'>
                                                <Link to="/profile" className='flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-all font-bold text-sm'>
                                                    <User2 className='h-4 w-4' />
                                                    View Profile
                                                </Link>
                                                <div onClick={logoutHandler} className='flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-slate-600 hover:text-red-600 transition-all font-bold text-sm cursor-pointer'>
                                                    <LogOut className='h-4 w-4' />
                                                    Logout
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar