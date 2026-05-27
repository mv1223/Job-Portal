import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Download, Zap, BrainCircuit, Loader2, FileSpreadsheet } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [atsData, setAtsData] = useState(null);
    const [matching, setMatching] = useState(false);
    const [matchedJobs, setMatchedJobs] = useState([]);
    const [downloading, setDownloading] = useState(false);
    
    const { user } = useSelector(store => store.auth);

    const downloadUserReport = async () => {
        try {
            setDownloading(true);
            const response = await axios.get(`${USER_API_END_POINT}/export`, {
                withCredentials: true,
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'users_report.csv');
            document.body.appendChild(link);
            link.click();
            link.remove();
            toast.success("User report downloaded successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to download report");
        } finally {
            setDownloading(false);
        }
    }

    const analyzeResumeHandler = async () => {
        try {
            setAnalyzing(true);
            const res = await axios.post(`${USER_API_END_POINT}/analyze-resume`, {}, { withCredentials: true });
            if (res.data.success) {
                setAtsData(res.data);
                toast.success("ATS Analysis complete!");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Analysis failed");
        } finally {
            setAnalyzing(false);
        }
    }

    const getAiMatchesHandler = async () => {
        try {
            setMatching(true);
            const res = await axios.get(`${USER_API_END_POINT}/job-matches`, { withCredentials: true });
            if (res.data.success) {
                setMatchedJobs(res.data.matchedJobs);
                toast.success("AI Job Matching complete!");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Matching failed");
        } finally {
            setMatching(false);
        }
    }

    return (
        <div className='bg-[#0a0a0a] min-h-screen'>
            <Navbar />
            <div className='noise-bg' />
            <div className='max-w-4xl mx-auto bg-[#0e0e0e] border border-[#1a1a1a] rounded-3xl pt-32 p-10 relative z-10'>
                <div className='flex justify-between items-start'>
                    <div className='flex items-center gap-6'>
                        <div className='p-1 rounded-2xl border border-white/10 bg-white/5'>
                            <Avatar className="h-28 w-28 rounded-xl">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                            </Avatar>
                        </div>
                        <div>
                            <h1 className='font-bold text-3xl text-white tracking-tighter'>{user?.fullname}</h1>
                            <p className='text-[#666] font-medium text-lg mt-1'>{user?.profile?.bio || "No bio added yet"}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="rounded-xl border-[#2a2a2a] bg-[#111] hover:bg-[#1a1a1a] text-white" variant="outline"><Pen size={18} /></Button>
                </div>
                <div className='my-8 space-y-3'>
                    <div className='flex items-center gap-4 text-[#888] font-medium'>
                        <Mail className='text-primary' size={20} />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-4 text-[#888] font-medium'>
                        <Contact className='text-primary' size={20} />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-8'>
                    <h1 className='font-bold text-[11px] uppercase tracking-[0.2em] text-[#444] mb-4'>Professional Skills</h1>
                    <div className='flex flex-wrap gap-2'>
                        {
                            user?.profile?.skills?.length !== 0 ? user?.profile?.skills?.map((item, index) => <Badge key={index} className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-lg font-bold uppercase text-[10px] tracking-widest">{item}</Badge>) : <span className='text-[#333]'>No skills added yet</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-sm items-center gap-2 mb-8'>
                    <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#444]">Resume</Label>
                    {
                        user?.profile?.resume ? <a target='blank' href={user?.profile?.resume} className='text-primary font-bold hover:underline flex items-center gap-2 text-sm'><FileText size={18} /> {user?.profile?.resumeOriginalName}</a> : <span className='text-[#333] text-sm'>No resume uploaded</span>
                    }
                </div>

                <div className='flex flex-wrap gap-4 border-t border-[#1a1a1a] pt-8'>
                    <Button 
                        onClick={analyzeResumeHandler} 
                        disabled={analyzing}
                        className="bg-primary hover:bg-[#5558e8] text-white px-8 py-6 rounded-xl font-bold flex items-center gap-3 transition-all active:scale-95 text-[12px] uppercase tracking-widest"
                    >
                        {analyzing ? <Loader2 className='animate-spin' /> : <Zap size={20} className='fill-current' />}
                        ATS Analyzer
                    </Button>
                    <Button 
                        onClick={getAiMatchesHandler} 
                        disabled={matching}
                        variant="outline"
                        className="border-[#2a2a2a] bg-[#111] text-white hover:bg-[#1a1a1a] px-8 py-6 rounded-xl font-bold flex items-center gap-3 transition-all active:scale-95 text-[12px] uppercase tracking-widest"
                    >
                        {matching ? <Loader2 className='animate-spin' /> : <BrainCircuit size={20} />}
                        AI Matching
                    </Button>
                </div>
            </div>

            <div className='max-w-4xl mx-auto my-16 px-6'>
                <h1 className='font-bold text-2xl text-white mb-8 tracking-tighter'>Applied Positions</h1>
                <AppliedJobTable />
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
            <Footer />
        </div>
    )
}

export default Profile