import React from 'react';
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaLink } from 'react-icons/fa';
import { Separator } from '../ui/separator';

export const ProjectCardDisplay = ({ title, url, purpose, description, points, tech, team, duration }) => {
    return (
        <Card className="shadow-none border-none mb-6 overflow-hidden">
            {url && (
                 <div className="px-6 pt-4">
                    <Button variant="link" asChild className="p-0 h-auto text-blue-600 break-all">
                         <a href={url} target="_blank" rel="noopener noreferrer">
                            <FaLink className="inline mr-1.5 h-3 w-3" />{url}
                         </a>
                     </Button>
                 </div>
             )}
            <CardHeader>
                <CardTitle className="text-lg">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-600 space-y-2">
                <p><strong className="font-medium text-gray-700">プロジェクトの目的:</strong> {purpose}</p>
                <p><strong className="font-medium text-gray-700">プロジェクトの説明:</strong> {description}</p>
                 <div>
                     <strong className="font-medium text-gray-700">こだわりポイント:</strong>
                     <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
                         {points.map((point, i) => <li key={i}>{point}</li>)}
                     </ul>
                 </div>
                 <p><strong className="font-medium text-gray-700">使用した技術:</strong> {tech}</p>
                 <p><strong className="font-medium text-gray-700">チーム規模:</strong> {team}</p>
                 <p><strong className="font-medium text-gray-700">開発期間:</strong> {duration}</p>
             </CardContent>
             <Separator />
        </Card>
    );
};