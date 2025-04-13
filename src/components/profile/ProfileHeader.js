import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"; 
import { FaGithub } from 'react-icons/fa';

const japanesePattern = `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

export const ProfileHeader = ({ user, onNavigate, ref }) => {
    return (
        <header 
            className="relative bg-[#3A6B4C] text-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            style={{ 
                backgroundImage: `${japanesePattern}, linear-gradient(to bottom right, #3A6B4C 30%, #2D5540)`,
                backgroundSize: '120px auto, cover',
                // borderBottom: '3px solid #E8B5B5' 
            }}
            ref={ref}
        >
            {/* <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-2 right-4 animate-float">
                </div>
            </div> */}

            <div className="flex items-center space-x-4 flex-1 relative z-10 px-4">
                <Avatar className="h-16 w-16 border-2 border-white/80 shadow-md">
                    <AvatarImage 
                        src={user.imageUrl || "/placeholder-avatar.jpg"} 
                        alt={user.name}
                        className="object-cover"
                    />
                    <AvatarFallback className="bg-white/10 text-lg font-medium">
                        {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1 backdrop-blur-sm bg-white/5 rounded-lg p-2 shadow-sm">
                    <h1 className="text-2xl font-bold tracking-tight font-japanese">
                        {user.name}
                        <span className="ml-2 text-white/60 text-lg">👺</span>
                    </h1>
                    <div className="flex flex-row justify-center items-center space-x-0.5">
                        <p className="text-sm text-white/80 font-medium ">
                            <span className="mr-2">🗻</span>SCP ID: {user.scpId}
                        </p>
                        <p className="text-sm text-white/80 ">
                            <span className="mr-2">🎓</span>卒業予定年月: {user.expectedGraduation}
                        </p>
                        <div className='flex justify-center items-center ml-2 mb-0.5'>
                            {user.github && (
                                <a 
                                    href={user.github} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-sm text-white/80 hover:text-white transition-colors flex justify-center items-center"
                                >
                                    <FaGithub className="mr-2 text-lg"/> 
                                    {user.github.replace('https://github.com/', '')}
                                    <span className="ml-2 transform hover:scale-110 transition">✨</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <nav className="flex flex-wrap gap-2 justify-end w-full md:w-auto relative z-10">
                {['要件管理', '学生情報管理', 'ヘルプ'].map((item, index) => (
                    <Button 
                        key={index}
                        variant="ghost" 
                        onClick={() => onNavigate(`${item === '要件管理' ? "applications" : "profile"}`)}
                        className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 text-base transition-all border border-white/20 hover:border-white/40 group"
                    >
                        {item}
                        <span className="ml-2 opacity-0 group-hover:opacity-100 transition">→</span>
                    </Button>
                ))}
                <Button 
                    variant="ghost" 
                    className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 text-base flex items-center gap-1 border border-white/20 hover:border-white/40"
                >
                    <span>{user.name}</span>
                    <span className="text-xs transform transition group-hover:rotate-180">▼</span>
                </Button>
            </nav>
        </header>
    );
};