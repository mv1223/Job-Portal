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

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#ebebeb] px-8 lg:px-16 h-[78px] flex items-center justify-between shadow-sm">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
                <h1 className="text-[28px] font-extrabold tracking-tight text-[#111827]">
                    Hire<span className="text-[#B7F34D]">Sync</span>
                </h1>
            </Link>

            {/* Menu */}
            <ul className="hidden lg:flex items-center gap-10 text-[15px] font-medium text-[#4b5563]">
                {
                    user && user.role === 'recruiter' ? (
                        <>
                            <li>
                                <Link
                                    to="/admin/companies"
                                    className="hover:text-[#B7F34D] transition"
                                >
                                    Companies
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/admin/jobs"
                                    className="hover:text-[#B7F34D] transition"
                                >
                                    Jobs
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link
                                    to="/jobs"
                                    className="hover:text-[#B7F34D] transition"
                                >
                                    Find Jobs
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/browse"
                                    className="hover:text-[#B7F34D] transition"
                                >
                                    Companies
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/salaries"
                                    className="hover:text-[#B7F34D] transition"
                                >
                                    Salaries
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/ai-roadmap"
                                    className="hover:text-[#B7F34D] transition"
                                >
                                    Career Advice
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-[#B7F34D] transition"
                                >
                                    Employers
                                </Link>
                            </li>
                        </>
                    )
                }
            </ul>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
                {
                    !user ? (
                        <>
                            <Link to="/login">
                                <Button className="rounded-full border border-gray-300 bg-white text-[#111827] hover:bg-gray-100 px-6 py-2 h-auto font-medium">
                                    Sign In
                                </Button>
                            </Link>

                            <Link to="/signup">
                                <Button className="rounded-full bg-[#111827] hover:bg-black text-white px-6 py-2 h-auto font-medium">
                                    Post a Job
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="cursor-pointer border border-[#e5e7eb] rounded-full p-1 hover:shadow-md transition">
                                    <Avatar className="h-11 w-11">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="user"
                                        />
                                    </Avatar>
                                </div>
                            </PopoverTrigger>

                            <PopoverContent className="w-72 mt-4 rounded-[30px] border border-[#ebebeb] bg-white shadow-2xl p-5">

                                <div className="flex items-center gap-4 border-b pb-5">

                                    <Avatar className="h-14 w-14">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="user"
                                        />
                                    </Avatar>

                                    <div>
                                        <h4 className="font-bold text-[#111827]">
                                            {user?.fullname}
                                        </h4>

                                        <p className="text-sm text-gray-500 capitalize">
                                            {user?.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-col gap-2">

                                    {
                                        user?.role === 'student' && (
                                            <Link
                                                to="/profile"
                                                className="flex items-center gap-3 rounded-2xl p-4 hover:bg-[#f5f7f4] transition"
                                            >
                                                <User2
                                                    size={18}
                                                    className="text-[#B7F34D]"
                                                />
                                                <span>View Profile</span>
                                            </Link>
                                        )
                                    }

                                    {
                                        user?.role === 'recruiter' && (
                                            <Link
                                                to="/admin/companies"
                                                className="flex items-center gap-3 rounded-2xl p-4 hover:bg-[#f5f7f4] transition"
                                            >
                                                <Briefcase
                                                    size={18}
                                                    className="text-[#B7F34D]"
                                                />
                                                <span>Dashboard</span>
                                            </Link>
                                        )
                                    }

                                    <button
                                        onClick={logoutHandler}
                                        className="flex items-center gap-3 rounded-2xl p-4 hover:bg-red-50 transition text-left"
                                    >
                                        <LogOut
                                            size={18}
                                            className="text-red-500"
                                        />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )
                }
            </div>
        </nav>
    );
};

export default Navbar;