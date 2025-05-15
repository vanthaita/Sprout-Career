'use client';
import React, { useEffect, useState } from 'react';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiAward,
  FiMoreHorizontal,
  FiLinkedin,
  FiDownload,
  FiEdit2,
  FiPlus,
  FiUpload
} from 'react-icons/fi';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle,  } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import axiosInstance from '@/axios/axiosIntance';
import { DownloadCloudIcon, User, User2Icon, FileText, X } from 'lucide-react';

const CandidateProfilePage = () => {
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);

  const primaryColor = '#3A6B4C';
  const secondaryColor = '#E8F5E9';
  const accentColor = '#4CAF50';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/candidate/profile');
        setCandidate(response.data.data);
        // Mock files data - replace with actual API call
        setFiles([
          { id: 1, name: 'Resume.pdf', type: 'resume', date: '2023-05-15', size: '2.4 MB' },
          { id: 2, name: 'Cover_Letter.pdf', type: 'cover', date: '2023-05-10', size: '1.2 MB' },
          { id: 3, name: 'Certification.pdf', type: 'certificate', date: '2023-04-20', size: '3.1 MB' }
        ]);
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    if (typeof dateString === 'number') return dateString.toString();
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
    } catch {
      return dateString;
    }
  };

  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleDownload = (url, name) => {
    console.log(`Downloading ${name} from ${url}`);
    window.open(url, '_blank');
  };

  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files).map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      type: file.type.includes('pdf') ? 'pdf' : file.type.split('/')[0],
      date: new Date().toISOString().split('T')[0],
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    }));
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (id) => {
    setFiles(files.filter(file => file.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <div className="bg-red-100 rounded-full p-4 mb-4">
          <FiUser className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to load candidate data</h2>
        <p className="text-gray-600 mb-4">We couldn&apos;t retrieve your profile information. Please try again later.</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="bg-[#3A6B4C] hover:bg-[#2D5542] text-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#3A6B4C]">
                <User2Icon className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold">My Profile</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <FiEdit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Update your profile information</p>
              </TooltipContent>
            </Tooltip>
            <Button 
              className="bg-[#3A6B4C] hover:bg-[#2D5542] flex items-center gap-2 text-white"
            >
              <DownloadCloudIcon className="h-4 w-4" />
              Download CV
            </Button>
          </div>
        </div>
      </header>

      <div className="py-6 px-4 space-y-6">
        <div className="flex flex-col md:flex-row gap-6 mb-8 bg-white p-6 rounded-xl border">
          <div className="flex-shrink-0 relative">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white">
              <AvatarImage src={candidate.profilePhotoUrl} />
              <AvatarFallback className="text-2xl font-medium bg-gray-100">
                {getInitials(candidate.fullName)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{candidate.fullName}</h1>
                <p className="text-lg text-gray-600 mt-1">Frontend Developer</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {candidate.skills && candidate.skills.split(',').map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className="text-sm font-medium px-3 py-1 bg-gray-50 hover:bg-gray-100"
                    >
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                  <FiLinkedin className="h-5 w-5 text-[#0077B5]" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="border">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FiEdit2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <FiMail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{candidate.user?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <FiPhone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{candidate.phoneNumber || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <FiMapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{candidate.address || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <FiCalendar className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{candidate.dateOfBirth ? formatDate(candidate.dateOfBirth) : 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <FiUser className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Gender</p>
                    <p className="font-medium">
                      {candidate.gender === 'MALE' ? 'Male' : candidate.gender === 'FEMALE' ? 'Female' : 'Not specified'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Documents & Files</CardTitle>
                  <label className="cursor-pointer">
                    <input 
                      type="file" 
                      multiple 
                      className="hidden" 
                      onChange={handleFileUpload}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      asChild
                    >
                      <div>
                        <FiPlus className="h-4 w-4 text-gray-500" />
                      </div>
                    </Button>
                  </label>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {files.length > 0 ? (
                  files.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-md">
                          <FileText className="h-5 w-5 text-[#3A6B4C]" />
                        </div>
                        <div>
                          <p className="font-medium text-sm truncate max-w-[180px]">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.size} • {formatDate(file.date)}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDownload('#', file.name)}
                        >
                          <FiDownload className="h-4 w-4 text-gray-500" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FiUpload className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 mb-1">No files uploaded</h4>
                    <p className="text-sm text-gray-500 mb-4">Upload your CV, certificates, or other documents</p>
                    <label className="cursor-pointer">
                      <input 
                        type="file" 
                        multiple 
                        className="hidden" 
                        onChange={handleFileUpload}
                      />
                      <Button 
                        variant="outline" 
                        className="border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#E8F5E9]"
                      >
                        <FiUpload className="h-4 w-4 mr-2" />
                        Upload Files
                      </Button>
                    </label>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="border">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">About Me</CardTitle>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <FiEdit2 className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {candidate.motivation || 'No about information provided. Add a summary about yourself, your skills, and experience.'}
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Work Experience</CardTitle>
                  <Button 
                    variant="ghost" 
                    className="gap-2 text-[#3A6B4C] hover:bg-[#E8F5E9]"
                  >
                    <FiPlus className="h-4 w-4" />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {candidate.workExperience && candidate.workExperience.length > 0 ? (
                  candidate.workExperience.map((exp) => (
                    <div key={exp.id} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0 group">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white bg-[#3A6B4C]" />
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 text-lg font-semibold bg-[#E8F5E9] text-[#3A6B4C]">
                          {exp.companyName?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-gray-900">{exp.position || 'No position specified'}</h4>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FiEdit2 className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FiMoreHorizontal className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">{exp.companyName}</p>
                          <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                            <FiCalendar className="h-3 w-3" />
                            {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                          </p>
                          {exp.description && (
                            <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FiBriefcase className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 mb-1">No work experience added</h4>
                    <p className="text-sm text-gray-500 mb-4">Add your professional experience to showcase your career journey</p>
                    <Button 
                      variant="outline" 
                      className="border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#E8F5E9]"
                    >
                      <FiPlus className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Education</CardTitle>
                  <Button 
                    variant="ghost" 
                    className="gap-2 text-[#3A6B4C] hover:bg-[#E8F5E9]"
                  >
                    <FiPlus className="h-4 w-4" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {candidate.education && candidate.education.length > 0 ? (
                  candidate.education.map((edu) => (
                    <div key={edu.id} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0 group">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white bg-[#3A6B4C]" />
                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 text-lg font-semibold bg-[#E8F5E9] text-[#3A6B4C]">
                          {edu.schoolName?.[0]?.toUpperCase() || '?'}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-gray-900">{edu.schoolName}</h4>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FiEdit2 className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FiMoreHorizontal className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">
                            {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <FiCalendar className="h-3 w-3" />
                            {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                          </p>
                          {edu.description && (
                            <p className="text-sm text-gray-600 mt-2">{edu.description}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FiAward className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-medium text-gray-700 mb-1">No education added</h4>
                    <p className="text-sm text-gray-500 mb-4">Add your educational background to showcase your qualifications</p>
                    <Button 
                      variant="outline" 
                      className="border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#E8F5E9]"
                    >
                      <FiPlus className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;