'use client'
import Link from "next/link";
import Logo from "./logo";
import { Bell, Globe, Building2, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { useLanguage } from "@/hook/useLanguage ";


const Navbar = () => {
    const { t, language, handleLanguageChange } = useLanguage("navbar");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navlinks = [
        { labelKey: "findJobs", href: `/${language}/jobs` },
        { labelKey: "companies", href: `/${language}/companies` },
        { labelKey: "careerGuide", href: `/${language}/guide` },
        { labelKey: "blog", href: `/${language}/blog` },
    ];
    
    return (
        <nav className="top-0 z-50 md:relative">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Logo />
                    <div className="hidden md:flex items-center ml-10 space-x-8">
                        {navlinks.map((link) => (
                            <Link
                                key={link.labelKey}
                                href={`${link.href}`}
                                className="text-sm font-medium text-gray-700 hover:text-[#3A6B4C] transition-colors"
                            >
                                {t(link.labelKey)}
                            </Link>
                        ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            className="border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#3A6B4C]/10 gap-2"
                        >
                            <Bell className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only">{t("alerts")}</span>
                        </Button>
                        
                        <div className="hidden md:flex items-center gap-4">
                            <Button
                                variant="ghost"
                                className="text-gray-700 hover:bg-[#3A6B4C]/10 gap-2"
                            >
                                <Building2 className="h-4 w-4" />
                                {t("employers")}
                            </Button>
                            
                            <div className="flex items-center border-l border-[#e4d9c8] pl-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-700 hover:bg-[#3A6B4C]/10 gap-2"
                                    onClick={() => handleLanguageChange(language === 'en' ? 'jp' : 'en')}
                                >
                                    <Globe className="h-4 w-4" />
                                    <span className="font-medium">
                                        {t(`language.${language.toLowerCase()}`)}
                                    </span>
                                </Button>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden text-gray-700"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-16 w-full bg-white border-t border-[#e4d9c8] shadow-lg z-50 ">
                    <div className="px-4 py-2">
                        {navlinks.map((link) => (
                            <Link
                                key={link.labelKey}
                                href={link.href}
                                className="block py-3 px-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t(link.labelKey)}
                            </Link>
                        ))}
                        
                        <Button
                            variant="ghost"
                            className="w-full justify-start text-gray-700 hover:bg-gray-100 gap-2 py-3 px-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <Building2 className="h-4 w-4" />
                            {t("employers")}
                        </Button>
                        
                        <div className="mt-2 pt-2 border-t border-[#e4d9c8]">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full justify-start text-gray-700 hover:bg-gray-100 gap-2 py-3 px-2"
                                onClick={() => {
                                    handleLanguageChange(language === 'EN' ? 'JP' : 'EN');
                                    setIsMenuOpen(false);
                                }}
                            >
                                <Globe className="h-4 w-4" />
                                <span className="font-medium">
                                    {t(`language.${language.toLowerCase()}`)}
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;