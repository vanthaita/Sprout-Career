/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Sprout, Mail, CheckCircle, Briefcase, ArrowRight, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

const NewsletterPage = () => {
  const featuredCompanies = [
    { name: 'SmartNews', location: 'Tokyo', openRoles: 15, benefits: ['Full Remote', 'Visa Sponsorship'] },
    { name: 'LINE mercari', location: 'Osaka', openRoles: 9, benefits: ['Flex Hours', 'Stock Options'] },
    { name: 'U-NEXT', location: 'Tokyo', openRoles: 12, benefits: ['Intl Team', 'Relocation Support'] },
    { name: 'Draft', location: 'Fukuoka', openRoles: 7, benefits: ['Startup', 'Rapid Growth'] },
  ]

  const latestNewsletters = [
    { date: '2025-04-01', title: '23 New Tech Jobs + Market Insights', jobs: 23 },
    { date: '2025-03-25', title: 'Spring Hiring Surge: 36 New Roles', jobs: 36 },
    { date: '2025-03-18', title: 'Remote-First Companies Special', jobs: 28 },
  ]
  const companyLogos = [
    'https://japan-dev.com/cdn/company_landing_page/line_logo_navy.svg',
    'https://japan-dev.com/cdn/company_landing_page/mercari_logo_navy.svg',
    'https://japan-dev.com/cdn/company_landing_page/indeed_logo_navy.svg',
    'https://japan-dev.com/cdn/company_landing_page/smartnews_logo_navy.svg',
    'https://japan-dev.com/cdn/company_landing_page/drivemode_logo_navy.svg',
    'https://japan-dev.com/cdn/company_landing_page/datadog_logo_navy.svg'
  ]
  return (
    <div className="min-h-screen">
        <section className="pt-20 pb-16 px-4">
            <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
                <Sprout className="h-12 w-12 text-[#3A6B4C]" />
                <h1 className="text-4xl font-serif font-bold text-[#2B463C]">
                Are You Looking for a Tech Job in Japan?
                </h1>
            </div>
            
            <div className="mb-8">
                <p className="text-xl text-[#554640]/90 mb-8">
                Get weekly job alerts from companies that value you. Sign up now and we&apos;ll send you our 
                <span className="font-semibold text-[#3A6B4C]"> Developer Salary Guide</span> for free
                </p>
                
                <div className="max-w-md mx-auto p-8">
                <form className="space-y-4">
                    <div>
                    <label className="block text-sm text-[#554640]/90 mb-2">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#554640]/60" />
                        <input
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#e4d9c8] focus:border-[#3A6B4C] focus:ring-2 focus:ring-[#3A6B4C]/20"
                        />
                    </div>
                    </div>
                    <Button className="w-full bg-[#3A6B4C] hover:bg-[#2E5540] gap-2 py-3">
                    Get Free Alerts
                    <ArrowRight className="w-4 h-4" />
                    </Button>
                </form>
                
                <div className="mt-4 flex items-center gap-2 text-sm text-[#554640]/80">
                    <CheckCircle className="w-4 h-4 text-[#3A6B4C]" />
                    No spam. Unsubscribe anytime
                </div>
                </div>
            </div>
            </div>
        </section>
        <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <User className="h-8 w-8 text-[#3A6B4C]" />
                    <h2 className="text-3xl font-serif font-bold text-[#2B463C]">
                    Join 42,000+ Developers Finding Better Tech Jobs in Japan
                    </h2>
                </div>
            </div>
        </section>
        <section className="py-12">
            <div className="max-w-6xl mx-auto px-4">
            <h3 className="text-2xl font-serif font-bold text-[#2B463C] mb-8 text-center">
                Trusted by Japan&apos;s Top Tech Companies
            </h3>
            
            <div className="logo-bar overflow-x-auto">
                <ul className="logo-bar__logos flex justify-center gap-8 min-w-max px-4">
                {companyLogos.map((logo, index) => (
                    <li key={index} className="logo flex items-center h-16">
                    <img 
                        src={logo}
                        className="logo-img h-12 w-auto max-w-[120px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                        alt="company logo"
                    />
                    </li>
                ))}
                </ul>
                
                <div className="mt-8 text-center text-[#554640]/80 text-sm px-4">
                Get exclusive job alerts 1x per week. Top companies only. No lowball offers, and no spam. Ever.
                </div>
            </div>
            </div>
        </section>

        <section className="py-16 px-4">
            <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-[#2B463C] mb-8 text-center">
                Recent Job Alerts
            </h2>
            
            <div className="space-y-4">
                {latestNewsletters.map((newsletter, index) => (
                <div key={index} className="p-6 border rounded-2xl transition-all">
                    <div className="flex items-center justify-between">
                    <div>
                        <div className="text-sm text-[#554640]/80 mb-1">
                        {newsletter.date}
                        </div>
                        <h3 className="text-xl font-semibold text-[#2B463C]">
                        {newsletter.title}
                        </h3>
                    </div>
                    <Button variant="ghost" className="text-[#3A6B4C]">
                        {newsletter.jobs} Jobs
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </section>
    </div>
  )
}

export default NewsletterPage