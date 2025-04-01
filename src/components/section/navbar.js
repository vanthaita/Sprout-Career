import Link from "next/link";
import Logo from "./logo";
import { Bell, Globe, Building2, Menu } from "lucide-react";
import { Button } from "../ui/button";

const navlinks = [
    { label: "Find Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Career Guide", href: "/guide" },
    { label: "Blog", href: "/blog" },
];

const Navbar = () => {
    return (
        <nav className="block top-0 z-50 container mx-auto max-w-7xl">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Logo />
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center ml-10 space-x-8">
                            {navlinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="flex items-center gap-1 group"
                                >
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                   

                    <div className="flex items-center gap-4 ml-6">
                        <Button
                            variant="outline"
                            className="border-[#3A6B4C] text-[#3A6B4C] hover:bg-[#3A6B4C]/10 gap-2"
                        >
                            <Bell className="h-4 w-4" />
                            Alerts
                        </Button>
                        
                        <Button
                            variant="ghost"
                            className="text-[#554640] hover:bg-[#3A6B4C]/10 gap-2"
                        >
                            <Building2 className="h-4 w-4" />
                            Employers
                        </Button>
                        
                        <div className="flex items-center border-l border-[#e4d9c8] pl-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#554640] hover:bg-[#3A6B4C]/10 gap-2"
                            >
                                <Globe className="h-4 w-4" />
                                <span className="font-medium">EN</span>
                                <span className="text-[#554640]/60">/</span>
                                <span className="text-[#554640]/80">JP</span>
                            </Button>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-[#485D95]"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;