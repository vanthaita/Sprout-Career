'use client'
import { useState, useEffect } from 'react'
import { 
  Filter, 
  Briefcase,  MapPin, Clock, DollarSign, Bookmark, 
  MoreHorizontal,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import axiosInstance from '@/axios/axiosIntance'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { useRouter } from 'next/navigation'

const EmployeeCandidatesPage = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get('/employer/jobs')
        setJobs(res.data.data?.data || [])
      } catch (error) {
        console.error("Error fetching jobs:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])

  const handleDeleteJob = async (jobId) => {
    try {
      await axiosInstance.delete(`/employer/jobs/${jobId}`)
      fetchJobs()
    } catch (error) {
      console.error("Error deleting job:", error)
    }
  }

  const openViewDialog = (job) => {
    setCurrentJob(job)
    setIsDialogOpen(true)
  }

  const navigateToEdit = (job) => {
    router.push(`/dashboard/employer/job-posting/new?jobId=${job.id}`)
  }

  const navigateToApplications = (jobId) => {
    router.push(`/en/dashboard/employer/job-posting/applications?jobId=${jobId}`)
  }

  const formatSalaryRange = (job) => {
    if (!job) return "Not specified";
    if (job.salaryRange) return job.salaryRange;
  
    if (job.salaryMin && job.salaryMax && job.salaryCurrency && job.salaryPeriod) {
      const period = job.salaryPeriod.toLowerCase() === 'year' ? 'year' : 
                    job.salaryPeriod.toLowerCase() === 'month' ? 'month' : 
                    job.salaryPeriod.toLowerCase();
      return `${job.salaryCurrency}${job.salaryMin} - ${job.salaryCurrency}${job.salaryMax} per ${period}`;
    }
  
    return "Not specified";
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const renderTags = (tags) => {
    if (!tags) return null
    return tags.split(',').map((tag, index) => (
      <Badge key={index} variant="outline" className="mr-2 mb-2">
        {tag.trim()}
      </Badge>
    ))
  }

  const renderBenefits = (benefits) => {
    if (!benefits || benefits.length === 0) return null
    return benefits.map((benefit, index) => (
      <Badge key={index} variant="outline" className="mr-2 mb-2 capitalize">
        {benefit.replace(/_/g, ' ')}
      </Badge>
    ))
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#3A6B4C]">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold">Your Job Postings</h1>
          </div>
        </div>
      </header>
      <div className="py-6 px-4 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Active Job Postings</CardTitle>
                <CardDescription>Manage your current job listings</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3A6B4C]"></div>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Salary Range</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs && jobs.length > 0 ? (
                    jobs.map((job) => (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {job.jobType ? job.jobType.replace('_', ' ') : ''}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              job.status === "APPROVED" ? "default" :
                              job.status === "PENDING" ? "secondary" :
                              job.status === "REJECTED" ? "destructive" : "outline"
                            }
                            style={job.status === "APPROVED" ? { backgroundColor: '#3A6B4C', color: '#FFFFFF'} : {}}
                            className='text-black'
                          >
                            {job.status ? job.status.charAt(0) + job.status.slice(1).toLowerCase() : ''}
                          </Badge>
                        </TableCell>
                        <TableCell>{job.location}</TableCell>
                        <TableCell>{formatSalaryRange(job)}</TableCell>
                        <TableCell>{formatDate(job.postedDate)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end"  className='bg-white'>
                              <DropdownMenuItem onClick={() => openViewDialog(job)}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => navigateToEdit(job)}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteJob(job.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        No job postings found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {jobs.length} of {jobs.length} jobs
            </div>
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3A6B4C]"></div>
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <Card 
                key={job.id} 
                className="hover:shadow-md transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <CardDescription className="mt-1">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4" /> {job.location}
                        </div>
                      </CardDescription>
                    </div>
                    <Badge 
                      variant={
                        job.status === "APPROVED" ? "default" :
                        job.status === "PENDING" ? "secondary" :
                        job.status === "REJECTED" ? "destructive" : "outline"
                      }
                      style={job.status === "APPROVED" ? { backgroundColor: '#3A6B4C', color: '#FFFFFF'} : {}}
                    >
                      {job.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{job.jobType.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{job.salaryRange}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Tags</h4>
                      <div className="flex flex-wrap">
                        {renderTags(job.tags)}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-1">Benefits</h4>
                      <div className="flex flex-wrap">
                        {renderBenefits(job.benefits)}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Posted: {formatDate(job.postedDate)}
                  </span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigateToApplications(job.id)}
                  >
                    View Candidates
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border">
            <Bookmark className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No job postings found</h3>
            <p className="text-sm text-gray-500">
              Create your first job posting to start receiving applications
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EmployeeCandidatesPage;