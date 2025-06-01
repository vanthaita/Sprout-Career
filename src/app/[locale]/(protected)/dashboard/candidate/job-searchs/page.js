/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from 'react';
import { Search, Briefcase, MapPin, DollarSign, Clock, ChevronDown, Lock, CheckCircle, Star, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import axiosInstance from '@/axios/axiosIntance';
import { toast } from 'react-toastify';
import { useUserProfile } from '@/context/useUserProfile';
import Markdown from 'react-markdown';

const JobSearchPage = () => {
  const primaryColor = '#3A6B4C';
  const [searchTerm, setSearchTerm] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedIds, setAppliedIds] = useState([]);
  const {profile} = useUserProfile();
  const [filters, setFilters] = useState({
    location: '',
    salaryRange: '',
    jobType: '',
    status: 'APPROVED'
  });

  const savedJobs = [1, 3];
  const appliedJobs = [3]; 

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/job`);
      if (response.data && response.data.data && response.data.data.data) {
        setJobs(response.data.data.data);
        console.log(response.data.data.data)
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch jobs');
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleApplyCandidate = async (jobId, isPublic) => {
    if (!isPublic && !isVerified) {
      toast.error("You need to verify your identity to apply for private jobs");
      return;
    } 
    try {
      const response = await axiosInstance.post('/candidate/application', {
        jobId: jobId
      });
      
      if (response.data) {
        setAppliedIds(prev => {
          const prevArray = Array.isArray(prev) ? prev : [];
          return [...prevArray, jobId];
        });
        toast.success("Application submitted successfully!");
      }
    } catch (err) {
      console.error("Error applying for job:", err);
      toast.error(err.response?.data?.message || "Failed to apply for job");
    }
  };

  const filteredJobs = jobs.filter(job => {
    // const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    //                      job.employer.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    // const matchesLocation = !filters.location || job.location.includes(filters.location);
    // const matchesType = !filters.jobType || job.jobType === filters.jobType;
    // const matchesStatus = job.status === filters.status;
    
    // if (activeTab === 'saved') return matchesSearch && matchesLocation && matchesType && matchesStatus && savedJobs.includes(job.id);
    // if (activeTab === 'applied') return matchesSearch && matchesLocation && matchesType && matchesStatus && appliedIds.includes(job.id);
    return jobs;
  });

  const verifyIdentity = () => {
    setIsVerified(true);
    alert("Identity verification process started");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
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

  const formatSalary = (job) => {
    const formatNumber = (num) => {
      if(!num) return '';
      const number = typeof nun === 'string' ? parseFloat(num) : num;
      if(number > 1000) {
        return `${(number / 10000).toFixed(0)}K`
      } 
      return number.toLocaleString();
    }
    
    if(job.salaryMin && job.salaryMax) {
      const formattedMin = formatNumber(job.salaryMin);
      const formattedMax = formatNumber(job.salaryMax);
      const period = job.salaryPeriod  ? job.salaryPeriod.toLowerCase() : 'year';

      return `${formattedMin} - ${formattedMax} ${job.salaryCurrency} per ${period}`;

    }
  
    return job.salaryRange || 'Salary not specified';
  };

  const toggleSaveJob = (jobId) => {
    console.log(`Toggled save for job ${jobId}`);
  };

  const MAX_SKILLS_DISPLAY = 3;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-lg font-semibold">Find Your Dream Job</h1>
              <p className="text-gray-600">Browse thousands of job listings from top companies</p>
            </div>
          </div>
        </div>
      </header>
      
      <div className='py-6 px-4'>
        <div className="mb-8">
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
              <DropdownMenuContent className="min-w-[200px] bg-white">
                <DropdownMenuItem onClick={() => setFilters({...filters, location: ''})}>
                  Any Location
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({...filters, location: 'Remote'})}>
                  Remote
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({...filters, location: 'New York'})}>
                  New York
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
              <DropdownMenuContent className="min-w-[200px] bg-white">
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

        {selectedJob ? (
          <div className="bg-white rounded-lg border p-6">
            <div className="flex justify-between items-start mb-6">

              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{selectedJob.employer.companyName.trim()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-700">{selectedJob.location}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-600 mb-2">Job Type</h3>
                <p>{jobTypeDisplay(selectedJob.jobType)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-600 mb-2">Salary</h3>
                <p>{formatSalary(selectedJob)}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-600 mb-2">Posted</h3>
                <p>{formatDate(selectedJob.postedDate)}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Job Description</h3>
              <div className="prose max-w-none">
                <Markdown>
                  {selectedJob.description}
                </Markdown>
              </div>
            </div>

            {selectedJob.requirements && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                <div className="prose max-w-none">
                  <Markdown>
                    {selectedJob.requirements}
                  </Markdown>
                </div>
              </div>
            )}

            {selectedJob.tags && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.tags.split(',').map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-sm font-normal py-1 px-3">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedJob.benefits && selectedJob.benefits.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Benefits</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.benefits.map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-sm font-normal py-1 px-3 capitalize">
                      {benefit.replace(/_/g, ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end mt-6">
              {appliedIds.includes(selectedJob.id) ? (
                <Button variant="outline" className="gap-2" disabled>
                  Applied
                </Button>
              ) : (
                <Button 
                  onClick={() => handleApplyCandidate(selectedJob.id, selectedJob.visibility === 'PUBLIC')}
                  className={`gap-2 ${selectedJob.visibility === 'PUBLIC' ? '' : 'bg-purple-600 hover:bg-purple-700'} text-white`}
                  style={selectedJob.visibility === 'PUBLIC' ? { backgroundColor: primaryColor } : {}}
                >
                  {selectedJob.visibility === 'PUBLIC' ? 'Apply Now' : 'Private Apply'}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ) : (
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
                            <p className="text-gray-700">{job.employer.companyName.trim()}</p>
                            {job.visibility === 'PRIVATE' && (
                              <Lock className="h-4 w-4 text-purple-600" />
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
                        {formatSalary(job)}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-800">
                        <Briefcase className="h-3 w-3" />
                        {jobTypeDisplay(job.jobType)}
                      </Badge>
                    </div>
                    
                  <div className="text-gray-600 mb-4 line-clamp-2">
                    {job.description
                      .replace(/#{1,6}\s?/g, '')
                      .replace(/\*\*/g, '') 
                      .replace(/\*/g, '')
                      .replace(/`/g, '')
                      .replace(/\[(.*?)\]\(.*?\)/g, '$1') 
                      .replace(/\n/g, ' ') 
                      .substring(0, 150)}...
                  </div>
                    
                    {job.tags && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Skills Required:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.tags.split(',').slice(0, MAX_SKILLS_DISPLAY).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-sm font-normal">
                              {tag.trim()}
                            </Badge>
                          ))}
                          {job.tags.split(',').length > MAX_SKILLS_DISPLAY && (
                            <Badge variant="outline" className="text-sm font-normal">
                              +{job.tags.split(',').length - MAX_SKILLS_DISPLAY} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(job.postedDate)}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="gap-2 cursor-pointer"
                          onClick={() => setSelectedJob(job)}
                        >
                          View Details
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        
                        {appliedIds.includes(job.id) ? (
                          <Button variant="outline" className="gap-2" disabled>
                            Applied
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => handleApplyCandidate(job.id, job.visibility === 'PUBLIC')}
                            className={`gap-2 ${job.visibility === 'PUBLIC' ? '' : 'bg-purple-600 hover:bg-purple-700'} text-white cursor-pointer`}
                            style={job.visibility === 'PUBLIC' ? { backgroundColor: primaryColor } : {}}
                          >
                            {job.visibility === 'PUBLIC' ? 'Apply Now' : 'Private Apply'}
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
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
        )}
      </div>
    </div>
  );
};

export default JobSearchPage;