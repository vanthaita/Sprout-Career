import React from 'react';
import JobCard from './job.card';
import Pagination from './pagination.job';

const mockJobs = [
    {
      id: 1,
      title: 'Engineering Lead',
      company: 'TechCorp',
      description: 'Lead our engineering team...',
      requirements: '5+ years experience...',
      location: 'San Francisco, CA',
      salaryMin: '120000',
      salaryMax: '160000',
      salaryCurrency: 'USD',
      salaryPeriod: 'YEAR',
      jobType: 'FULL_TIME',
      status: 'APPROVED',
      logoUrl: 'https://example.com/techcorp-logo.png',
      postedDate: new Date(),
      tags: ['Full-time', 'On-site', '$120k - $160k']
    },
    {
      id: 2,
      title: 'Senior Frontend Developer',
      company: 'WebSolutions',
      description: 'Build amazing user interfaces...',
      requirements: '3+ years React experience...',
      location: 'Remote',
      salaryMin: '70',
      salaryMax: '90',
      salaryCurrency: 'USD',
      salaryPeriod: 'HOUR',
      jobType: 'CONTRACT',
      status: 'APPROVED',
      logoUrl: 'https://example.com/websolutions-logo.png',
      postedDate: new Date(),
      tags: ['Remote', 'Contract', '$70 - $90/hr']
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      company: 'CloudSystems',
      description: 'Manage our cloud infrastructure...',
      requirements: 'AWS/GCP experience...',
      location: 'New York, NY',
      salaryMin: '130000',
      salaryMax: '170000',
      salaryCurrency: 'USD',
      salaryPeriod: 'YEAR',
      jobType: 'FULL_TIME',
      status: 'APPROVED',
      logoUrl: 'https://example.com/cloudsystems-logo.png',
      postedDate: new Date(),
      tags: ['Full-time', 'Hybrid', '$130k - $170k']
    },
    
];

const JobList = () => {
  const jobCount = mockJobs.length;
  const updatedDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <main>
      <p className="text-sm text-slate-600 mb-4">
        {jobCount} open jobs・Updated {updatedDate}
      </p>

      <div className="grid grid-cols-1 gap-4">
        {mockJobs.map((job) => (
          <JobCard key={job.id} job={job} /> 
        ))}
      </div>

      <div className="mt-8 text-center">
        <Pagination />
      </div>
    </main>
  );
};

export default JobList;