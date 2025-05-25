'use client'
import AboutSection from "@/components/section/about";
import HeroSection from "@/components/section/hero";
import MeetTheTeamSection from "@/components/section/meet.the.team";
import PostJobSection from "@/components/section/post.job";
import TopArticlesSection from "@/components/section/top.articles";
import TopCompanySection from "@/components/section/top.company";
import TopJobSection from "@/components/section/top.job";

export default function Home() {
  return (
    <>
        <HeroSection />
        <TopJobSection />
        <TopCompanySection />
        <TopArticlesSection />
        <MeetTheTeamSection />
        <AboutSection />
        <PostJobSection />
    </>
  );
}