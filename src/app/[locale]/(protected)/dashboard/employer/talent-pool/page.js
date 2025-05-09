'use client'
import React, { useState } from 'react'
import { Search, Filter, MessageSquare, Mail, ChevronDown, Star, MapPin, Briefcase, WavesLadder } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'

const TalentPoolPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    location: '',
    skills: '',
    availability: ''
  })

  // Mock talent pool data
  const candidates = [
    {
      id: 1,
      name: 'Yuki Tanaka',
      title: 'Senior Frontend Developer',
      location: 'Tokyo, Japan',
      skills: ['React', 'TypeScript', 'Next.js', 'UI/UX'],
      availability: 'Immediate',
      experience: '5 years',
      rating: 4.8,
      lastActive: '2 days ago',
      image: '/avatars/yuki-tanaka.jpg'
    },
    {
      id: 2,
      name: 'Hiroshi Yamamoto',
      title: 'Backend Engineer',
      location: 'Osaka, Japan',
      skills: ['Node.js', 'Python', 'AWS', 'Microservices'],
      availability: '2 weeks notice',
      experience: '7 years',
      rating: 4.5,
      lastActive: '1 week ago',
      image: '/avatars/hiroshi-yamamoto.jpg'
    },
    {
      id: 3,
      name: 'Aiko Sato',
      title: 'UX/UI Designer',
      location: 'Remote',
      skills: ['Figma', 'User Research', 'Prototyping', 'Accessibility'],
      availability: 'Freelance',
      experience: '4 years',
      rating: 4.9,
      lastActive: 'Active now',
      image: '/avatars/aiko-sato.jpg'
    },
    {
      id: 4,
      name: 'Takashi Kobayashi',
      title: 'DevOps Engineer',
      location: 'Yokohama, Japan',
      skills: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
      availability: '1 month notice',
      experience: '6 years',
      rating: 4.7,
      lastActive: '3 days ago',
      image: '/avatars/takashi-kobayashi.jpg'
    }
  ]

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = searchTerm === '' || 
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      candidate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesLocation = !filters.location || candidate.location.includes(filters.location)
    const matchesSkills = !filters.skills || candidate.skills.includes(filters.skills)
    const matchesAvailability = !filters.availability || candidate.availability === filters.availability
    
    return matchesSearch && matchesLocation && matchesSkills && matchesAvailability
  })

  const handleMessageCandidate = (candidateId) => {
    // In a real app, this would open a messaging modal or navigate to messaging
    console.log(`Messaging candidate ${candidateId}`)
    alert(`Messaging ${candidates.find(c => c.id === candidateId).name}`)
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[#3A6B4C]"
            >
              <WavesLadder className="h-5 w-5 text-white" />
            </div>
            <div>
            <h1 className="text-lg font-semibold">Talent Pool</h1>
            <p className="text-gray-600">Discover and connect with top candidates</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
              <Button className="bg-[#3A6B4C] hover:bg-[#2D5542] gap-2">
                <Mail className="h-4 w-4" />
                Bulk Message
              </Button>
          </div>
        </div>
      </header>

      <div className="py-6 px-4 space-y-6">
      {/* Search and Filter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, skills, or role..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <MapPin className="h-4 w-4 mr-2" />
                  {filters.location || 'Location'}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem onClick={() => setFilters({...filters, location: ''})}>
                  Any Location
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({...filters, location: 'Tokyo'})}>
                  Tokyo
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({...filters, location: 'Osaka'})}>
                  Osaka
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({...filters, location: 'Remote'})}>
                  Remote
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  <Briefcase className="h-4 w-4 mr-2" />
                  {filters.availability || 'Availability'}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuItem onClick={() => setFilters({...filters, availability: ''})}>
                  Any Availability
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({...filters, availability: 'Immediate'})}>
                  Immediate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({...filters, availability: '2 weeks notice'})}>
                  2 weeks notice
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({...filters, availability: 'Freelance'})}>
                  Freelance
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Talent Pool Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCandidates.length > 0 ? (
            filteredCandidates.map((candidate) => (
              <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 border flex items-center justify-center overflow-hidden">
                      {candidate.image ? (
                        <img 
                          src={candidate.image} 
                          alt={candidate.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                          {candidate.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{candidate.name}</CardTitle>
                      <p className="text-gray-700">{candidate.title}</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{candidate.rating}</span>
                      <span className="text-gray-500 text-sm ml-1">({candidate.experience})</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {candidate.availability}
                    </Badge>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-2">Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs font-normal">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{candidate.location}</span>
                    <span className="mx-2">•</span>
                    <span>{candidate.lastActive}</span>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-[#3A6B4C] hover:bg-[#2D5542] gap-2"
                    onClick={() => handleMessageCandidate(candidate.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    Message
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="h-24 w-24 mx-auto bg-[#3A6B4C]/10 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="h-12 w-12 text-[#3A6B4C]" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TalentPoolPage