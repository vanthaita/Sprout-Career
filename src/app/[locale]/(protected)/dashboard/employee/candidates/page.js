'use client'
import {useState} from 'react'
import { Search, Filter, ChevronDown, Mail, Phone, Star, FileText, MoreVertical, PlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const CandidatesPage = () => {
  const primaryColor = '#3A6B4C';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Sample candidate data
  const candidates = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "+1 555-0123",
      status: "shortlisted",
      skills: ["React", "TypeScript", "Node.js"],
      lastUpdated: "2023-06-15",
      avatar: "/avatars/01.png",
      resume: true,
      rating: 4
    },
    {
      id: 2,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      phone: "+1 555-4567",
      status: "interview",
      skills: ["UX Design", "Figma", "User Research"],
      lastUpdated: "2023-06-10",
      avatar: "/avatars/02.png",
      resume: true,
      rating: 5
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 555-8910",
      status: "new",
      skills: ["Python", "Data Analysis", "Machine Learning"],
      lastUpdated: "2023-06-18",
      avatar: "/avatars/03.png",
      resume: false,
      rating: 3
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 555-1112",
      status: "rejected",
      skills: ["Project Management", "Agile", "Scrum"],
      lastUpdated: "2023-06-05",
      avatar: "/avatars/04.png",
      resume: true,
      rating: 2
    }
  ];

  // Filter and sort candidates
  const filteredCandidates = candidates
    .filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'interview', label: 'Interview' },
    { value: 'hired', label: 'Hired' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'rating', label: 'Highest Rating' },
    { value: 'name', label: 'Name (A-Z)' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-purple-100 text-purple-800';
      case 'interview': return 'bg-yellow-100 text-yellow-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Candidates</h1>
        <Button style={{ backgroundColor: primaryColor }} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Candidate
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates by name or skills..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {statusOptions.find(opt => opt.value === statusFilter)?.label}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {statusOptions.map(option => (
                <DropdownMenuItem 
                  key={option.value} 
                  onClick={() => setStatusFilter(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortOptions.map(option => (
                <DropdownMenuItem 
                  key={option.value} 
                  onClick={() => setSortBy(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Candidates Grid */}
      {filteredCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map(candidate => (
            <div key={candidate.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={candidate.avatar} />
                      <AvatarFallback>
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{candidate.name}</h3>
                      <p className="text-sm text-muted-foreground">{candidate.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < candidate.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Badge className={getStatusColor(candidate.status)}>
                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Updated: {new Date(candidate.lastUpdated).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map(skill => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Phone className="h-4 w-4" />
                    </Button>
                    {candidate.resume && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <FileText className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Interview</DropdownMenuItem>
                      <DropdownMenuItem>Add Note</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Reject</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border">
          <Search className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">No candidates found</h3>
          <p className="text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default CandidatesPage;