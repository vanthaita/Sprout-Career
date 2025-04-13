import React from 'react';
import { SectionCard } from './SectionCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const SelfIntroductionSection = ({ introData }) => {
    return (
        <SectionCard title="自己紹介" id="self-introduction">
            <Accordion type="single" collapsible className="w-full">
                 {introData.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-left hover:no-underline">
                            <div className="flex flex-col items-start w-full">
                                <span className="text-sm text-gray-500 mb-1">{item.date}</span>
                                <h4 className="font-semibold text-gray-700">{item.q}</h4>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-gray-600 whitespace-pre-line">
                            {item.a}
                        </AccordionContent>
                    </AccordionItem>
                 ))}
            </Accordion>
        </SectionCard>
    );
};