import React from 'react';
import { SectionCard } from './SectionCard';
import { Badge } from "@/components/ui/badge";

const SkillCategory = ({ title, skills }) => (
     <div className="grid grid-cols-1 md:grid-cols-4 gap-y-2 gap-x-4 py-3 border-b border-[#3A6B4C]/30 items-start">
        <div className="font-medium text-gray-600 text-sm md:col-span-1">{title}</div>
        <div className="col-span-1 md:col-span-3 flex flex-wrap gap-1.5 items-center">
            {skills.map((skill, index) => (
                 <Badge key={index} variant="secondary" className="font-normal">
                     {skill.name}
                    {skill.duration && <span className="text-muted-foreground ml-1.5 text-xs">({skill.duration})</span>}
                 </Badge>
             ))}
        </div>
     </div>
);

export const SkillsSection = ({ skills }) => {
    return (
        <SectionCard title="技術" id="skills">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">専門スキル</h3>
             <div className="space-y-1">
                 <SkillCategory title="プログラミング言語" skills={skills.programming} />
                 <SkillCategory title="フレームワーク" skills={skills.frameworks} />
                 <SkillCategory title="OS" skills={skills.os} />
                 <SkillCategory title="DB" skills={skills.db} />
                 <SkillCategory title="プラットフォーム" skills={skills.platform} />
                 <SkillCategory title="バージョン管理システム" skills={skills.versionControl} />
                 <SkillCategory title="開発管理ツール" skills={skills.devTools} />
             </div>
        </SectionCard>
    );
};