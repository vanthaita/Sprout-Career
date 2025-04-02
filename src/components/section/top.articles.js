/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Sprout, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/hook/useLanguage ';

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
  const { t } = useLanguage("articles")
  return (
    <section className="py-16 px-4">
      <div className="">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Sprout className="h-9 w-9 text-[#3A6B4C]" strokeWidth={1.5} />
            <h2 className="text-4xl font-serif font-bold text-[#2B463C]">
              {t("title")}
            </h2>
          </div>
          <p className="text-lg text-[#554640]/90 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockArticleData.map((article) => (
            <Link
              key={article.title}
              href={article.url}
              className="group block focus:outline-none focus:ring-2 focus:ring-[#3A6B4C] focus:ring-offset-2 rounded-2xl transition-all"
            >
              <Card className="overflow-hidden h-full flex flex-col border-none bg-transparent shadow-none z-20">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.imageUrl}
                    alt={article.altText}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-semibold text-[#2B463C] mb-3 group-hover:text-[#3A6B4C] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#554640]/90 text-sm leading-relaxed mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center text-[#3A6B4C] font-medium">
                    <span className="mr-2">{t("readMore")}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Sprout className="mx-auto h-12 w-12 text-[#3A6B4C]/30" />
        </div>
      </div>
    </section>
  );
};

export default TopArticlesSection;