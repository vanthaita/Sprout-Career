import React from 'react';
import { SectionCard } from './SectionCard';


export const EducationSection = ({ education }) => {

    if (!education) {
        return (
            <SectionCard title="学歴" id="education">
                <p className="text-sm text-gray-500">学歴情報がありません。</p>
            </SectionCard>
        );
    }

    return (
        <SectionCard title="学歴" id="education">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                {education.university && (
                    <div className="flex"><strong className="w-28 text-gray-500 shrink-0">大学</strong><span className="text-gray-800">{education.university}</span></div>
                )}
                {education.faculty && (
                     <div className="flex"><strong className="w-28 text-gray-500 shrink-0">学部</strong><span className="text-gray-800">{education.faculty}</span></div>
                )}
                {education.studentId && (
                     <div className="flex"><strong className="w-28 text-gray-500 shrink-0">学籍番号</strong><span className="text-gray-800">{education.studentId}</span></div>
                 )}
                {education.year && (
                    <div className="flex"><strong className="w-28 text-gray-500 shrink-0">学年</strong><span className="text-gray-800">{education.year}</span></div>
                 )}
                 {education.expectedGraduation && (
                     <div className="flex"><strong className="w-28 text-gray-500 shrink-0">卒業予定年月</strong><span className="text-gray-800">{education.expectedGraduation}</span></div>
                 )}
                 {education.gpa && (
                     <div className="flex"><strong className="w-28 text-gray-500 shrink-0">GPA</strong><span className="text-gray-800">{education.gpa}</span></div>
                 )}

                 {!education.university && !education.faculty && !education.studentId && !education.year && !education.expectedGraduation && (
                     <p className="text-sm text-gray-500 col-span-full">登録されている学歴の詳細がありません。</p>
                 )}
            </div>
        </SectionCard>
    );
};
