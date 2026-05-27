import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import Testimonials from './Testimonials'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  useGetAllJobs();

  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className='bg-[#f5f7f4] min-h-screen overflow-hidden'>

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <HeroSection />

      {/* Trusted Companies */}
      <section className='py-20 px-6'>
        <div className='max-w-7xl mx-auto text-center'>

          <p className='text-[#8b8b8b] uppercase text-sm tracking-[3px] mb-10 font-semibold'>
            Trusted By Top Companies
          </p>

          <div className='flex flex-wrap justify-center gap-12'>
            {[
              "Google",
              "Microsoft",
              "Amazon",
              "Meta",
              "Spotify",
              "Netflix",
              "Adobe",
              "Shopify"
            ].map((company) => (
              <div
                key={company}
                className='bg-white px-8 py-4 rounded-[22px] shadow-sm border border-[#ececec] hover:shadow-lg transition'
              >
                <h3 className='font-bold text-[#111827] text-lg'>
                  {company}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-6'>

          <div className='text-center mb-12'>
            <span className='bg-[#B7F34D] text-[#111827] px-4 py-2 rounded-full text-sm font-semibold'>
              Explore Categories
            </span>

            <h2 className='text-5xl font-bold mt-6 text-[#111827]'>
              Find Jobs By Category
            </h2>

            <p className='text-gray-500 mt-4 text-lg'>
              Explore opportunities across industries and careers.
            </p>
          </div>

          <CategoryCarousel />
        </div>
      </section>

      {/* Latest Jobs */}
      <section className='py-20 bg-white rounded-[40px] mx-6 shadow-sm'>
        <div className='max-w-7xl mx-auto px-6'>

          <div className='text-center mb-14'>
            <span className='bg-[#B7F34D] px-4 py-2 rounded-full text-sm font-semibold'>
              Featured Jobs
            </span>

            <h2 className='text-5xl font-bold mt-6 text-[#111827]'>
              Latest Job Opportunities
            </h2>

            <p className='text-gray-500 mt-4 text-lg'>
              Apply to top companies hiring right now.
            </p>
          </div>

          <LatestJobs />
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-20'>
        <div className='max-w-7xl mx-auto px-6'>
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className='px-6 pb-20'>
        <div className='max-w-7xl mx-auto bg-[#B7F34D] rounded-[40px] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-10 shadow-lg'>

          <div className='max-w-xl'>
            <span className='bg-black text-white px-4 py-2 rounded-full text-sm font-semibold'>
              Start Hiring
            </span>

            <h2 className='text-4xl md:text-5xl font-bold text-[#111827] mt-6 leading-tight'>
              Find the right talent for your company
            </h2>

            <p className='text-[#4b5563] text-lg mt-5'>
              Reach thousands of skilled candidates and post jobs instantly.
            </p>
          </div>

          <div className='flex gap-4 flex-wrap'>
            <Link to="/signup">
              <button className='bg-[#111827] text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition'>
                Post a Job
              </button>
            </Link>

            <Link to="/jobs">
              <button className='bg-white text-[#111827] px-8 py-4 rounded-full font-semibold hover:scale-105 transition'>
                Explore Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home