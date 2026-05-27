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
    <div className='bg-white overflow-hidden selection:bg-cyan-100 selection:text-cyan-900'>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className='relative'
      >
        {/* Subtle background glow for section transition */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-transparent via-cyan-50/30 to-transparent pointer-events-none' />
        <CategoryCarousel />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <LatestJobs />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className='bg-slate-50/30'
      >
        <Testimonials />
      </motion.div>
      
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