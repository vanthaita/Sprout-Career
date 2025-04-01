import React from 'react';
import { Button } from '@/components/ui/button'; 

const PostJobSection = () => {
  return (
    <section className="py-16 px-4 text-center"> 
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">
          Want to Post Jobs on Japan Dev?
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          Hire top international developers in Japan today!
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <div className='flex gap-x-4'>
                <div className="text-center mr-4">
                    <Button variant="outline" size="lg">
                        Employer Login
                    </Button>
                    <p className='text-xs text-slate-500 mt-1'>採用担当者様ログイン</p>
                </div>
                <Button size="lg"> 
                    Post a Job
                </Button>
            </div>
        </div>

        <p className="text-xs text-slate-500 px-4">
          <span className="text-orange-500">⚠️</span> The Signup URL for our job
          management system varies by company. Can&apos;t find your signup URL? Please{' '}
          <a href="mailto:your-email@example.com" className="text-blue-600 hover:underline"> 
            email us
          </a>{' '}
          ☝️
        </p>
      </div>
    </section>
  );
};

export default PostJobSection;