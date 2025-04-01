import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight, Leaf, Twitter, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="">
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-8 w-8 text-[#3A6B4C]" strokeWidth={1.5} />
              <span className="text-2xl font-bold text-[#2B463C] tracking-tight">
                Sprout
              </span>
            </div>
            <p className="text-center text-[#554640]/90 max-w-md">
              Cultivating your tech career in Japan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-[#2B463C] mb-4">
                Grow Your Opportunities
              </h3>
              <form className="flex gap-3">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#554640]" />
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="pl-10 focus:ring-2 focus:ring-[#3A6B4C] rounded-lg"
                  />
                </div>
                <Button className="bg-[#3A6B4C] border-[#3A6B4C] hover:bg-[#2E5540] text-white">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="text-sm text-[#554640]/80 mt-3">
                Join 42k+ professionals growing their careers in Japan
              </p>
            </div>

            <div>
              <h4 className="text-[#2B463C] font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                {['Salary Guide', 'Interview Prep', 'Blog', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[#554640]/90 hover:text-[#3A6B4C] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#2B463C] font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                {['About', 'Careers', 'Partners', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-[#554640]/90 hover:text-[#3A6B4C] transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-[#e4d9c8] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex space-x-4">
              <a href="#" className="text-[#554640]/80 hover:text-[#3A6B4C]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#554640]/80 hover:text-[#3A6B4C]">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#554640]/80 hover:text-[#3A6B4C]">
                <Github className="h-5 w-5" />
              </a>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-[#554640]/80">
                © {new Date().getFullYear()} Sprout. Cultivating careers in Japan
              </p>
              <div className="mt-1 space-x-4">
                <a href="#" className="text-sm text-[#554640]/80 hover:text-[#3A6B4C]">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-[#554640]/80 hover:text-[#3A6B4C]">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;