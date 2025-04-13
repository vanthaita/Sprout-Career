import React from 'react';
import { SectionCard } from './SectionCard';


export const QualificationsSection = ({ qualifications }) => {

    const hasQualifications = qualifications && qualifications.length > 0;

    return (
        <SectionCard title="資格" id="qualifications">
            {hasQualifications ? (
                <div className="space-y-2">
                    {qualifications.map((q, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row justify-between sm:items-center text-sm border-b border-gray-100 py-1.5 last:border-b-0"
                        >
                            <span className="text-gray-800 mb-0.5 sm:mb-0">{q.name}</span>
                            <span className="text-gray-500 text-xs sm:text-sm sm:ml-4 shrink-0">{q.date}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500">資格は登録されていません。</p>
             )}
        </SectionCard>
    );
};
