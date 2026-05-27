import React from 'react';
import { Facebook, Twitter, Linkedin, Briefcase, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#111] py-20 relative overflow-hidden font-sans">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="md:w-1/3">
            <Link to="/" className='flex items-center gap-3 mb-6 group'>
                <h1 className='text-xl font-bold tracking-tighter text-white'>
                    Hire<span className='text-primary'>Sync</span>
                </h1>
            </Link>
            <p className="text-[#555] text-sm leading-relaxed mb-8 font-medium">
              Revolutionizing the job search experience with AI-powered matching and career intelligence. Connect with the world's most innovative companies.
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-[#333] hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-[#333] hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-[#333] hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-12 md:gap-24">
            <div>
              <h3 className="text-[#444] font-bold uppercase tracking-[0.1em] text-[11px] mb-6">Platform</h3>
              <ul className="space-y-3 text-[13px] font-medium text-[#555]">
                <li className="hover:text-white transition-colors"><Link to="/jobs">Find Jobs</Link></li>
                <li className="hover:text-white transition-colors"><Link to="/browse">Companies</Link></li>
                <li className="hover:text-white transition-colors"><Link to="/browse">Salaries</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#444] font-bold uppercase tracking-[0.1em] text-[11px] mb-6">Support</h3>
              <ul className="space-y-3 text-[13px] font-medium text-[#555]">
                <li className="hover:text-white transition-colors"><a href="#">Help Center</a></li>
                <li className="hover:text-white transition-colors"><a href="#">Terms</a></li>
                <li className="hover:text-white transition-colors"><a href="#">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-20 pt-8 border-t border-[#111] text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[#333] text-[12px] font-medium">
            © {new Date().getFullYear()} HireSync Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-[11px] font-medium text-[#222]">v4.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;