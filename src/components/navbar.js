import Link from "next/link";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Bell, Globe, Building2, Menu } from "lucide-react";

const navlinks = [
    { label: "Search Jobs", href: "/" },
    { label: "Company List", href: "#features" },
    { label: "Blog", href: "#integrations" },
    { label: "Found a Job?", href: "#faqs" },
];

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Logo />
                    <div className="flex items-center">
                        <div className="hidden md:flex items-center ml-10 space-x-8">
                            {navlinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-[#485D95] hover:text-blue-600 transition-colors flex items-center gap-1 group"
                                >
                                    <span>{link.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4">
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full gap-2"
                            >
                                <Bell className="h-4 w-4 text-white" />
                                Job Alerts
                            </Button>
                            
                            <Button
                                variant="ghost"
                                className="text-[#485D95] hover:bg-blue-50 hover:text-blue-600 gap-2"
                            >
                                <Building2 className="h-4 w-4" />
                                For Employers
                            </Button>
                            
                            <Button
                                variant="ghost"
                                className="text-[#485D95] hover:bg-blue-50 hover:text-blue-600 gap-2"
                            >
                                <Globe className="h-4 w-4" />
                                日本語
                            </Button>
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
            </div>
        </nav>
    );
};

export default Navbar;