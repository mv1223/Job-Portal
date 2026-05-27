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
      </div>
      
      <Footer />
    </div>
  )
}

export default Home