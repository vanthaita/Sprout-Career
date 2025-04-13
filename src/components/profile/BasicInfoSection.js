
import React from 'react';
import { SectionCard } from './SectionCard';
import { FaGithub, FaFacebook } from 'react-icons/fa';
import { Separator } from "@/components/ui/separator";

export const BasicInfoSection = ({ info }) => {
    return (
        <SectionCard title="基本情報" id="basic-info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm mb-4">
                <div className="flex"><strong className="w-24 text-gray-500">名前</strong><span className="text-gray-800">{info.name}</span></div>
                <div className="flex"><strong className="w-24 text-gray-500">生年月日</strong><span className="text-gray-800">{info.dob}</span></div>
                <div className="flex"><strong className="w-24 text-gray-500">性別</strong><span className="text-gray-800">{info.gender}</span></div>
                <div className="flex"><strong className="w-24 text-gray-500">電話番号</strong><span className="text-gray-800">{info.phone}</span></div>
                <div className="flex"><strong className="w-24 text-gray-500">メール</strong><span className="text-gray-800">{info.email}</span></div>
                <div className="flex"><strong className="w-24 text-gray-500">国</strong><span className="text-gray-800">{info.country}</span></div>
            </div>
            <Separator className="my-4" />
             <div>
                <h3 className="font-semibold text-gray-600 mb-2 text-base">ソーシャルアカウント</h3>
                <div className="space-y-2 text-sm">
                    {info.github && (
                        <div className="flex items-center">
                            <FaGithub className="mr-2 text-gray-600" size={18}/>
                            <a href={info.github} target="_blank" rel="noopener noreferrer" className="text-[#3A6B4C] hover:underline break-all">{info.github}</a>
                        </div>
                     )}
                     {info.facebook && (
                         <div className="flex items-center">
                            <FaFacebook className="mr-2 text-[#3A6B4C]" size={18}/>
                            <a href={info.facebook} target="_blank" rel="noopener noreferrer" className="text-[#3A6B4C] hover:underline break-all">{info.facebook}</a>
                         </div>
                     )}
                </div>
            </div>
        </SectionCard>
    );
};