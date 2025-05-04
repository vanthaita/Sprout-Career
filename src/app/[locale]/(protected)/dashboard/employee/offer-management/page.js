'use client'
import { useState } from "react";
import { FileText, Mail, Check, X, Clock, ChevronDown, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

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
        email: "nguyenvana@example.com"
      },
      jobTitle: "Senior Frontend Engineer",
      salary: "45,000,000 VND",
      status: "pending", // pending, accepted, rejected, expired
      sentDate: "2023-06-10",
      deadline: "2023-06-20",
      notes: "Candidate requested 2 more days to consider"
    },
    {
      id: 2,
      candidate: {
        name: "Trần Thị B",
        position: "UX Designer",
        avatar: "/avatars/02.png",
        email: "tranthib@example.com"
      },
      jobTitle: "Product Designer",
      salary: "38,000,000 VND",
      status: "accepted",
      sentDate: "2023-06-05",
      deadline: "2023-06-15",
      notes: "Will start on July 1st"
    },
    {
      id: 3,
      candidate: {
        name: "Lê Văn C",
        position: "Backend Engineer",
        avatar: "/avatars/03.png",
        email: "levanc@example.com"
      },
      jobTitle: "Node.js Developer",
      salary: "42,000,000 VND",
      status: "rejected",
      sentDate: "2023-05-28",
      deadline: "2023-06-07",
      notes: "Accepted another offer with higher salary"
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
        return new Date(a.deadline) - new Date(b.deadline);
      } else {
        return a.candidate.name.localeCompare(b.candidate.name);
      }
    });

  const statusOptions = [
    { value: 'all', label: 'Tất cả' },
    { value: 'pending', label: 'Chờ phản hồi' },
    { value: 'accepted', label: 'Đã chấp nhận' },
    { value: 'rejected', label: 'Đã từ chối' },
    { value: 'expired', label: 'Hết hạn' }
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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Offer</h1>
        <Button style={{ backgroundColor: primaryColor }} className="gap-2">
          <Plus className="h-4 w-4" />
          Tạo Offer mới
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
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
                Sắp xếp: {sortOptions.find(opt => opt.value === sortBy)?.label}
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

      {/* Offers List */}
      {filteredOffers.length > 0 ? (
        <div className="space-y-4">
          {filteredOffers.map(offer => (
            <div key={offer.id} className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Candidate Info */}
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={offer.candidate.avatar} />
                      <AvatarFallback>
                        {offer.candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{offer.candidate.name}</h3>
                      <p className="text-sm text-muted-foreground">{offer.candidate.position}</p>
                    </div>
                  </div>

                  {/* Offer Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Vị trí</p>
                      <p className="font-medium">{offer.jobTitle}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mức lương</p>
                      <p className="font-medium">{offer.salary}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Trạng thái</p>
                      <Badge className={getStatusColor(offer.status)}>
                        {statusOptions.find(opt => opt.value === offer.status)?.label}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Timeline and Actions */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <p className="text-sm text-muted-foreground">Ngày gửi</p>
                      <p>{new Date(offer.sentDate).toLocaleDateString('vi-VN')}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm text-muted-foreground">Hạn chót</p>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <p>{new Date(offer.deadline).toLocaleDateString('vi-VN')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-end">
                    {offer.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          onClick={() => handleSendReminder(offer.candidate.email)}
                          className="gap-1"
                        >
                          <Mail className="h-4 w-4" />
                          Gửi nhắc nhở
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleExtendDeadline(offer.id)}
                          className="gap-1"
                        >
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
                    <Button variant="outline" className="gap-1">
                      <FileText className="h-4 w-4" />
                      Xem offer
                    </Button>
                  </div>
                </div>

                {/* Notes */}
                {offer.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium mb-1">Ghi chú:</h4>
                    <p className="text-sm text-gray-700">{offer.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border">
          <FileText className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {statusFilter === 'all' 
              ? "Chưa có offer nào được tạo" 
              : `Không có offer nào ở trạng thái "${statusOptions.find(opt => opt.value === statusFilter)?.label}"`}
          </h3>
          <p className="text-sm text-gray-500">
            {statusFilter === 'all' 
              ? "Hãy tạo offer mới cho ứng viên" 
              : "Các offer ở trạng thái khác sẽ xuất hiện ở đây"}
          </p>
        </div>
      )}
    </div>
  );
};

export default OfferPage;