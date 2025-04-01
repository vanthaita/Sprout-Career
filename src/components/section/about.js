import React from 'react';
import { Leaf, BadgeCheck, Shield, Rocket, Sprout } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-6">
            <Sprout className="h-9 w-9 text-[#3A6B4C]" strokeWidth={1.5} />
            <h2 className="text-4xl font-serif font-bold text-[#2B463C]">
              What is Sprout?
            </h2>
          </div>
          <p className="text-xl text-[#554640]/90 max-w-2xl mx-auto">
            Cultivating your tech career in Japan through quality opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-[#554640]/90 text-lg leading-relaxed">
            <p className="text-xl">
              Sprout is a <strong className="font-semibold text-[#3A6B4C]">curated platform</strong> connecting 
              global tech talent with <strong className="font-semibold text-[#3A6B4C]">Japan&apos;s best opportunities</strong>.
            </p>

            <div className="flex items-start gap-3">
              <BadgeCheck className="flex-shrink-0 mt-1 h-5 w-5 text-[#3A6B4C]" />
              <p>
                We feature <strong className="font-semibold">vetted positions</strong> from 
                innovative companies that value international talent and offer 
                <strong className="font-semibold"> healthy work environments</strong>.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="flex-shrink-0 mt-1 h-5 w-5 text-[#3A6B4C]" />
              <p>
                Our rigorous screening rejects <strong className="font-semibold">90% of applicants</strong> to 
                ensure only companies with <strong className="font-semibold">progressive cultures</strong> and 
                <strong className="font-semibold"> global standards</strong> are listed.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Rocket className="flex-shrink-0 mt-1 h-5 w-5 text-[#3A6B4C]" />
              <p>
                Whether you&apos;re seeking <strong className="font-semibold">startup agility</strong> or 
                <strong className="font-semibold"> corporate stability</strong>, we help you find 
                environments where you can truly <strong className="font-semibold">grow and thrive</strong>.
              </p>
            </div>
          </div>

          <div className=" p-8 rounded-2xl  ">
            <div className="grid grid-cols-2 gap-6">
              <StatBlock 
                icon={<Leaf className="h-6 w-6" />}
                value="500+"
                label="Vetted Companies"
              />
              <StatBlock 
                icon={<BadgeCheck className="h-6 w-6" />}
                value="98%"
                label="Success Rate"
              />
              <StatBlock 
                icon={<Shield className="h-6 w-6" />}
                value="4.8/5"
                label="Candidate Rating"
              />
              <StatBlock 
                icon={<Rocket className="h-6 w-6" />}
                value="10k+"
                label="Career Growth Stories"
              />
            </div>

            <div className="mt-8 space-y-4">
              <a
                href="#"
                className="inline-flex items-center justify-between w-full px-6 py-3 text-white bg-[#3A6B4C] rounded-lg hover:bg-[#2E5540] transition-colors"
              >
                <span>Explore Job Listings</span>
                <Rocket className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-between w-full px-6 py-3 text-[#3A6B4C] border border-[#3A6B4C] rounded-lg hover:bg-[#f0ebe3] transition-colors"
              >
                <span>Company Insights</span>
                <Leaf className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-[#554640]/90 mb-6">
            Want to deepen your understanding of Japan&apos;s tech landscape?
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="px-8 py-3 bg-[#3A6B4C] text-white rounded-lg hover:bg-[#2E5540] transition-colors flex items-center justify-center gap-2"
            >
              <span>Salary Guide</span>
              <BadgeCheck className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="px-8 py-3 border border-[#3A6B4C] text-[#3A6B4C] rounded-lg hover:bg-[#f0ebe3] transition-colors flex items-center justify-center gap-2"
            >
              <span>Cultural Handbook</span>
              <Shield className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatBlock = ({ icon, value, label }) => (
  <div className="flex items-center gap-4 p-4">
    <div className="p-2 ">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold text-[#2B463C]">{value}</div>
      <div className="text-sm text-[#554640]/80">{label}</div>
    </div>
  </div>
);

export default AboutSection;