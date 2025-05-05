'use client'
import { useState } from "react";
import { Calendar, Clock, User, Video, MapPin, ChevronDown, Search, Plus, Filter, MoreVertical, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const InterviewPage = () => {
  const primaryColor = '#3A6B4C';
  const [view, setView] = useState("upcoming"); // 'upcoming' or 'completed'
  const [searchTerm, setSearchTerm] = useState("");

  // Sample interview data
  const interviews = [
    {
      id: 1,
      candidate: {
        name: "Nguyễn Văn A",
        position: "Frontend Developer",
        avatar: "/avatars/01.png"
      },
      date: "2023-06-15",
      time: "14:00",
      duration: 60,
      type: "technical",
      method: "online",
      status: "scheduled",
      interviewers: ["Trần Thị B", "Lê Văn C"],
      meetingLink: "https://meet.google.com/abc-xyz"
    },
    {
      id: 2,
      candidate: {
        name: "Trần Thị B",
        position: "UX Designer",
        avatar: "/avatars/02.png"
      },
      date: "2023-06-16",
      time: "09:30",
      duration: 90,
      type: "culture-fit",
      method: "onsite",
      status: "scheduled",
      interviewers: ["Nguyễn Văn A"],
      location: "Tầng 5, Toà nhà X, 123 Nguyễn Du"
    },
    {
      id: 3,
      candidate: {
        name: "Lê Văn C",
        position: "Backend Engineer",
        avatar: "/avatars/03.png"
      },
      date: "2023-06-10",
      time: "13:00",
      duration: 60,
      type: "technical",
      method: "online",
      status: "completed",
      interviewers: ["Trần Thị B"],
      rating: 4,
      notes: "Kỹ năng tốt, cần đánh giá thêm về kinh nghiệm"
    }
  ];

  // Filter interviews based on view and search term
  const filteredInterviews = interviews
    .filter(interview => view === "upcoming" ? interview.status === "scheduled" : interview.status === "completed")
    .filter(interview => 
      interview.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getInterviewTypeColor = (type) => {
    switch(type) {
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'culture-fit': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartInterview = (interview) => {
    if (interview.method === "online") {
      window.open(interview.meetingLink, '_blank');
    } else {
      // Navigate to onsite interview details
      console.log("Starting onsite interview with", interview.candidate.name);
    }
  };

  const handleReschedule = (interviewId) => {
    console.log("Rescheduling interview", interviewId);
  };

  const handleCancel = (interviewId) => {
    console.log("Canceling interview", interviewId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý phỏng vấn</h1>
        <Button style={{ backgroundColor: primaryColor }} className="gap-2">
          <Plus className="h-4 w-4" />
          Lịch phỏng vấn mới
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm ứng viên hoặc vị trí..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={view === "upcoming" ? "default" : "outline"} 
            onClick={() => setView("upcoming")}
            style={view === "upcoming" ? { backgroundColor: primaryColor } : {}}
          >
            Sắp diễn ra
          </Button>
          <Button 
            variant={view === "completed" ? "default" : "outline"} 
            onClick={() => setView("completed")}
            style={view === "completed" ? { backgroundColor: primaryColor } : {}}
          >
            Đã hoàn thành
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Bộ lọc
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Theo ngày</DropdownMenuItem>
              <DropdownMenuItem>Theo loại phỏng vấn</DropdownMenuItem>
              <DropdownMenuItem>Theo hình thức</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Interviews List */}
      {filteredInterviews.length > 0 ? (
        <div className="space-y-4">
          {filteredInterviews.map(interview => (
            <div key={interview.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Candidate Info */}
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={interview.candidate.avatar} />
                      <AvatarFallback>
                        {interview.candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{interview.candidate.name}</h3>
                      <p className="text-sm text-muted-foreground">{interview.candidate.position}</p>
                    </div>
                  </div>

                  {/* Interview Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(interview.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{interview.time} ({interview.duration} phút)</span>
                    </div>
                    <div>
                      <Badge className={getInterviewTypeColor(interview.type)}>
                        {interview.type === 'technical' ? 'Kỹ thuật' : 'Văn hoá'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {interview.method === "online" ? (
                        <>
                          <Video className="h-4 w-4 text-muted-foreground" />
                          <span>Online</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>Onsite</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-1">Người phỏng vấn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {interview.interviewers.map((interviewer, idx) => (
                        <Badge key={idx} variant="outline">
                          {interviewer}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {interview.method === "online" ? (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Meeting link:</h4>
                      <a 
                        href={interview.meetingLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {interview.meetingLink}
                      </a>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Địa điểm:</h4>
                      <p className="text-sm">{interview.location}</p>
                    </div>
                  )}
                </div>

                {/* Completed Interview Info */}
                {interview.status === "completed" && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-1">Đánh giá:</h4>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < interview.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="text-sm text-muted-foreground">({interview.rating}/5)</span>
                    </div>
                    {interview.notes && (
                      <>
                        <h4 className="text-sm font-medium mt-2 mb-1">Ghi chú:</h4>
                        <p className="text-sm text-gray-700">{interview.notes}</p>
                      </>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {interview.status === "scheduled" ? (
                    <>
                      <Button 
                        variant="default" 
                        onClick={() => handleStartInterview(interview)}
                        style={{ backgroundColor: primaryColor }}
                      >
                        Bắt đầu phỏng vấn
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleReschedule(interview.id)}
                      >
                        Dời lịch
                      </Button>
                      <Button 
                        variant="outline" 
                        className="text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleCancel(interview.id)}
                      >
                        Huỷ phỏng vấn
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline">Xem chi tiết</Button>
                  )}
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="ml-auto">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Gửi email nhắc nhở</DropdownMenuItem>
                      <DropdownMenuItem>Xem hồ sơ ứng viên</DropdownMenuItem>
                      <DropdownMenuItem>Thêm ghi chú</DropdownMenuItem>
                      {interview.status === "completed" && (
                        <DropdownMenuItem>Đánh giá lại</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border">
          <Calendar className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {view === "upcoming" ? "Không có lịch phỏng vấn sắp tới" : "Không có lịch phỏng vấn đã hoàn thành"}
          </h3>
          <p className="text-sm text-gray-500">
            {view === "upcoming" 
              ? "Hãy lên lịch phỏng vấn mới cho ứng viên" 
              : "Các phỏng vấn đã hoàn thành sẽ xuất hiện ở đây"}
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewPage;