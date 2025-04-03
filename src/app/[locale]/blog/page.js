 /* eslint-disable @next/next/no-img-element */
 import Pagination from '@/components/job/pagination.job' 
 import { Button } from '@/components/ui/button'
 import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card' 
 import { ArrowRight } from 'lucide-react'
 import Link from 'next/link'
 import React from 'react'
 
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

  const filterTags = [
    { label: 'All Posts', value: 'all' }, 
    { label: 'For HR (人事向け)', value: 'hr' },
    { label: 'Popular', value: 'popular' },
    { label: 'Interviews & Resumes', value: 'interviews-resumes' },
    { label: 'Find a Job', value: 'find-job' },
    { label: 'Relocation', value: 'relocation' },
    { label: 'Meetups & Communities', value: 'meetups' },
    { label: 'Learning Japanese', value: 'learning-japanese' },
    { label: 'Tech Trends', value: 'tech-trends' },
    { label: 'Career Development', value: 'career-dev' },
    { label: 'Taxes', value: 'taxes' },
    { label: 'Japan Life', value: 'japan-life' },
    { label: 'Career Coach', value: 'career-coach' },
  ];
 
 
const BlogPage = () => {
   const activeFilter = 'all'; 
 
  return (
    <div className="min-h-screen">

      <div className="max-w-6xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
              <ol className="list-none p-0 inline-flex">
                  <li className="flex items-center">
                      <Link href="/" className="hover:text-[#3A6B4C] transition-colors">Home</Link>
                  </li>
                  <li className="flex items-center mx-2">
                      <span>{'>'}</span>
                  </li>
                  <li className="flex items-center">
                      <span className="text-gray-700 font-medium">Blog</span> 
                  </li>
              </ol>
          </nav>
      </div>

      <div className="pt-12 pb-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className='text-4xl md:text-5xl font-bold leading-tight text-[#2B463C] mb-4'>
            Cultivate Your Tech Career in Japan
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10">
            Nurturing your growth in Japan&apos;s tech industry through insights from{' '}
            <span className='font-semibold text-[#3A6B4C]'>Sprout</span>
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filterTags.map((tag) => (
              <Button
                key={tag.value}
                variant={tag.value === activeFilter ? 'default' : 'outline'} 
                size="sm"
                className={`rounded-full h-auto py-1.5 px-4 font-medium transition-colors duration-150 ease-in-out
                  ${tag.value === activeFilter
                    ? 'bg-[#3A6B4C] text-white hover:bg-[#3A6B4C]/90 border-[#3A6B4C]' 
                    : 'hover:text-gray-800' 
                  }
                `}
                // onClick={() => setActiveFilter(tag.value)} 
              >
                {tag.label}
              </Button>
            ))}
          </div>

          <div className=" text-[#2B463C] p-4 rounded-lg text-center max-w-3xl mx-auto border">
            <p className='text-sm sm:text-base'>
                Ready to help others grow? Share your expertise with our community{' '}
                <Link href="#" className="font-semibold text-[#3A6B4C] underline hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A6B4C] rounded">
                  Learn how to contribute
                </Link>
                <span role="img" aria-label="sprout" className='ml-1 relative top-0.5'>🌱</span>
              </p>
            </div>

        </div>
      </div>

      <div className="px-4 pb-16 sm:px-6 lg:px-8"> 
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-[#2B463C] mb-2">
                Latest Blog Posts
            </h2>
            <p className="text-gray-600 mb-8">
                Our newest blog posts about growing your tech career in Japan.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> 
                {mockArticleData.map((article) => (
                  <Link
                    key={article.id}
                    href={article.url}
                    className="group block focus:outline-none focus:ring-2 focus:ring-[#3A6B4C] focus:ring-offset-4 rounded-lg"
                    passHref 
                    legacyBehavior={false} 
                  >
                    <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 rounded-lg border-none shadow-none bg-transparent">
                        <div className="relative h-48 sm:h-56 w-full overflow-hidden"> 
                            <img
                            src={article.imageUrl}
                            alt={article.altText}
                            className="w-full h-full object-cover"
                            />
                        </div>

                        <CardContent className="p-5 flex-grow">
                            <h3 className="text-lg font-semibold text-[#2B463C] mb-2 group-hover:text-[#3A6B4C] transition-colors line-clamp-2"> 
                                {article.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                {article.description}
                            </p>
                        </CardContent>

                        <CardFooter className="p-5 pt-0">
                            <div className="flex items-center text-[#3A6B4C] font-medium text-sm">
                                <span className="mr-1">Read More</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </div>
                        </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>

            <div className="mt-16 pt-8 border-t border-[#3A6B4C]">
              <Pagination /> 
            </div>
        </div>
      </div>
    </div>
   )
 }
 
 export default BlogPage;