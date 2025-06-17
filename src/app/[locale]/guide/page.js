/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Sprout, BookOpen, Download, Mail, ArrowRight, ArrowLeft, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/breadcrumb'
import BackToHome from '@/components/ui/BackToHome'

const GuidePage = () => {
  const featuredGuides = [
    {
      title: "Ultimate Relocation Handbook",
      description: "Step-by-step guide to moving to Japan as a developer",
      icon: <Sprout className="w-6 h-6" />,
      downloadUrl: "#"
    },
    {
      title: "Salary Negotiation Playbook",
      description: "How to get the best compensation package in Japan",
      icon: <BookOpen className="w-6 h-6" />,
      downloadUrl: "#"
    }
  ]

  const popularArticles = [
    {
      title: "Understanding Japanese Work Culture",
      category: "Cultural Guide",
      image: "https://otakuusamagazine.com/wp-content/uploads/2020/06/computer.jpg",
      url: "#"
    },
    {
      title: "Tech Visa Options Explained",
      category: "Immigration",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAYT4ELMT3VmoKfnPE9AypknXz_aZfvAJ3bA&s",
      url: "#"
    }
  ]

  const faqs = [
    {
      question: "How long does the visa process take?",
      answer: "Typically 2-3 months for Engineer/Specialist visa..."
    },
    {
      question: "Do I need Japanese language skills?",
      answer: "Depends on company - we curate English-friendly positions..."
    }
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pt-6 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Career Guide' }
          ]}
        />
      </div>

      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sprout className="h-12 w-12 text-[#3A6B4C]" />
            <h1 className="text-4xl font-serif font-bold text-[#2B463C]">
              Sprout Career Navigator
            </h1>
          </div>
          <p className="text-xl text-[#554640]/90 mb-8 max-w-2xl mx-auto">
            Your comprehensive guide to building a successful tech career in Japan
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Button className="bg-[#3A6B4C] hover:bg-[#2E5540] gap-2">
              <Download className="w-4 h-4" />
              Get Starter Kit
            </Button>
            <Button variant="outline" className="border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#3A6B4C]/10">
              Watch Orientation Video
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-[#554640]/90">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#3A6B4C]">420+</span>
              Developers Supported
            </div>
            <div className="h-6 w-px bg-[#e4d9c8]" />
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#3A6B4C]">98%</span>
              Success Rate
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-[#2B463C] mb-12 text-center">
            Essential Starter Guides
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredGuides.map((guide, index) => (
              <div key={index} className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#3A6B4C]/10 rounded-lg text-[#3A6B4C]">
                    {guide.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#2B463C]">{guide.title}</h3>
                    <p className="text-[#554640]/90">{guide.description}</p>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#3A6B4C]/10">
                  <Link href={guide.downloadUrl}>
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF Guide
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-[#2B463C] mb-12 text-center">
            Most Read Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {popularArticles.map((article, index) => (
              <Link key={index} href={article.url} className="group block">
                <div className="relative overflow-hidden rounded-xl aspect-video mb-4">
                  <img
                    src={article.image}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </div>
                <span className="text-sm text-[#3A6B4C] font-medium">{article.category}</span>
                <h3 className="text-xl font-semibold text-[#2B463C] group-hover:text-[#3A6B4C] transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center text-[#3A6B4C] font-medium">
                  <span className="mr-2">Read More</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-[#2B463C] mb-8 text-center">
            Career Growth FAQs
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 hover:bg-[#f7f5f2] transition-colors"
              >
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#3A6B4C] flex-shrink-0" />
                      <span className="text-lg font-medium text-[#2B463C]">
                        {faq.question}
                      </span>
                    </div>
                  </summary>
                  <p className="mt-3 ml-8 text-[#554640]/90 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-12 flex justify-center pb-16">
        <BackToHome />
      </div>
    </div>
  )
}

export default GuidePage
