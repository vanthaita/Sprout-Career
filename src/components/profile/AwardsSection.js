import React from 'react';
import { SectionCard } from './SectionCard';

export const AwardsSection = ({ awards }) => {
    const hasAwards = awards && awards.length > 0;

    return (
        <SectionCard title="表彰歴" id="awards">
            {hasAwards ? (
                <div className="space-y-3">
                    {awards.map((award, index) => (
                        <div key={index} className="text-sm border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                             <p className="font-medium text-gray-800">{award.name}</p>
                             {(award.date || award.issuer) && (
                                 <p className="text-xs text-gray-500 mt-0.5">
                                     {award.issuer}{award.issuer && award.date && ' - '}{award.date}
                                 </p>
                             )}
                             {award.description && (
                                 <p className="text-xs text-gray-600 mt-1">{award.description}</p>
                             )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500">登録されていません。</p>
             )}
        </SectionCard>
    );
};

