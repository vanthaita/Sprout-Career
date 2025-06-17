import HeroJobSection from '@/components/job/hero.job'
import JobsPageLayout from '@/components/job/job.layout'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Breadcrumb from '@/components/ui/breadcrumb'
import BackToHome from '@/components/ui/BackToHome'

const JobsPage = () => {
  return (
    <>
      <div className="max-w-6xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Find Jobs' }
          ]}
        />
      </div>

      <HeroJobSection />
      <JobsPageLayout />

      {/* Back to Home Button ở cuối trang */}
      <div className="mt-12 flex justify-center pb-16">
        <BackToHome />
      </div>
    </>
  )
}

export default JobsPage