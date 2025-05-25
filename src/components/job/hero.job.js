import React from 'react';
import Options from '../options';
import { Sprout } from 'lucide-react';

const HeroJobSection = () => {
    return (
      <section className='flex justify-center items-start pb-12 pt-12 md:pt-20 px-4'>
          <div className='flex flex-col items-center justify-center gap-y-4 md:gap-y-6 max-w-5xl text-center'>
              <div className='relative flex items-center justify-center gap-3 mb-6'>
                  <Sprout className="h-12 w-12 text-[#3A6B4C]" />
                  <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#3A6B4C]'>
                    Find Your Dream Tech Job
                  </h1>
              </div>
              <h2 className='text-xl md:text-2xl font-medium text-gray-600'>
                🔍 Remote options available. Competitive salaries. Top companies.
              </h2>
              <h3 className='text-base md:text-lg text-gray-500'>
                Explore our curated list of the best software developer & tech jobs worldwide.
              </h3>
              <Options />
          </div>
      </section>
    )
}

export default HeroJobSection;