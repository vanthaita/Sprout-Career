import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowRight, Mail, Leaf } from 'lucide-react'
import { useLanguage } from '@/hook/useLanguage '


const HeroSection = () => {
  const { t } = useLanguage("hero");

  return (
    <section className="relative py-16 md:py-24 px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-2xl font-serif font-bold text-[#2B463C]">
            {t("goJapan")}
          </span>
        </div>

        <div className="flex flex-col items-center gap-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-[#2B463C] max-w-3xl leading-tight">
            {t("cultivateCareer")}
          </h1>
          
          <div className="space-y-4 max-w-2xl mx-auto">
            <p className="text-xl md:text-2xl text-[#554640]/90">
              {t("handCurated")}
            </p>
            <div className="flex items-center justify-center gap-4 text-sm md:text-base text-[#554640]/80">
              <span className="flex items-center gap-1">
                <Leaf className="h-4 w-4 text-[#3A6B4C]" /> 
                {t("vettedPositions")}
              </span>
              <span>•</span>
              <span>{t("remoteFriendly")}</span>
              <span>•</span>
              <span>{t("visaSponsorship")}</span>
            </div>
          </div>

          <div className="w-full max-w-md lg:max-w-xl mt-6">
            <form className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#554640]" />
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="pl-12 pr-4 h-14 text-base border-[#D4C4A8] focus:ring-2 focus:ring-[#3A6B4C]"
                />
              </div>
              <Button 
                size="lg"
                className="h-14 px-8 bg-[#3A6B4C] hover:bg-[#2E5540] text-white text-base"
              >
                {t("getJobAlerts")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
            
            <p className="mt-4 text-sm text-[#554640]/80">
              {t("joinProfessionals")}
              <a href="#" className="font-medium text-[#3A6B4C] hover:underline">
                {t("getSalaryGuide")}
              </a>
            </p>
          </div>
        </div>

        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="h-full w-full pattern-dots pattern-[#3A6B4C] pattern-opacity-20 pattern-size-4" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection