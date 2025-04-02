/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Sprout, Leaf } from 'lucide-react';
import { useLanguage } from '@/hook/useLanguage ';

const TopJobSection = () => {
  const { t } = useLanguage("jobs");
  const currentDate = new Date().toISOString().split('T')[0];

  const mockDataJobs = [
    {
      id: 1,
      company: "Timee",
      location: "Tokyo",
      title: "エンジニアリングリード / Engineering Lead",
      tags: [
        t("tagTypes.required"),
        t("tagTypes.residentsOnly"),
        t("tagTypes.salaryRange", { min: 7.8, max: 14 })
      ],
      logoUrl: "https://japan-dev.com/cdn/company_logos/timee.png", 
      isNew: true
    },
    {
      id: 2,
      company: "Money Forward",
      location: "Tokyo",
      title: "Corporate Security Division Manager (CISO Office)",
      tags: [
        t("tagTypes.required"),
        t("filters.applyOverseas"),
        t("tagTypes.salaryRange", { min: 11, max: 15 })
      ],
      logoUrl: "https://japan-dev.com/cdn/company_logos/money-forward.png",
      isNew: true
    },
    {
      id: 3,
      company: "Rakuten",
      location: "Tokyo",
      title: "Senior Front-end Engineer",
      tags: [
        t("filters.applyOverseas"),
        t("tagTypes.salaryRange", { min: 6, max: 9 }),
        t("tagTypes.remote")
      ],
      logoUrl: "https://japan-dev.com/cdn/company_logos/rakuten.png",
      isNew: true
    },
    {
      id: 4,
      company: "TableCheck",
      location: "Tokyo",
      title: "Backend Developer - Elixir (Remote)",
      tags: [
        t("filters.applyOverseas"),
        t("tagTypes.fullRemote")
      ],
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
                {t("title")}
              </h2>
            </div>
            <p className='text-[#554640]/90'>
              {t("subtitle", { date: currentDate })}
            </p>
          </div>

          <div className='flex flex-wrap justify-center gap-3 w-full max-w-2xl'>
            {[
              t("filters.noJapanese"),
              t("filters.applyOverseas"), 
              t("filters.remoteOptions")
            ].map((filter, index) => (
              <Button 
                key={index}
                variant='outline' 
                className='h-9 rounded-full border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#f0ebe3]'
              >
                {filter}
              </Button>
            ))}
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
                      <span className="mx-2">{t("locationSeparator")}</span>
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
                            tag.includes(t("tagTypes.required")) || 
                            tag.includes(t("tagTypes.residentsOnly"))
                              ? 'bg-[#3A6B4C]/10 text-[#3A6B4C] border border-[#3A6B4C]/20'
                              : ''
                          }`}
                        >
                          {tag}
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
            {t("cta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopJobSection;