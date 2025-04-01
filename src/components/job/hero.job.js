import React from 'react'
import Options from '../options'

const HeroJobSection = () => {
    return (
      <section className='flex justify-center items-start pb-12 pt-12 md:pt-20 px-4'>
          <div className='flex flex-col items-center justify-center gap-y-4 md:gap-y-6 max-w-５xl text-center'>
              <div className='relative'>
                  <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                    Search Developer Jobs in Japan
                  </h1>
              </div>
              <h2 className='text-xl md:text-2xl font-medium text-gray-600'>
                🔍 No Japanese required. Apply from overseas. Top companies only.
              </h2>
              <h3 className='text-base md:text-lg text-gray-500'>
                Explore our hand-picked list of the 319 best software developer & tech jobs in Japan.
              </h3>
              <Options />
          </div>
      </section>
    )
}

export default HeroJobSection