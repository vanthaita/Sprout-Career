'use client'
import { useState } from "react";
import { FileText, Mail, Check, X, Clock, ChevronDown, Search, Plus, HandCoins, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const OfferPage = () => {
  const primaryColor = '#3A6B4C';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Sample offer data
  const offers = [
    {
      id: 1,
      candidate: {
        name: "Nguyễn Văn A",
        position: "Frontend Developer",
        avatar: "/avatars/01.png",
        email: "nguyenvana@example.com",
        matchScore: 85 // Thêm match score
      },
      jobTitle: "Senior Frontend Engineer",
      salary: "45,000,000 VND",
      status: "pending",
      sentDate: "2023-06-10",
      deadline: "2023-06-20",
      notes: "Candidate requested 2 more days to consider",
      daysLeft: 3 // Thêm số ngày còn lại
    },
    {
      id: 2,
      candidate: {
        name: "Trần Thị B",
        position: "UX Designer",
        avatar: "/avatars/02.png",
        email: "tranthib@example.com",
        matchScore: 92
      },
      jobTitle: "Product Designer",
      salary: "38,000,000 VND",
      status: "accepted",
      sentDate: "2023-06-05",
      deadline: "2023-06-15",
      notes: "Will start on July 1st",
      daysLeft: -5 // Đã quá hạn
    },
    {
      id: 3,
      candidate: {
        name: "Lê Văn C",
        position: "Backend Engineer",
        avatar: "/avatars/03.png",
        email: "levanc@example.com",
        matchScore: 78
      },
      jobTitle: "Node.js Developer",
      salary: "42,000,000 VND",
      status: "rejected",
      sentDate: "2023-05-28",
      deadline: "2023-06-07",
      notes: "Accepted another offer with higher salary",
      daysLeft: -10
    }
  ];

  // Filter and sort offers
  const filteredOffers = offers
    .filter(offer => {
      const matchesSearch = offer.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          offer.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.sentDate) - new Date(a.sentDate);
      } else if (sortBy === 'deadline') {
        return a.daysLeft - b.daysLeft; // Sắp xếp theo số ngày còn lại
      } else {
        return a.candidate.name.localeCompare(b.candidate.name);
      }
    });

  const statusOptions = [
    { value: 'all', label: 'Tất cả', count: offers.length },
    { value: 'pending', label: 'Chờ phản hồi', count: offers.filter(o => o.status === 'pending').length },
    { value: 'accepted', label: 'Đã chấp nhận', count: offers.filter(o => o.status === 'accepted').length },
    { value: 'rejected', label: 'Đã từ chối', count: offers.filter(o => o.status === 'rejected').length },
    { value: 'expired', label: 'Hết hạn', count: offers.filter(o => o.daysLeft < 0 && o.status === 'pending').length }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Mới nhất' },
    { value: 'deadline', label: 'Sắp hết hạn' },
    { value: 'name', label: 'Tên A-Z' }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysLeftColor = (days) => {
    if (days < 0) return 'text-red-600';
    if (days <= 3) return 'text-yellow-600';
    return 'text-green-600';
  };

  const handleSendReminder = (candidateEmail) => {
    console.log("Sending reminder to", candidateEmail);
  };

  const handleRescindOffer = (offerId) => {
    console.log("Rescinding offer", offerId);
  };

  const handleExtendDeadline = (offerId) => {
    console.log("Extending deadline for offer", offerId);
  };

  return (
    <div className="min-h-screen ">
      <header className="bg-white border-b shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md" style={{ backgroundColor: primaryColor }}>
                <HandCoins className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold">Quản Lý Offer</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button style={{ backgroundColor: primaryColor }} className="gap-2 shadow-md hover:shadow-lg text-white">
                <Plus className="h-4 w-4" />
                Tạo Offer mới
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-6 px-4">
        <div className="mb-6">
          <div className="">
            <div className="flex flex-col md:flex-row gap-4">
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <span>{statusOptions.find(opt => opt.value === statusFilter)?.label}</span>
                      <Badge variant="secondary" className="px-1.5">
                        {statusOptions.find(opt => opt.value === statusFilter)?.count}
                      </Badge>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    {statusOptions.map(option => (
                      <DropdownMenuItem 
                        key={option.value} 
                        onClick={() => setStatusFilter(option.value)}
                        className="flex justify-between"
                      >
                        <span>{option.label}</span>
                        <Badge variant="secondary" className="px-1.5">
                          {option.count}
                        </Badge>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <span>Sắp xếp: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
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
          </div>
        </div>

        {filteredOffers.length > 0 ? (
          <div className="space-y-4">
            {filteredOffers.map(offer => (
              <Card key={offer.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12 border-2 border-white shadow">
                        <AvatarImage src={offer.candidate.avatar} />
                        <AvatarFallback>
                          {offer.candidate.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-lg">{offer.candidate.name}</h3>
                        <p className="text-sm text-muted-foreground">{offer.candidate.position}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="w-24">
                            <Progress 
                              value={offer.candidate.matchScore} 
                              className="h-2"
                              indicatorColor="bg-green-500"
                            />
                          </div>
                          <span className="text-sm font-medium text-green-600">
                            {offer.candidate.matchScore}% Match
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Vị trí ứng tuyển</p>
                        <p className="font-medium">{offer.jobTitle}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Mức lương đề xuất</p>
                        <p className="font-medium text-blue-600">{offer.salary}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Trạng thái</p>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(offer.status)} px-3 py-1 rounded-full`}>
                            {statusOptions.find(opt => opt.value === offer.status)?.label}
                          </Badge>
                          {offer.daysLeft !== undefined && (
                            <span className={`text-sm font-medium ${getDaysLeftColor(offer.daysLeft)}`}>
                              {offer.daysLeft >= 0 ? `${offer.daysLeft} ngày` : `Quá hạn ${Math.abs(offer.daysLeft)} ngày`}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Ngày gửi</p>
                          <p>{new Date(offer.sentDate).toLocaleDateString('vi-VN')}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Hạn chót phản hồi</p>
                          <p className={getDaysLeftColor(offer.daysLeft)}>
                            {new Date(offer.deadline).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-end">
                      {offer.status === 'pending' && (
                        <>
                          <Button 
                            variant="outline" 
                            onClick={() => handleSendReminder(offer.candidate.email)}
                            className="gap-1 border-blue-200 text-blue-600 hover:bg-blue-50"
                          >
                            <Mail className="h-4 w-4" />
                            Nhắc nhở
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => handleExtendDeadline(offer.id)}
                            className="gap-1 border-yellow-200 text-yellow-600 hover:bg-yellow-50"
                          >
                            <Calendar className="h-4 w-4" />
                            Gia hạn
                          </Button>
                          <Button 
                            variant="outline" 
                            className="text-red-600 border-red-200 hover:bg-red-50 gap-1"
                            onClick={() => handleRescindOffer(offer.id)}
                          >
                            <X className="h-4 w-4" />
                            Thu hồi
                          </Button>
                        </>
                      )}
                      <Button 
                        variant="outline" 
                        className="gap-1 border-gray-200 hover:bg-gray-50"
                      >
                        <FileText className="h-4 w-4" />
                        Xem chi tiết
                      </Button>
                    </div>
                  </div>

                  {offer.notes && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="text-sm font-medium text-blue-800 mb-1">Ghi chú:</h4>
                      <p className="text-sm text-blue-700">{offer.notes}</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-12 text-center">
            <div className="mx-auto max-w-md">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {statusFilter === 'all' 
                  ? "Chưa có offer nào được tạo" 
                  : `Không tìm thấy offer nào`}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {statusFilter === 'all' 
                  ? "Hãy tạo offer mới cho ứng viên" 
                  : `Không có offer nào ở trạng thái "${statusOptions.find(opt => opt.value === statusFilter)?.label}"`}
              </p>
              <Button style={{ backgroundColor: primaryColor }} className="gap-2">
                <Plus className="h-4 w-4" />
                Tạo Offer mới
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
};

export default OfferPage;