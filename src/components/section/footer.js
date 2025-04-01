import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="">
      <div className="py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3 text-[#2B463C]">
            Get Job Alerts
          </h2>
          <p className="mb-8 text-[#554640]/90">
            Sign up for our newsletter to get hand-picked tech jobs in Japan -
            straight to your inbox.
          </p>

          <form className="flex flex-col sm:flex-row justify-center items-center gap-2 max-w-md mx-auto mb-4">
            <div className="relative flex-grow w-full sm:w-auto">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#554640]" />
              <Input
                type="email"
                placeholder="Your email address"
                className="pl-10 bg-[#F0E6D6] border-[#D4C4A8] text-[#554640] focus:ring-2  focus:border-transparent rounded-lg transition-all"
                aria-label="Email address for job alerts"
              />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto flex-shrink-0  text-white rounded-lg transition-colors"
            >
              Sign Up <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <p className="text-sm text-[#554640]/90">
            Join 42k readers + get our{' '}
            <a 
              href="#" 
              className="font-semibold text-[#8F3B2D] underline hover:text-[#763022] transition-colors"
            >
              Developer Salary Guide
            </a>{' '}
            free ☝️
          </p>
        </div>
      </div>

      <div className="py-6 px-4 text-center text-sm ">
        © {new Date().getFullYear()} Japan Dev. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;