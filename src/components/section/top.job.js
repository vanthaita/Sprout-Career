/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Sprout, Leaf } from 'lucide-react';

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
    <section className='px-4'>
      <div className=''>
        <div className='flex flex-col items-center gap-y-6'>
          <div className='text-center mb-8'>
            <div className='inline-flex items-center gap-3 mb-4'>
              <Sprout className='h-8 w-8 text-[#3A6B4C]' />
              <h2 className='text-3xl font-serif font-bold text-[#2B463C]'>
                Cultivate Your Career
              </h2>
            </div>
            <p className='text-[#554640]/90'>
              Latest Opportunities · Updated {new Date().toISOString().split('T')[0]}
            </p>
          </div>

          <div className='flex flex-wrap justify-center gap-3 w-full max-w-2xl'>
            <Button 
              variant='outline' 
              className='h-9 rounded-full border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#f0ebe3]'
            >
              <span className='mr-1.5'>🇯🇵</span> No Japanese Required
            </Button>
            <Button 
              variant='outline' 
              className='h-9 rounded-full border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#f0ebe3]'
            >
              <span className='mr-1.5'>✈️</span> Apply from Overseas
            </Button>
            <Button 
              variant='outline' 
              className='h-9 rounded-full border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#f0ebe3]'
            >
              <span className='mr-1.5'>🏠</span> Remote Options
            </Button>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-6'>
            {mockDataJobs.map((job) => (
              <Card 
                key={job.id} 
                className="group transition-all duration-200 cursor-pointer p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={job.logoUrl}
                      alt={`${job.company} logo`}
                      className="w-14 h-14 object-contain rounded-lg p-1" 
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="text-sm text-[#554640]/80 mb-1.5">
                      <span className="font-medium">{job.company}</span>
                      <span className="mx-2">·</span>
                      <span>{job.location}</span>
                    </div>

                    <h3 className="text-lg font-serif font-semibold text-[#2B463C] mb-2.5 group-hover:text-[#3A6B4C] transition-colors">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 items-center">
                      {job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-full text-sm ${
                            tag.includes("Required") || tag.includes("Only")
                              ? 'bg-[#3A6B4C]/10 text-[#3A6B4C] border border-[#3A6B4C]/20'
                              : ''
                          }`}
                        >
                          {tag.startsWith('🇯🇵') ? <span className='mr-1'>{tag.substring(0, tag.indexOf(' '))}</span> : null}
                          {tag.startsWith('🇯🇵') ? tag.substring(tag.indexOf(' ') + 1) : tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button 
            size="lg"
            className="mt-8 bg-[#3A6B4C] hover:bg-[#2E5540] text-white rounded-full px-8 py-6"
          >
            <Leaf className="mr-2 h-5 w-5" />
            Explore All Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopJobSection;