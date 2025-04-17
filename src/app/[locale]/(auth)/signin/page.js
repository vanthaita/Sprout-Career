import Logo from '@/components/section/logo'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FcGoogle } from 'react-icons/fc'
import React from 'react'
import Link from 'next/link'
import { FaLinkedin } from 'react-icons/fa'

const SignIn = () => {
  return (
    <section className='h-screen flex justify-center items-center'>
      <Card className='p-8 w-full max-w-md space-y-6 shadow-lg'>
        <div className='flex flex-col items-center gap-y-4'>
          <p className='text-sm text-gray-500'>Sign in to your account</p>
        </div>
        
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input 
              id='email'
              type='email'
              placeholder='example@email.com'
            />
          </div>

          <div className='space-y-2'>
            <div className='flex justify-between items-center'>
              <Label htmlFor='password'>Password</Label>
              <a href='#' className='text-sm text-primary hover:underline'>Forgot password?</a>
            </div>
            <Input 
              id='password'
              type='password'
              placeholder='••••••••'
            />
          </div>
          
          <Button className='w-full'>
            Sign In
          </Button>
          
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>
          
          <div className='flex justify-center w-full items-center gap-x-2'>
            <Link href='http://localhost:8386/api/v1/auth/google'>
              <Button variant='outline' className='w-1/2 gap-x-2'>
                <FcGoogle className='h-4 w-4' />
                Google
              </Button>
            </Link>
            <Button variant='outline' className='w-1/2 gap-x-2 text-blue-400'>
              <FaLinkedin className='h-4 w-4' />
              Linkedin
            </Button>
          </div>
        </div>
        
        <div className='text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/signup' className='text-primary hover:underline'>
            Sign up
          </Link>
        </div>
      </Card>
    </section>
  )
}

export default SignIn