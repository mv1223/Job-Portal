import React from 'react';
import { Facebook, Twitter, Linkedin, Briefcase, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-24 relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20">
          <div className="md:w-1/3">
            <Link to="/" className='flex items-center gap-3 mb-8 group'>
                <div className='w-8 h-8 bg-white rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12'>
                    <Briefcase className='text-black h-4 w-4' />
                </div>
                <h1 className='text-2xl font-black tracking-tighter text-white'>
                    Job<span className='text-primary'>Portal</span>
                </h1>
            </Link>
            <p className="text-white/40 leading-relaxed mb-8 font-medium">
              Revolutionizing the job search experience with AI-powered matching and career intelligence. Connect with the world's most innovative companies.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/20 hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/20 hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/20 hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-12 md:gap-32">
            <div>
              <h3 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Platform</h3>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-white/40">
                <li className="hover:text-white transition-colors"><Link to="/jobs">Find Jobs</Link></li>
                <li className="hover:text-white transition-colors"><Link to="/browse">Browse</Link></li>
                <li className="hover:text-white transition-colors flex items-center gap-2">
                    <Link to="/ai-roadmap">Roadmap</Link>
                    <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold uppercase tracking-[0.3em] text-[10px] mb-8">Support</h3>
              <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-white/40">
                <li className="hover:text-white transition-colors"><a href="#">Help Center</a></li>
                <li className="hover:text-white transition-colors"><a href="#">Terms</a></li>
                <li className="hover:text-white transition-colors"><a href="#">Privacy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-24 pt-8 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} JobPortal Intelligence.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest">v2.0.4 - Production</span>
            <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;