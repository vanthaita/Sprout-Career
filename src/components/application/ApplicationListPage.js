"use client";

import React, { useState, useMemo } from 'react';
import { ApplicationCard } from './ApplicationCard';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const sampleApplications = [
    {
        id: 'hitachi',
        companyName: 'Hitachi Social Information Services, Ltd.', 
        companyLogoUrl: null, 
        jobTitle: 'System Engineer (SE)',
        jobUrl: '#',
        stages: ['Applied', 'Document Screening', 'First Interview', 'Second Interview', 'Job Offer', 'Offer Accepted'],
        currentStageIndex: 5,
        documents: [
            { name: 'Company Overview_Business Content_2026 Hiring...', url: '#' },
            { name: 'Benefits_2026 Hiring.pptx', url: '#' },
        ],
        video: { title: 'Hitachi Social Information Services Company Information Session', thumbnailUrl: '/placeholder-video-thumbnail.jpg' },
        status: 'Selection Completed',
        statusMessage: 'The selection process has ended as the candidate declined the offer.',
        isBookmarked: true,
        currentProcessNotes: '',
        userActionNotes: '',
        legalName: "Hitachi Social Information Services, Ltd.", 
        headquarters: "17F, Omori Bellport D Building, 6-26-3 Minami-Oi, Shinagawa-ku, Tokyo",
        phoneNumber: "03-5471-2345",
        established: "1986/04/01",
        representative: {
            position: "President and Representative Director",
            name: "Takayoshi Kitagawa"
        },
        vietnamEntity: "None",
        businessDescription: `■Contributing to social innovation across three business domains
  Our business consists of "System Integration Business", "System Operation Services Business", and "Package/Solution Business".
  We operate these three businesses across diverse fields including public sector, communications, finance, industry, distribution, and healthcare.

  Our strength lies in the technology and experience accumulated through business system development, along with high adaptability cultivated through serving various industries.
  Leveraging these strengths, we continue to grow with the rapidly changing IT market, providing flexible solutions and services for the mobile/cloud era.

  In addition to our core system integration business, we are expanding into new areas like cloud, analytics solutions, and IoT.
  There are opportunities for young engineers to take leadership roles.

■New value emerges from our open culture that values connections
  What we value most in creating new value to meet customer needs is human connections.
  Our tradition of strong vertical connections between superiors and juniors remains unchanged.
  Trusted superiors are always nearby to listen seriously to even the smallest concerns - this is our ingrained culture, where even executives often join these interactions.
  This environment enables full performance regardless of assignment or project scale.
  Many employees also maintain connections with client representatives and engineers from partner companies.`,
        programmingLanguages: "AWS, COBOL, Java",
        workingHours: "08:50 ~ 17:20",
        flextime: "Available",
        coreTime: "None",
        actualWorkingHours: "7.75 hours/day",
        overtimeRecord: "※ Last year's average overtime: 24.5 hours/month",
        appealPoints: `■Job Content
  - Opportunity to work on large-scale projects with high social impact
  - Broad experience across all phases (planning, design, development, testing, migration, operation)

■Training System
  - Dual mentorship system with technical instructors and mental support mentors
  - Rich training programs (hierarchy-based, technical, business skills)
  - Self-development support (certification rewards, language learning support)

■Company Benefits
  - 24 paid leave days in first year (average usage ~19 days)
  - Certified as "DX Certified Business Operator"
  - Highest "★★★" rating in "Eruboshi" certification for excellent gender equality promotion
  - Recognized as Health & Productivity Management Outstanding Organization`,
        others: `■Work Location
  - Domestic Japan (Mainly at headquarters or Tokyo locations)
  (Employee distribution: 40% HQ, 60% Hitachi group buildings)

■Workplace Introduction
- Headquarters on 17th floor with great views
- Casual culture using "-san" honorifics
- Free-address seating system
- "Quick Consultation TIME" for easy access to advice`,
        website: "https://www.hitachi-sis.co.jp/",
        video: "no-video" 
    },
    {
        id: 'circlace',
        companyName: 'Circlace Inc.',
        companyLogoUrl: '/placeholder-circlace-logo.png',
        jobTitle: 'Software Engineer',
        jobUrl: '#',
        stages: ['Applied', 'Document Screening', 'First Interview', 'Second Interview', 'Job Offer', 'Offer Accepted'],
        currentStageIndex: 2,
        documents: [
            { name: '26 New Grad: Info Session Materials...', url: '#' },
            { name: 'VN - 26 New Grad: Info Session...', url: '#' },
        ],
        video: { title: 'Circlace Inc. Information Session', thumbnailUrl: '/placeholder-video-thumbnail-2.jpg' },
        status: 'In Process',
        statusMessage: 'Scheduling first interview.',
        isBookmarked: false,
        currentProcessNotes: 'Passed document screening.',
        userActionNotes: 'Replied with interview availability.',
    },
];

export const ApplicationListPage = () => {
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredApplications = useMemo(() => {
        if (filterStatus === 'all') {
            return sampleApplications;
        }
        return sampleApplications.filter(app => app.status === filterStatus);
    }, [filterStatus]);

    return (
        <div className="w-full space-y-6">
             <div className="flex justify-end">
                 <ToggleGroup
                     type="single"
                     defaultValue="all"
                     value={filterStatus}
                     onValueChange={(value) => {
                         if (value) setFilterStatus(value);
                         else setFilterStatus('all'); 
                     }}
                     className="border rounded-md p-1"
                 >
                     <ToggleGroupItem value="all" aria-label="Show all" size="sm" variant="outline" className="data-[state=on]:bg-[#3A6B4C] data-[state=on]:text-white">
                         All
                     </ToggleGroupItem>
                     <ToggleGroupItem value="In Process" aria-label="Show in process only" size="sm" variant="outline" className="data-[state=on]:bg-[#3A6B4C] data-[state=on]:text-white">
                         In Process
                     </ToggleGroupItem>
                     <ToggleGroupItem value="Selection Completed" aria-label="Show completed only" size="sm" variant="outline" className="data-[state=on]:bg-[#3A6B4C] data-[state=on]:text-white">
                         Completed
                     </ToggleGroupItem>
                 </ToggleGroup>
            </div>

            {filteredApplications.length > 0 ? (
                 filteredApplications.map(app => (
                    <ApplicationCard key={app.id} application={app} />
                 ))
            ) : (
                 <div className="text-center text-slate-500 py-10">
                    No matching applications found.
                 </div>
            )}
        </div>
    );
};