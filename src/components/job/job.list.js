import React from 'react';
import { Button } from '@/components/ui/button';
import JobCard from './job.card';
import Pagination from './pagination.job';

const mockJobs = [
    {
      title: 'Backend Engineer Leader',
      company: 'Money Forward',
      companyDesc: 'Top Japanese fintech ...',
      tags: ['🇯🇵 Residents Only', '¥7.9M ~ ¥10M', 'Partial Remote'],
      location: 'Tokyo',
      salary: '¥ 7.9 ~ 10mil',
      logoUrl: 'https://japan-dev.com/cdn/company_logos/moneyforward.png',
      isNew: true,
      url: '#',
    },
    {
      title: 'Corporate Security Division Manager',
      company: 'Money Forward',
      companyDesc: 'Top Japanese fintech ...',
      tags: ['Japanese Required', 'Apply from Abroad', '¥11M ~ ¥15M'],
      location: 'Tokyo',
      salary: '¥ 11 ~ 15mil',
      logoUrl: 'https://japan-dev.com/cdn/company_logos/moneyforward.png',
      isNew: true,
      url: '#',
    },
    {
      title: 'Engineering Lead',
      company: 'Timee',
      tags: ['Japanese Required','🇯🇵 Residents Only', '¥7.8M ~ ¥14M'],
      location: 'Tokyo / Remote',
      salary: '¥ 7.8 ~ 14mil',
      logoUrl: 'https://japan-dev.com/cdn/company_logos/timee.png',
      isNew: true,
      url: '#',
    },
    {
        title: 'Technical Product Manager',
        company: 'Timee',
        tags: ['Japanese Required', '🇯🇵 Residents Only', '¥7.8M ~ ¥14M'],
        location: 'Tokyo / Remote',
        salary: '¥ 7.8 ~ 14mil',
        logoUrl: 'https://japan-dev.com/cdn/company_logos/timee.png',
        isNew: true,
        url: '#',
      },
     {
        title: 'Senior Front-end Engineer',
        company: 'Rakuten',
        companyDesc: 'Japan E-commerce leader',
        tags: ['Apply from Abroad', '¥6M ~ ¥9M', 'Partial Remote'],
        location: 'Tokyo',
        salary: '¥ 6 ~ 9mil',
        logoUrl: 'https://japan-dev.com/cdn/company_logos/rakuten.png',
        isNew: true,
        url: '#',
      },
      {
        title: 'Senior Data Engineer',
        company: 'Rakuten',
        companyDesc: 'Japan E-commerce leader',
        tags: ['Apply from Abroad', '¥6M ~ ¥9M', 'Partial Remote'],
        location: 'Tokyo',
        salary: '¥ 6 ~ 9mil',
        logoUrl: 'https://japan-dev.com/cdn/company_logos/rakuten.png',
        isNew: true,
        url: '#',
      },
];

const JobList = () => {
  const jobCount = 500;
  const updatedDate = 'April 1, 2025';

  return (
    <main>
      <p className="text-sm text-slate-600 mb-4">
        {jobCount} open jobs・Updated {updatedDate}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockJobs.map((job, index) => (
          <JobCard key={`${job.title}-${index}`} job={job} /> 
        ))}
      </div>

      <div className="mt-8 text-center">
        <Pagination />
      </div>
    </main>
  );
};

export default JobList;