import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2, Zap, BrainCircuit, FileText, CheckCircle2 } from 'lucide-react'
import { Badge } from './ui/badge'

const AiTools = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [atsData, setAtsData] = useState(null);
    const [matching, setMatching] = useState(false);
    const [matchedJobs, setMatchedJobs] = useState([]);
    
    const { user } = useSelector(store => store.auth);

    const analyzeResumeHandler = async () => {
        if (!user?.profile?.resume) {
            toast.error("Please upload a resume in your profile first!");
            return;
        }
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
        if (!user?.profile?.resume) {
            toast.error("Please upload a resume in your profile first!");
            return;
        }
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
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='max-w-7xl mx-auto py-10 px-4'>
                <div className='text-center mb-12'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3'>
                        <BrainCircuit className="text-[#6A38C2] h-10 w-10" />
                        AI Career Suite
                    </h1>
                    <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
                        Boost your job search with our advanced AI tools. Analyze your resume for ATS compatibility and find your perfect job match instantly.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>
                    {/* ATS Section */}
                    <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                        <div className='flex items-center gap-4 mb-6'>
                            <div className='p-3 bg-purple-100 rounded-xl'>
                                <Zap className="text-[#6A38C2] h-8 w-8" />
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold text-gray-900'>ATS Resume Analyzer</h2>
                                <p className='text-gray-500'>Check your resume score and get feedback</p>
                            </div>
                        </div>
                        
                        <div className='space-y-4 mb-8'>
                            <div className='flex items-center gap-2 text-gray-700'>
                                <CheckCircle2 className='text-green-500 h-5 w-5' />
                                <span>Keyword Optimization Analysis</span>
                            </div>
                            <div className='flex items-center gap-2 text-gray-700'>
                                <CheckCircle2 className='text-green-500 h-5 w-5' />
                                <span>Format & Readability Check</span>
                            </div>
                            <div className='flex items-center gap-2 text-gray-700'>
                                <CheckCircle2 className='text-green-500 h-5 w-5' />
                                <span>Personalized Improvement Tips</span>
                            </div>
                        </div>

                        <Button 
                            onClick={analyzeResumeHandler} 
                            disabled={analyzing}
                            className="w-full bg-[#6A38C2] hover:bg-[#5b30a6] h-12 text-lg"
                        >
                            {analyzing ? <Loader2 className='mr-2 h-5 w-5 animate-spin' /> : <FileText className='mr-2 h-5 w-5' />}
                            Analyze My Resume
                        </Button>

                        {atsData && (
                            <div className='mt-8 p-6 bg-purple-50 rounded-xl border border-purple-100 animate-in fade-in slide-in-from-bottom-4'>
                                <div className='flex items-center justify-between mb-4'>
                                    <h3 className='font-bold text-xl text-purple-900'>ATS Performance Score</h3>
                                    <div className='text-3xl font-black text-[#6A38C2]'>{atsData.score}%</div>
                                </div>
                                <div className='w-full bg-gray-200 rounded-full h-3 mb-6'>
                                    <div 
                                        className='bg-[#6A38C2] h-3 rounded-full transition-all duration-1000' 
                                        style={{ width: `${atsData.score}%` }}
                                    ></div>
                                </div>
                                <div className='space-y-4'>
                                    <div>
                                        <h4 className='font-semibold text-purple-900 mb-2'>Feedback:</h4>
                                        <p className='text-purple-800 leading-relaxed'>{atsData.feedback}</p>
                                    </div>
                                    <div>
                                        <h4 className='font-semibold text-purple-900 mb-2'>Keywords Matched:</h4>
                                        <div className='flex flex-wrap gap-2'>
                                            {atsData.keywordsMatched.map((kw, i) => (
                                                <Badge key={i} className="bg-white text-[#6A38C2] border-purple-200">{kw}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* AI Match Section */}
                    <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
                        <div className='flex items-center gap-4 mb-6'>
                            <div className='p-3 bg-blue-100 rounded-xl'>
                                <BrainCircuit className="text-blue-600 h-8 w-8" />
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold text-gray-900'>AI Job Match</h2>
                                <p className='text-gray-500'>Find jobs that perfectly fit your skills</p>
                            </div>
                        </div>

                        <div className='space-y-4 mb-8'>
                            <div className='flex items-center gap-2 text-gray-700'>
                                <CheckCircle2 className='text-green-500 h-5 w-5' />
                                <span>Skill-to-Job Mapping</span>
                            </div>
                            <div className='flex items-center gap-2 text-gray-700'>
                                <CheckCircle2 className='text-green-500 h-5 w-5' />
                                <span>Experience Alignment</span>
                            </div>
                            <div className='flex items-center gap-2 text-gray-700'>
                                <CheckCircle2 className='text-green-500 h-5 w-5' />
                                <span>Smart Recommendation Engine</span>
                            </div>
                        </div>

                        <Button 
                            onClick={getAiMatchesHandler} 
                            disabled={matching}
                            variant="outline"
                            className="w-full border-[#6A38C2] text-[#6A38C2] hover:bg-purple-50 h-12 text-lg"
                        >
                            {matching ? <Loader2 className='mr-2 h-5 w-5 animate-spin' /> : <Zap className='mr-2 h-5 w-5' />}
                            Find My Matches
                        </Button>

                        {matchedJobs.length > 0 && (
                            <div className='mt-8 space-y-4 animate-in fade-in slide-in-from-bottom-4'>
                                <h3 className='font-bold text-xl text-gray-900 flex items-center gap-2'>
                                    Recommended for You
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">{matchedJobs.length} Jobs</Badge>
                                </h3>
                                <div className='max-h-[400px] overflow-y-auto pr-2 space-y-3 custom-scrollbar'>
                                    {matchedJobs.map((job) => (
                                        <div key={job._id} className='p-4 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 transition-colors'>
                                            <div className='flex justify-between items-start mb-2'>
                                                <h4 className='font-bold text-blue-900'>{job.title}</h4>
                                                <Badge className="bg-green-100 text-green-700 border-green-200">{job.matchPercentage}% Match</Badge>
                                            </div>
                                            <p className='text-sm text-blue-800 font-medium mb-2'>{job.company?.name}</p>
                                            <div className='flex gap-2'>
                                                <Badge variant="outline" className="text-xs">{job.location}</Badge>
                                                <Badge variant="outline" className="text-xs">{job.salary}LPA</Badge>
                                            </div>
                                            <Button 
                                                onClick={() => window.location.href=`/description/${job._id}`}
                                                variant="link" 
                                                className="p-0 h-auto mt-2 text-[#6A38C2] text-sm"
                                            >
                                                View Details →
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiTools
