import React from 'react';
import Image from 'next/image';
import { Twitter, Linkedin, Sprout } from 'lucide-react';

const MeetTheTeamSection = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6">
            <Sprout className="h-9 w-9 text-[#3A6B4C]" strokeWidth={1.5} />
            <h2 className="text-4xl font-serif font-bold text-[#2B463C]">
              Cultivating the Sprout Team
            </h2>
          </div>
          <p className="text-lg text-[#554640]/90 max-w-2xl mx-auto">
            A passionate team growing opportunities in Japan&apos;s tech ecosystem
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className=" p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group flex-shrink-0">
                <Image
                  src="/images/team/Manami.png"
                  alt="Manami"
                  width={240}
                  height={240}
                  className="rounded-full object-cover aspect-square border-4 border-[#f0ebe3] group-hover:border-[#3A6B4C] transition-colors"
                />
                <div className="absolute inset-0 rounded-full border-2 border-white/30" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-serif font-bold text-[#2B463C] mb-2">
                  Manami Tanaka
                </h3>
                <p className="text-sm text-[#554640]/80 mb-4 font-medium">
                  Co-Founder & Tech Lead
                </p>
                <p className="text-[#554640]/90 mb-6 leading-relaxed">
                  Bridging Silicon Valley expertise with Japan&apos;s tech landscape since 2013.
                  Committed to creating authentic connections between global talent and
                  Japan&apos;s most innovative companies.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3A6B4C] hover:text-[#2E5540] transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3A6B4C] hover:text-[#2E5540] transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative group flex-shrink-0">
                <Image
                  src="/images/team/morgan.webp"
                  alt="Morgan"
                  width={240}
                  height={240}
                  className="rounded-full object-cover aspect-square border-4 border-[#f0ebe3] group-hover:border-[#3A6B4C] transition-colors"
                />
                <div className="absolute inset-0 rounded-full border-2 border-white/30" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-serif font-bold text-[#2B463C] mb-2">
                  Morgan Sato
                </h3>
                <p className="text-sm text-[#554640]/80 mb-4 font-medium">
                  Head of Design & UX
                </p>
                <p className="text-[#554640]/90 mb-6 leading-relaxed">
                  Tokyo-born designer passionate about creating human-centered experiences.
                  Blending Japanese aesthetics with global tech standards to build
                  meaningful career pathways.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3A6B4C] hover:text-[#2E5540] transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#3A6B4C] hover:text-[#2E5540] transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-[#554640]/90 max-w-3xl mx-auto">
          <p className="text-lg mb-8">
            Together with our team of 12 passionate growers, we&apos;ve helped 
            <strong className="font-medium text-[#3A6B4C]"> 2,400+ professionals </strong> 
            blossom in Japan&apos;s tech ecosystem.
          </p>
          <div className="inline-flex items-center gap-4 text-sm">
            <span className="flex items-center gap-2">
              <Sprout className="w-4 h-4" />
              100% Remote Team
            </span>
            <span className="text-[#e4d9c8]">•</span>
            <span>🌏 6 Nationalities</span>
            <span className="text-[#e4d9c8]">•</span>
            <span>🗼 Based in Tokyo</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeamSection;