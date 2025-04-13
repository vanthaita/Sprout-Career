/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { SectionCard } from './SectionCard';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaRegFilePdf, FaVideo } from 'react-icons/fa'; 


export const MediaSection = ({ media }) => {
    const hasSlides = media?.slides && media.slides.length > 0;
    const hasVideo = media?.video && (media.video.url || media.video.embedCode);

    if (!media || (!hasSlides && !hasVideo)) {
        return (
            <SectionCard title="メディア" id="media">
                <p className="text-sm text-gray-500">メディアは登録されていません。</p>
            </SectionCard>
        );
    }

    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const isYouTubeUrl = (url) => {
        return url.includes('youtube.com') || url.includes('youtu.be');
    };

    const renderVideoContent = () => {
        if (!hasVideo) return null;
        
        const { video } = media;
        const youtubeId = video.url ? getYouTubeId(video.url) : null;

        if (youtubeId) {
            const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
            return (
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                    <div className="relative">
                        <img 
                            src={thumbnailUrl} 
                            alt="YouTube video thumbnail" 
                            className="w-full h-auto rounded-t"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-black bg-opacity-50 rounded-full p-3">
                                <FaVideo size={24} className="text-white" />
                            </div>
                        </div>
                    </div>
                </a>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center p-6 text-gray-400">
                <FaVideo size={48} className="mb-2" />
                {video.title && (
                    <p className="text-sm text-gray-600 mt-2">
                        {video.title}
                    </p>
                )}
            </div>
        );
    };

    return (
        <SectionCard title="メディア" id="media">
            <div className="space-y-6">
                {hasSlides && (
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3 text-base">スライド</h4>
                        <Card className="p-4 border-dashed">
                            <CardContent className="p-0">
                                <div className="flex flex-wrap gap-4">
                                    {media.slides.map((slide, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            className="flex flex-col items-center p-3 border rounded h-auto hover:bg-gray-100 w-24"
                                            asChild
                                        >
                                            <a href={slide.url || '#'} target="_blank" rel="noopener noreferrer" title={slide.name}>
                                                <FaRegFilePdf size={32} className="text-red-600 mb-1.5" />
                                                <span className="text-xs text-center text-gray-600 truncate w-full">{slide.name || 'ファイル'}</span>
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-3">※アップロードできるファイルは3つまで</p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {hasVideo && (
                    <div>
                        <h4 className="font-semibold text-gray-700 mb-3 text-base">ビデオ</h4>
                        <Card>
                            <CardContent className="p-0 overflow-hidden">
                                {renderVideoContent()}
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </SectionCard>
    );
};