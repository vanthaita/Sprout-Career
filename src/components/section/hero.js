import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Todoro from '../todoro'

const HeroSection = () => {
    return (
      <section className='flex justify-center items-start pb-12 pt-12 md:pt-24 px-4'>
          <div className='flex flex-col items-center justify-center gap-y-4 md:gap-y-6 max-w-５xl text-center'>
              <div className='relative'>
                  <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
                      Software Developer Jobs in Japan
                  </h1>
                  <Todoro />
              </div>
              <h2 className='text-xl md:text-2xl font-medium text-gray-600'>
                  319 hand-picked jobs in Japan for software developers & tech folks.
              </h2>
              <h3 className='text-base md:text-lg text-gray-500'>
                  No Japanese required. Apply from overseas. Top companies only.
              </h3>
              <div className='flex flex-col md:flex-row items-stretch w-full md:w-3/4 lg:w-1/2'>
                  <Input 
                      className='rounded-b-none md:rounded-r-none md:rounded-bl-md py-6 text-base'
                      type='email'
                      placeholder='Your email address'
                  />
                  <Button className='bg-primary text-white hover:bg-primary-dark cursor-pointer rounded-t-none md:rounded-l-none md:rounded-tr-md py-6 text-base'>
                      SIGN UP
                  </Button>
              </div>
              <p className='mt-2 text-xs text-gray-500'>
                  Join 42k readers + get our Developer Salary Guide free ☝️
              </p>
          </div>
      </section>
    )
}

export default HeroSection