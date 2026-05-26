import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Loader2, Zap, BrainCircuit, FileText, CheckCircle2, UploadCloud } from 'lucide-react'
import { Badge } from './ui/badge'

const AiTools = () => {
    const [analyzing, setAnalyzing] = useState(false);
    const [atsData, setAtsData] = useState(null);
    const [matching, setMatching] = useState(false);
    const [matchedJobs, setMatchedJobs] = useState([]);
    const [file, setFile] = useState(null);
    
    const { user } = useSelector(store => store.auth);

    const fileChangeHandler = (e) => {
        setFile(e.target.files[0]);
    }

    const analyzeResumeHandler = async () => {
        if (!file) {
            toast.error("Please select a resume file first!");
            return;
        }
        try {
            setAnalyzing(true);
            const formData = new FormData();
            formData.append("file", file);

            const res = await axios.post(`${USER_API_END_POINT}/analyze-resume`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true 
            });
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
        <div className='min-h-screen bg-[#F8FAFC]'>
            <Navbar />
            <div className='max-w-7xl mx-auto py-12 px-4'>
                <div className='text-center mb-16'>
                    <div className='inline-flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full mb-6'>
                        <Zap className='h-4 w-4 text-indigo-600' />
                        <span className='text-sm font-semibold text-indigo-700 uppercase tracking-wider'>Next-Gen AI Career Suite</span>
                    </div>
                    <h1 className='text-5xl font-extrabold text-slate-900 mb-6 flex items-center justify-center gap-4'>
                        <BrainCircuit className="text-indigo-600 h-12 w-12" />
                        AI Career Suite
                    </h1>
                    <p className='text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed'>
                        Empower your job search with precision AI. Upload your resume for a deep ATS analysis and let our algorithms map your skills to the perfect opportunities.
                    </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20'>
                    {/* ATS Section */}
                    <div className='bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col'>
                        <div className='flex items-center gap-5 mb-8'>
                            <div className='p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200'>
                                <FileText className="text-white h-8 w-8" />
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold text-slate-900'>ATS Resume Analyzer</h2>
                                <p className='text-slate-500'>Score your resume against industry standards</p>
                            </div>
                        </div>
                        
                        <div className='space-y-5 mb-10 flex-grow'>
                            <div className='flex items-start gap-3 text-slate-700'>
                                <CheckCircle2 className='text-emerald-500 h-6 w-6 mt-0.5' />
                                <div>
                                    <span className='font-semibold block'>Deep Keyword Analysis</span>
                                    <span className='text-sm text-slate-500'>Identify missing industry-standard terminology.</span>
                                </div>
                            </div>
                            <div className='flex items-start gap-3 text-slate-700'>
                                <CheckCircle2 className='text-emerald-500 h-6 w-6 mt-0.5' />
                                <div>
                                    <span className='font-semibold block'>Format Optimization</span>
                                    <span className='text-sm text-slate-500'>Ensure your layout is readable by automated systems.</span>
                                </div>
                            </div>
                            <div className='flex items-start gap-3 text-slate-700'>
                                <CheckCircle2 className='text-emerald-500 h-6 w-6 mt-0.5' />
                                <div>
                                    <span className='font-semibold block'>Actionable Insights</span>
                                    <span className='text-sm text-slate-500'>Get specific tips to improve your candidate ranking.</span>
                                </div>
                            </div>
                        </div>

                        <div className='space-y-4'>
                            <div className="flex flex-col items-center justify-center w-full">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-3 text-slate-400" />
                                        <p className="mb-2 text-sm text-slate-500 font-medium">
                                            {file ? <span className='text-indigo-600 font-bold'>{file.name}</span> : <span>Click to upload or drag and drop</span>}
                                        </p>
                                        <p className="text-xs text-slate-400 uppercase tracking-tighter">PDF, DOCX (MAX. 5MB)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" accept=".pdf,.docx" onChange={fileChangeHandler} />
                                </label>
                            </div>

                            <Button 
                                onClick={analyzeResumeHandler} 
                                disabled={analyzing}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 h-14 text-lg font-bold shadow-lg shadow-indigo-100 rounded-2xl transition-all active:scale-[0.98]"
                            >
                                {analyzing ? <Loader2 className='mr-2 h-6 w-6 animate-spin' /> : <Zap className='mr-2 h-5 w-5 fill-current' />}
                                {analyzing ? "Analyzing..." : "Analyze Resume"}
                            </Button>
                        </div>

                        {atsData && (
                            <div className='mt-10 p-8 bg-indigo-50/50 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-bottom-6'>
                                <div className='flex items-center justify-between mb-6'>
                                    <h3 className='font-bold text-xl text-slate-900'>Analysis Result</h3>
                                    <div className='flex flex-col items-end'>
                                        <span className='text-sm text-slate-500 font-bold uppercase tracking-widest mb-1'>ATS Score</span>
                                        <div className='text-4xl font-black text-indigo-600'>{atsData.score}%</div>
                                    </div>
                                </div>
                                <div className='w-full bg-white rounded-full h-4 mb-8 shadow-inner overflow-hidden'>
                                    <div 
                                        className='bg-gradient-to-r from-indigo-500 to-indigo-600 h-4 rounded-full transition-all duration-1000 ease-out' 
                                        style={{ width: `${atsData.score}%` }}
                                    ></div>
                                </div>
                                <div className='space-y-6'>
                                    <div className='bg-white p-4 rounded-xl border border-indigo-50 shadow-sm'>
                                        <h4 className='font-bold text-slate-900 mb-2 flex items-center gap-2'>
                                            <CheckCircle2 className='h-4 w-4 text-emerald-500' />
                                            Feedback
                                        </h4>
                                        <p className='text-slate-600 leading-relaxed'>{atsData.feedback}</p>
                                    </div>
                                    <div>
                                        <h4 className='font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider'>Keywords Identified:</h4>
                                        <div className='flex flex-wrap gap-2'>
                                            {atsData.keywordsMatched.map((kw, i) => (
                                                <Badge key={i} className="bg-white text-indigo-700 border-indigo-100 px-3 py-1 shadow-sm font-medium">+{kw}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* AI Match Section */}
                    <div className='bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col'>
                        <div className='flex items-center gap-5 mb-8'>
                            <div className='p-4 bg-slate-900 rounded-2xl shadow-lg shadow-slate-300'>
                                <BrainCircuit className="text-white h-8 w-8" />
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold text-slate-900'>AI Job Match</h2>
                                <p className='text-slate-500'>Find jobs tailored to your unique profile</p>
                            </div>
                        </div>

                        <div className='space-y-5 mb-10 flex-grow'>
                            <div className='flex items-start gap-3 text-slate-700'>
                                <CheckCircle2 className='text-emerald-500 h-6 w-6 mt-0.5' />
                                <div>
                                    <span className='font-semibold block'>Skill Mapping</span>
                                    <span className='text-sm text-slate-500'>Match your expertise to high-demand roles.</span>
                                </div>
                            </div>
                            <div className='flex items-start gap-3 text-slate-700'>
                                <CheckCircle2 className='text-emerald-500 h-6 w-6 mt-0.5' />
                                <div>
                                    <span className='font-semibold block'>Culture Alignment</span>
                                    <span className='text-sm text-slate-500'>Find companies where you'll thrive.</span>
                                </div>
                            </div>
                            <div className='flex items-start gap-3 text-slate-700'>
                                <CheckCircle2 className='text-emerald-500 h-6 w-6 mt-0.5' />
                                <div>
                                    <span className='font-semibold block'>Salary Benchmarking</span>
                                    <span className='text-sm text-slate-500'>See jobs that match your earning potential.</span>
                                </div>
                            </div>
                        </div>

                        <Button 
                            onClick={getAiMatchesHandler} 
                            disabled={matching}
                            variant="outline"
                            className="w-full border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white h-14 text-lg font-bold rounded-2xl transition-all active:scale-[0.98]"
                        >
                            {matching ? <Loader2 className='mr-2 h-6 w-6 animate-spin' /> : <Zap className='mr-2 h-5 w-5' />}
                            {matching ? "Matching..." : "Find My Matches"}
                        </Button>

                        {matchedJobs.length > 0 && (
                            <div className='mt-10 space-y-6 animate-in fade-in slide-in-from-bottom-6'>
                                <h3 className='font-bold text-xl text-slate-900 flex items-center gap-3'>
                                    AI Recommendations
                                    <Badge className="bg-indigo-600 text-white border-none">{matchedJobs.length} Positions</Badge>
                                </h3>
                                <div className='max-h-[500px] overflow-y-auto pr-3 space-y-4 custom-scrollbar'>
                                    {matchedJobs.map((job) => (
                                        <div key={job._id} className='p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group'>
                                            <div className='flex justify-between items-start mb-3'>
                                                <h4 className='font-bold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors'>{job.title}</h4>
                                                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-bold px-3 py-1">
                                                    {job.matchPercentage}% Match
                                                </Badge>
                                            </div>
                                            <p className='text-slate-600 font-semibold mb-4'>{job.company?.name}</p>
                                            <div className='flex flex-wrap gap-3 mb-6'>
                                                <Badge variant="secondary" className="bg-white text-slate-600 border-slate-200 px-3">{job.location}</Badge>
                                                <Badge variant="secondary" className="bg-white text-slate-600 border-slate-200 px-3">{job.salary}LPA</Badge>
                                                <Badge variant="secondary" className="bg-indigo-50 text-indigo-600 border-indigo-100 px-3">{job.jobType}</Badge>
                                            </div>
                                            <Button 
                                                onClick={() => window.location.href=`/description/${job._id}`}
                                                className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-11"
                                            >
                                                Apply via AI Match
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
