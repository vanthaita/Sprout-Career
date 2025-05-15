import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FcGoogle } from 'react-icons/fc'
import React from 'react'
import Link from 'next/link'
import { Mail, Lock, ChevronRight, ArrowRight, User } from 'lucide-react'

const SignUp = () => {
  return (
    <div className='h-screen flex justify-center items-center '>
      <Card className='p-8 w-full max-w-md space-y-6 border-none shadow-none'>
        <div className='flex flex-col items-center gap-y-4'>
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className='text-sm text-gray-500'>Sign Up to your account</p>
        </div>
        
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                id='email'
                type='email'
                placeholder='example@email.com'
                className="pl-10"
              />
            </div>
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <Label htmlFor='password'>Password</Label>
              <a href='#' className='text-sm text-primary hover:underline flex items-center'>
                Forgot password? <ChevronRight className="h-4 w-4" />
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                id='password'
                type='password'
                placeholder='••••••••'
                className="pl-10"
              />
            </div>
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <Label htmlFor='confirm-password'>Confirm Password</Label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                id='confirm-password'
                type='password'
                placeholder='••••••••'
                className="pl-10"
              />
            </div>
          </div>

          <Button className='w-full flex items-center gap-2'>
            Sign Up <ArrowRight className="h-4 w-4" />
          </Button>
          
          <div className='relative'>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>
          
          <div className='flex justify-center w-full items-center gap-x-2'>
            <Button variant='outline' className='w-full gap-x-2'>
              <FcGoogle className='h-4 w-4' />
              Google
            </Button>
            {/* <Button variant='outline' className='w-1/2 gap-x-2 text-blue-400'>
              <FaLinkedin className='h-4 w-4' />
              Linkedin
            </Button> */}
          </div>
        </div>
        
        <div className='text-center text-sm'>
          Already have an account?{' '}
          <Link href='/signin' className='text-primary hover:underline'>
            Sign In
          </Link>
        </div>
      </Card>
      <div className="absolute bottom-4 left-4 z-10 text-sm">
        ©2025. All Rights Reserved. Sprout Vietnam.
      </div>
    </div>
  )
}

export default SignUp