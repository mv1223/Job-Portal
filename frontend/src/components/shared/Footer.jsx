import React from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="md:w-1/3">
            <h1 className='text-3xl font-black tracking-tighter text-slate-900 mb-6'>
                Job<span className='text-indigo-600'>Portal</span>
                <span className='text-[10px] bg-indigo-100 text-indigo-600 px-1.5 py-0.5 rounded-full ml-1 align-top font-bold uppercase'>AI</span>
            </h1>
            <p className="text-slate-500 leading-relaxed mb-6 font-medium">
              Revolutionizing the job search experience with AI-powered matching and ATS analysis. Connect with the world's most innovative companies in 2026.
            </p>
            <div className="flex space-x-5">
              <a href="https://facebook.com" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-12 md:gap-24">
            <div>
              <h3 className="text-slate-900 font-bold uppercase tracking-widest text-xs mb-6">Platform</h3>
              <ul className="space-y-4 text-sm font-semibold text-slate-500">
                <li className="hover:text-indigo-600 transition-colors"><a href="/jobs">Find Jobs</a></li>
                <li className="hover:text-indigo-600 transition-colors"><a href="/browse">Browse Companies</a></li>
                <li className="hover:text-indigo-600 transition-colors"><a href="/ai-tools">AI Career Suite</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-slate-900 font-bold uppercase tracking-widest text-xs mb-6">Support</h3>
              <ul className="space-y-4 text-sm font-semibold text-slate-500">
                <li className="hover:text-indigo-600 transition-colors"><a href="#">Help Center</a></li>
                <li className="hover:text-indigo-600 transition-colors"><a href="#">Terms of Service</a></li>
                <li className="hover:text-indigo-600 transition-colors"><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-50 text-center">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} JobPortal AI. Built with precision for the future of work.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;