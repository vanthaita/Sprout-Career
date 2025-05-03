'use client'
import React, { useEffect } from 'react';
import {
  FiUser, FiMail, FiPhone, FiCalendar, FiMapPin, FiBriefcase,
  FiAward, FiSettings, FiMoreHorizontal, FiSend, FiBookmark,
 FiLinkedin, FiGlobe
} from 'react-icons/fi';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axiosInstance from '@/axios/axiosIntance';

const CandidatePage = () => {
  const primaryColor = '#3A6B4C'; 
  const secondaryColor = '#E8F5E9';
  const accentColor = '#4CAF50'; 
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosInstance.get('/candidate/profile')
      
      console.log(res.data.date);
    }
    fetchData();
  },[])
  return (
    <div className="min-h-screen font-sans">
      <header className="px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
            Candidate Profile
          </h1>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 border-transparent">
              <FiSettings size={20} />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-84 flex-shrink-0 space-y-6">
          <Card className="flex flex-col items-center text-center">
            <CardContent className="p-6 flex flex-col items-center text-center w-full">
              <div className="relative mb-4">
                <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                  <FiUser className="text-green-700" size={50} />
                </div>
                <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                      style={{ backgroundColor: accentColor }}>
                  <span className="sr-only">Online</span>
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900">Ethan Taylor</h2>

              <div className="w-full mt-6 space-y-3">
                <Button className="w-full gap-2" style={{ backgroundColor: primaryColor }}>
                  <FiSend size={16} />
                  Schedule Interview
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" className="flex-1 rounded-lg text-gray-700 hover:bg-gray-200">
                    <FiBookmark size={18} />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1 rounded-lg text-gray-700 hover:bg-gray-200">
                    <FiMoreHorizontal size={18} />
                  </Button>
                  <Button variant="outline" size="icon" className="flex-1 rounded-lg text-gray-700 hover:bg-gray-200">
                    <FiLinkedin size={18} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <FiUser className="text-green-600" size={18} />
                Personal Info
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { icon: <FiUser size={16} />, label: 'Gender', value: 'Male' },
                { icon: <FiCalendar size={16} />, label: 'Date of Birth', value: 'May 14, 1989' },
                { icon: <FiMail size={16} />, label: 'Email', value: 'ethan.taylor@example.com' },
                { icon: <FiPhone size={16} />, label: 'Phone', value: '+1 555-0123' },
                { icon: <FiMapPin size={16} />, label: 'Location', value: 'Chicago, IL' },
                { icon: <FiGlobe size={16} />, label: 'Nationality', value: 'American' }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full bg-gray-100 text-green-600 mt-0.5">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 truncate">{item.label}</p>
                    <p className="text-sm font-medium text-gray-800 truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FiUser className="text-green-600" size={20} />
                Professional Summary
              </CardTitle>
              <Button variant="link" className="text-sm font-medium p-0 h-auto" style={{ color: primaryColor }}>
                Edit
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Ethan is an experienced Network Engineer with a proven track record in designing,
                implementing, and managing secure and efficient corporate networks. His expertise
                includes advanced knowledge in network security, system troubleshooting, and
                deployment of complex network infrastructure.
              </p>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Key Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {['Network Security', 'Cisco Systems', 'Firewall Configuration', 'VPN Management',
                    'TCP/IP', 'LAN/WAN', 'Cloud Networking', 'Troubleshooting'].map((skill, index) => (
                    <span key={index} className="px-3 py-1 rounded-full text-sm"
                          style={{ backgroundColor: secondaryColor, color: primaryColor }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FiBriefcase className="text-green-600" size={20} />
                Work Experience
              </CardTitle>
              <Button variant="link" className="text-sm font-medium p-0 h-auto" style={{ color: primaryColor }}>
                Add Experience
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0 group">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white"
                       style={{ backgroundColor: primaryColor }}></div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                         style={{ backgroundColor: secondaryColor, color: primaryColor }}>
                      <span className="font-bold">T</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Senior Network Engineer</h4>
                      <p className="text-sm text-gray-700 mb-1">TechSolutions Inc. · Full-time</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                        <FiCalendar size={12} />
                        Jan 2020 - Present · 3 yrs 8 mos
                      </p>
                      <p className="text-sm text-gray-700 mb-3">Managed and optimized network infrastructure for enterprise clients with 500+ employees.</p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                          Implemented new security protocols that reduced system vulnerabilities by 40%
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                          Led migration to cloud-based networking solutions, reducing costs by 25%
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                          Mentored 3 junior engineers in network best practices
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-l-0 last:pb-0 group">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white"
                       style={{ backgroundColor: primaryColor }}></div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                         style={{ backgroundColor: secondaryColor, color: primaryColor }}>
                      <span className="font-bold">N</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Junior Network Engineer</h4>
                      <p className="text-sm text-gray-700 mb-1">NetGrowth Technologies · Full-time</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
                        <FiCalendar size={12} />
                        Jun 2016 - Dec 2019 · 3 yrs 7 mos
                      </p>
                      <p className="text-sm text-gray-700 mb-3">Supported network infrastructure for mid-sized businesses.</p>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                          Assisted in rollout of company-wide email system improving communication efficiency
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block mr-2 mt-1 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                          Supported network upgrades improving system uptime to 99.9%
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FiAward className="text-green-600" size={20} />
                Education
              </CardTitle>
              <Button variant="link" className="text-sm font-medium p-0 h-auto" style={{ color: primaryColor }}>
                Add Education
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"
                     style={{ backgroundColor: secondaryColor, color: primaryColor }}>
                  <FiAward size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">University of Illinois at Urbana-Champaign</h4>
                  <p className="text-sm text-gray-700 mb-1">Bachelor of Science in Computer Science</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <FiCalendar size={12} />
                    2011 - 2015
                  </p>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs rounded mr-2"
                          style={{ backgroundColor: secondaryColor, color: primaryColor }}>
                      GPA: 3.8/4.0
                    </span>
                    <span className="inline-block px-2 py-1 text-xs rounded"
                          style={{ backgroundColor: secondaryColor, color: primaryColor }}>
                      Honors Graduate
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <FiAward className="text-green-600" size={20} />
                Certifications
              </CardTitle>
              <Button variant="link" className="text-sm font-medium p-0 h-auto" style={{ color: primaryColor }}>
                Add Certification
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'CCNP Enterprise', issuer: 'Cisco', year: '2021' },
                  { title: 'CompTIA Security+', issuer: 'CompTIA', year: '2019' },
                  { title: 'AWS Certified Advanced Networking', issuer: 'Amazon Web Services', year: '2020' },
                  { title: 'Certified Ethical Hacker', issuer: 'EC-Council', year: '2018' }
                ].map((cert, index) => (
                  <div key={index} className="p-4 rounded-lg border border-gray-200 hover:border-green-200 transition">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                           style={{ backgroundColor: secondaryColor, color: primaryColor }}>
                        <FiAward size={16} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{cert.title}</h4>
                        <p className="text-sm text-gray-600">{cert.issuer}</p>
                        <p className="text-xs text-gray-500 mt-1">Issued {cert.year}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CandidatePage;