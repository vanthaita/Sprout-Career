'use client'
import React from 'react'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock, ChevronRight, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SignIn = () => {
  const router = useRouter();
  const hanleLoginWithGoogle = () => {
    router.push('http://localhost:8386/api/v1/auth/google')
  }
  return (
    <div className="flex items-center justify-center p-8 relative">
      <Card className="p-8 w-full max-w-md space-y-6 shadow-none border-none ">
        <div className="flex flex-col items-center gap-y-4">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                id="email"
                type="email"
                placeholder="example@email.com"
                className="focus-visible:ring-primary pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm text-primary hover:underline flex items-center">
                Forgot password? <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                id="password"
                type="password"
                placeholder="••••••••"
                className="focus-visible:ring-primary pl-10"
              />
            </div>
          </div>
          
          <Button className="w-full bg-primary hover:bg-primary/90 flex items-center gap-2">
            Sign In <ArrowRight className="h-4 w-4" />
          </Button>
          
          <div className="relative">
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <div className="flex gap-x-2">
            <div className="w-full" onClick={hanleLoginWithGoogle}>
              <Button variant="outline" className="w-full gap-x-2" >
                <FcGoogle className="h-4 w-4" />
                Google
              </Button>
            </div>
            {/* <Button variant="outline" className="w-full gap-x-2 text-blue-400">
              <FaLinkedin className="h-4 w-4" />
              Linkedin
            </Button> */}
          </div>
        </div>
        
        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </Card>
      <div className="absolute bottom-4 left-4 text-sm">
        ©2025. All Rights Reserved. Sprout Vietnam.
      </div>
    </div>
  )
}

export default SignIn