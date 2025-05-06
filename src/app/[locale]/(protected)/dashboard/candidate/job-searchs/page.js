/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react';
import { Search, Filter, Briefcase, MapPin, DollarSign, Clock, ChevronDown, Lock, CheckCircle, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const JobSearchPage = () => {
  const primaryColor = '#3A6B4C';
  const [searchTerm, setSearchTerm] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState({
    location: '',
    salaryRange: '',
    jobType: '',
    status: 'APPROVED'
  });

  // Sample data - in real app this would come from API
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      employer: {
        companyName: "TechCorp Inc.",
        companyLogoUrl: "/logos/techcorp.png",
        rating: 4.5
      },
      location: "Remote",
      salaryRange: "$90,000 - $120,000",
      jobType: "FULL_TIME",
      status: "APPROVED",
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      description: "We're looking for an experienced frontend developer to join our innovative team working on cutting-edge web applications.",
      requirements: "5+ years React experience, TypeScript proficiency, modern CSS expertise",
      isPublic: true,
      isFeatured: true,
      skills: ["React", "TypeScript", "CSS", "Redux"],
      applicationsCount: 12
    },
    {
      id: 2,
      title: "UX/UI Designer",
      employer: {
        companyName: "DesignHub",
        companyLogoUrl: "/logos/designhub.png",
        rating: 4.2
      },
      location: "San Francisco, CA",
      salaryRange: "$85,000 - $110,000",
      jobType: "FULL_TIME",
      status: "APPROVED",
      postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      description: "Create beautiful and intuitive user experiences for our suite of productivity tools.",
      requirements: "3+ years UX design, Figma expertise, user research skills",
      isPublic: false,
      isFeatured: false,
      skills: ["Figma", "UI Design", "User Research", "Prototyping"],
      applicationsCount: 8
    },
    {
      id: 3,
      title: "Backend Engineer (Node.js)",
      employer: {
        companyName: "DataSystems",
        companyLogoUrl: "/logos/datasystems.png",
        rating: 4.7
      },
      location: "New York, NY",
      salaryRange: "$100,000 - $140,000",
      jobType: "CONTRACT",
      status: "APPROVED",
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      description: "Build scalable backend services for our data processing platform.",
      requirements: "Node.js, AWS, microservices architecture, database design",
      isPublic: true,
      isFeatured: true,
      skills: ["Node.js", "AWS", "Microservices", "PostgreSQL"],
      applicationsCount: 15
    },
    {
      id: 4,
      title: "Product Manager",
      employer: {
        companyName: "InnovateCo",
        companyLogoUrl: "/logos/innovateco.png",
        rating: 4.0
      },
      location: "Remote",
      salaryRange: "$110,000 - $150,000",
      jobType: "FULL_TIME",
      status: "APPROVED",
      postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      description: "Lead product development for our flagship SaaS platform.",
      requirements: "5+ years PM experience, Agile methodology, technical background",
      isPublic: false,
      isFeatured: false,
      skills: ["Product Management", "Agile", "Roadmapping", "SaaS"],
      applicationsCount: 6
    }
  ];

  const savedJobs = [1, 3]; // IDs of saved jobs
  const appliedJobs = [3]; // IDs of applied jobs

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.employer.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !filters.location || job.location.includes(filters.location);
    const matchesType = !filters.jobType || job.jobType === filters.jobType;
    const matchesStatus = job.status === filters.status;
    
    // Tab filtering
    if (activeTab === 'saved') return matchesSearch && matchesLocation && matchesType && matchesStatus && savedJobs.includes(job.id);
    if (activeTab === 'applied') return matchesSearch && matchesLocation && matchesType && matchesStatus && appliedJobs.includes(job.id);
    return matchesSearch && matchesLocation && matchesType && matchesStatus;
  });

  const handleApply = (jobId, isPublic) => {
    if (!isPublic && !isVerified) {
      alert("Please verify your identity to apply for this private job");
      return;
    }
    // In real app: Create application with status SUBMITTED
    alert(`Application submitted for job ${jobId}`);
    // Then navigate to applications page
  };

  const verifyIdentity = () => {
    setIsVerified(true);
    alert("Identity verification process started");
  };

  const formatDate = (date) => {
    const diff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return `${diff} days ago`;
  };

  const jobTypeDisplay = (type) => {
    switch(type) {
      case 'FULL_TIME': return 'Full-time';
      case 'PART_TIME': return 'Part-time';
      case 'CONTRACT': return 'Contract';
      case 'TEMPORARY': return 'Temporary';
      case 'INTERNSHIP': return 'Internship';
      case 'FREELANCE': return 'Freelance';
      default: return type;
    }
  };

  const toggleSaveJob = (jobId) => {
    console.log(`Toggled save for job ${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Find Your Dream Job</h1>
        <p className="text-gray-600">Browse thousands of job listings from top companies</p>
      </div>

      <div className="mb-8 bg-white rounded-xl shadow-sm">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            placeholder="Search for jobs, companies, or keywords"
            className="pl-10 py-6 text-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
            <TabsTrigger value="applied">Applied Jobs</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 px-4 py-2 rounded-lg">
                <MapPin className="h-4 w-4" />
                {filters.location || 'Location'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[200px]">
              <DropdownMenuItem onClick={() => setFilters({...filters, location: ''})}>
                Any Location
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, location: 'Remote'})}>
                Remote
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, location: 'San Francisco'})}>
                San Francisco
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, location: 'New York'})}>
                New York
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 px-4 py-2 rounded-lg">
                <DollarSign className="h-4 w-4" />
                {filters.salaryRange || 'Salary'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[200px]">
              <DropdownMenuItem onClick={() => setFilters({...filters, salaryRange: ''})}>
                Any Salary
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, salaryRange: '$50,000+'})}>
                $50,000+
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, salaryRange: '$80,000+'})}>
                $80,000+
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, salaryRange: '$100,000+'})}>
                $100,000+
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 px-4 py-2 rounded-lg">
                <Briefcase className="h-4 w-4" />
                {filters.jobType ? jobTypeDisplay(filters.jobType) : 'Job Type'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[200px]">
              <DropdownMenuItem onClick={() => setFilters({...filters, jobType: ''})}>
                Any Type
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, jobType: 'FULL_TIME'})}>
                Full-time
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, jobType: 'PART_TIME'})}>
                Part-time
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilters({...filters, jobType: 'CONTRACT'})}>
                Contract
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {!isVerified && (
            <Button 
              variant="outline" 
              className="gap-2 px-4 py-2 rounded-lg ml-auto"
              onClick={verifyIdentity}
            >
              <Lock className="h-4 w-4" />
              Verify Identity
            </Button>
          )}
        </div>
      </div>

      {isVerified && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg flex items-center gap-3 border border-green-200">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <p className="text-green-800">Your identity has been verified. You can now apply to private jobs.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <Card key={job.id} className={`hover:shadow-md transition-all border`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-lg bg-white border flex items-center justify-center p-2">
                      {job.employer.companyLogoUrl ? (
                        <img 
                          src={job.employer.companyLogoUrl} 
                          alt={job.employer.companyName}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <Briefcase className="h-6 w-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray-700">{job.employer.companyName}</p>
                        {job.employer.rating && (
                          <div className="flex items-center gap-1 text-sm text-amber-600">
                            <Star className="h-3 w-3 fill-current" />
                            <span>{job.employer.rating}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleSaveJob(job.id)}
                    className={`p-2 rounded-full ${savedJobs.includes(job.id) ? 'text-amber-500' : 'text-gray-400'}`}
                  >
                    <Star className={`h-5 w-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="flex items-center gap-1 bg-gray-50">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-800">
                    <DollarSign className="h-3 w-3" />
                    {job.salaryRange}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-800">
                    <Briefcase className="h-3 w-3" />
                    {jobTypeDisplay(job.jobType)}
                  </Badge>
                  {!job.isPublic && (
                    <Badge variant="outline" className="flex items-center gap-1 bg-purple-50 text-purple-800">
                      <Lock className="h-3 w-3" />
                      Private
                    </Badge>
                  )}
                  {job.isFeatured && (
                    <Badge className="bg-emerald-100 text-emerald-800">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                
                {job.skills && job.skills.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Skills Required:</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-sm font-normal">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{formatDate(job.postedDate)}</span>
                    {job.applicationsCount > 0 && (
                      <span className="ml-2">• {job.applicationsCount} applicants</span>
                    )}
                  </div>
                  
                  {appliedJobs.includes(job.id) ? (
                    <Button variant="outline" className="gap-2" disabled>
                      Applied
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => handleApply(job.id, job.isPublic)}
                      className={`gap-2 ${job.isPublic ? '' : 'bg-purple-600 hover:bg-purple-700'}`}
                      style={job.isPublic ? { backgroundColor: primaryColor } : {}}
                    >
                      {job.isPublic ? 'Apply Now' : 'Private Apply'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearchPage;