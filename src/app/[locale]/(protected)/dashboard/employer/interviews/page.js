'use client'
import { useState } from "react";
import { Calendar, Clock, User, Video, MapPin, ChevronDown, Search, Plus, Filter, MoreVertical, Star, FolderKanbanIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const InterviewPage = () => {
  const primaryColor = '#3A6B4C';
  const [view, setView] = useState("upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedInterview, setExpandedInterview] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [ratings, setRatings] = useState({});

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

  const filteredInterviews = interviews
    .filter(interview => view === "upcoming" ? interview.status === "scheduled" : interview.status === "completed")
    .filter(interview => 
      interview.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      interview.candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getInterviewTypeColor = (type) => {
    switch(type) {
      case 'technical': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'culture-fit': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const handleStartInterview = (interview) => {
    if (interview.method === "online") {
      window.open(interview.meetingLink, '_blank');
    } else {
      console.log("Starting onsite interview with", interview.candidate.name);
    }
  };

  const handleReschedule = (interviewId) => {
    console.log("Rescheduling interview", interviewId);
  };

  const handleCancel = (interviewId) => {
    console.log("Canceling interview", interviewId);
  };

  const toggleExpand = (interviewId) => {
    setExpandedInterview(expandedInterview === interviewId ? null : interviewId);
  };

  const handleFeedbackChange = (interviewId, value) => {
    setFeedback(prev => ({...prev, [interviewId]: value}));
  };

  const handleRatingChange = (interviewId, rating) => {
    setRatings(prev => ({...prev, [interviewId]: rating}));
  };

  const submitFeedback = (interviewId) => {
    console.log("Submitting feedback for interview", interviewId, {
      rating: ratings[interviewId] || 0,
      feedback: feedback[interviewId] || ""
    });
    setExpandedInterview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-md bg-[#3A6B4C]"
            >
              <FolderKanbanIcon className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold dark:text-white">Interview Manage</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button style={{ backgroundColor: primaryColor }} className="gap-2 text-white hover:bg-[#2d553c]">
              <Plus className="h-4 w-4" />
              New Interview
            </Button>
          </div>
        </div>
      </header>

      <div className="py-6 px-4 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm ứng viên hoặc vị trí..."
              className="pl-10 bg-white dark:bg-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant={view === "upcoming" ? "default" : "outline"} 
              onClick={() => setView("upcoming")}
              style={view === "upcoming" ? { backgroundColor: primaryColor } : {}}
              className="dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Sắp diễn ra
            </Button>
            <Button 
              variant={view === "completed" ? "default" : "outline"} 
              onClick={() => setView("completed")}
              style={view === "completed" ? { backgroundColor: primaryColor } : {}}
              className="dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Đã hoàn thành
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 dark:border-gray-600 dark:hover:bg-gray-700">
                  <Filter className="h-4 w-4" />
                  Bộ lọc
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
                <DropdownMenuItem className="dark:hover:bg-gray-700">Theo ngày</DropdownMenuItem>
                <DropdownMenuItem className="dark:hover:bg-gray-700">Theo loại phỏng vấn</DropdownMenuItem>
                <DropdownMenuItem className="dark:hover:bg-gray-700">Theo hình thức</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-500 dark:text-gray-400">Tổng số phỏng vấn</CardDescription>
              <CardTitle className="text-2xl font-bold">{interviews.length}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={100} className="h-2" style={{ backgroundColor: primaryColor }} />
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-500 dark:text-gray-400">Sắp diễn ra</CardDescription>
              <CardTitle className="text-2xl font-bold">{interviews.filter(i => i.status === "scheduled").length}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(interviews.filter(i => i.status === "scheduled").length / interviews.length) * 100} 
                className="h-2" 
                style={{ backgroundColor: primaryColor }} 
              />
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-500 dark:text-gray-400">Đã hoàn thành</CardDescription>
              <CardTitle className="text-2xl font-bold">{interviews.filter(i => i.status === "completed").length}</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(interviews.filter(i => i.status === "completed").length / interviews.length) * 100} 
                className="h-2" 
                style={{ backgroundColor: primaryColor }} 
              />
            </CardContent>
          </Card>
        </div>

        {filteredInterviews.length > 0 ? (
          <div className="space-y-4">
            {filteredInterviews.map(interview => (
              <Card key={interview.id} className="bg-white dark:bg-gray-800 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={interview.candidate.avatar} />
                        <AvatarFallback>
                          {interview.candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-lg dark:text-white">{interview.candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{interview.candidate.position}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm dark:text-gray-300">{new Date(interview.date).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm dark:text-gray-300">{interview.time} ({interview.duration} phút)</span>
                      </div>
                      <div>
                        <Badge className={`${getInterviewTypeColor(interview.type)} text-xs`}>
                          {interview.type === 'technical' ? 'Kỹ thuật' : 'Văn hoá'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        {interview.method === "online" ? (
                          <>
                            <Video className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm dark:text-gray-300">Online</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm dark:text-gray-300">Onsite</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Người phỏng vấn:</h4>
                      <div className="flex flex-wrap gap-2">
                        {interview.interviewers.map((interviewer, idx) => (
                          <Badge key={idx} variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                            <User className="h-3 w-3 mr-1" />
                            {interviewer}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {interview.method === "online" ? (
                      <div>
                        <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Meeting link:</h4>
                        <a 
                          href={interview.meetingLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {interview.meetingLink}
                        </a>
                      </div>
                    ) : (
                      <div>
                        <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Địa điểm:</h4>
                        <p className="text-sm dark:text-gray-300">{interview.location}</p>
                      </div>
                    )}
                  </div>

                  {interview.status === "completed" && (
                    <div className="mt-6">
                      <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Đánh giá:</h4>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < (interview.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`} 
                          />
                        ))}
                        <span className="text-sm text-muted-foreground">({interview.rating || 0}/5)</span>
                      </div>
                      {interview.notes && (
                        <>
                          <h4 className="text-sm font-medium mt-4 mb-2 dark:text-gray-300">Ghi chú:</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">{interview.notes}</p>
                        </>
                      )}
                    </div>
                  )}

                  {interview.status === "completed" && expandedInterview === interview.id && (
                    <div className="mt-6 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Đánh giá ứng viên:</h4>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`h-6 w-6 cursor-pointer ${star <= (ratings[interview.id] || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
                              onClick={() => handleRatingChange(interview.id, star)}
                            />
                          ))}
                          <span className="text-sm text-muted-foreground ml-2">
                            {ratings[interview.id] ? `${ratings[interview.id]}/5` : "Chọn số sao"}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Nhận xét chi tiết:</h4>
                        <Textarea
                          className="bg-white dark:bg-gray-700 dark:text-white"
                          placeholder="Nhập nhận xét về ứng viên..."
                          value={feedback[interview.id] || ""}
                          onChange={(e) => handleFeedbackChange(interview.id, e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setExpandedInterview(null)}
                          className="dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          Huỷ
                        </Button>
                        <Button 
                          style={{ backgroundColor: primaryColor }}
                          onClick={() => submitFeedback(interview.id)}
                          disabled={!ratings[interview.id]}
                        >
                          Gửi nhận xét
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap gap-3">
                    {interview.status === "scheduled" ? (
                      <>
                        <Button 
                          variant="default" 
                          onClick={() => handleStartInterview(interview)}
                          style={{ backgroundColor: primaryColor }}
                          className="hover:bg-[#2d553c]"
                        >
                          Bắt đầu phỏng vấn
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleReschedule(interview.id)}
                          className="dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          Dời lịch
                        </Button>
                        <Button 
                          variant="outline" 
                          className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/20 dark:text-red-400"
                          onClick={() => handleCancel(interview.id)}
                        >
                          Huỷ phỏng vấn
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outline" 
                          onClick={() => toggleExpand(interview.id)}
                          className="dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          {expandedInterview === interview.id ? "Ẩn phản hồi" : "Thêm phản hồi"}
                        </Button>
                        <Button 
                          variant="outline" 
                          className="dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          Xem chi tiết
                        </Button>
                      </>
                    )}
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="ml-auto">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
                        <DropdownMenuItem className="dark:hover:bg-gray-700">Gửi email nhắc nhở</DropdownMenuItem>
                        <DropdownMenuItem className="dark:hover:bg-gray-700">Xem hồ sơ ứng viên</DropdownMenuItem>
                        <DropdownMenuItem className="dark:hover:bg-gray-700">Thêm ghi chú</DropdownMenuItem>
                        {interview.status === "completed" && (
                          <DropdownMenuItem className="dark:hover:bg-gray-700">Đánh giá lại</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center py-12 bg-white dark:bg-gray-800">
            <Calendar className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
              {view === "upcoming" ? "Không có lịch phỏng vấn sắp tới" : "Không có lịch phỏng vấn đã hoàn thành"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {view === "upcoming" 
                ? "Hãy lên lịch phỏng vấn mới cho ứng viên" 
                : "Các phỏng vấn đã hoàn thành sẽ xuất hiện ở đây"}
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InterviewPage;