import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BasicInfoSection } from './BasicInfoSection';
import { EducationSection } from './EducationSection';
import { QualificationsSection } from './QualificationsSection';
import { AwardsSection } from './AwardsSection'; 
import { AppealPointSection } from './AppealPointSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { InternshipSection } from './InternshipSection';
import { SelfIntroductionSection } from './SelfIntroductionSection';
import { MediaSection } from './MediaSection'; 
import { PersonalitySection } from './PersonalitySection';
import { ResumeContent } from './ResumeContent';
import { AdminChatContent } from './AdminChatContent';
export const sectionIds = {
    basicInfo: 'basic-info',
    education: 'education',
    qualifications: 'qualifications',
    awards: 'awards',
    appealPoint: 'appeal-point',
    skills: 'skills',
    projects: 'achievements', 
    internship: 'internship',
    selfIntro: 'self-introduction',
    media: 'media',
    personality: 'personality',
};
export const ProfileContentTabs = ({ profileData, sectionRefs  }) => {
    return (
        <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-4 border-b  justify-start bg-transparent p-0 rounded-none w-full">
                 <TabsTrigger
                    value="profile"
                     className="data-[state=active]:border-b-2 data-[state=active]:border-[#3A6B4C] data-[state=active]:text-[#3A6B4C] data-[state=active]:shadow-none rounded-none pb-2 px-4 bg-transparent text-gray-500 font-medium data-[state=active]:bg-transparent"
                 >
                    プロフィール
                 </TabsTrigger>
                 <TabsTrigger
                     value="admin-chat"
                     className="data-[state=active]:border-b-2 data-[state=active]:border-[#3A6B4C] data-[state=active]:text-[#3A6B4C] data-[state=active]:shadow-none rounded-none pb-2 px-4 bg-transparent text-gray-500 font-medium data-[state=active]:bg-transparent"
                 >
                    管理者とやり取り
                 </TabsTrigger>
                 <TabsTrigger
                     value="resume"
                     className="data-[state=active]:border-b-2 data-[state=active]:border-[#3A6B4C] data-[state=active]:text-[#3A6B4C] data-[state=active]:shadow-none rounded-none pb-2 px-4 bg-transparent text-gray-500 font-medium data-[state=active]:bg-transparent"
                 >
                     履歴書
                 </TabsTrigger>
            </TabsList>

             <TabsContent value="profile" className="mt-6 space-y-8">
                <div id={sectionIds.basicInfo} ref={el => sectionRefs.current[sectionIds.basicInfo] = el}>
                    <BasicInfoSection info={profileData.basicInfo} />
                </div>
                <div id={sectionIds.education} ref={el => sectionRefs.current[sectionIds.education] = el}>
                    <EducationSection education={profileData.education} />
                </div>
                <div id={sectionIds.qualifications} ref={el => sectionRefs.current[sectionIds.qualifications] = el}>
                    <QualificationsSection qualifications={profileData.qualifications} />
                </div>
                <div id={sectionIds.awards} ref={el => sectionRefs.current[sectionIds.awards] = el}>
                    <AwardsSection awards={profileData.awards} />
                </div>
                <div id={sectionIds.appealPoint} ref={el => sectionRefs.current[sectionIds.appealPoint] = el}>
                    <AppealPointSection appeal={profileData.appealPoint} />
                </div>
                <div id={sectionIds.skills} ref={el => sectionRefs.current[sectionIds.skills] = el}>
                    <SkillsSection skills={profileData.skills} />
                </div>
                <div id={sectionIds.projects} ref={el => sectionRefs.current[sectionIds.projects] = el}>
                    <ProjectsSection projects={profileData.projects} />
                </div>
                <div id={sectionIds.internship} ref={el => sectionRefs.current[sectionIds.internship] = el}>
                    <InternshipSection internship={profileData.internship} />
                </div>
                <div id={sectionIds.selfIntro} ref={el => sectionRefs.current[sectionIds.selfIntro] = el}>
                    <SelfIntroductionSection introData={profileData.selfIntro} />
                </div>
                <div id={sectionIds.media} ref={el => sectionRefs.current[sectionIds.media] = el}>
                    <MediaSection media={profileData.media} />
                </div>
                <div id={sectionIds.personality} ref={el => sectionRefs.current[sectionIds.personality] = el}>
                <   PersonalitySection personality={profileData.personality} />
                </div>
            </TabsContent>

            <TabsContent value="admin-chat" className="mt-4"> 
                <AdminChatContent /> 
            </TabsContent>

            <TabsContent value="resume" className="mt-0"> 
                <ResumeContent profileData={profileData} />
            </TabsContent>
        </Tabs>
    );
};