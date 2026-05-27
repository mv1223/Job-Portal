import React, { useEffect, useRef } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Testimonials from './Testimonials'

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const mainRef = useRef(null);

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }

    const ctx = gsap.context(() => {
      // High-end scroll animations
      const sections = gsap.utils.toArray('.scroll-section');
      sections.forEach((section) => {
        gsap.fromTo(section, 
          { opacity: 0, y: 100, scale: 0.9, filter: "blur(10px)" },
          { 
            opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Background color shift on scroll
      gsap.to(mainRef.current, {
        backgroundColor: "#09090b",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, [user, navigate]);

  return (
    <div ref={mainRef} className='bg-black overflow-hidden selection:bg-primary selection:text-white transition-colors duration-1000'>
      <Navbar />
      <div className='noise-bg' />
      
      <div className='scroll-section'>
        <HeroSection />
      </div>

      <div className='border-y border-[#111] py-8 px-6'>
        <div className='max-w-7xl mx-auto'>
          <p className='text-[11px] text-[#333] uppercase tracking-[0.8px] mb-6 text-center font-bold'>Trusted by teams at</p>
          <div className='flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700'>
            {["Google", "Stripe", "Airbnb", "Notion", "Figma", "Linear", "Vercel", "Shopify"].map((co) => (
              <span key={co} className='text-lg font-bold text-white tracking-tighter cursor-pointer'>{co}</span>
            ))}
          </div>
        </div>
      </div>

      <div className='space-y-40 pb-40'>
        <div className='scroll-section'>
          <CategoryCarousel />
        </div>
        <div className='scroll-section'>
          <LatestJobs />
        </div>
        <div className='scroll-section'>
          <Testimonials />
        </div>

        <div className='scroll-section px-6'>
          <div className='max-w-7xl mx-auto bg-[#0e0e0e] border border-[#1a1a1a] rounded-2xl padding-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10'>
            <div className='max-w-xl'>
              <h2 className='text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight'>Ready to find your next challenge?</h2>
              <p className='text-[#666] text-lg leading-relaxed'>Join over 1.4M+ candidates who have found their dream roles through HireSync.</p>
            </div>
            <div className='flex items-center gap-4 shrink-0'>
              <button className='bg-white text-black px-8 py-3 rounded-lg font-bold text-[14px] hover:bg-[#e5e5e5] transition-all'>Join Now</button>
              <button className='bg-transparent border border-[#2a2a2a] text-[#ccc] px-8 py-3 rounded-lg font-bold text-[14px] hover:border-[#555] hover:text-white transition-all'>Post a Job</button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default Home