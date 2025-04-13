import React from 'react';
import { SectionCard } from './SectionCard';

export const AppealPointSection = ({ appeal }) => {
    if (!appeal) {
        return (
            <SectionCard title="アピールポイント" id="appeal-point">
                <p className="text-sm text-gray-500">アピールポイント情報がありません。</p>
            </SectionCard>
        );
    }

    return (
        <SectionCard title="アピールポイント" id="appeal-point">
            <div className="space-y-4 text-sm text-gray-700">
                {appeal.main && (
                    <div>
                        <h4 className="font-medium text-gray-600 mb-1 text-base">アピールポイント</h4>
                        <p className="whitespace-pre-line">{appeal.main}</p>
                    </div>
                )}
                {appeal.strengths && (
                     <div>
                        <h4 className="font-medium text-gray-600 mb-1 text-base">貴社で活かせる経験・能力</h4>
                        <p className="whitespace-pre-line">{appeal.strengths}</p>
                    </div>
                )}
                {appeal.motivation && (
                     <div>
                        <h4 className="font-medium text-gray-600 mb-1 text-base">経験談能力</h4>
                        <p className="whitespace-pre-line">{appeal.motivation}</p>
                    </div>
                 )}
                 {!appeal.main && !appeal.strengths && !appeal.motivation && (
                     <p className="text-sm text-gray-500">登録されているアピールポイントの詳細がありません。</p>
                 )}
            </div>
        </SectionCard>
    );
};

