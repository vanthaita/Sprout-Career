import React from 'react';
import Image from 'next/image'; 
import { MapPin, CircleDollarSign, Leaf } from 'lucide-react';
import { Card } from '../ui/card';
import Link from 'next/link';

const formatSalary = (job) => {
  if (job.salaryPeriod === 'HOUR') {
    return `$${job.salaryMin} - $${job.salaryMax}/hr`;
  }
  return `$${Number(job.salaryMin)/1000}k - $${Number(job.salaryMax)/1000}k`;
};

const JobCard = ({ job }) => {
  return (
    <Link href={`/jobs/${job.id}`} className="block group">
      <Card className="p-6 flex flex-row gap-6 h-full hover:border-[#3A6B4C]">
        <div className="w-20 h-20 flex-shrink-0 p-2">
          <Image
            src={job.logoUrl}
            alt={`${job.company} logo`}
            width={80}
            height={80}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex-grow">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-serif font-semibold text-[#2B463C] group-hover:text-[#3A6B4C] transition-colors">
                {job.title}
              </h3>
              
              <p className="text-sm text-[#554640]/90 mt-1">
                {job.company}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 items-center">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full text-sm ${
                  tag.includes("Full-time") || tag.includes("On-site")
                    ? 'bg-[#3A6B4C]/10 text-[#3A6B4C] border border-[#3A6B4C]/20'
                    : ''
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-4 text-[#554640]/90">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#3A6B4C]" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <CircleDollarSign className="w-5 h-5 text-[#3A6B4C]" />
              <span>{formatSalary(job)}</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-[#3A6B4C]">
            <Leaf className="w-4 h-4" />
            <span>Sprout Verified Position</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default JobCard;