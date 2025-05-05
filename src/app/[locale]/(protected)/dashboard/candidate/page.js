'use client'
import React from 'react'
import { Briefcase, Calendar, CheckCircle, Clock, FileText, Mail, User } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

const CandidateDashboard = () => {
  const stats = [
    { 
      title: 'Active Applications', 
      value: 5, 
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      change: '+2 from last month'
    },
    { 
      title: 'Upcoming Interviews', 
      value: 3, 
      icon: <Calendar className="h-5 w-5 text-orange-500" />,
      change: '1 tomorrow'
    },
    { 
      title: 'Unread Messages', 
      value: 4, 
      icon: <Mail className="h-5 w-5 text-purple-500" />,
      change: '2 new today'
    },
    { 
      title: 'Profile Completion', 
      value: 85, 
      icon: <User className="h-5 w-5 text-green-500" />,
      change: '15% remaining'
    }
  ]

  const recentApplications = [
    {
      id: 1,
      company: 'TechSolutions Inc.',
      position: 'Frontend Developer',
      status: 'Interview',
      date: '2023-11-15',
      progress: 60
    },
    {
      id: 2,
      company: 'DesignHub',
      position: 'UX Designer',
      status: 'Document Review',
      date: '2023-11-10',
      progress: 30
    },
    {
      id: 3,
      company: 'DataSystems',
      position: 'Backend Engineer',
      status: 'Applied',
      date: '2023-11-05',
      progress: 10
    }
  ]

  const upcomingInterviews = [
    {
      id: 1,
      company: 'TechSolutions Inc.',
      position: 'Frontend Developer',
      date: '2023-11-20',
      time: '14:00 - 15:00',
      type: 'Technical Interview'
    },
    {
      id: 2,
      company: 'DesignHub',
      position: 'UX Designer',
      date: '2023-11-22',
      time: '10:30 - 11:15',
      type: 'Portfolio Review'
    }
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s your job search at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}{stat.title === 'Profile Completion' ? '%' : ''}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#3A6B4C]" />
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{app.position}</h3>
                        <p className="text-sm text-gray-600">{app.company}</p>
                      </div>
                      <Badge variant="outline" className="text-xs capitalize">
                        {app.status}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Applied on {app.date}</span>
                        <span>Stage {app.progress}%</span>
                      </div>
                      <Progress value={app.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-center border-t pt-4">
              <Button variant="ghost" className="text-[#3A6B4C]">
                View All Applications
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#3A6B4C]" />
                Upcoming Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterviews.map((interview) => (
                  <div key={interview.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{interview.position}</h3>
                        <p className="text-sm text-gray-600">{interview.company}</p>
                      </div>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-800">
                        {interview.type}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{interview.date} • {interview.time}</span>
                    </div>
                    <Button variant="outline" size="sm" className="mt-3 w-full">
                      Prepare for Interview
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-center border-t pt-4">
              <Button variant="ghost" className="text-[#3A6B4C]">
                View Full Schedule
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex flex-col h-20">
                <FileText className="h-5 w-5 mb-1 text-[#3A6B4C]" />
                <span className="text-xs">Update CV</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20">
                <User className="h-5 w-5 mb-1 text-[#3A6B4C]" />
                <span className="text-xs">Edit Profile</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20">
                <Briefcase className="h-5 w-5 mb-1 text-[#3A6B4C]" />
                <span className="text-xs">Search Jobs</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-20">
                <CheckCircle className="h-5 w-5 mb-1 text-[#3A6B4C]" />
                <span className="text-xs">View Offers</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CandidateDashboard