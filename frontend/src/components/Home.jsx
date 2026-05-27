import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div className='bg-white overflow-hidden'>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
      
      {/* What Our Users Say Section */}
      <div className='py-32 bg-slate-50/50 relative'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none'>
            <div className='absolute top-0 right-0 w-[30%] h-[50%] rounded-full bg-indigo-50 blur-[100px] opacity-60'></div>
            <div className='absolute bottom-0 left-0 w-[30%] h-[50%] rounded-full bg-violet-50 blur-[100px] opacity-60'></div>
        </div>
        
        <div className='max-w-7xl mx-auto px-4 text-center relative z-10'>
            <h2 className='text-4xl font-black text-slate-900 mb-16'>What Our <span className='text-indigo-600'>Users Say</span></h2>
            
            <div className='max-w-3xl mx-auto'>
                <div className='relative'>
                    <span className='absolute -top-10 -left-10 text-[120px] text-indigo-100 font-serif leading-none select-none'>"</span>
                    <p className='text-2xl font-bold text-slate-700 leading-relaxed italic relative z-10'>
                        "I used to struggle with job platforms, but JobPortal AI made it feel easy and personal. It actually understands what I'm looking for and helped me land my role at Meta."
                    </p>
                </div>
                
                <div className='mt-12 flex flex-col items-center gap-4'>
                    <div className='flex -space-x-4 mb-2'>
                        <img src="https://i.pravatar.cc/150?u=1" className='w-12 h-12 rounded-full border-4 border-white shadow-sm' alt="" />
                        <img src="https://i.pravatar.cc/150?u=2" className='w-12 h-12 rounded-full border-4 border-white shadow-sm' alt="" />
                        <img src="https://i.pravatar.cc/150?u=3" className='w-12 h-12 rounded-full border-4 border-white shadow-sm' alt="" />
                        <img src="https://i.pravatar.cc/150?u=4" className='w-12 h-12 rounded-full border-4 border-white shadow-sm' alt="" />
                    </div>
                    <div>
                        <h4 className='font-black text-slate-900'>Esther Howard</h4>
                        <p className='text-slate-500 font-bold text-xs uppercase tracking-widest'>Marketing Coordinator at Meta</p>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className='bg-slate-900 py-24 text-white'>
          <div className='max-w-7xl mx-auto px-4'>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-12 text-center'>
                  <div>
                      <h3 className='text-5xl font-black mb-2 text-indigo-400'>10K+</h3>
                      <p className='text-slate-400 font-bold text-xs uppercase tracking-[0.2em]'>Active Jobs</p>
                  </div>
                  <div>
                      <h3 className='text-5xl font-black mb-2 text-indigo-400'>3K+</h3>
                      <p className='text-slate-400 font-bold text-xs uppercase tracking-[0.2em]'>Verified Companies</p>
                  </div>
                  <div>
                      <h3 className='text-5xl font-black mb-2 text-indigo-400'>95%</h3>
                      <p className='text-slate-400 font-bold text-xs uppercase tracking-[0.2em]'>Success Rate</p>
                  </div>
                  <div>
                      <h3 className='text-5xl font-black mb-2 text-indigo-400'>24/7</h3>
                      <p className='text-slate-400 font-bold text-xs uppercase tracking-[0.2em]'>AI Support</p>
                  </div>
              </div>
          </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home