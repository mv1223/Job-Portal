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
        <div className='bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-20 px-4'>
                <div>
                    <h1 className='text-3xl font-black tracking-tighter text-slate-900'>
                        Job<span className='text-indigo-600'>Portal</span>
                        <span className='text-[10px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full ml-1 align-top font-bold uppercase'>AI</span>
                    </h1>
                </div>
                <div className='flex items-center gap-10'>
                    <ul className='flex font-bold items-center gap-8 text-slate-600 text-sm uppercase tracking-widest'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li className='hover:text-indigo-600 transition-colors'><Link to="/admin/companies">Companies</Link></li>
                                    <li className='hover:text-indigo-600 transition-colors'><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li className='hover:text-indigo-600 transition-colors'><Link to="/">Home</Link></li>
                                    <li className='hover:text-indigo-600 transition-colors'><Link to="/jobs">Jobs</Link></li>
                                    <li className='hover:text-indigo-600 transition-colors'><Link to="/browse">Browse</Link></li>
                                    <li className='hover:text-indigo-600 transition-colors'><Link to="/ai-tools" className="text-indigo-600">AI Suite</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-4'>
                                <Link to="/login"><Button variant="ghost" className="font-bold text-slate-600 hover:text-indigo-600">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 rounded-xl px-8 font-bold">Join Now</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer h-10 w-10 border-2 border-indigo-100 shadow-sm hover:border-indigo-300 transition-all">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80 mt-2 p-0 rounded-2xl overflow-hidden shadow-2xl border-slate-100">
                                    <div className='bg-indigo-600 p-6 text-white'>
                                        <div className='flex items-center gap-4'>
                                            <Avatar className="h-12 w-12 border-2 border-white/20">
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-bold text-lg leading-tight'>{user?.fullname}</h4>
                                                <p className='text-white/70 text-xs font-medium uppercase tracking-wider'>{user?.role}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='p-4 bg-white'>
                                        <div className='flex flex-col gap-1'>
                                            {
                                                user && user.role === 'student' && (
                                                    <Link to="/profile" className='flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-slate-700 font-semibold group'>
                                                        <User2 className='h-5 w-5 text-indigo-500 group-hover:scale-110 transition-transform' />
                                                        <span>My Profile</span>
                                                    </Link>
                                                )
                                            }

                                            <button 
                                                onClick={logoutHandler}
                                                className='flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-red-600 font-semibold group w-full text-left'
                                            >
                                                <LogOut className='h-5 w-5 group-hover:scale-110 transition-transform' />
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
        </div>
    )
}

export default Navbar