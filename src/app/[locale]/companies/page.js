/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useState } from 'react'
import { Sprout, Search, Globe, CheckCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import Pagination from '@/components/job/pagination.job'
import Breadcrumb from '@/components/ui/breadcrumb'
import BackToHome from '@/components/ui/BackToHome'

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    companySize: '',
    industry: '',
    visaSponsorship: false
  })

  const mockCompanies = [
    {
      id: 1,
      companyName: 'SmartNews',
      companyLogoUrl: 'https://japan-dev.com/cdn/company_logos/tablecheck.png',
      address: 'Tokyo, Japan',
      companyDesc: 'AI-powered news aggregation platform',
      companySize: '501-1000',
      industry: 'Media',
      visa: true,
      benefits: ['Flex hours', 'Stock options', 'Remote work'],
      foundedYear: '2012',
      companyUrl: 'https://www.smartnews.com'
    },
    {
      id: 2,
      companyName: 'TableCheck',
      companyLogoUrl: 'https://japan-dev.com/cdn/company_logos/tablecheck.png',
      address: 'Tokyo, Japan',
      companyDesc: 'Restaurant reservation management system',
      companySize: '51-200',
      industry: 'Hospitality',
      visa: true,
      benefits: ['Flex hours', 'Remote work', 'Health insurance'],
      foundedYear: '2010',
      companyUrl: 'https://www.tablecheck.com'
    },
  ]

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.companyDesc.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilters = (
      (!filters.location || company.address.includes(filters.location)) &&
      (!filters.companySize || company.companySize === filters.companySize) &&
      (!filters.industry || company.industry === filters.industry) &&
      (!filters.visaSponsorship || company.visa)
    )

    return matchesSearch && matchesFilters
  })

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Companies' }
          ]}
        />
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
                <SelectItem value="Kyoto">Kyoto</SelectItem>
                <SelectItem value="Fukuoka">Fukuoka</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.companySize}
              onValueChange={(value) => setFilters({ ...filters, companySize: value })}
            >
              <SelectTrigger className="w-[180px] focus:ring-[#3A6B4C]">
                <SelectValue placeholder="Company Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-50">Startup (1-50)</SelectItem>
                <SelectItem value="51-200">Medium (51-200)</SelectItem>
                <SelectItem value="201-500">Large (201-500)</SelectItem>
                <SelectItem value="501-1000">Enterprise (501-1000)</SelectItem>
                <SelectItem value="1000+">Corporation (1000+)</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.industry}
              onValueChange={(value) => setFilters({ ...filters, industry: value })}
            >
              <SelectTrigger className="w-[180px] focus:ring-[#3A6B4C]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Hospitality">Hospitality</SelectItem>
                <SelectItem value="E-commerce">E-commerce</SelectItem>
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
                companySize: '',
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
              className="p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={company.companyLogoUrl}
                  alt={company.companyName}
                  className="w-16 h-16 object-contain p-1.5"
                />
                <div className="space-y-1">
                  <h3 className="text-xl font-serif font-bold text-[#2B463C]">{company.companyName}</h3>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#554640]/80" />
                    <span className="text-[#554640]/80">{company.address}</span>
                  </div>
                  {company.companyUrl && (
                    <a
                      href={company.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#3A6B4C] hover:underline flex items-center gap-1"
                    >
                      <Globe className="w-3 h-3" />
                      Company Website
                    </a>
                  )}
                </div>
              </div>

              <p className="text-[#554640]/90 mb-4">{company.companyDesc}</p>

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

              <div className="flex flex-wrap items-center justify-between text-sm text-[#554640]/80 gap-2">
                <span>{company.companySize} employees</span>
                {company.foundedYear && (
                  <span>Founded {company.foundedYear}</span>
                )}
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
      </section>

      <div className="mt-12 flex justify-center pb-16">
        <BackToHome />
      </div>
    </div>
  )
}

export default CompaniesPage