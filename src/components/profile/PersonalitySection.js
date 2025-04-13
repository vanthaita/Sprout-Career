import React from 'react';
import { SectionCard } from './SectionCard';
import { Badge } from "@/components/ui/badge";

export const PersonalitySection = ({ personality }) => {

    if (!personality) {
        return (
            <SectionCard title="人物像" id="personality">
                <p className="text-sm text-gray-500">人物像に関する情報がありません。</p>
            </SectionCard>
        );
    }

    const { jobExpectations = [], strengthsTags = [], interests = [], diagnosis = [] } = personality;

    return (
        <SectionCard title="人物像" id="personality">
            <div className="space-y-6">

                {jobExpectations.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-base">仕事に求めるもの</h4>
                        <div className="flex flex-wrap gap-2">
                            {jobExpectations.map((tag, i) => (
                                <Badge key={i} variant="outline" className="">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                )}

                {strengthsTags.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-base">強み</h4>
                        <div className="flex flex-wrap gap-2">
                            {strengthsTags.map((tag, i) => (
                                <Badge key={i} variant="outline" className="">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                )}

                {interests.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-2 text-base">興味分野</h4>
                        <div className="flex flex-wrap gap-2">
                            {interests.map((tag, i) => (
                                <Badge key={i} variant="outline" className="">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                )}

                {diagnosis.length > 0 && (
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3 text-base">性格診断</h4>
                        <div className="space-y-4">
                            {diagnosis.map((item, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <span className="flex-shrink-0 w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">{index + 1}</span>
                                    <div>
                                        <h5 className="font-medium text-gray-700">{item.title}</h5>
                                        <p className="text-sm text-gray-600 mt-0.5">{item.description || '説明がありません。'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-4">* VIA の24性格診断の結果により</p>
                        <a href={personality.viaResultsLink || "#"} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline mt-1 block">
                             詳細の結果はこちらでご確認ください。
                        </a>
                    </div>
                )}

                 {jobExpectations.length === 0 && strengthsTags.length === 0 && interests.length === 0 && diagnosis.length === 0 && (
                     <p className="text-sm text-gray-500">登録されている人物像の詳細がありません。</p>
                 )}

            </div>
        </SectionCard>
    );
};
