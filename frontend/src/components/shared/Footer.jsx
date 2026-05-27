import React from 'react';
import {
  Facebook,
  Twitter,
  Linkedin,
  ArrowUpRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="px-6 pb-8 bg-[#f5f7f4]">
      <div className="max-w-7xl mx-auto">

        {/* Main Footer Card */}
        <div className="bg-[#111827] rounded-[45px] overflow-hidden px-8 md:px-16 py-16 md:py-20 text-white relative">

          {/* Top Content */}
          <div className="grid lg:grid-cols-4 gap-12">

            {/* Brand */}
            <div className="lg:col-span-2">

              <Link to="/" className="inline-block">
                <h1 className="text-4xl font-extrabold tracking-tight">
                  Hire<span className="text-[#B7F34D]">Sync</span>
                </h1>
              </Link>

              <p className="text-gray-400 mt-6 max-w-md text-lg leading-relaxed">
                Revolutionizing job search with smart AI-powered
                career matching and opportunities from the world’s
                leading companies.
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-8">

                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#B7F34D] hover:text-black transition flex items-center justify-center"
                >
                  <Facebook size={18} />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#B7F34D] hover:text-black transition flex items-center justify-center"
                >
                  <Twitter size={18} />
                </a>

                <a
                  href="#"
                  className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#B7F34D] hover:text-black transition flex items-center justify-center"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            {/* Platform */}
            <div>
              <h3 className="text-[#B7F34D] text-sm uppercase tracking-[3px] font-semibold mb-6">
                Platform
              </h3>

              <ul className="space-y-5 text-gray-300">

                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-[#B7F34D] transition flex items-center gap-2"
                  >
                    Find Jobs
                    <ArrowUpRight size={16} />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#B7F34D] transition flex items-center gap-2"
                  >
                    Companies
                    <ArrowUpRight size={16} />
                  </Link>
                </li>

                <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#B7F34D] transition flex items-center gap-2"
                  >
                    Salaries
                    <ArrowUpRight size={16} />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-[#B7F34D] text-sm uppercase tracking-[3px] font-semibold mb-6">
                Support
              </h3>

              <ul className="space-y-5 text-gray-300">

                <li>
                  <a
                    href="#"
                    className="hover:text-[#B7F34D] transition flex items-center gap-2"
                  >
                    Help Center
                    <ArrowUpRight size={16} />
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="hover:text-[#B7F34D] transition flex items-center gap-2"
                  >
                    Terms & Conditions
                    <ArrowUpRight size={16} />
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="hover:text-[#B7F34D] transition flex items-center gap-2"
                  >
                    Privacy Policy
                    <ArrowUpRight size={16} />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} HireSync. All rights reserved.
            </p>

            <div className="bg-[#B7F34D] text-black px-5 py-2 rounded-full font-semibold text-sm">
              Version 4.2.0
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;