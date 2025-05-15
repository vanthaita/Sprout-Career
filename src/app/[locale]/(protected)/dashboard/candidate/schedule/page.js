'use client'
import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Video, ChevronDown, ChevronLeft, ChevronRight, Plus, Filter, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const ScheduleCandidatePage = () => {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [viewMode, setViewMode] = useState('week')
    const [activeTab, setActiveTab] = useState('upcoming')

    const interviews = {
        upcoming: [
            {
                id: 1,
                jobTitle: 'Frontend Developer (React)',
                company: 'TechSolutions Inc.',
                type: 'Technical Interview',
                date: new Date('2023-12-05T14:00:00'),
                duration: '60 mins',
                format: 'Video Call',
                interviewer: 'Hiroshi Tanaka (Engineering Manager)',
                status: 'confirmed',
                preparation: 'Focus on component architecture and state management'
            },
            {
                id: 2,
                jobTitle: 'UX Designer',
                company: 'DesignHub Japan',
                type: 'Portfolio Review',
                date: new Date('2023-12-08T10:30:00'),
                duration: '45 mins',
                format: 'In-Person',
                location: 'DesignHub Office, Shibuya',
                interviewer: 'Aiko Watanabe (Design Director)',
                status: 'confirmed',
                preparation: 'Prepare 2-3 case studies to walk through'
            }
        ],
        completed: [
            {
                id: 3,
                jobTitle: 'Backend Engineer',
                company: 'DataSystems Co.',
                type: 'Technical Screening',
                date: new Date('2023-11-25T15:00:00'),
                duration: '90 mins',
                format: 'Video Call',
                interviewer: 'Kenji Sato (Senior Engineer)',
                status: 'completed',
                feedback: 'Technical skills were strong. Waiting for next steps.'
            }
        ]
    }

    const timeSlots = Array.from({ length: 12 }, (_, i) => {
        const hour = i + 8
        return `${hour}:00 - ${hour + 1}:00`
    })

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        })
    }

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const navigateWeek = (direction) => {
        const newDate = new Date(currentDate)
        if (direction === 'prev') {
            newDate.setDate(newDate.getDate() - 7)
        } else {
            newDate.setDate(newDate.getDate() + 7)
        }
        setCurrentDate(newDate)
    }

    const getWeekDates = () => {
        const dates = []
        const startDate = new Date(currentDate)
        startDate.setDate(startDate.getDate() - startDate.getDay())

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate)
            date.setDate(date.getDate() + i)
            dates.push(date)
        }

        return dates
    }

    const weekDates = getWeekDates()

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Interview Schedule</h1>
                    <p className="text-gray-600">Manage your upcoming interviews and availability</p>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                    </Button>
                    <Button className="bg-[#3A6B4C] hover:bg-[#2D5542] gap-2">
                        <Plus className="h-4 w-4" />
                        Add Availability
                    </Button>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigateWeek('prev')}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold">
                        {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={() => navigateWeek('next')}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>

                <Tabs value={viewMode} onValueChange={setViewMode} className="w-[200px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="mb-8">
                <div className="grid grid-cols-8 border rounded-lg overflow-hidden">
                    <div className="col-span-1 border-r">
                        <div className="h-12 border-b flex items-center justify-center bg-gray-50">
                            <Clock className="h-4 w-4 text-gray-500" />
                        </div>
                        {timeSlots.map((time, index) => (
                            <div key={index} className="h-16 border-b flex items-center justify-center text-sm text-gray-500">
                                {time}
                            </div>
                        ))}
                    </div>

                    {weekDates.map((date, dayIndex) => {
                        const dayInterviews = interviews.upcoming.filter(
                            interview => interview.date.getDate() === date.getDate() &&
                                interview.date.getMonth() === date.getMonth()
                        )

                        return (
                            <div key={dayIndex} className="col-span-1 border-r last:border-r-0">
                                <div className="h-12 border-b flex flex-col items-center justify-center bg-gray-50">
                                    <div className="text-sm font-medium">
                                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                    </div>
                                    <div className={`text-xs rounded-full w-6 h-6 flex items-center justify-center 
                        ${date.getDate() === new Date().getDate() ? 'bg-[#3A6B4C] text-white' : ''}`}>
                                        {date.getDate()}
                                    </div>
                                </div>

                                {timeSlots.map((_, timeIndex) => {
                                    const slotStart = new Date(date)
                                    slotStart.setHours(8 + timeIndex, 0, 0)

                                    const slotEnd = new Date(date)
                                    slotEnd.setHours(8 + timeIndex + 1, 0, 0)

                                    const interview = dayInterviews.find(int => {
                                        const intDate = int.date
                                        return intDate >= slotStart && intDate < slotEnd
                                    })

                                    return (
                                        <div key={timeIndex} className="h-16 border-b relative">
                                            {interview && (
                                                <div className="absolute inset-1 bg-[#E6DABE] rounded p-1 overflow-hidden">
                                                    <div className="text-xs font-medium truncate">{interview.company}</div>
                                                    <div className="text-[10px] truncate">{interview.type}</div>
                                                    <div className="text-[10px]">{formatTime(interview.date)}</div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <div className="mt-4">
                    {activeTab === 'upcoming' ? (
                        <div className="space-y-4">
                            {interviews.upcoming.map((interview) => (
                                <Card key={interview.id}>
                                    <CardHeader className="pb-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">{interview.jobTitle}</CardTitle>
                                                <p className="text-gray-700">{interview.company}</p>
                                            </div>
                                            <Badge className="bg-blue-100 text-blue-800">
                                                {interview.status}
                                            </Badge>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-start gap-3">
                                                <Calendar className="h-5 w-5 text-[#3A6B4C] mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Date & Time</p>
                                                    <p className="font-medium">
                                                        {formatDate(interview.date)} • {formatTime(interview.date)}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{interview.duration}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                {interview.format === 'Video Call' ? (
                                                    <Video className="h-5 w-5 text-[#3A6B4C] mt-0.5" />
                                                ) : (
                                                    <MapPin className="h-5 w-5 text-[#3A6B4C] mt-0.5" />
                                                )}
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        {interview.format}
                                                    </p>
                                                    <p className="font-medium">
                                                        {interview.format === 'Video Call' ?
                                                            'Zoom Meeting' : interview.location}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 p-3 bg-[#F8F9F8] rounded-lg border border-[#E6DABE]">
                                            <h3 className="text-sm font-semibold text-[#3A6B4C] mb-2">
                                                Preparation Notes
                                            </h3>
                                            <p className="text-sm text-gray-700">{interview.preparation}</p>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex justify-between border-t pt-4">
                                        <Button variant="outline">Reschedule</Button>
                                        <div className="space-x-2">
                                            <Button variant="outline">Add to Calendar</Button>
                                            <Button className="bg-[#3A6B4C] hover:bg-[#2D5542]">
                                                Prepare Now
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {interviews.completed.map((interview) => (
                                <Card key={interview.id}>
                                    <CardHeader className="pb-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle className="text-lg">{interview.jobTitle}</CardTitle>
                                                <p className="text-gray-700">{interview.company}</p>
                                            </div>
                                            <Badge className="bg-gray-100 text-gray-800">Completed</Badge>
                                        </div>
                                    </CardHeader>

                                    <CardContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                            <div className="flex items-start gap-3">
                                                <Calendar className="h-5 w-5 text-[#3A6B4C] mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Date & Time</p>
                                                    <p className="font-medium">
                                                        {formatDate(interview.date)} • {formatTime(interview.date)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <User className="h-5 w-5 text-[#3A6B4C] mt-0.5" />
                                                <div>
                                                    <p className="text-sm text-gray-500">Interviewer</p>
                                                    <p className="font-medium">{interview.interviewer}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                            <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                                Your Feedback
                                            </h3>
                                            <p className="text-sm text-gray-700">{interview.feedback}</p>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex justify-between border-t pt-4">
                                        <Button variant="outline">View Notes</Button>
                                        <Button variant="outline">Request Detailed Feedback</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </Tabs>
        </div>
    )
}

export default ScheduleCandidatePage