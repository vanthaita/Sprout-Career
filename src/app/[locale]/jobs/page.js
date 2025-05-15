import HeroJobSection from '@/components/job/hero.job'
import JobsPageLayout from '@/components/job/job.layout'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const JobsPage = () => {
  return (
    <>
      {/* Breadcrumb ở đầu trang */}
      <div className="max-w-6xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-lg">
          <ol className="inline-flex items-center space-x-2">
            <li>
              <Link
                href="/"
                className="px-3 py-1 text-base font-medium text-[#3A6B4C] bg-white border border-[#3A6B4C] rounded-full hover:bg-[#3A6B4C] hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <span className="px-3 py-1 text-base font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-full">
                Find Jobs
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <HeroJobSection />
      <JobsPageLayout />

      {/* Back to Home Button ở cuối trang */}
      <div className="mt-0 flex justify-center pb-12 pl-90">
        <Button
          asChild
          variant="outline"
          className="group border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#3A6B4C]/10 h-11 px-5 text-base"
        >
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </Button>
      </div>
    </>
  )
}

export default JobsPage