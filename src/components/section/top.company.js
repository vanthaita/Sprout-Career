/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Sprout, Leaf } from 'lucide-react';

const mockCompanyData = [
  {
    name: 'Timee',
    location: 'Tokyo',
    logoUrl: 'https://japan-dev.com/cdn/company_logos/timee.png',
    description:
      'Timee is an on-demand job platform that allows people to work freely, witho...',
    jobCount: 2,
    url: '#', 
  },
  {
    name: 'Aviator',
    location: 'Tokyo',
    logoUrl: 'https://japan-dev.com/cdn/company_logos/aviator-2.png', 
    description:
      'Aviator is an AI-powered platform for developer productivity that helps mod...',
    jobCount: 1,
    url: '#',
  },
  {
    name: 'REGALI',
    location: 'Tokyo',
    logoUrl: 'https://japan-dev.com/cdn/company_logos/regali.png',
    description:
      'REGALI is dedicated to evolving retail through technology. Their main produ...',
    jobCount: 1,
    url: '#',
  },
  {
    name: 'Eighty Days',
    location: 'Tokyo',
    logoUrl: 'https://japan-dev.com/cdn/company_logos/eightydays.png', 
    description:
      'Eighty Days is an accredited Yunus Social Business Company, and Tokyo-based...',
    jobCount: 1,
    url: '#',
  },
  {
    name: 'OSL Japan',
    location: 'Tokyo',
    logoUrl: 'https://japan-dev.com/cdn/company_logos/osl.png', 
    description:
      'OSL Japan is a venture company focused on the crypto asset exchange busines...',
    jobCount: 2,
    url: '#',
  },
  {
    name: 'FOURDIGIT',
    location: 'Tokyo',
    logoUrl: 'https://japan-dev.com/cdn/company_logos/fourdigit.png',
    description:
      'Fourdigit provides a "design" that connects businesses and users.',
    jobCount: 3,
    url: '#',
  },
];


const TopCompanySection = () => {
  return (
    <section className="py-16 px-4">
      <div className="">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sprout className="h-9 w-9 text-[#3A6B4C]" strokeWidth={1.5} />
            <h2 className="text-4xl font-serif font-bold text-[#2B463C]">
              Cultivate with Leading Tech Companies
            </h2>
          </div>
          <p className="text-lg text-[#554640]/90 max-w-2xl mx-auto">
            Discover Japan&apos;s most developer-friendly workplaces curated by Sprout
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCompanyData.map((company) => (
            <Card
              key={company.name}
              className="group p-6  hover:border-[#3A6B4C] transition-all hover:shadow-lg"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 flex-shrink-0 bg-white rounded-lg border-2 border-[#e4d9c8] p-1.5">
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-serif font-semibold text-[#2B463C] group-hover:text-[#3A6B4C] transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-sm text-[#554640]/80">{company.location}</p>
                  </div>
                </div>

                <p className="text-[#554640]/90 mb-6 flex-grow text-sm leading-relaxed">
                  {company.description}
                </p>

                <Button
                  href={company.url}
                  className="mt-auto w-full bg-[#3A6B4C] hover:bg-[#2E5540] text-white rounded-lg py-3"
                >
                  <Leaf className="mr-2 h-4 w-4" />
                  View {company.jobCount} Position{company.jobCount !== 1 ? 's' : ''}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {[
            { icon: '🇯🇵', label: 'No Japanese Required' },
            { icon: '✈️', label: 'Apply from Overseas' },
            { icon: '🏠', label: 'Remote Options' }
          ].map((filter, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-10 rounded-full border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#f0ebe3] px-5"
            >
              <span className="mr-2">{filter.icon}</span>
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanySection;