import React from 'react'
import { Button } from './ui/button'

const Options = () => {
  return (
    <div className='flex flex-wrap justify-center gap-3 w-full max-w-2xl'>
      <Button 
        variant='outline' 
        className='h-9 rounded-full border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#f0ebe3]'
      >
        <span className='mr-1.5'>🇯🇵</span> No Japanese Required
      </Button>
      <Button 
        variant='outline' 
        className='h-9 rounded-full border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#f0ebe3]'
      >
        <span className='mr-1.5'>✈️</span> Apply from Overseas
      </Button>
      <Button 
        variant='outline' 
        className='h-9 rounded-full border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#f0ebe3]'
      >
        <span className='mr-1.5'>🏠</span> Remote Options
      </Button>
    </div>
  )
}

export default Options