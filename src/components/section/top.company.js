/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Sprout, Leaf, MapPin, Briefcase } from 'lucide-react';
import { useLanguage } from '@/hook/useLanguage ';

const mockCompanyData = [
  {
    name: 'Timee',
    location: 'Tokyo',
    logoUrl: 'https://japan-dev.com/cdn/company_logos/timee.png',
    description: 'Timee is an on-demand job platform that allows people to work freely, without constraints.',
    jobCount: 2,
    url: '#',
    tags: ['Flexible Work', 'Startup']
  },
  {
    name: 'Aviator',
    location: 'San Francisco',
    logoUrl: 'https://japan-dev.com/cdn/company_logos/aviator-2.png',
    description: 'Aviator is an AI-powered platform for developer productivity that helps modern teams ship faster.',
    jobCount: 1,
    url: '#',
    tags: ['AI', 'Developer Tools']
  },
  {
    name: 'REGALI',
    location: 'New York',
    logoUrl: 'https://japan-dev.com/cdn/company_logos/regali.png',
    description: 'REGALI is dedicated to evolving retail through technology with innovative point-of-sale solutions.',
    jobCount: 1,
    url: '#',
    tags: ['Retail Tech', 'E-commerce']
  },
  {
    name: 'Eighty Days',
    location: 'Berlin',
    logoUrl: 'https://japan-dev.com/cdn/company_logos/eightydays.png',
    description: 'Eighty Days is a social impact company focused on sustainable business solutions.',
    jobCount: 1,
    url: '#',
    tags: ['Sustainability', 'Social Impact']
  },
  {
    name: 'OSL Japan',
    location: 'Singapore',
    logoUrl: 'https://japan-dev.com/cdn/company_logos/osl.png',
    description: 'OSL provides secure and innovative crypto asset exchange services for institutional clients.',
    jobCount: 2,
    url: '#',
    tags: ['Blockchain', 'Fintech']
  },
  {
    name: 'FOURDIGIT',
    location: 'London',
    logoUrl: 'https://japan-dev.com/cdn/company_logos/fourdigit.png',
    description: 'Fourdigit creates digital experiences that connect businesses with their customers.',
    jobCount: 3,
    url: '#',
    tags: ['Design', 'Digital Agency']
  },
];

const TopCompanySection = () => {
  const { t } = useLanguage("companies");

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="p-2 rounded-full bg-[#f0f7f2]">
            <Sprout className="h-6 w-6 text-[#3A6B4C]" strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2B463C]">
            {t("title")}
          </h2>
        </div>
        <p className="text-lg text-[#554640]/90 max-w-3xl mx-auto">
          {t("subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockCompanyData.map((company) => (
          <Card
            key={company.name}
            className="group p-6 hover:border-[#3A6B4C] transition-all hover:shadow-lg flex flex-col h-full"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 flex-shrink-0 bg-white rounded-lg border border-[#e4d9c8] p-1.5 flex items-center justify-center">
                  <img
                    src={company.logoUrl}
                    alt={`${company.name} logo`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/56';
                    }}
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-serif font-semibold text-[#2B463C] group-hover:text-[#3A6B4C] transition-colors">
                    {company.name}
                  </h3>
                  <div className="flex items-center text-sm text-[#554640]/80 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {company.location}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {company.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 bg-[#f0f7f2] text-[#3A6B4C] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-[#554640]/90 mb-6 flex-grow text-sm leading-relaxed">
                {company.description}
              </p>

              <div className="mt-auto">
                <Button
                  href={company.url}
                  className="w-full bg-[#3A6B4C] hover:bg-[#2E5540] text-white rounded-lg py-3 flex items-center justify-center"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  {t("viewPositions", {
                    count: company.jobCount,
                    s: company.jobCount !== 1 ? 's' : ''
                  })}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-14">
        {[
          t("filters.noJapanese"),
          t("filters.applyOverseas"),
          t("filters.remoteOptions"),
          t("filters.visaSponsorship"),
          t("filters.englishFriendly")
        ].map((filter, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-10 rounded-full border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#f0f7f2] px-5 transition-colors"
          >
            {filter}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default TopCompanySection;