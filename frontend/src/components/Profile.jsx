import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2, Zap, BrainCircuit } from 'lucide-react'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [atsData, setAtsData] = useState(null);
    const [matching, setMatching] = useState(false);
    const [matchedJobs, setMatchedJobs] = useState([]);
    
    const { user } = useSelector(store => store.auth);

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
        <div className='bg-[#F8FAFC] min-h-screen'>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-slate-100 rounded-3xl my-10 p-10 shadow-sm'>
                <div className='flex justify-between items-start'>
                    <div className='flex items-center gap-6'>
                        <Avatar className="h-28 w-28 border-4 border-indigo-50 shadow-sm">
                            <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-black text-3xl text-slate-900'>{user?.fullname}</h1>
                            <p className='text-slate-500 font-medium text-lg mt-1'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="rounded-xl border-slate-200 hover:bg-slate-50" variant="outline"><Pen size={18} /></Button>
                </div>
                <div className='my-8 space-y-3'>
                    <div className='flex items-center gap-4 text-slate-600 font-semibold'>
                        <Mail className='text-indigo-500' size={20} />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-4 text-slate-600 font-semibold'>
                        <Contact className='text-indigo-500' size={20} />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-8'>
                    <h1 className='font-bold text-sm uppercase tracking-widest text-slate-400 mb-4'>Skills</h1>
                    <div className='flex flex-wrap gap-2'>
                        {
                            user?.profile?.skills?.length !== 0 ? user?.profile?.skills?.map((item, index) => <Badge key={index} className="bg-indigo-50 text-indigo-600 border-indigo-100 px-4 py-1.5 rounded-lg font-bold">{item}</Badge>) : <span className='text-slate-400'>No skills added yet</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-2 mb-8'>
                    <Label className="text-sm font-bold uppercase tracking-widest text-slate-400">Resume</Label>
                    {
                        user?.profile?.resume ? <a target='blank' href={user?.profile?.resume} className='text-indigo-600 font-bold hover:underline flex items-center gap-2'><FileText size={18} /> {user?.profile?.resumeOriginalName}</a> : <span className='text-slate-400'>No resume uploaded</span>
                    }
                </div>

                <div className='flex gap-4 border-t border-slate-50 pt-8'>
                    <Button 
                        onClick={analyzeResumeHandler} 
                        disabled={analyzing}
                        className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 px-8 py-6 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95"
                    >
                        {analyzing ? <Loader2 className='animate-spin' /> : <Zap size={20} className='fill-current' />}
                        ATS Resume Analyzer
                    </Button>
                    <Button 
                        onClick={getAiMatchesHandler} 
                        disabled={matching}
                        variant="outline"
                        className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-6 rounded-2xl font-bold flex items-center gap-3 transition-all active:scale-95"
                    >
                        {matching ? <Loader2 className='animate-spin' /> : <BrainCircuit size={20} />}
                        AI Job Match
                    </Button>
                </div>

                {atsData && (
                    <div className='mt-8 p-8 bg-indigo-50/50 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-bottom-4'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='font-black text-2xl text-slate-900'>ATS Score Analysis</h2>
                            <div className='text-4xl font-black text-indigo-600'>{atsData.score}%</div>
                        </div>
                        <div className='w-full bg-white rounded-full h-4 mb-6 shadow-inner'>
                            <div 
                                className='bg-gradient-to-r from-indigo-500 to-indigo-600 h-4 rounded-full transition-all duration-1000' 
                                style={{ width: `${atsData.score}%` }}
                            ></div>
                        </div>
                        <p className='text-slate-600 font-medium leading-relaxed mb-6'>{atsData.feedback}</p>
                        <div className='flex flex-wrap gap-2'>
                            {atsData.keywordsMatched.map((kw, i) => (
                                <Badge key={i} className="bg-white border-indigo-100 text-indigo-700 px-3 py-1 shadow-sm font-bold">+{kw}</Badge>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {matchedJobs.length > 0 && (
                <div className='max-w-4xl mx-auto my-16 px-4'>
                    <h1 className='font-black text-3xl text-slate-900 mb-8 flex items-center gap-3'>
                        <BrainCircuit className="text-indigo-600 h-8 w-8" />
                        AI Recommended Jobs
                    </h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {matchedJobs.map((job) => (
                            <div key={job._id} className='relative p-8 rounded-3xl shadow-sm bg-white border border-slate-100 hover:shadow-xl hover:border-indigo-100 transition-all group'>
                                <div className='absolute top-4 right-4'>
                                    <Badge className="bg-emerald-100 text-emerald-700 border-none font-bold px-3 py-1">{job.matchPercentage}% Match</Badge>
                                </div>
                                <h1 className='font-black text-2xl text-slate-900 group-hover:text-indigo-600 transition-colors mb-1'>{job.title}</h1>
                                <p className='text-slate-500 font-bold uppercase tracking-widest text-xs mb-6'>{job.company?.name}</p>
                                <div className='flex gap-3'>
                                    <Badge className={'text-indigo-600 bg-indigo-50 border-none font-bold px-3 py-1'} variant="ghost">{job.location}</Badge>
                                    <Badge className={'text-amber-600 bg-amber-50 border-none font-bold px-3 py-1'} variant="ghost">{job.salary}LPA</Badge>
                                </div>
                                <Button 
                                    onClick={() => window.location.href=`/description/${job._id}`}
                                    className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-bold"
                                >
                                    View Details →
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className='max-w-4xl mx-auto bg-white rounded-3xl border border-slate-100 p-10 mb-20 shadow-sm'>
                <h1 className='font-black text-2xl text-slate-900 mb-8 uppercase tracking-tighter'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
            <Footer />
        </div>
    )
}

export default Profile