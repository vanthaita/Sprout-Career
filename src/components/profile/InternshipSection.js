import React from 'react';
import { SectionCard } from './SectionCard';

export const InternshipSection = ({ internship }) => {

    if (!internship || !internship.company) {
        return (
            <SectionCard title="インターン経験" id="internship">
                <p className="text-sm text-gray-500">インターン経験は登録されていません。</p>
            </SectionCard>
        );
    }

    const env = internship.environment || {}; 

    return (
        <SectionCard title="インターン経験" id="internship">
            <div className="space-y-4">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{internship.company}</h3>
                    {internship.duration && (
                        <p className="text-sm text-gray-500">{internship.duration}</p>
                    )}
                </div>

                {(Object.keys(env).length > 0 || internship.environment?.devTools) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                        <div>
                            <strong className="font-medium text-gray-600 block mb-1.5 text-base">開発環境</strong>
                             <div className="flex flex-col space-y-1 text-gray-700">
                                {env.language && <span><strong className="text-gray-500 w-32 inline-block">言語:</strong> {env.language}</span>}
                                {env.framework && <span><strong className="text-gray-500 w-32 inline-block">フレームワーク:</strong> {env.framework}</span>}
                                {env.os && <span><strong className="text-gray-500 w-32 inline-block">OS:</strong> {env.os}</span>}
                                {env.db && <span><strong className="text-gray-500 w-32 inline-block">DB:</strong> {env.db}</span>}
                                {env.platform && <span><strong className="text-gray-500 w-32 inline-block">プラットフォーム:</strong> {env.platform}</span>}
                                {env.versionControl && <span><strong className="text-gray-500 w-32 inline-block">バージョン管理:</strong> {env.versionControl}</span>}
                             </div>
                        </div>
                        {env.devTools && (
                             <div>
                                <strong className="font-medium text-gray-600 block mb-1.5 text-base">開発管理ツール</strong>
                                 <p className="text-gray-700">{env.devTools}</p>
                               
                             </div>
                        )}
                    </div>
                )}

                 {internship.responsibilities && internship.responsibilities.length > 0 && (
                     <div>
                         <strong className="font-medium text-gray-600 block mb-1.5 text-base">業務内容</strong>
                         <ul className="list-disc list-inside ml-4 text-sm text-gray-700 space-y-1">
                             {internship.responsibilities.map((task, i) => (
                                <li key={i}>{task}</li>
                             ))}
                         </ul>
                     </div>
                 )}

                {internship.mainRole && (
                    <div className="mt-3">
                        <strong className="font-medium text-gray-600 block mb-1 text-base">主な担当機能</strong>
                        <p className="text-sm text-gray-700">{internship.mainRole}</p>
                    </div>
                 )}
             </div>
        </SectionCard>
    );
};
