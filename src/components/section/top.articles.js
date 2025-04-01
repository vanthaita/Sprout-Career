/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {
  Card,
  CardContent,
} from '@/components/ui/card'; 
import Link from 'next/link';
const mockArticleData = [
  {
    title: 'Moving to Japan as a Software Developer: An Opinionated FAQ',
    description:
      'Want to move to Japan and get a job as software developer? Have questions? I have answers. This i...',
    imageUrl: '/images/blog/fes.jpg',
    altText: 'Tokyo skyline with cherry blossoms',
    url: '#', 
  },
  {
    title: 'Software Developer Salaries in Japan: The Ultimate Guide [Updated 2024]',
    description:
      'Updated for 2024! Featuring hard data from 100+ tech companies in Japan, this guide will teach you ...',
    imageUrl: '/images/blog/bike.jpg', 
    altText: 'Maneki-neko lucky cat statue',
    url: '#', 
  },
  {
    title: 'How to find a job as a software developer in Japan',
    description:
      'Finding a software developer job in Japan is tough. Here’s some advice to help English speakers avo...',
    imageUrl: '/images/blog/ele.jpg', 
    altText: 'Three developers collaborating around a laptop',
    url: '#', 
  },
  {
    title: 'How to get a visa as an engineer in Japan',
    description:
      'Want to work in Japan but unsure what visa to get? Or even if you’re eligible for one? This ...',
    imageUrl: '/images/blog/ghibli_04.webp', 
    altText: 'Close-up of a Japan visa document',
    url: '#', 
  },
  {
    title: 'How to write a perfect developer resume in Japan [2025 guide + template]',
    description: 'We wrote the most comprehensive guide on how to write...', 
    imageUrl: '/images/blog/ghibli_12.webp', 
    altText: 'Laptop showing a resume next to a Japanese emblem',
    url: '#', 
  },
  {
    title: 'Best Tech Meetups in Tokyo',
    description:
      'We went through and checked the status of Tokyo’s top meetups to see where the opportunities are,...',
    imageUrl: '/images/blog/ghibli_14.webp', 
    altText: 'Overhead view of a crowded tech meetup',
    url: '#', 
  },
];

const TopArticlesSection = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Top Articles for Software Developers in Japan
        </h2>
        <p className="text-lg text-gray-600 mb-8 md:mb-12">
          Check out our blog for insights on{' '}
          <span className="font-semibold">living in Japan as a foreign software engineer</span> or tech professional
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {mockArticleData.map((article) => (
            <Link
              key={article.title}
              href={article.url}
              className="block group" 
            >
              <Card className="overflow-hidden h-full flex flex-col border-none bg-transparent shadow-none">
                <div className="w-full h-56 overflow-hidden"> 
                  <img
                    src={article.imageUrl}
                    alt={article.altText}
                    className="w-full h-full object-cover rounded-2xl" 
                  />
                </div>
                <CardContent className="p-4 flex-grow"> 
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3"> 
                    {article.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopArticlesSection;