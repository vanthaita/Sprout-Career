'use client'
import { useState } from 'react'
import { Search, Filter, ChevronDown, Mail, Phone, FileText, MoreVertical, PlusIcon, Briefcase, Calendar, MapPin, User, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from "@/components/ui/progress"
import { useEffect } from 'react'
import axiosInstance from '@/axios/axiosIntance'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const EmployeeCandidatesPage = () => {
  const primaryColor = '#3A6B4C'
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [jobFilter, setJobFilter] = useState('all')
  const [expandedJobs, setExpandedJobs] = useState({})
  const [applications, setApplications] = useState([])
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [view, setView] = useState('list')

  const fetchApplications = async () => {
    try {
      const response = await axiosInstance.get('/employer/applications')
      console.log(response.data.data.data)
      setApplications(response.data.data.data)
    } catch (error) {
      console.error("Error fetching applications:", error)
      setApplications([])
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'SUBMITTED', label: 'Submitted' },
    { value: 'REVIEWED', label: 'Reviewed' },
    { value: 'INTERVIEW', label: 'Interview' },
    { value: 'HIRED', label: 'Hired' },
    { value: 'REJECTED', label: 'Rejected' }
  ]

  const jobOptions = [
    { value: 'all', label: 'All Jobs' },
    ...applications.reduce((acc, app) => {
      if (app.job && !acc.some(j => j.value === app.job.id.toString())) {
        acc.push({ 
          value: app.job.id.toString(), 
          label: app.job.title 
        })
      }
      return acc
    }, [])
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'SUBMITTED': return 'bg-blue-100 text-blue-800'
      case 'REVIEWED': return 'bg-purple-100 text-purple-800'
      case 'INTERVIEW': return 'bg-yellow-100 text-yellow-800'
      case 'HIRED': return 'bg-green-100 text-green-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getMatchColor = (score) => {
    if (score >= 85) return 'bg-green-500'
    if (score >= 70) return 'bg-blue-500'
    if (score >= 50) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const toggleJobExpansion = (jobId) => {
    setExpandedJobs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }))
  }

  const handleViewDetails = (candidate) => {
    setSelectedCandidate(candidate)
    setView('detail')
  }

  const handleBackToList = () => {
    setView('list')
    setSelectedCandidate(null)
  }

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await axiosInstance.put(`/employer/applications/${applicationId}/status`, {
        status: newStatus
      })
      fetchApplications() 
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const filteredApplications = applications.filter(app => 
    (jobFilter === 'all' || (app.job && app.job.id.toString() === jobFilter)) &&
    (statusFilter === 'all' || app.status === statusFilter) &&
    (searchTerm === '' || 
      (app.candidate.name && app.candidate.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.candidate.skills && app.candidate.skills.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
    )
  )

  const jobsWithApplications = filteredApplications.reduce((acc, app) => {
    if (!app.job) return acc
    
    const jobId = app.job.id
    if (!acc[jobId]) {
      acc[jobId] = {
        job: app.job,
        applications: []
      }
    }
    acc[jobId].applications.push(app)
    return acc
  }, {})

  const jobsGrouped = Object.values(jobsWithApplications)

  if (view === 'detail' && selectedCandidate) {
    return (
      <div className="min-h-screen">
        <header className="bg-white border-b">
          <div className="flex flex-col md:flex-row h-auto md:h-16 items-center justify-between px-4 py-3 md:py-0 gap-3 md:gap-0">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button 
                variant="ghost" 
                onClick={handleBackToList}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold">Candidate Details</h1>
            </div>
          </div>
        </header>

        <div className="py-6 px-4">
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedCandidate.photoUrl} />
                  <AvatarFallback>
                    {selectedCandidate.name?.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{selectedCandidate.name}</CardTitle>
                  <CardDescription>{selectedCandidate.email}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">Contact Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Phone:</span> {selectedCandidate.phone || 'Not provided'}</p>
                    <p><span className="font-medium">Location:</span> {selectedCandidate.location || 'Not provided'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Professional Information</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Skills:</span> 
                      {selectedCandidate.skills?.join(', ') || 'Not specified'}
                    </p>
                    <p>
                      <span className="font-medium">Education:</span> 
                      {selectedCandidate.education?.degree || 'Not specified'} 
                      {selectedCandidate.education?.schoolName && ` at ${selectedCandidate.education.schoolName}`}
                    </p>
                    <p>
                      <span className="font-medium">Experience:</span> 
                      {selectedCandidate.experience?.position || 'Not specified'} 
                      {selectedCandidate.experience?.companyName && ` at ${selectedCandidate.experience.companyName}`}
                    </p>
                  </div>
                </div>
              </div>

              {selectedCandidate.cvUrl && (
                <div className="mt-6">
                  <Button variant="outline" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Download CV
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="flex flex-col md:flex-row h-auto md:h-16 items-center justify-between px-4 py-3 md:py-0 gap-3 md:gap-0">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-md"
              style={{ backgroundColor: primaryColor }}
            >
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold">Candidates by Job</h1>
          </div>
          <div className="flex items-center justify-end w-full md:w-auto">
            <Button style={{ backgroundColor: primaryColor }} className="gap-2 text-white w-full md:w-auto">
              <PlusIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Add Candidate</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className='py-6 px-4 space-y-6'>
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search candidates by name or skills..."
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 w-full sm:w-auto justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>{statusOptions.find(opt => opt.value === statusFilter)?.label}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px] bg-white">
                {statusOptions.map(option => (
                  <DropdownMenuItem 
                    key={option.value} 
                    onClick={() => setStatusFilter(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 w-full sm:w-auto justify-between">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{jobOptions.find(opt => opt.value === jobFilter)?.label}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                {jobOptions.map(option => (
                  <DropdownMenuItem 
                    key={option.value} 
                    onClick={() => setJobFilter(option.value)}
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {jobsGrouped.length > 0 ? (
          <div className="space-y-6">
            {jobsGrouped.map(({ job, applications }) => (
              <Card key={job.id} className="overflow-hidden">
                <CardHeader 
                  className="bg-gray-50 border-b p-4 cursor-pointer hover:bg-gray-100 transition-colors" 
                  onClick={() => toggleJobExpansion(job.id)}
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                        <span className="flex items-center gap-1 text-sm">
                          <MapPin className="h-4 w-4" /> {job.location}
                        </span>
                        <span className="text-sm">{job.type}</span>
                        <span className="text-sm">{applications.length} applicants</span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-normal">
                      <span className="text-sm font-medium">
                        {applications.length} matching candidates
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="rounded-full p-2 ml-auto sm:ml-0"
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${
                          expandedJobs[job.id] ? 'rotate-180' : ''
                        }`} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                {expandedJobs[job.id] && (
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {applications.map(application => (
                        <div key={application.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex flex-col sm:flex-row items-start gap-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                              <Avatar className="h-12 w-12 border">
                                <AvatarImage src={application.candidate.photoUrl} />
                                <AvatarFallback>
                                  {application.candidate.name?.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div className="sm:hidden flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{application.candidate.name}</h3>
                                    <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                                      {application.candidate.email || 'No email provided'}
                                    </p>
                                  </div>
                                  <Badge className={`${getStatusColor(application.status)} text-xs`}>
                                    {application.status.charAt(0).toUpperCase() + application.status.slice(1).toLowerCase()}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex-1 w-full">
                              <div className="hidden sm:flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium">{application.candidate.name}</h3>
                                  <p className="text-sm text-muted-foreground">{application.candidate.email || 'No email provided'}</p>
                                </div>
                                <Badge className={getStatusColor(application.status)}>
                                  {application.status.charAt(0).toUpperCase() + application.status.slice(1).toLowerCase()}
                                </Badge>
                              </div>
                              
                              <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div className="w-full sm:max-w-[60%]">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-medium text-gray-600">Match:</span>
                                    <span className={`text-sm font-bold ${getMatchColor(80).replace('bg', 'text')}`}>
                                      80%
                                    </span>
                                  </div>
                                  <Progress 
                                    value={80} 
                                    className="h-2"
                                    indicatorClassName={getMatchColor(80)}
                                  />
                                </div>
                                
                                <div className="text-right w-full sm:w-auto">
                                  <p className="text-xs text-muted-foreground">
                                    Applied: {new Date(application.applicationDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="h-8 gap-1 flex-1 sm:flex-initial"
                                    onClick={() => handleViewDetails(application.candidate)}
                                  >
                                    <User className="h-3.5 w-3.5" />
                                    <span className="hidden xs:inline">Profile</span>
                                  </Button>
                                  <Button variant="outline" size="sm" className="h-8 gap-1 flex-1 sm:flex-initial">
                                    <Mail className="h-3.5 w-3.5" />
                                    <span className="hidden xs:inline">Message</span>
                                  </Button>
                                  {application.candidate.cvUrl && (
                                    <Button variant="outline" size="sm" className="h-8 gap-1 flex-1 sm:flex-initial">
                                      <FileText className="h-3.5 w-3.5" />
                                      <span className="hidden xs:inline">Resume</span>
                                    </Button>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                  <Select 
                                    value={application.status}
                                    onValueChange={(value) => handleStatusChange(application.id, value)}
                                  >
                                    <SelectTrigger className="w-[180px] h-8">
                                      <SelectValue placeholder="Change status" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-white'>
                                      {statusOptions
                                        .filter(opt => opt.value !== 'all')
                                        .map(option => (
                                          <SelectItem key={option.value} value={option.value}>
                                            {option.label}
                                          </SelectItem>
                                        ))}
                                    </SelectContent>
                                  </Select>
                                  
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className='bg-white mt-4'>
                                      <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                        <Calendar className="h-4 w-4" />
                                        Schedule Interview
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className='cursor-pointer'>Add Note</DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600 cursor-pointer">
                                        Reject Candidate
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border">
            <Search className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No applications found</h3>
            <p className="text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeCandidatesPage;