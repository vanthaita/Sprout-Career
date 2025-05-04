import React from 'react';
import Image from 'next/image';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Building2, Link as LinkIcon } from 'lucide-react';

const DetailItem = ({ label, value }) => {
    let displayValue = value;
    if (value === null || value === undefined || value === 'None' || (Array.isArray(value) && value.length === 0)) {
        displayValue = <span className="text-gray-500">No information</span>;
    } else if (typeof value === 'boolean') {
         displayValue = value ? 'Yes' : <span className="text-gray-500">No information</span>;
    }

    if (displayValue === value) {
        const isMultiline = typeof value === 'string' && value.includes('\n');
        const isList = Array.isArray(value);
        const isUrl = typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));
        const isObject = typeof value === 'object' && value !== null && !isList;

        if (isUrl) {
            displayValue = (
                <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center group break-all">
                    <span>{value}</span>
                    <LinkIcon className="h-3 w-3 ml-1 opacity-70 group-hover:opacity-100 flex-shrink-0" />
                </a>
            );
        } else if (isList) {
            displayValue = (
                <ul className="list-disc list-inside space-y-1">
                    {value.map((item, index) => <li key={index}>{typeof item === 'object' ? JSON.stringify(item) : String(item)}</li>)}
                </ul>
            );
        } else if (isObject) {
             displayValue = (
                 <div className="space-y-1">
                    {Object.entries(value).map(([key, val]) => (
                        <div key={key} className="text-xs">
                             <span className="font-medium text-gray-600">{key}:</span>{' '}
                             {typeof val === 'object' && val !== null ? JSON.stringify(val) : String(val)}
                        </div>
                    ))}
                </div>
            );
        } else if (typeof value !== 'string' && typeof value !== 'number' && typeof value !== 'boolean') {
             console.warn(`DetailItem rendering unexpected type for label "${label}":`, value);
             try {
                displayValue = String(value);
             } catch (e) {
                 console.error(`Error rendering value for label "${label}":`, e);
                 displayValue = <span className="text-red-500 italic">[Unrenderable Data]</span>;
             }
        }
    }

    const isMultilineOriginal = typeof value === 'string' && value.includes('\n');

    return (
        <div className="grid grid-cols-3 gap-x-2 gap-y-1 py-2 border-b border-[#3A6B4C]/30 last:border-b-0 break-words">
            <dt className="text-sm font-medium text-gray-600 col-span-1">{label}</dt>
            <dd className={`text-sm text-gray-800 col-span-2 ${isMultilineOriginal ? 'whitespace-pre-wrap' : ''}`}>
                {displayValue}
            </dd>
        </div>
    );
};


export const CompanyDetailView = ({ companyData, isOpen, onClose }) => {
    if (!companyData && isOpen) {
        return (
            <Dialog open={isOpen} onOpenChange={(openState) => !openState && onClose()}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Company Information</DialogTitle>
                    </DialogHeader>
                    <div className="p-6 text-center text-gray-500">No company data available.</div>
                </DialogContent>
            </Dialog>
        );
    }

    if (!isOpen || !companyData) {
       return null; 
    }

    const {
        legalName: companyNameCombined,
        headquarters,
        phoneNumber,
        established: establishedDate,
        representative,
        vietnamEntity,
        businessDescription,
        programmingLanguages,
        workingHours,
        flextime,
        coreTime,
        actualWorkingHours,
        overtimeRecord,
        appealPoints,
        others,
        website,
        companyLogoUrl,
    } = companyData;

    const [englishName] = (companyNameCombined || '').split('\n');

    const languagesArray = typeof programmingLanguages === 'string'
        ? programmingLanguages.split(',').map(lang => lang.trim()).filter(Boolean)
        : Array.isArray(programmingLanguages) ? programmingLanguages : [];

    return (
        <Dialog open={isOpen} onOpenChange={(openState) => {
                if (!openState) {
                    onClose();
                }
            }}>
            <DialogContent className="sm:max-w-5xl max-h-[90vh] flex flex-col bg-white">
                <DialogHeader className="p-6 pb-4 border-b">
                    <div className="flex justify-between items-start">
                        <div>
                            <DialogTitle className="text-xl font-semibold text-gray-800">Company Information</DialogTitle>
                            {englishName && <DialogDescription className="mt-1 text-base text-gray-600">{englishName}</DialogDescription>}
                        </div>
                    </div>
                </DialogHeader>
                
                <ScrollArea className="flex-grow overflow-y-auto px-6 py-4 w-full scroll-custom">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Company Logo */}
                        <div className="md:col-span-3 flex justify-center md:justify-start items-start pt-2">
                            <div className="w-28 h-28 rounded-md border flex items-center justify-center overflow-hidden">
                                {companyLogoUrl ? (
                                    <Image
                                        src={companyLogoUrl}
                                        alt={`${englishName || 'Company'} logo`}
                                        width={112}
                                        height={112}
                                        className="object-contain"
                                    />
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <Building2 className="w-12 h-12 mx-auto mb-1" />
                                        <span className="text-xs">NO LOGO</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Company Details */}
                        <div className="md:col-span-9">
                            <dl>
                                <DetailItem label="Legal Name" value={companyNameCombined} />
                                <DetailItem label="Headquarters" value={headquarters} />
                                <DetailItem label="Phone Number" value={phoneNumber} />
                                <DetailItem label="Established" value={establishedDate} />
                                <DetailItem label="Representative" value={representative} />
                                <DetailItem label="Vietnam Entity" value={vietnamEntity} />
                                <DetailItem label="Website" value={website} />
                                <DetailItem label="Programming Languages" value={languagesArray} />
                                <DetailItem label="Working Hours" value={workingHours} />
                                <DetailItem label="Flextime" value={flextime} />
                                <DetailItem label="Core Time" value={coreTime} />
                                <DetailItem label="Actual Working Hours" value={actualWorkingHours} />
                                <DetailItem label="Overtime Record" value={overtimeRecord} />
                            </dl>
                        </div>
                    </div>

                    {(businessDescription || appealPoints || others) && (
                        <Separator className="my-4" />
                    )}

                    {businessDescription && (
                        <div className="mt-4">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Business Description</h3>
                            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{businessDescription}</p>
                        </div>
                    )}

                    {appealPoints && (
                        <div className="mt-6">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Appeal Points</h3>
                            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{appealPoints}</p>
                        </div>
                    )}

                    {others && (
                        <div className="mt-6">
                            <h3 className="text-md font-semibold text-gray-700 mb-2">Other Information</h3>
                            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{others}</p>
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};