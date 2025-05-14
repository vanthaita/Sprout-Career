/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from 'react'
import { Sprout, Search, Globe, CheckCircle, ArrowLeft } from 'lucide-react' // Thêm ArrowLeft
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import Pagination from '@/components/job/pagination.job'
import Link from 'next/link' // Đảm bảo đã import Link

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    size: '',
    industry: '',
    visaSponsorship: false
  })

  const mockCompanies = [
    {
      id: 1,
      name: 'SmartNews',
      logo: 'https://japan-dev.com/cdn/company_logos/tablecheck.png',
      location: 'Tokyo',
      description: 'AI-powered news aggregation platform',
      size: '501-1000',
      industry: 'Media',
      visa: true,
      benefits: ['Flex hours', 'Stock options', 'Remote work']
    },
    // ... other mock companies
  ]

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilters = (
      (!filters.location || company.location === filters.location) &&
      (!filters.size || company.size === filters.size) &&
      (!filters.industry || company.industry === filters.industry) &&
      (!filters.visaSponsorship || company.visa)
    )

    return matchesSearch && matchesFilters
  })

  return (
    <div className="min-h-screen">

      <div className="max-w-6xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-lg">
          <ol className="inline-flex items-center space-x-2">
            <li>
              <Link
                href="/"
                className="
            px-3 py-1 
            text-base font-medium 
            text-[#3A6B4C] 
            bg-white 
            border border-[#3A6B4C] 
            rounded-full 
            hover:bg-[#3A6B4C] hover:text-white 
            transition-colors
          "
              >
                Home
              </Link>
            </li>

            <li>
              <span className="text-gray-400">/</span>
            </li>

            <li>
              <span
                className="
            px-3 py-1 
            text-base font-medium 
            text-gray-700 
            bg-gray-100 
            border border-gray-200 
            rounded-full
          "
              >
                Companies
              </span>
            </li>
          </ol>
        </nav>
      </div>


      <section className="pt-20 pb-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sprout className="h-12 w-12 text-[#3A6B4C]" />
            <h1 className="text-4xl font-serif font-bold text-[#2B463C]">
              Discover Tech Companies in Japan
            </h1>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-8 text-[#554640]/90 mb-8">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-[#3A6B4C]" />
              <span className="text-2xl font-bold text-[#2B463C]">200+</span>
              <span className="text-lg">Vetted Companies</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-[#3A6B4C]" />
              <span className="text-2xl font-bold text-[#2B463C]">85%</span>
              <span className="text-lg">Offer Visa Sponsorship</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#554640]/60" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg focus-visible:ring-[#3A6B4C]"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <Select
              value={filters.location}
              onValueChange={(value) => setFilters({ ...filters, location: value })}
            >
              <SelectTrigger className="w-[180px] focus:ring-[#3A6B4C]">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tokyo">Tokyo</SelectItem>
                <SelectItem value="Osaka">Osaka</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.size}
              onValueChange={(value) => setFilters({ ...filters, size: value })}
            >
              <SelectTrigger className="w-[180px] focus:ring-[#3A6B4C]">
                <SelectValue placeholder="Company Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-50">Startup (1-50)</SelectItem>
                <SelectItem value="51-200">Medium (51-200)</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="visaSponsorship"
                checked={filters.visaSponsorship}
                onCheckedChange={(checked) => setFilters({ ...filters, visaSponsorship: !!checked })}
                className="text-[#3A6B4C] border-[#2B463C]"
              />
              <label
                htmlFor="visaSponsorship"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Visa Sponsorship
              </label>
            </div>

            <Button
              variant="outline"
              onClick={() => setFilters({
                location: '',
                size: '',
                industry: '',
                visaSponsorship: false
              })}
              className="text-[#3A6B4C] border-[#3A6B4C] hover:bg-[#3A6B4C]/10"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map(company => (
            <Card
              key={company.id}
              className="p-6 hover:shadow-lg transition-all duration-300 "
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-16 h-16 object-contain  p-1.5"
                />
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold text-[#2B463C]">{company.name}</h3>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#554640]/80" />
                    <span className="text-[#554640]/80">{company.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-[#554640]/90 mb-4">{company.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {company.benefits.map((benefit, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#3A6B4C]/10 text-[#3A6B4C] hover:bg-[#3A6B4C]/20"
                  >
                    {benefit}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-[#554640]/80">
                <span>{company.size} employees</span>
                {company.visa && (
                  <Badge className="bg-[#3A6B4C]/10 text-[#3A6B4C] hover:bg-[#3A6B4C]/20 gap-1">
                    <CheckCircle className="w-4 h-4" />
                    Visa Support
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Pagination className="justify-center" />
        </div>

        {/* Thêm Back to Home button ở đây */}
        <div className="mt-8 flex justify-center pb-12">
          <Button
            asChild
            variant="outline"
            className="group border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#3A6B4C]/10" // Thêm class hover ở đây
          >
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </div>

      </section>
    </div>
  )
}

export default CompaniesPage