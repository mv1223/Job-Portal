import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Testimonials from './Testimonials'

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
      <Testimonials />
      
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