'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Filter, Download, StickyNote, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import axiosInstance from "@/axios/axiosIntance"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Label } from "@/components/ui/label"

const JobPostingsPage = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentJob, setCurrentJob] = useState(null)
  const router = useRouter()

  const fetchJobs = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get('/employer/jobs')
      console.log(response.data.data.data);
      setJobs(response.data.data.data || []) 
    } catch (error) {
      console.error("Error fetching jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleDeleteJob = async (jobId) => {
    try {
      await axiosInstance.delete(`/employer/jobs/${jobId}`)
      toast({
        title: "Success",
        description: "Job deleted successfully",
      })
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

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#3A6B4C]">
              <StickyNote className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold">Job Postings</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/employer/job-posting/new">
              <Button 
                style={{ backgroundColor: '#3A6B4C' }} 
                className='text-white cursor-pointer'
              >
                <Plus className="mr-2 h-4 w-4" />
                New Job Posting
              </Button>
            </Link>
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
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Job Details</DialogTitle>
          </DialogHeader>
          {currentJob && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <p>{currentJob.title || "Not specified"}</p>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <p>{currentJob.description || "Not specified"}</p>
              </div>
              <div className="space-y-2">
                <Label>Requirements</Label>
                <p>{currentJob.requirements || "Not specified"}</p>
              </div>
              <div className="space-y-2">
                <Label>Job Type</Label>
                <p>{currentJob.jobType ? currentJob.jobType.replace('_', ' ') : "Not specified"}</p>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <p>{currentJob.location || "Not specified"}</p>
              </div>
              <div className="space-y-2">
                <Label>Salary Range</Label>
                <p>{formatSalaryRange(currentJob)}</p>
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <p>{currentJob.tags || "Not specified"}</p>
              </div>
              <div className="space-y-2">
                <Label>Benefits</Label>
                <div className="flex flex-wrap gap-2">
                  {currentJob.benefits?.length > 0 ? (
                    currentJob.benefits.map((benefit, index) => (
                      <Badge key={index} variant="outline">
                        {benefit.replace('_', ' ')}
                      </Badge>
                    ))
                  ) : (
                    <p>Not specified</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default JobPostingsPage