'use client'
import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Video, Phone, CheckCircle, ChevronDown, Briefcase, User, ClipboardList, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

const CandidateInterviewPage = () => {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [showPrepModal, setShowPrepModal] = useState(false)
  const [selectedInterview, setSelectedInterview] = useState(null)

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
        preparation: {
          materials: ['React Hooks', 'TypeScript', 'UI Design Patterns'],
          tips: 'Focus on component architecture and state management'
        }
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

  const formatDate = (date) => {
    return date.toLocaleDateString('ja-JP', { 
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const openPrepModal = (interview) => {
    setSelectedInterview(interview)
    setShowPrepModal(true)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">My Interviews</h1>
          <p className="text-gray-600">Prepare for upcoming interviews and review past ones</p>
        </div>
        
        <Button className="bg-[#3A6B4C] hover:bg-[#2D5542] flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          View My Applications
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="space-y-4 mt-4">
            {interviews.upcoming.length > 0 ? (
              interviews.upcoming.map((interview) => (
                <InterviewCard 
                  key={interview.id} 
                  interview={interview} 
                  formatDate={formatDate}
                  openPrepModal={openPrepModal}
                  isUpcoming={true}
                />
              ))
            ) : (
              <EmptyState tab="upcoming" />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="space-y-4 mt-4">
            {interviews.completed.length > 0 ? (
              interviews.completed.map((interview) => (
                <InterviewCard 
                  key={interview.id} 
                  interview={interview} 
                  formatDate={formatDate}
                  openPrepModal={openPrepModal}
                  isUpcoming={false}
                />
              ))
            ) : (
              <EmptyState tab="completed" />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const InterviewCard = ({ interview, formatDate, openPrepModal, isUpcoming }) => {
  return (
    <Card key={interview.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{interview.jobTitle}</CardTitle>
            <p className="text-gray-700">{interview.company}</p>
          </div>
          <Badge 
            variant={interview.status === 'confirmed' ? 'default' : 'secondary'}
            className={interview.status === 'confirmed' ? 
              'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
          >
            {interview.status === 'confirmed' ? 'Confirmed' : 'Completed'}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-[#3A6B4C] mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Date & Time</p>
              <p className="font-medium">{formatDate(interview.date)}</p>
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
          
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-[#3A6B4C] mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Interviewer</p>
              <p className="font-medium">{interview.interviewer}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <ClipboardList className="h-5 w-5 text-[#3A6B4C] mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Interview Type</p>
              <p className="font-medium">{interview.type}</p>
            </div>
          </div>
        </div>
        
        {isUpcoming && interview.preparation && (
          <div className="mt-4 p-4 bg-[#F8F9F8] rounded-lg border border-[#E6DABE]">
            <h3 className="text-sm font-semibold text-[#3A6B4C] mb-2 flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Preparation Guide
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-1">Study Materials:</p>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {interview.preparation.materials.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Interviewer Tips:</p>
                <p className="text-sm text-gray-700">{interview.preparation.tips}</p>
              </div>
            </div>
          </div>
        )}
        
        {!isUpcoming && interview.feedback && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Feedback</h3>
            <p className="text-sm text-gray-700">{interview.feedback}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        {isUpcoming ? (
          <>
            <Button variant="outline" size="sm">
              Reschedule
            </Button>
            <div className="space-x-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button 
                className="bg-[#3A6B4C] hover:bg-[#2D5542]" 
                size="sm"
                onClick={() => openPrepModal(interview)}
              >
                Prepare Now
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm">
              View Notes
            </Button>
            <Button variant="outline" size="sm">
              Request Feedback
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

const EmptyState = ({ tab }) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <div className="mx-auto max-w-md">
        <div className="h-24 w-24 mx-auto bg-[#3A6B4C]/10 rounded-full flex items-center justify-center mb-4">
          <Calendar className="h-12 w-12 text-[#3A6B4C]" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {tab === 'upcoming' ? 'No upcoming interviews' : 'No completed interviews'}
        </h3>
        <p className="text-gray-500 mb-6">
          {tab === 'upcoming' ? 
            "You don't have any scheduled interviews yet." : 
            "Your completed interviews will appear here."}
        </p>
        {tab === 'upcoming' && (
          <Button className="bg-[#3A6B4C] hover:bg-[#2D5542]">
            <Briefcase className="h-4 w-4 mr-2" />
            Check Your Applications
          </Button>
        )}
      </div>
    </div>
  )
}

export default CandidateInterviewPage






