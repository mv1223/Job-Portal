import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
            setLoading(false);
        }
        setOpen(false);
        console.log(input);
    }



    return (
        <div>
            <Dialog open={open}>
                <DialogContent className="sm:max-w-[425px] bg-[#0e0e0e] border-[#1a1a1a] text-white rounded-3xl p-8" onInteractOutside={() => setOpen(false)}>
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold tracking-tighter">Update Profile</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitHandler} className='space-y-6'>
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <Label htmlFor="name" className="text-[#888] text-[11px] font-bold uppercase tracking-widest">Full Name</Label>
                                <Input
                                    id="name"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    className="bg-[#111] border-[#2a2a2a] h-11 px-4 rounded-xl text-white placeholder:text-[#444] focus:ring-primary focus:border-primary transition-all font-sans"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor="email" className="text-[#888] text-[11px] font-bold uppercase tracking-widest">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    className="bg-[#111] border-[#2a2a2a] h-11 px-4 rounded-xl text-white placeholder:text-[#444] focus:ring-primary focus:border-primary transition-all font-sans"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor="number" className="text-[#888] text-[11px] font-bold uppercase tracking-widest">Phone Number</Label>
                                <Input
                                    id="number"
                                    name="phoneNumber"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    className="bg-[#111] border-[#2a2a2a] h-11 px-4 rounded-xl text-white placeholder:text-[#444] focus:ring-primary focus:border-primary transition-all font-sans"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor="bio" className="text-[#888] text-[11px] font-bold uppercase tracking-widest">Short Bio</Label>
                                <Input
                                    id="bio"
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="bg-[#111] border-[#2a2a2a] h-11 px-4 rounded-xl text-white placeholder:text-[#444] focus:ring-primary focus:border-primary transition-all font-sans"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor="skills" className="text-[#888] text-[11px] font-bold uppercase tracking-widest">Skills (comma separated)</Label>
                                <Input
                                    id="skills"
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    placeholder="React, Node.js, Tailwind"
                                    className="bg-[#111] border-[#2a2a2a] h-11 px-4 rounded-xl text-white placeholder:text-[#444] focus:ring-primary focus:border-primary transition-all font-sans"
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor="file" className="text-[#888] text-[11px] font-bold uppercase tracking-widest">Update Resume (PDF)</Label>
                                <Input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="bg-[#111] border-[#2a2a2a] h-11 rounded-xl text-white file:bg-primary file:text-white file:border-none file:px-4 file:py-1 file:rounded-lg file:mr-4 file:cursor-pointer hover:file:bg-primary/90 transition-all cursor-pointer font-sans"
                                />
                            </div>
                        </div>
                        <DialogFooter className="pt-4">
                            {
                                loading ? (
                                    <Button disabled className="w-full bg-primary h-12 rounded-xl text-white font-bold uppercase tracking-widest">
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Processing
                                    </Button>
                                ) : (
                                    <Button type="submit" className="w-full bg-primary hover:bg-[#5558e8] h-12 rounded-xl text-white font-bold uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-primary/20">
                                        Save Changes
                                    </Button>
                                )
                            }
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog