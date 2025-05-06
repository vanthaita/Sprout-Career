'use client';
import React, { useState } from 'react';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiBriefcase,
  FiAward,
  FiSettings,
  FiMoreHorizontal,
  FiSend,
  FiBookmark,
  FiLinkedin,
  FiDownload,
  FiEdit2,
  FiPlus,
  FiFileText,
  FiExternalLink
} from 'react-icons/fi';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const CandidateProfilePage = () => {
  const [candidate, setCandidate] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phoneNumber: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA",
    skills: "React, TypeScript, Node.js, GraphQL, Jest, Docker, AWS",
    profileCompletion: 85,
    motivation: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React and Node.js with a strong focus on performance optimization and clean code architecture.",
    education: [
      {
        id: 1,
        schoolName: "Stanford University",
        degree: "Master of Computer Science",
        fieldOfStudy: "Artificial Intelligence",
        startDate: "2018-09-01",
        endDate: "2020-06-01"
      }
    ],
    workExperience: [
      {
        id: 1,
        companyName: "TechCorp Inc.",
        position: "Senior Frontend Engineer",
        startDate: "2020-07-01",
        endDate: null,
        isCurrent: true,
        description: "Lead a team of 5 developers to rebuild the company's flagship product using React and TypeScript. Improved performance by 40% and reduced bundle size by 35%."
      }
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2021-03-15"
      }
    ],
    documents: [
      {
        id: 1,
        name: "Alex_Johnson_Resume.pdf",
        type: "resume",
        url: "/documents/resume.pdf",
        uploadedAt: "2023-10-15",
        size: "2.4 MB"
      },
      {
        id: 2,
        name: "Alex_Johnson_Cover_Letter.pdf",
        type: "cover-letter",
        url: "/documents/cover-letter.pdf",
        uploadedAt: "2023-10-15",
        size: "1.2 MB"
      }
    ]
  });

  const primaryColor = '#3A6B4C';
  const secondaryColor = '#E8F5E9';

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleDownload = (url, name) => {
    // In a real app, this would trigger the download
    console.log(`Downloading ${name} from ${url}`);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-white shadow-md">
              <AvatarImage src={null} />
              <AvatarFallback className="text-2xl font-medium bg-gray-100">
                {getInitials(candidate.fullName)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{candidate.fullName}</h1>
                <p className="text-lg text-gray-600 mt-1">Senior Frontend Developer</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {candidate.skills.split(',').map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className="text-sm font-medium px-3 py-1"
                    >
                      {skill.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <FiLinkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <FiMoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                <span className="text-sm font-medium">{candidate.profileCompletion}%</span>
              </div>
              <Progress value={candidate.profileCompletion} className="h-2" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <FiMail className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{candidate.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FiPhone className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{candidate.phoneNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <FiMapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{candidate.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Documents Card */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {candidate.documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                        <FiFileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.size} • {formatDate(doc.uploadedAt)}</p>
                      </div>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleDownload(doc.url, doc.name)}
                        >
                          <FiDownload className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Download {doc.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full gap-2">
                  <FiPlus className="h-4 w-4" />
                  Upload New Document
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Card */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {candidate.motivation}
                </p>
              </CardContent>
              <CardFooter className="justify-end border-t pt-4">
                <Button variant="ghost" className="gap-2" style={{ color: primaryColor }}>
                  <FiEdit2 className="h-4 w-4" />
                  Edit
                </Button>
              </CardFooter>
            </Card>

            {/* Experience Card */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Work Experience</CardTitle>
                  <Button variant="ghost" className="gap-2" style={{ color: primaryColor }}>
                    <FiPlus className="h-4 w-4" />
                    Add Experience
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {candidate.workExperience.map((exp) => (
                  <div key={exp.id} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0 group">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white"
                         style={{ backgroundColor: primaryColor }} />
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 text-lg font-semibold"
                           style={{ backgroundColor: secondaryColor, color: primaryColor }}>
                        {exp.companyName[0]}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                        <p className="text-sm text-gray-700 mb-1">{exp.companyName}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                          <FiCalendar className="h-3 w-3" />
                          {formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}
                        </p>
                        {exp.description && (
                          <p className="text-sm text-gray-700 whitespace-pre-line">{exp.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education Card */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Education</CardTitle>
                  <Button variant="ghost" className="gap-2" style={{ color: primaryColor }}>
                    <FiPlus className="h-4 w-4" />
                    Add Education
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {candidate.education.map((edu) => (
                  <div key={edu.id} className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0 group">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white"
                         style={{ backgroundColor: primaryColor }} />
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 text-lg font-semibold"
                           style={{ backgroundColor: secondaryColor, color: primaryColor }}>
                        {edu.schoolName[0]}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{edu.schoolName}</h4>
                        <p className="text-sm text-gray-700 mb-1">
                          {edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <FiCalendar className="h-3 w-3" />
                          {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfilePage;