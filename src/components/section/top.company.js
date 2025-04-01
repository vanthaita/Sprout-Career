/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

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
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Top Companies for Software Developers in Japan
        </h2>
        <p className="text-lg text-gray-600 mb-8 md:mb-12">
          Explore hand-picked <span className="font-semibold">modern tech companies in Japan</span> looking for English-speaking software engineers
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {mockCompanyData.map((company) => (
            <Card
              key={company.name}
              className=" shadow-md p-6 flex flex-col justify-between transition-shadow hover:shadow-lg"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                    <p className="text-sm text-gray-500">{company.location}</p>
                  </div>
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border rounded-md overflow-hidden ml-4">
                    <img
                      src={company.logoUrl}
                      alt={`${company.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  {company.description}
                </p>
              </div>

              <div className="mt-auto pt-4"> 
                <Button
                  href={company.url}
                  className="block w-full text-center py-2 px-4 border font-medium rounded-full  transition-colors duration-200"
                >
                  View {company.jobCount} job{company.jobCount !== 1 ? 's' : ''}
                </Button>
              </div>
            </Card>
          ))}
        </div>
         <div className='flex flex-wrap justify-center gap-2 w-full mt-8'>
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

export default TopCompanySection;