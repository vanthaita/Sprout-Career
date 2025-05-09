'use client'
import React, { useState } from 'react'
import { Briefcase, Clock, CheckCircle, XCircle, Search, ChevronDown, FileText, Calendar, MapPin, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { StageProgressBar } from '@/components/application/StageProgressBar'

const CandidateApplicationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const applications = [
    {
      id: 1,
      applicationDate: new Date('2023-11-15'),
      status: 'UNDER_REVIEW',
      job: {
        id: 101,
        title: 'Frontend Developer (React)',
        employer: {
          companyName: 'TechSolutions Inc.',
          companyLogoUrl: '/logos/techsolutions.png'
        },
        location: 'Tokyo, Japan',
        salaryRange: '¥5,000,000 - ¥7,000,000',
        jobType: 'FULL_TIME',
        description: 'Developing user interfaces using React and TypeScript'
      },
      cv: {
        fileName: 'tanaka_taro_cv.pdf',
        fileUrl: '#'
      },
      currentStage: 'DOCUMENT_SCREENING',
      notes: 'Your application is being reviewed by the HR team',
      interviewDate: null
    },
    {
      id: 2,
      applicationDate: new Date('2023-11-10'),
      status: 'INTERVIEWING',
      job: {
        id: 102,
        title: 'Backend Engineer',
        employer: {
          companyName: 'DataSystems Co.',
          companyLogoUrl: '/logos/datasystems.png'
        },
        location: 'Osaka, Japan',
        salaryRange: '¥6,000,000 - ¥8,500,000',
        jobType: 'FULL_TIME',
        description: 'Building scalable backend services with Node.js'
      },
      cv: {
        fileName: 'tanaka_taro_cv.pdf',
        fileUrl: '#'
      },
      currentStage: 'TECHNICAL_INTERVIEW',
      notes: 'Technical interview scheduled for November 25th at 2:00 PM',
      interviewDate: new Date('2023-11-25T14:00:00')
    },
    {
      id: 3,
      applicationDate: new Date('2023-10-28'),
      status: 'REJECTED',
      job: {
        id: 103,
        title: 'UX Designer',
        employer: {
          companyName: 'DesignHub Japan',
          companyLogoUrl: '/logos/designhub.png'
        },
        location: 'Remote',
        salaryRange: '¥4,800,000 - ¥6,200,000',
        jobType: 'CONTRACT',
        description: 'Creating user-centered designs for enterprise applications'
      },
      cv: {
        fileName: 'tanaka_taro_cv.pdf',
        fileUrl: '#'
      },
      currentStage: 'REJECTED',
      notes: 'Position filled by another candidate',
      interviewDate: null
    }
  ]

  const statusOptions = [
    { value: 'all', label: 'All Applications' },
    { value: 'SUBMITTED', label: 'Submitted' },
    { value: 'UNDER_REVIEW', label: 'Under Review' },
    { value: 'INTERVIEWING', label: 'Interviewing' },
    { value: 'OFFER_MADE', label: 'Offer Received' },
    { value: 'REJECTED', label: 'Not Selected' },
    { value: 'WITHDRAWN', label: 'Withdrawn' }
  ]

  const candidateStages = [
    'APPLICATION_SUBMITTED',
    'DOCUMENT_SCREENING',
    'INTERVIEW_SCHEDULED',
    'TECHNICAL_INTERVIEW',
    'FINAL_INTERVIEW',
    'OFFER_STAGE'
  ]

  const filteredApplications = applications.filter(app => {
    const matchesSearch = searchTerm === '' || 
      app.job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      app.job.employer.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch(status) {
      case 'SUBMITTED':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" /> Submitted</Badge>
      case 'UNDER_REVIEW':
        return <Badge className="bg-purple-100 text-purple-800"><FileText className="h-3 w-3 mr-1" /> Under Review</Badge>
      case 'INTERVIEWING':
        return <Badge className="bg-yellow-100 text-yellow-800"><Briefcase className="h-3 w-3 mr-1" /> Interviewing</Badge>
      case 'OFFER_MADE':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" /> Offer Received</Badge>
      case 'REJECTED':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" /> Not Selected</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const formatDate = (date) => {
    if (!date) return 'Not scheduled'
    return date.toLocaleDateString('ja-JP', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStageName = (stage) => {
    switch(stage) {
      case 'APPLICATION_SUBMITTED': return 'Applied'
      case 'DOCUMENT_SCREENING': return 'Document Review'
      case 'INTERVIEW_SCHEDULED': return 'Interview Scheduled'
      case 'TECHNICAL_INTERVIEW': return 'Technical Interview'
      case 'FINAL_INTERVIEW': return 'Final Interview'
      case 'OFFER_STAGE': return 'Offer Stage'
      default: return stage.split('_').join(' ')
    }
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className=" flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div>
                <h1 className="text-lg font-semibold">My Job Applications</h1>
                <p className="text-gray-600">Track your application progress and next steps</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
              <Button className="bg-[#3A6B4C] hover:bg-[#2D5542] flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Find New Jobs
            </Button>
          </div>
        </div>
      </header>

      <div className='py-6 px-4'>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8 ">
          <div className="lg:col-span-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by job title or company name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {statusOptions.find(opt => opt.value === statusFilter)?.label || 'Filter by status'}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                {statusOptions.map((option) => (
                  <DropdownMenuItem 
                    key={option.value} 
                    onClick={() => setStatusFilter(option.value)}
                    className="text-sm"
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {filteredApplications.length > 0 ? (
          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow border ">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-md bg-gray-100 border flex items-center justify-center overflow-hidden">
                        {app.job.employer.companyLogoUrl ? (
                          <img 
                            src={app.job.employer.companyLogoUrl} 
                            alt={app.job.employer.companyName}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <Briefcase className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{app.job.title}</CardTitle>
                        <p className="text-gray-700">{app.job.employer.companyName}</p>
                      </div>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{app.job.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Salary Range</p>
                        <p className="font-medium">{app.job.salaryRange}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Applied Date</p>
                        <p className="font-medium">
                          {app.applicationDate.toLocaleDateString('ja-JP')}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 mb-4">
                    <div className="flex justify-between mb-2">
                      <p className="text-sm font-medium">Application Progress</p>
                      <p className="text-sm text-gray-500">
                        {candidateStages.indexOf(app.currentStage) + 1} of {candidateStages.length} stages
                      </p>
                    </div>
                    
                    <StageProgressBar 
                      stages={candidateStages.map(stage => getStageName(stage))}
                      currentStageIndex={candidateStages.indexOf(app.currentStage)}
                      primaryColor="#3A6B4C"
                      secondaryColor="#E6DABE"
                    />
                  </div>
                  
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200">
                    <p className="text-sm font-medium mb-1 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Latest Update
                    </p>
                    <p className="text-sm text-gray-700">{app.notes}</p>
                    
                    {app.interviewDate && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <p className="text-sm font-medium text-[#3A6B4C]">
                          Interview Scheduled: {formatDate(app.interviewDate)}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">
                    View Job Details
                  </Button>
                  <div className="space-x-2">
                    <Button variant="outline" size="sm">
                      Download CV
                    </Button>
                    {app.status === 'INTERVIEWING' && (
                      <Button className="bg-[#3A6B4C] hover:bg-[#2D5542]" size="sm">
                        Prepare for Interview
                      </Button>
                    )}
                    {app.status === 'OFFER_MADE' && (
                      <Button className="bg-green-600 hover:bg-green-700" size="sm">
                        Review Offer
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <div className="mx-auto max-w-md">
              <div className="h-24 w-24 mx-auto bg-[#3A6B4C]/10 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-12 w-12 text-[#3A6B4C]" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'No matching applications found' : 'No applications yet'}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? 
                  "We couldn't find any applications matching your search." : 
                  "You haven't applied to any jobs yet. Start your job search today!"}
              </p>
              <Button className="bg-[#3A6B4C] hover:bg-[#2D5542]">
                <Briefcase className="h-4 w-4 mr-2" />
                Browse Job Openings
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CandidateApplicationsPage