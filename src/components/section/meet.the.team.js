import React from 'react';
import Image from 'next/image'; 

const MeetTheTeamSection = () => {
  return (
    <section className="py-16 px-4"> 
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 text-center">
          Meet the Japan Dev Team
        </h2>
        <p className="text-lg text-slate-600 mb-12 text-center">
          Japan Dev is built by <span className="font-semibold">Eric</span> and{' '}
          <span className="font-semibold">Manami</span> — a husband and wife
          team in Tokyo 💙
        </p>

        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2 text-slate-700">
              <h3 className="text-2xl font-semibold text-slate-800 mb-1">
                I&lsquo;m Manami
              </h3>
              <p className="text-sm text-slate-500 mb-4">Founder + Engineer</p>
              <p className="leading-relaxed">
                I moved from the US to Japan in 2013 to work as a software
                engineer. With Japan Dev, I want to{' '}
                <span className="font-semibold">
                  help foreign software developers find positive work
                  experiences in Japan
                </span>
                . Have questions? Hit me up on{' '}
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  twitter!
                </a>
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Image
                src="/images/team/Manami.png" 
                alt="Eric"
                width={200} 
                height={200} 
                className="rounded-full object-cover aspect-square"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="flex justify-center md:justify-start md:order-first order-last mt-8 md:mt-0">
              <Image
                src="/images/team/morgan.webp" 
                alt="morgan"
                width={200} 
                height={200}
                className="rounded-full object-cover aspect-square"
              />
            </div>
            <div className="md:col-span-2 text-slate-700 md:order-last order-first">
              <h3 className="text-2xl font-semibold text-slate-800 mb-1">
                I&#39;m Morgan
              </h3>
              <p className="text-sm text-slate-500 mb-4">Designer</p>
              <p className="leading-relaxed">
                I&#39;m a designer from Tokyo. I want to spread the word about tech
                in Japan and help people realize that there are great options
                out there for working in tech in Japan! Follow me on{' '}
                <a
                  href="https://twitter.com/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  twitter!
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeamSection;