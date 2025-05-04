import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { StageProgressBar } from './StageProgressBar';
import { Star, Building2, PlayCircle, FileText, ExternalLink } from 'lucide-react';
import { CompanyDetailView } from './CompanyDetailModal';

export const ApplicationCard = ({ application }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {
        id,
        companyName, 
        companyLogoUrl,
        jobTitle,
        jobUrl = "#",
        stages = [],
        currentStageIndex = 0,
        documents = [],
        video,
        status,
        statusMessage,
        currentProcessNotes,
        userActionNotes,
        isBookmarked = false,
        ...companyDetails
    } = application;

    const companyNameDisplay = companyName.length > 20 ? `${companyName.substring(0, 18)}...` : companyName;
    const jobTitleDisplay = jobTitle.length > 25 ? `${jobTitle.substring(0, 22)}...` : jobTitle;

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const modalCompanyData = {
        ...companyDetails,
        companyLogoUrl: companyLogoUrl,
    };

    return (
        <>
        <Card className="w-full overflow-hidden mb-6 hover:shadow-md transition-shadow">
            <CardContent className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
                {/* Left Column - Company Info */}
                <div className="md:col-span-3 flex flex-col space-y-3 pb-4 md:pb-0 md:pr-6 border-b md:border-b-0 md:border-r border-[#3A6B4C]/20">
                    <div className="relative w-24 h-24 group mx-auto md:mx-0">
                        <div className="absolute top-0 right-0 z-10">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 rounded-full bg-[#3A6B4C]/10 shadow-sm hover:bg-[#3A6B4C]/20 transition-colors"
                            >
                                <Star className={`h-4 w-4 ${isBookmarked ?
                                    'fill-[#E9C46A] stroke-[#D4A737]' :
                                    'text-[#3A6B4C] stroke-[#3A6B4C]/70 hover:stroke-[#3A6B4C]'}`} />
                            </Button>
                        </div>
                        <div className="w-full h-full rounded-lg flex items-center justify-center border-2 border-[#3A6B4C]/20 overflow-hidden shadow-sm hover:border-[#3A6B4C]/40 transition-colors">
                            {companyLogoUrl ? (
                                <Image
                                    src={companyLogoUrl}
                                    alt={`${companyName} logo`}
                                    width={96}
                                    height={96}
                                    className="object-contain scale-90 group-hover:scale-95 transition-transform"
                                />
                            ) : (
                                <Building2 className="w-12 h-12 text-[#3A6B4C]/50 p-2 bg-[#3A6B4C]/10 rounded-lg" />
                            )}
                        </div>
                    </div>
                    
                    <h3 className="text-sm font-semibold text-[#2D473E] mt-2 px-2 py-1 bg-[#3A6B4C]/10 rounded-md text-center md:text-left" title={companyName}>
                        {companyNameDisplay}
                    </h3>
                    
                    <Button
                        size="sm"
                        className="bg-[#3A6B4C] hover:bg-[#2D5542] text-white w-full max-w-[160px] mx-auto md:mx-0 shadow-sm hover:shadow-md transition-all"
                        onClick={handleOpenModal}
                    >
                        View Details
                    </Button>
                    
                    <div className="space-y-2 mt-2">
                        <h4 className="text-xs font-semibold text-[#3A6B4C] uppercase tracking-wide text-center md:text-left">Company Video</h4>
                        {video && video !== "no-video" ? ( 
                           <div className="relative rounded-lg overflow-hidden border-2 border-[#3A6B4C]/80 hover:border-[#3A6B4C]/50 transition-colors group cursor-pointer h-32">
                               {video.thumbnailUrl && (
                                   <Image
                                       src={video.thumbnailUrl}
                                       alt={video.title || 'Video thumbnail'}
                                       layout="fill"
                                       objectFit="cover"
                                       className="group-hover:scale-105 transition-transform"
                                   />
                               )}
                               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent flex items-center justify-center">
                                   <PlayCircle className="h-10 w-10 text-white/90 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                               </div>
                               <div className="absolute bottom-0 left-0 right-0 p-2">
                                   <p className="text-xs font-medium text-white truncate drop-shadow-md">
                                       {video.title || "Company Information"}
                                   </p>
                               </div>
                           </div>
                       ) : (
                           <div className="h-32 flex items-center justify-center rounded-lg bg-[#F8F9F8] border-2 border-dashed border-[#3A6B4C]/30">
                               <p className="text-xs text-[#3A6B4C]/70">No video available</p>
                           </div>
                       )}
                    </div>
                    
                    <Separator className="w-20 border-dashed my-2 border-[#3A6B4C]/30 mx-auto md:mx-0" />
                    
                    <div className="text-xs text-[#3A6B4C] px-3 py-2 rounded-md w-full text-center md:text-left">
                        <p className="font-medium mb-1 text-[#3A6B4C]">Job Posting</p>
                        <a
                            href={jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center hover:text-[#2D5542] transition-colors group justify-center md:justify-start"
                            title={jobTitle}
                        >
                            <span className="truncate">{jobTitleDisplay}</span>
                            <ExternalLink className="inline-block h-3.5 w-3.5 ml-1.5 text-[#3A6B4C] group-hover:text-[#2D5542] transition-colors" />
                        </a>
                    </div>
                </div>

                {/* Right Column - Application Details */}
                <div className="md:col-span-9 space-y-6">
                    <div className="pb-2 border-b">
                        <StageProgressBar stages={stages} currentStageIndex={currentStageIndex} primaryColor="#3A6B4C" />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Documents Section */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-xs font-semibold text-[#3A6B4C] uppercase tracking-wide">Company Documents</h4>
                                {documents.length > 2 && (
                                    <Button variant="link" className="h-auto p-0 text-xs text-[#3A6B4C] hover:text-[#2D5542]">View All</Button>
                                )}
                            </div>
                            {documents.length > 0 ? (
                                <ul className="space-y-2">
                                    {documents.slice(0,2).map((doc, index) => (
                                        <li key={index}>
                                            <a
                                                href={doc.url || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-2.5 rounded-lg border border-[#3A6B4C]/20 hover:border-[#3A6B4C]/40 hover:bg-[#3A6B4C]/10 transition-colors group"
                                            >
                                                <div className="p-1.5 bg-[#3A6B4C]/10 rounded-md">
                                                    <FileText className="h-4 w-4 text-[#3A6B4C]" />
                                                </div>
                                                <span className="text-sm text-[#2D473E] truncate flex-1">{doc.name}</span>
                                                <ExternalLink className="h-4 w-4 text-[#3A6B4C]/70 group-hover:text-[#3A6B4C] ml-2" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-4 rounded-lg bg-[#F8F9F8] border border-dashed border-[#3A6B4C]/30 text-center">
                                    <p className="text-xs text-[#3A6B4C]/70">No documents available</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Notes Section */}
                        <div className="space-y-6">
                            <div className="p-4 rounded-xl border border-[#3A6B4C]/30">
                                <h4 className="text-xs font-semibold text-[#2D5542] mb-2 flex items-center gap-1.5">
                                    <span>📌</span>Current Process
                                </h4>
                                <p className="text-sm text-[#2D473E] leading-relaxed whitespace-pre-wrap">
                                    {currentProcessNotes || "No information available"}
                                </p>
                            </div>

                            <div className="p-4 rounded-xl border border-[#3A6B4C]/30">
                                <h4 className="text-xs font-semibold text-[#2D5542] mb-2 flex items-center gap-1.5">
                                    <span>✍️</span>Your Actions
                                </h4>
                                <p className="text-sm text-[#2D473E] leading-relaxed whitespace-pre-wrap">
                                    {userActionNotes || "No information available"}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Status Section */}
                    <div className="text-center pt-4">
                        <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3 border border-[#3A6B4C]/30 rounded-full shadow-sm">
                            <div className="flex items-center gap-2">
                                <span className={`h-3 w-3 rounded-full ${status === 'In Process' ? 'bg-[#3A6B4C] animate-pulse' : 'bg-gray-400'}`}></span>
                                <h3 className="text-lg font-bold text-[#2D473E]">
                                    {status || "Status"}
                                </h3>
                            </div>
                            <p className="text-sm text-[#3A6B4C] sm:ml-2">{statusMessage || ""}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <CompanyDetailView
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            companyData={modalCompanyData}
        />
        </>
    );
};