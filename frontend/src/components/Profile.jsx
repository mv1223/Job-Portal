import React, { useState } from 'react'
import Navbar from './shared/Navbar'
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
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills?.length !== 0 ? user?.profile?.skills?.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5 mb-5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        user?.profile?.resume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>

                <div className='flex gap-4 border-t pt-5'>
                    <Button 
                        onClick={analyzeResumeHandler} 
                        disabled={analyzing}
                        className="bg-[#6A38C2] hover:bg-[#5b30a6] flex items-center gap-2"
                    >
                        {analyzing ? <Loader2 className='animate-spin' /> : <Zap size={18} />}
                        ATS Resume Analyzer
                    </Button>
                    <Button 
                        onClick={getAiMatchesHandler} 
                        disabled={matching}
                        variant="outline"
                        className="flex items-center gap-2 border-[#6A38C2] text-[#6A38C2] hover:bg-[#f3e8ff]"
                    >
                        {matching ? <Loader2 className='animate-spin' /> : <BrainCircuit size={18} />}
                        AI Job Match
                    </Button>
                </div>

                {atsData && (
                    <div className='mt-5 p-5 bg-purple-50 rounded-xl border border-purple-100'>
                        <div className='flex items-center justify-between mb-3'>
                            <h2 className='font-bold text-lg text-purple-900'>ATS Score Analysis</h2>
                            <div className='text-2xl font-bold text-purple-600'>{atsData.score}%</div>
                        </div>
                        <p className='text-gray-700 mb-3'>{atsData.feedback}</p>
                        <div className='flex flex-wrap gap-2'>
                            {atsData.keywordsMatched.map((kw, i) => (
                                <Badge key={i} variant="secondary" className="bg-white border-purple-200 text-purple-700">+{kw}</Badge>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {matchedJobs.length > 0 && (
                <div className='max-w-4xl mx-auto my-10'>
                    <h1 className='font-bold text-2xl mb-5 flex items-center gap-2'>
                        <BrainCircuit className="text-[#6A38C2]" />
                        AI Recommended Jobs
                    </h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {matchedJobs.map((job) => (
                            <div key={job._id} className='relative p-5 rounded-md shadow-lg bg-white border border-purple-100 hover:border-purple-300 transition-all'>
                                <div className='absolute top-2 right-2'>
                                    <Badge className="bg-green-100 text-green-700 border-green-200">{job.matchPercentage}% Match</Badge>
                                </div>
                                <h1 className='font-bold text-lg text-[#6A38C2]'>{job.title}</h1>
                                <p className='text-sm text-gray-500 font-medium'>{job.company?.name}</p>
                                <div className='flex gap-2 mt-3'>
                                    <Badge variant="ghost" className="text-blue-600">{job.location}</Badge>
                                    <Badge variant="ghost" className="text-orange-600">{job.salary}LPA</Badge>
                                </div>
                                <Button 
                                    onClick={() => window.location.href=`/description/${job._id}`}
                                    variant="link" 
                                    className="p-0 mt-2 text-[#6A38C2]"
                                >
                                    View Details →
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className='max-w-4xl mx-auto bg-white rounded-2xl mb-10'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile