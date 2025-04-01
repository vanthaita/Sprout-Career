import React from 'react';
import { Button } from '@/components/ui/button';
import { LogIn, Briefcase, ShieldAlert, Sprout } from 'lucide-react';

const PostJobSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center mb-10">
          <Sprout className="h-12 w-12 text-[#3A6B4C] mb-4" strokeWidth={1.5} />
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2B463C] text-center mb-3">
            Grow Your Team with Sprout
          </h2>
          <p className="text-lg text-[#554640]/90 text-center max-w-2xl mx-auto">
            Connect with top global tech talent cultivating their careers in Japan
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div className=" p-8 rounded-2xl ">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="h-6 w-6 text-[#3A6B4C]" />
              <h3 className="text-xl font-semibold text-[#2B463C]">
                For New Employers
              </h3>
            </div>
            <p className="text-[#554640]/90 mb-6">
              Post your first job listing and join our ecosystem of 500+ 
              progressive tech companies in Japan
            </p>
            <Button 
              size="lg" 
              className="w-full bg-[#3A6B4C] hover:bg-[#2E5540] text-white"
            >
              Post a Job
              <Sprout className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className=" p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <LogIn className="h-6 w-6 text-[#3A6B4C]" />
              <h3 className="text-xl font-semibold text-[#2B463C]">
                Existing Partners
              </h3>
            </div>
            <p className="text-[#554640]/90 mb-6">
              Manage your active listings and track candidate applications
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#f0ebe3]"
            >
              Employer Portal
              <LogIn className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-4 rounded-lg border max-w-2xl mx-auto">
          <div className="flex items-start gap-3">
            <ShieldAlert className="flex-shrink-0 h-5 w-5 text-[#8F3B2D]" />
            <div>
              <p className="text-sm text-[#554640]/90">
                Company-specific signup URLs are provided during onboarding. 
                Can&apos;t access your portal? Contact our{" "}
                <a 
                  href="mailto:support@sproutjobs.jp" 
                  className="font-medium text-[#3A6B4C] hover:underline"
                >
                  partner support team
                </a>{" "}
                for immediate assistance.
              </p>
              <p className="text-xs text-[#554640]/70 mt-2">
                採用管理システムのURLは企業ごとに異なります
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-[#554640]/80">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3A6B4C]">500+</div>
            <div className="text-sm">Vetted Companies</div>
          </div>
          <div className="h-8 w-px bg-[#e4d9c8]" />
          <div className="text-center">
            <div className="text-2xl font-bold text-[#3A6B4C]">90%</div>
            <div className="text-sm">Hire Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostJobSection;