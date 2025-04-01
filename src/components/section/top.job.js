/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
// const Button = ({ variant, className, children, ...props }) => (
//   <button
//     className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
//       variant === 'ghost'
//         ? 'hover:bg-accent hover:text-accent-foreground'
//         : 'bg-primary text-primary-foreground hover:bg-primary/90'
//     } ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

// const Card = ({ className, children, ...props }) => (
//   <div
//     className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
//     {...props}
//   >
//     <div className="p-4">
//        {children}
//     </div>
//   </div>
// );


const TopJobSection = () => {
  const mockDataJobs = [
    {
      id: 1,
      company: "Timee",
      location: "Tokyo",
      title: "エンジニアリングリード / Engineering Lead",
      tags: ["Japanese Required", "🇯🇵 Residents Only", "¥7.8M ~ ¥14M"],
      logoUrl: "https://japan-dev.com/cdn/company_logos/timee.png", 
      isNew: true
    },
    {
      id: 2,
      company: "Money Forward",
      location: "Tokyo",
      title: "Corporate Security Division Manager (CISO Office)",
      tags: ["Japanese Required", "Apply from Abroad", "¥11M ~ ¥15M"],
      logoUrl: "https://japan-dev.com/cdn/company_logos/money-forward.png",
      isNew: true
    },
    {
      id: 3,
      company: "Rakuten",
      location: "Tokyo",
      title: "Senior Front-end Engineer",
      tags: ["Apply from Abroad", "¥6M ~ ¥9M", "Partial Remote"],
      logoUrl: "https://japan-dev.com/cdn/company_logos/rakuten.png",
      isNew: true
    },
    {
      id: 4,
      company: "TableCheck",
      location: "Tokyo",
      title: "Backend Developer - Elixir (Remote)",
      tags: ["Apply from Abroad", "Full Remote"],
      technologies: ["Backend"],
      logoUrl: "https://japan-dev.com/cdn/company_logos/tablecheck.png",
      isNew: true
    }
  ];

  return (
    <section className='flex justify-center items-start pb-12 px-4'>
      <div className='flex flex-col items-center justify-center gap-y-4 md:gap-y-6 w-full max-w-5xl'>
        <div className='flex flex-wrap justify-center gap-2 w-full'>
          <Button variant='ghost' className='border text-sm px-3 py-1 h-auto'>
            <span role="img" aria-label="Japan flag" className='mr-1.5'>🇯🇵</span> No Japanese Required
          </Button>
          <Button variant='ghost' className='border text-sm px-3 py-1 h-auto'>
            <span role="img" aria-label="airplane" className='mr-1.5'>✈️</span> Apply from Overseas
          </Button>
          <Button variant='ghost' className='border text-sm px-3 py-1 h-auto'>
             <span role="img" aria-label="house" className='mr-1.5'>🏠</span> Remote Jobs
          </Button>
          <Button variant='ghost' className='border text-sm px-3 py-1 h-auto'>
             <span role="img" aria-label="magnifying glass" className='mr-1.5'>🔍</span> All Jobs
          </Button>
        </div>

        <div className='text-center mt-4'>
          <p className='text-sm text-gray-600'>Latest Developer Jobs・Updated 2025-04-01</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4'>
          {mockDataJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-md transition-shadow duration-200 cursor-pointer p-4">
              <div className="flex items-start space-x-4">
                 <div className="flex-shrink-0 pt-1">
                    <img
                      src={job.logoUrl}
                      alt={`${job.company} logo`}
                      className="w-14 h-14 object-contain rounded-md border p-0.5" 
                    />
                 </div>
                 <div className="flex-grow min-w-0">
                    <div className="text-sm text-gray-500 mb-1">
                      <span>{job.company}</span>
                      <span className="mx-1">·</span>
                      <span>{job.location}</span>
                    </div>

                    <div className="relative mb-2">
                      <h3 className="text-base font-semibold text-gray-900 leading-tight mt-1 hover:text-primary">
                         {job.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-1.5 items-center">
                      {job.tags.map((tag, index) => (
                        <div
                          key={index}
                          variant={'ghost'}
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                            tag.includes("Required") || tag.includes("Only")
                              ? 'border-primary border text-primary' 
                              : ''
                           }`} 
                        >
                          {tag.startsWith('🇯🇵') ? <span className='mr-1'>{tag.substring(0, tag.indexOf(' '))}</span> : null}
                          {tag.startsWith('🇯🇵') ? tag.substring(tag.indexOf(' ') + 1) : tag}
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
            </Card>
          ))}
        </div>
        <div>
          <Button className="text-sm px-6 py-2.5 text-white bg-primary hover:bg-primary/90 rounded-full">
            Search dev Jobs
          </Button>
        </div>
        <div className='flex flex-wrap justify-center gap-2 w-full mt-4'>
          <Button variant='ghost' className='border text-sm px-3 py-1 h-auto'>
            <span role="img" aria-label="Japan flag" className='mr-1.5'>🇯🇵</span> No Japanese Required
          </Button>
          <Button variant='ghost' className='border text-sm px-3 py-1 h-auto'>
            <span role="img" aria-label="airplane" className='mr-1.5'>✈️</span> Apply from Overseas
          </Button>
          <Button variant='ghost' className='border text-sm px-3 py-1 h-auto'>
             <span role="img" aria-label="house" className='mr-1.5'>🏠</span> Remote Jobs
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopJobSection;