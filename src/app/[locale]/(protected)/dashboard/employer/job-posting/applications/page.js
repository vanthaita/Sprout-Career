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
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
        <div className="min-h-screen bg-gray-50">
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
                className="pl-10 w-full bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
                <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2 justify-between bg-white">
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
                        className="cursor-pointer"
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
                <Card key={application.id} className="hover:shadow-lg transition-shadow duration-200 bg-white">
                    <CardContent className="p-4 md:p-5">
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                        <Avatar className="h-12 w-12 md:h-14 md:w-14 border">
                            <AvatarImage src={application.candidate?.photoUrl} />
                            <AvatarFallback>
                            {application.candidate?.name?.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        
                        <div className="sm:hidden flex-1">
                            <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-base">{application.candidate?.name}</h3>
                                <p className="text-sm text-muted-foreground truncate max-w-[180px]">
                                {application.candidate?.email || 'No email provided'}
                                </p>
                            </div>
                            <Badge className={`${getStatusColor(application.status)} text-xs font-medium px-2.5 py-1`}>
                                {statusOptions.find(opt => opt.value === application.status)?.label || application.status}
                            </Badge>
                            </div>
                        </div>
                        </div>
                        
                        <div className="flex-1 w-full">
                        <div className="hidden sm:flex justify-between items-start mb-2">
                            <div>
                            <h3 className="font-semibold text-base">{application.candidate?.name}</h3>
                            <p className="text-sm text-muted-foreground">{application.candidate?.email || 'No email provided'}</p>
                            </div>
                            <Badge className={`${getStatusColor(application.status)} text-xs font-medium px-2.5 py-1`}>
                                {statusOptions.find(opt => opt.value === application.status)?.label || application.status}
                            </Badge>
                        </div>
                        
                        <div className="mt-1 flex flex-col sm:flex-row sm:items-start justify-between gap-x-4 gap-y-3">
                            <div className="flex-1 space-y-1.5 w-full">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-gray-500">MATCH SCORE:</span>
                                    <span className={`text-sm font-bold ${getMatchColor(application.score).replace('bg', 'text')}`}>
                                        {application.score ?? 'N/A'} / 100
                                    </span>
                                </div>
                                <Progress 
                                    value={application.score || 0} 
                                    className="h-1.5 w-full"
                                    indicatorClassName={getMatchColor(application.score)}
                                />
                                {application.AIanalysis && (
                                    <div className="pt-1">
                                        <h4 className="text-xs font-semibold text-gray-500 mb-1">AI ANALYSIS INSIGHTS:</h4>
                                        <div className="text-xs text-gray-800 bg-slate-50 p-3 rounded-md border border-slate-200 max-h-60 w-full overflow-y-auto">
                                            <ReactMarkdown 
                                                remarkPlugins={[remarkGfm]}
                                                components={{
                                                    h1: ({node, ...props}) => <h1 className="text-sm font-bold mt-1.5 mb-0.5 text-gray-900" {...props} />,
                                                    h2: ({node, ...props}) => <h2 className="text-xs font-bold mt-1.5 mb-0.5 text-gray-900" {...props} />,
                                                    h3: ({node, ...props}) => <h3 className="text-xs font-semibold mt-1 mb-0.5 text-gray-800" {...props} />,
                                                    h4: ({node, ...props}) => <h4 className="text-xs font-semibold mt-1 mb-0.5 text-gray-700" {...props} />,
                                                    p: ({node, ...props}) => <p className="mb-1 leading-relaxed" {...props} />,
                                                    ul: ({node, ...props}) => <ul className="list-disc list-inside pl-1 mb-1 space-y-0.5" {...props} />,
                                                    ol: ({node, ...props}) => <ol className="list-decimal list-inside pl-1 mb-1 space-y-0.5" {...props} />,
                                                    li: ({node, ...props}) => <li className="mb-0.5 ml-2" {...props} />,
                                                    strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                                                    code: ({node, inline, className, children, ...props}) => {
                                                        const match = /language-(\w+)/.exec(className || '');
                                                        return !inline && match ? (
                                                          <pre className="bg-gray-200 p-2 rounded my-1 text-2xs overflow-x-auto"><code className={className} {...props}>{children}</code></pre>
                                                        ) : (
                                                          <code className="bg-gray-200 text-red-700 px-1 py-0.5 rounded text-2xs" {...props}>
                                                            {children}
                                                          </code>
                                                        );
                                                    },
                                                    blockquote: ({node, ...props}) => <blockquote className="pl-2 italic border-l-2 border-gray-300 my-1 text-gray-600 text-xs" {...props} />,
                                                }}
                                            >
                                                {application.AIanalysis}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="text-xs text-muted-foreground sm:text-right whitespace-nowrap pt-1 sm:pt-0 w-full sm:w-auto">
                                Applied: {formatDate(application.applicationDate)}
                            </div>
                        </div>
                        
                        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-8 gap-1.5 flex-1 sm:flex-initial text-xs px-3"
                                onClick={() => handleViewCandidate(application.candidate?.email)}
                            >
                                <User className="h-3.5 w-3.5" />
                                <span className="hidden xs:inline">View Profile</span>
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 gap-1.5 flex-1 sm:flex-initial text-xs px-3">
                                <Mail className="h-3.5 w-3.5" />
                                <span className="hidden xs:inline">Message</span>
                            </Button>
                            {application.candidate?.cvUrl && (
                                <Button asChild variant="outline" size="sm" className="h-8 gap-1.5 flex-1 sm:flex-initial text-xs px-3">
                                  <a href={application.candidate.cvUrl} target="_blank" rel="noopener noreferrer">
                                    <FileText className="h-3.5 w-3.5" />
                                    <span className="hidden xs:inline">View Resume</span>
                                  </a>
                                </Button>
                            )}
                            </div>
                            
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Select 
                                value={application.status}
                                onValueChange={(value) => handleStatusChange(application.id, value)}
                            >
                                <SelectTrigger className="w-full sm:w-[170px] h-8 text-xs">
                                <SelectValue placeholder="Change status" />
                                </SelectTrigger>
                                <SelectContent className='bg-white'>
                                {statusOptions
                                    .filter(opt => opt.value !== 'all')
                                    .map(option => (
                                    <SelectItem key={option.value} value={option.value} className="text-xs cursor-pointer">
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
                                <DropdownMenuContent align="end" className='bg-white mt-1'>
                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-xs">
                                    <Calendar className="h-3.5 w-3.5" />
                                    Schedule Interview
                                </DropdownMenuItem>
                                <DropdownMenuItem className='cursor-pointer text-xs'>Add Note</DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="text-red-600 hover:!text-red-600 cursor-pointer text-xs"
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
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg border shadow-sm">
                <Search className="h-16 w-16 text-gray-300 mb-5" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {filteredApplications.length === 0 && applications.length > 0 
                    ? "No Candidates Match Your Filters" 
                    : "No Applications Found"}
                </h3>
                <p className="text-sm text-gray-500 max-w-xs text-center">
                {filteredApplications.length === 0 && applications.length > 0 
                    ? "Try adjusting your search terms or status filter to find the right candidates."
                    : "There are currently no applications submitted for this job posting."}
                </p>
                 {filteredApplications.length === 0 && applications.length > 0 && searchTerm === '' && statusFilter === 'all' && (
                     <Button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }} className="mt-4">Clear Filters</Button>
                 )}
            </div>
            )}
        </div>
        </div>
    )
}

export default ApplicationsPage;