import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Download, Link2 } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { calculateAge } from '@/lib/calculateAge';

const ResumeTableRow = ({ label, value, labelStyles = "", valueStyles = "" }) => (
    <tr>
        <th className={`border border-slate-300 p-2 text-sm bg-slate-50 font-medium text-slate-600 text-center ${labelStyles}`}>
            {label}
        </th>
        <td className={`border border-slate-300 p-2 text-sm text-slate-800 ${valueStyles}`}>
            {value || ''}
        </td>
    </tr>
);

export const ResumeContent = ({ profileData }) => {
    const { basicInfo, qualifications, user } = profileData || {};
    const dob = basicInfo?.dob;
    const age = calculateAge(dob);

    const resumeContentId = "resume-content-area";

    const handleExportPDF = async () => {
        const input = document.getElementById(resumeContentId);
        if (!input) return;

        const originalStyles = input.getAttribute('style');
        
        try {
            input.style.backgroundColor = '#ffffff';
            input.style.color = '#000000';
            
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                ignoreElements: (element) => {
                    return window.getComputedStyle(element).color.includes('oklch') || 
                           window.getComputedStyle(element).backgroundColor.includes('oklch');
                }
            });

        } catch (err) {
            console.error("Error generating PDF:", err);
        } finally {
            if (originalStyles) {
                input.setAttribute('style', originalStyles);
            } else {
                input.removeAttribute('style');
            }
        }
    };

    const getInitials = (name) => { 
        if (!name) return '';
        return name.split(' ').map(n => n[0]).filter((_,i,a) => i === 0 || i === a.length-1).join('').toUpperCase();
    };


    if (!basicInfo) return <p>基本情報が見つかりません。</p>;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-xl font-semibold text-gray-700">履歴書</CardTitle>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="text-slate-600">
                         <Link2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleExportPDF} className="text-slate-600">
                         <Download className="h-4 w-4" />
                         <span className="sr-only">Download PDF</span>
                    </Button>
                </div>
            </CardHeader>
            <Separator className="mb-5" />
            <CardContent id={resumeContentId} className="p-4 print:p-0">
                 <table className="w-full border-collapse border border-slate-400 mb-6">
                     <tbody>
                         <tr>
                             <td className="border border-slate-300 w-[75%]" colSpan="3">
                                 <table className="w-full border-collapse">
                                     <tbody>
                                         <ResumeTableRow label="フリガナ" value={basicInfo.name?.split('/')[0]?.trim()} />
                                         <ResumeTableRow label="氏名" value={basicInfo.name?.split('/')[1]?.trim()} valueStyles="text-lg font-semibold" />
                                         <ResumeTableRow
                                            label="生年月日"
                                            value={`${dob || ''}${dob ? ` (${age})` : ''}`}
                                         />
                                         <ResumeTableRow label="フリガナ" value={basicInfo.addressFurigana || ''} />
                                         <ResumeTableRow label="現住所" value={basicInfo.address || ''} />
                                         <ResumeTableRow label="メール" value={basicInfo.email} />
                                          <ResumeTableRow label="フリガナ" value={basicInfo.phoneFurigana || ''} />
                                         <ResumeTableRow label="連絡先" value={basicInfo.phone} />
                                     </tbody>
                                 </table>
                             </td>
                              <td className="border border-slate-300 w-[25%]" rowSpan="8">
                                  <table className="w-full h-full border-collapse">
                                      <tbody>
                                         <tr>
                                             <th className="border-b border-slate-300 p-1 text-sm bg-slate-50 font-medium text-slate-600 text-center w-10">
                                                男
                                             </th>
                                              <th className="border-b border-l border-slate-300 p-1 text-sm bg-slate-50 font-medium text-slate-600 text-center w-10">
                                                女
                                              </th>
                                         </tr>
                                         <tr>
                                             <td colSpan="2" className="p-2 align-top text-center">
                                                <Avatar className="h-32 w-24 mx-auto border rounded-sm">
                                                     <AvatarImage src={user?.imageUrl || ""} alt={basicInfo.name?.split('/')[1]?.trim()} className="object-cover" />
                                                     <AvatarFallback className="rounded-sm text-slate-600 bg-slate-200 text-xs">
                                                         {getInitials(basicInfo.name?.split('/')[1]?.trim())}
                                                     </AvatarFallback>
                                                 </Avatar>
                                             </td>
                                         </tr>
                                     </tbody>
                                  </table>
                              </td>
                         </tr>
                     </tbody>
                 </table>

                 <table className="w-full border-collapse border border-slate-400">
                     <thead>
                         <tr>
                             <th colSpan="3" className="border border-slate-300 p-2 text-sm bg-slate-50 font-medium text-slate-600 text-center">
                                 免許・資格 (Licenses/Qualifications)
                             </th>
                         </tr>
                         <tr>
                             <th className="border border-slate-300 p-2 text-sm bg-slate-100 font-medium text-slate-600 text-center w-20">年 (Year)</th>
                             <th className="border border-slate-300 p-2 text-sm bg-slate-100 font-medium text-slate-600 text-center w-16">月 (Month)</th>
                             <th className="border border-slate-300 p-2 text-sm bg-slate-100 font-medium text-slate-600 text-left">免許・資格</th>
                         </tr>
                     </thead>
                     <tbody>
                         {(qualifications && qualifications.length > 0) ? qualifications.map((q, index) => {
                             const [year, month] = q.date ? q.date.split(' / ') : ['', ''];
                             return (
                                 <tr key={index}>
                                     <td className="border border-slate-300 p-2 text-sm text-slate-800 text-center">{year || ''}</td>
                                     <td className="border border-slate-300 p-2 text-sm text-slate-800 text-center">{month || ''}</td>
                                     <td className="border border-slate-300 p-2 text-sm text-slate-800">{q.name || ''}</td>
                                 </tr>
                             );
                         }) : (
                             <tr>
                                 <td colSpan="3" className="border border-slate-300 p-2 text-sm text-slate-500 text-center">資格はありません。</td>
                             </tr>
                          )}
                     </tbody>
                 </table>
            </CardContent>
        </Card>
    );
};