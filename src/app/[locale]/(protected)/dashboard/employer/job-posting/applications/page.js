'use client'
import { useState, useEffect } from 'react'
import { 
  Search, Filter, ChevronDown, Mail,  FileText, MoreVertical, 
  Briefcase, Calendar, User, ArrowLeft,
  Download
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from "@/components/ui/progress"
import { useSearchParams, useRouter } from 'next/navigation'
import axiosInstance from '@/axios/axiosIntance'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

const ApplicationsPage = () => {
    const [applications, setApplications] = useState([])
    const [job, setJob] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    const jobId = searchParams.get('jobId')

    const statusOptions = [
        { value: 'all', label: 'All Statuses' },
        { value: 'APPLICATION_SUBMITTED', label: 'Submitted' },
        { value: 'DOCUMENT_SCREENING', label: 'Reviewed' },
        { value: 'FIRST_INTERVIEW', label: 'First Interview' },
        { value: 'SECOND_INTERVIEW', label: 'Second Interview' },
        { value: 'OFFER_STAGE', label: 'Hired' },
        { value: 'REJECTED', label: 'Rejected' }
    ];


    useEffect(() => {
        if (jobId) {
            fetchJobDetails()
            fetchApplications()
        }
    }, [jobId])

    const fetchJobDetails = async () => {
        try {
        const res = await axiosInstance.get(`/employer/jobs/${jobId}`)
        setJob(res.data.data)
        } catch (error) {
            console.error("Error fetching job details:", error)
        }
    }

    const fetchApplications = async () => {
        setLoading(true)
        try {
        const res = await axiosInstance.get(`/employer/applications`, {
            jobId 
        })
        console.log(res.data.data?.data);
        setApplications(res.data.data?.data || [])
        } catch (error) {
        console.error("Error fetching applications:", error)
       
        } finally {
        setLoading(false)
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'APPLICATION_SUBMITTED':
                return 'bg-blue-100 text-blue-800';
            case 'DOCUMENT_SCREENING':
                return 'bg-purple-100 text-purple-800';
            case 'FIRST_INTERVIEW':
                return 'bg-yellow-100 text-yellow-800';
            case 'SECOND_INTERVIEW':
                return 'bg-yellow-100 text-yellow-800';
            case 'OFFER_STAGE':
                return 'bg-green-100 text-green-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };


    const getMatchColor = (score) => {
        if (score >= 85) return 'bg-green-500'
        if (score >= 70) return 'bg-blue-500'
        if (score >= 50) return 'bg-yellow-500'
        return 'bg-red-500'
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

    const handleViewCandidate = (candidateEmail) => {
        router.push(`/dashboard/employer/job-posting/applications/candidates?email=${candidateEmail}&jobId=${jobId}`)
    }

    const filteredApplications = applications.filter(app => 
        (statusFilter === 'all' || app.status === statusFilter) &&
        (searchTerm === '' || 
        (app.candidate?.name && app.candidate.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (app.candidate?.skills && app.candidate.skills.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
        )
    )
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
            <div className="flex flex-col md:flex-row h-auto md:h-16 items-center justify-between px-4 py-3 md:py-0 gap-3 md:gap-0">
            <div className="flex items-center gap-3 w-full md:w-auto">
                <Button 
                variant="ghost" 
                onClick={() => router.push('/dashboard/employer/job-posting')}
                className="p-2"
                >
                <ArrowLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#3A6B4C]">
                    <Briefcase className="h-5 w-5 text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-semibold">Job Applications</h1>
                    {job && (
                    <p className="text-sm text-muted-foreground">
                        {job.title} • {job.location}
                    </p>
                    )}
                </div>
                </div>
            </div>
            <div className="w-full md:w-auto">
                <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Export
                </Button>
                </div>
            </div>
            </div>
        </header>

        <div className='py-6 px-4 space-y-6'>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative w-full md:w-[400px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                placeholder="Search candidates by name or skills..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 justify-between">
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
            </div>
            </div>

            {loading ? (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3A6B4C]"></div>
            </div>
            ) : filteredApplications.length > 0 ? (
            <div className="space-y-4">
                {filteredApplications.map(application => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Avatar className="h-12 w-12 border">
                            <AvatarImage src={application.candidate?.photoUrl} />
                            <AvatarFallback>
                            {application.candidate?.name?.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        
                        <div className="sm:hidden flex-1">
                            <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-medium">{application.candidate?.name}</h3>
                                <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                                {application.candidate?.email || 'No email provided'}
                                </p>
                            </div>
                            <Badge className={`${getStatusColor(application.status)} text-xs`}>
                                {application.status}
                            </Badge>
                            </div>
                        </div>
                        </div>
                        
                        <div className="flex-1 w-full">
                        <div className="hidden sm:flex justify-between items-start">
                            <div>
                            <h3 className="font-medium">{application.candidate?.name}</h3>
                            <p className="text-sm text-muted-foreground">{application.candidate?.email || 'No email provided'}</p>
                            </div>
                            <Badge className={getStatusColor(application.status)}>
                            {application.status}
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
                                Applied: {formatDate(application.applicationDate)}
                            </p>
                            </div>
                        </div>
                        
                        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 gap-1 flex-1 sm:flex-initial"
                                onClick={() => handleViewCandidate(application.candidate?.email)}
                            >
                                <User className="h-3.5 w-3.5" />
                                <span className="hidden xs:inline">Profile</span>
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 gap-1 flex-1 sm:flex-initial">
                                <Mail className="h-3.5 w-3.5" />
                                <span className="hidden xs:inline">Message</span>
                            </Button>
                            {application.candidate?.cvUrl && (
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
                                <DropdownMenuItem 
                                    className="text-red-600 cursor-pointer"
                                    onClick={() => handleStatusChange(application.id, 'REJECTED')}
                                >
                                    Reject Candidate
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </div>
                        </div>
                        </div>
                    </div>
                    </CardContent>
                </Card>
                ))}
            </div>
            ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border">
                <Search className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                {filteredApplications.length === 0 && applications.length > 0 
                    ? "No candidates match your filters" 
                    : "No applications found for this job"}
                </h3>
                <p className="text-sm text-gray-500">
                Try adjusting your search or filter criteria
                </p>
            </div>
            )}
        </div>
        </div>
    )
}

export default ApplicationsPage