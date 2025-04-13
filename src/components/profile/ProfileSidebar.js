/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar";
const sections = [
    { id: 'basic-info', title: '基本情報' },
    { id: 'education', title: '学歴' },
    { id: 'qualifications', title: '資格' },
    { id: 'awards', title: '表彰歴' },
    { id: 'appeal-point', title: 'アピールポイント' },
    { id: 'skills', title: '技術' },
    { id: 'achievements', title: '成果物' },
    { id: 'internship', title: 'インターン経験' },
    { id: 'self-introduction', title: '自己紹介' },
    { id: 'media', title: 'メディア' }, 
    { id: 'personality', title: '人物像' },
];

export const ProfileSidebar = ({ activeSection, showAvatar, sections  }) => {
    return (
        <>
            {showAvatar && (
                <div className="w-full flex justify-center">
                    <Avatar className="h-32 w-32 mb-4">
                        <AvatarImage
                        src="https://scp.sun-asterisk.com/storage/images/avatars/6720a23fd25dd.rez.jpg"
                        alt="User avatar"
                        className="hover:opacity-80 transition-opacity"
                        />
                        <AvatarFallback className="text-2xl font-semibold">
                        R
                        </AvatarFallback>
                    </Avatar>
                </div>
            )}
            
            <Card className="shadow-sm lg:sticky lg:top-6 self-start">
                <CardHeader>
                    <CardTitle className="text-lg">プロフィール</CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                    <nav className="space-y-1">
                        {sections.map((section) => (
                            <Button
                                key={section.id}
                                variant={activeSection === section.id ? "secondary" : "ghost"}
                                className={`w-full justify-start px-3 py-1.5 h-auto font-normal text-sm text-left ${
                                    activeSection === section.id ? 'text-primary font-medium' : 'text-muted-foreground'
                                }`}
                                asChild
                            >
                                <a href={`#${section.id}`}>{section.title}</a>
                            </Button>
                        ))}
                    </nav>
                </CardContent>
            </Card>
        </>
    );
};