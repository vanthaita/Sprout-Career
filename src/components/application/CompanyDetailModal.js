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
    if (value === null || value === undefined || value === 'なし' || (Array.isArray(value) && value.length === 0)) {
        displayValue = <span className="text-gray-500">情報なし</span>;
    } else if (typeof value === 'boolean') {
         displayValue = value ? 'はい' : <span className="text-gray-500">情報なし</span>;
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
                        <DialogTitle>企業情報</DialogTitle>
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
        法人名: companyNameCombined,
        本社: headquarters,
        電話番号: phoneNumber,
        設立: establishedDate,
        法人代表者: representative,
        ベトナム法人: vietnamBranch,
        事業内容: businessDescription,
        プログラミング言語: programmingLanguages,
        勤務時間: workHours,
        フレックスタイム: flexTime,
        コアタイム: coreTime,
        実働時間: actualWorkHours,
        時間外労働実績: overtime実績,
        アピールポイント: appealPoints,
        その他: otherInfo,
        ホームページ: homepageUrl,
        companyLogoUrl,
    } = companyData;

    const [japaneseName] = (companyNameCombined || '').split('\n');

    const languagesArray = typeof programmingLanguages === 'string'
        ? programmingLanguages.split(',').map(lang => lang.trim()).filter(Boolean)
        : Array.isArray(programmingLanguages) ? programmingLanguages : [];

    const cleanedOvertime = typeof overtime実績 === 'string'
        ? overtime実績.replace('※ 昨年度時間外労働実績: ','')
        : overtime実績;

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
                                <DialogTitle className="text-xl font-semibold text-gray-800">企業情報</DialogTitle>
                                {japaneseName && <DialogDescription className="mt-1 text-base text-gray-600">{japaneseName}</DialogDescription>}
                            </div>
                        </div>
                    </DialogHeader>
                <ScrollArea className="flex-grow overflow-y-auto px-6 py-4 w-full scroll-custom">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-3 flex justify-center md:justify-start items-start pt-2">
                         <div className="w-28 h-28 rounded-md border flex items-center justify-center  overflow-hidden">
                            {companyLogoUrl ? (
                                <Image
                                    src={companyLogoUrl}
                                    alt={`${japaneseName || 'Company'} logo`}
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

                    <div className="md:col-span-9">
                        <dl>
                            <DetailItem label="法人名 (Company Name)" value={companyNameCombined} />
                            <DetailItem label="本社 (Headquarters)" value={headquarters} />
                            <DetailItem label="電話番号 (Phone)" value={phoneNumber} />
                            <DetailItem label="設立 (Established)" value={establishedDate} />
                            <DetailItem label="法人代表者 (Representative)" value={representative} />
                            <DetailItem label="ベトナム法人 (Vietnam)" value={vietnamBranch} />
                            <DetailItem label="ホームページ (Website)" value={homepageUrl} />
                            <DetailItem label="プログラミング言語 (Languages)" value={languagesArray} />
                            <DetailItem label="勤務時間 (Work Hours)" value={workHours} />
                            <DetailItem label="フレックスタイム (Flex Time)" value={flexTime} />
                            <DetailItem label="コアタイム (Core Time)" value={coreTime} />
                            <DetailItem label="実働時間 (Actual Hours)" value={actualWorkHours} />
                            <DetailItem label="時間外労働 (Overtime)" value={overtime実績?.replace('※ 昨年度時間外労働実績: ','')} />
                        </dl>
                    </div>
                </div>

                 {(businessDescription || appealPoints || otherInfo) && (
                     <Separator className="my-4" />
                 )}

                 {businessDescription && (
                    <div className="mt-4">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">事業内容 (Business Description)</h3>
                        <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{businessDescription}</p>
                    </div>
                 )}

                 {appealPoints && (
                    <div className="mt-6">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">アピールポイント (Appeal Points)</h3>
                    </div>
                 )}

                 {otherInfo && (
                    <div className="mt-6">
                        <h3 className="text-md font-semibold text-gray-700 mb-2">その他 (Other Info)</h3>
                        <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{otherInfo}</p>
                    </div>
                 )}

            </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};