/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Card } from '../ui/card'
import { Quote, Sprout, User } from 'lucide-react'

const Testimonial = () => {
  const testimonials = [
    {
      text: "Sprout helped me navigate Japan's tech scene with ease. The job matches were perfectly aligned with my skills!",
      author: "Alex Chen",
      role: "Senior Frontend Engineer",
      company: "SmartNews",
      img: '/images/team/john-pendleton.webp'
    },
    {
      text: "The cultural guidance and visa support made my transition to Tokyo smoother than I ever imagined.",
      author: "Maria Gonzalez",
      role: "DevOps Specialist",
      company: "Mercari",
      img: '/images/team/mark-booth.webp'

    },
    {
      text: "Thanks to Sprout, I found a company that truly values work-life balance and professional growth.",
      author: "Takashi Yamamoto",
      role: "Full Stack Developer",
      company: "LINE",
      img: '/images/team/dario.webp'
    }
  ]

  return (
    <section className="py-16 ">
      <div className="">
        <div className="flex items-center gap-3 mb-12 justify-center">
          <Sprout className="h-8 w-8 text-[#3A6B4C]" />
          <h2 className="text-3xl font-serif font-bold text-[#2B463C]">
            Success Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="p-6 mr-4"
            >
              <div className="flex flex-col h-full">
                <Quote className="w-6 h-6 text-[#3A6B4C] mb-4 rotate-180" />
                
                <p className="text-[#554640]/90 mb-6 flex-grow">
                &quot;{testimonial.text}&quot;
                </p>

                <div className="flex items-center gap-4 pt-4 relative">
                  <Card className='w-20 h-20 justify-center items-center  shadow-none absolute -bottom-8 -right-12 rotate-[20deg]'>
                    <img 
                        className="w-20 h-20 object-cover rounded-xl"
                        src={testimonial.img}
                        alt="Author"
                    />
                  </Card>
                  <div>
                    <h4 className="font-semibold text-[#2B463C]">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-[#554640]/80">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial