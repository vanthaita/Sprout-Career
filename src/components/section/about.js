import React from 'react';
import { Leaf, BadgeCheck, Shield, Rocket, Sprout } from 'lucide-react';
import { useLanguage } from '@/hook/useLanguage ';

const AboutSection = () => {
  const { t } = useLanguage('about');

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-6">
            <Sprout className="h-9 w-9 text-[#3A6B4C]" strokeWidth={1.5} />
            <h2 className="text-4xl font-serif font-bold text-[#2B463C]">
              {t('title')}
            </h2>
          </div>
          <p className="text-xl text-[#554640]/90 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-[#554640]/90 text-lg leading-relaxed">
            <p className="text-xl">
              {t.rich('paragraphs.p1', {
                strong: (chunks) => (
                  <strong className="font-semibold text-[#3A6B4C]">
                    {chunks}
                  </strong>
                )
              })}
            </p>

            <div className="flex items-start gap-3">
              <BadgeCheck className="flex-shrink-0 mt-1 h-5 w-5 text-[#3A6B4C]" />
              <p>
                {t.rich('paragraphs.p2', {
                  strong: (chunks) => (
                    <strong className="font-semibold">{chunks}</strong>
                  )
                })}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Shield className="flex-shrink-0 mt-1 h-5 w-5 text-[#3A6B4C]" />
              <p>
                {t.rich('paragraphs.p3', {
                  strong: (chunks) => (
                    <strong className="font-semibold">{chunks}</strong>
                  )
                })}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Rocket className="flex-shrink-0 mt-1 h-5 w-5 text-[#3A6B4C]" />
              <p>
                {t.rich('paragraphs.p4', {
                  strong: (chunks) => (
                    <strong className="font-semibold">{chunks}</strong>
                  )
                })}
              </p>
            </div>
          </div>

          <div className="p-8 rounded-2xl">
            <div className="grid grid-cols-2 gap-6">
              <StatBlock
                icon={<Leaf className="h-6 w-6" />}
                value="500+"
                label={t('stats.vettedCompanies')}
              />
              <StatBlock
                icon={<BadgeCheck className="h-6 w-6" />}
                value="98%"
                label={t('stats.successRate')}
              />
              <StatBlock
                icon={<Shield className="h-6 w-6" />}
                value="4.8/5"
                label={t('stats.candidateRating')}
              />
              <StatBlock
                icon={<Rocket className="h-6 w-6" />}
                value="10k+"
                label={t('stats.careerGrowth')}
              />
            </div>

            <div className="mt-8 space-y-4">
              <a
                href="#"
                className="inline-flex items-center justify-between w-full px-6 py-3 text-white bg-[#3A6B4C] rounded-lg hover:bg-[#2E5540] transition-colors"
              >
                <span>{t('buttons.exploreJobs')}</span>
                <Rocket className="ml-2 h-4 w-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-between w-full px-6 py-3 text-[#3A6B4C] border border-[#3A6B4C] rounded-lg hover:bg-[#f0ebe3] transition-colors"
              >
                <span>{t('buttons.companyInsights')}</span>
                <Leaf className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-[#554640]/90 mb-6">
            {t('cta')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="px-8 py-3 bg-[#3A6B4C] text-white rounded-lg hover:bg-[#2E5540] transition-colors flex items-center justify-center gap-2"
            >
              <span>{t('buttons.salaryGuide')}</span>
              <BadgeCheck className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="px-8 py-3 border border-[#3A6B4C] text-[#3A6B4C] rounded-lg hover:bg-[#f0ebe3] transition-colors flex items-center justify-center gap-2"
            >
              <span>{t('buttons.culturalHandbook')}</span>
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
    <div className="p-2">{icon}</div>
    <div>
      <div className="text-2xl font-bold text-[#2B463C]">{value}</div>
      <div className="text-sm text-[#554640]/80">{label}</div>
    </div>
  </div>
);

export default AboutSection;