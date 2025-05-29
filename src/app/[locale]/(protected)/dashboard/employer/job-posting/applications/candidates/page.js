'use client';
import React, { useEffect, useState } from 'react';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiBriefcase,
  FiAward,
  FiDownload,
  FiUser,
  FiLink,
} from 'react-icons/fi';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axiosInstance from '@/axios/axiosIntance';
import { DownloadCloudIcon, FileText, ArrowLeft } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Mail, CalendarClock, CheckCircle, XCircle } from 'lucide-react';

const CandidateProfilePage = () => {
    const [candidate, setCandidate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [files, setFiles] = useState([]);
    const [status, setStatus] = useState('SUBMITTED');
    const router = useRouter();

    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const jobId = searchParams.get('jobId');
    const decodedEmail = email ? decodeURIComponent(email) : '';

    const statusOptions = [
        { value: 'APPLICATION_SUBMITTED', label: 'Submitted', color: 'bg-gray-400' },
        { value: 'DOCUMENT_SCREENING', label: 'Reviewed', color: 'bg-blue-400' },
        { value: 'FIRST_INTERVIEW', label: 'First Interview', color: 'bg-purple-300' },
        { value: 'SECOND_INTERVIEW', label: 'Second Interview', color: 'bg-purple-400' },
        { value: 'FINAL_INTERVIEW', label: 'Final Interview', color: 'bg-purple-500' },
        { value: 'OFFER_STAGE', label: 'Offer Made', color: 'bg-green-400' },
        { value: 'REJECTED', label: 'Rejected', color: 'bg-red-400' }
    ];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/candidate/profile', {
                    params: { email: decodedEmail },
                });
                setCandidate(response.data.data);

                setFiles([
                    { id: 1, name: 'Resume.pdf', type: 'resume', date: '2023-05-15', size: '2.4 MB' },
                    { id: 2, name: 'Cover_Letter.pdf', type: 'cover', date: '2023-05-10', size: '1.2 MB' },
                ]);
                
                if (response.data.data.applications?.length > 0) {
                    setStatus(response.data.data.applications[0].status);
                }
            } catch (error) {
                console.error("Error fetching candidate data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [decodedEmail]);

    const formatDate = (dateString) => {
        if (!dateString) return 'Present';
        if (typeof dateString === 'number') return dateString.toString(); 
        try {
            const date = new Date(dateString);
             if (!isNaN(date.getTime())) {
                if (date.getMonth() === 0 && date.getDate() === 1) {
                    return date.getFullYear().toString(); 
                }
                 return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
             }
            const year = parseInt(dateString, 10);
            if (!isNaN(year)) {
                return year.toString();
            }
             return dateString; 
        } catch {
            return dateString;
        }
    };


    const getInitials = (name) => {
        if (!name) return '';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const handleStatusChange = async (newStatus) => {
        setStatus(newStatus);
        try {
            if (candidate.applications?.length > 0) {
                await axiosInstance.put(`/applications/${candidate.applications[0].id}`, {
                    status: newStatus
                });
            }
        } catch (error) {
            console.error("Error updating application status:", error);
        }
    };

    const handleBackToApplications = () => {
        router.push(`/en/dashboard/employer/job-posting/applications?jobId=${jobId}`);
    };

     const handleDownloadResume = () => {
        console.log("Download resume clicked");
    };


    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!candidate) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
                <div className="bg-red-100 rounded-full p-4 mb-4">
                    <FiUser className="h-8 w-8 text-red-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to load candidate data</h2>
                <Button 
                    onClick={() => window.location.reload()} 
                    className="bg-primary hover:bg-primary-dark text-white"
                >
                    Retry
                </Button>
            </div>
        );
    }

    const currentStatus = statusOptions.find(option => option.value === status);

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="sticky top-0 z-10 bg-white shadow-sm border-b">
                <div className="flex h-16 items-center justify-between px-4">
                    <Button 
                        variant="ghost" 
                        onClick={handleBackToApplications}
                        className="flex items-center gap-2 text-gray-600 hover:bg-gray-100"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span className="cursor-pointer sm:inline">Back to Applications</span>
                    </Button>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Status:</span>
                            <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${currentStatus?.color || 'bg-gray-400'}`}></span>
                                <Select value={status} onValueChange={handleStatusChange}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((option) => (
                                            <SelectItem key={option.value} value={option.value}>
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${option.color}`}></span>
                                                    {option.label}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="gap-2">
                                    Actions <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48" align="end">
                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <Mail className="h-4 w-4 text-gray-600" />
                                    <span>Send Message</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <CalendarClock className="h-4 w-4 text-gray-600" />
                                    <span>Schedule Interview</span>
                                </DropdownMenuItem>
                                <Separator className="my-1" />
                                <DropdownMenuItem 
                                    className="flex items-center gap-2 text-green-600 hover:bg-green-50 cursor-pointer"
                                    onClick={() => handleStatusChange('HIRED')}
                                >
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Hire Candidate</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    className="flex items-center gap-2 text-red-600 hover:bg-red-50 cursor-pointer"
                                    onClick={() => handleStatusChange('REJECTED')}
                                >
                                    <XCircle className="h-4 w-4" />
                                    <span>Reject Candidate</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        
                         <Button 
                            className="bg-primary hover:bg-primary-dark text-white gap-2"
                            onClick={handleDownloadResume}
                        >
                            <DownloadCloudIcon className="h-4 w-4" />
                            <span className="hidden sm:inline">Download CV</span>
                        </Button>
                    </div>
                </div>
            </header>

            <div className="py-8 px-4 my-8">
                
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{candidate.fullName}</h1>
                    <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm text-gray-700">
                         {candidate.user?.email && (
                            <a href={`mailto:${candidate.user.email}`} className="hover:underline">{candidate.user.email}</a>
                        )}
                         {candidate.phoneNumber && (
                            <span>{candidate.phoneNumber}</span>
                        )}
                         {candidate.address && (
                            <span>{candidate.address}</span>
                        )}
                        {candidate.linkedInProfileUrl && (
                             <a href={candidate.linkedInProfileUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                        )}
                        {candidate.websiteUrl && (
                            <a href={candidate.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">Website</a>
                        )}
                    </div>
                </div>

                {candidate.motivation && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold text-gray-800 uppercase mb-2">About</h2>
                        <Separator className="mb-4"/>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {candidate.motivation}
                        </p>
                    </section>
                )}
                
                {candidate.education?.length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold text-gray-800 uppercase mb-2">Education</h2>
                        <Separator className="mb-4"/>
                        <div className="space-y-4">
                            {candidate.education.map((edu) => (
                                <div key={edu.id} className="flex flex-col sm:flex-row justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 leading-snug">{edu.schoolName}</h3>
                                        <p className="text-sm text-gray-700 leading-snug">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</p>
                                    </div>
                                    <div className="sm:text-right text-sm text-gray-600 sm:ml-4 flex-shrink-0">
                                         {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {candidate.workExperience?.length > 0 && (
                     <section className="mb-8">
                        <h2 className="text-lg font-bold text-gray-800 uppercase mb-2">Work Experience</h2>
                        <Separator className="mb-4"/>
                         <div className="space-y-4">
                            {candidate.workExperience.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex flex-col sm:flex-row justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900 leading-snug">{exp.position}</h3>
                                             <p className="text-sm text-gray-700 leading-snug">{exp.companyName}{exp.location && `, ${exp.location}`}</p>
                                        </div>
                                        <div className="sm:text-right text-sm text-gray-600 sm:ml-4 flex-shrink-0">
                                            {formatDate(exp.startDate)} – {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </section>
                )}

                 {candidate.skills && candidate.skills.split(',').filter(s => s.trim() !== '').length > 0 && (
                    <section className="mb-8">
                        <h2 className="text-lg font-bold text-gray-800 uppercase mb-2">Skills</h2>
                        <Separator className="mb-4"/>
                        <ul className="list-disc list-inside text-gray-700 space-y-1">
                            {candidate.skills.split(',').map((skill, index) => (
                                <li key={index}>{skill.trim()}</li>
                            ))}
                        </ul>
                    </section>
                 )}

                     <section className="mb-8">
                         <h2 className="text-lg font-bold text-gray-800 uppercase mb-2">Awards, Honors, and Honorary Mentions</h2>
                         <Separator className="mb-4"/>
                         <EmptyState 
                            icon={<FiAward />}
                            title="No awards or honors listed"
                            description="This candidate hasn't added any awards or honors"
                        />
                     </section>
            </div>
        </div>
    );
};


const DocumentItem = ({ file, onDownload }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-md">
                <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
                <p className="font-medium text-sm truncate max-w-[180px]">{file.name}</p>
                <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
            </div>
        </div>
        <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hover:bg-gray-200"
            onClick={onDownload}
        >
            <FiDownload className="h-4 w-4 text-gray-500" />
        </Button>
    </div>
);


const EmptyState = ({ icon, title, description }) => (
    <div className="text-center py-8">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            {React.cloneElement(icon, { className: "h-6 w-6 text-gray-400" })}
        </div>
        <h4 className="text-lg font-medium text-gray-700 mb-1">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
    </div>
);

export default CandidateProfilePage;