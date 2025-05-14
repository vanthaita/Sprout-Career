import { Briefcase, Users, FileText, Calendar, Award, Bell, ArrowUp, ArrowDown, Search, Plus, Filter } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const DashboardEmployee = () => {
  const primaryColor = '#3A6B4C';
  const secondaryColor = '#E8F5E9';

  const stats = [
    { title: "Active Jobs", value: "24", change: "+12%", icon: <Briefcase className="h-5 w-5" /> },
    { title: "Applications", value: "156", change: "+5%", icon: <FileText className="h-5 w-5" /> },
    { title: "Interviews", value: "18", change: "-2%", icon: <Users className="h-5 w-5" /> },
    { title: "Offers Made", value: "7", change: "+3%", icon: <Award className="h-5 w-5" /> }
  ];

  const recentJobs = [
    { title: "Senior UX Designer", applicants: 42, status: "active", posted: "2 days ago" },
    { title: "Frontend Developer", applicants: 35, status: "active", posted: "1 week ago" },
    { title: "HR Business Partner", applicants: 18, status: "draft", posted: "3 days ago" },
    { title: "Data Scientist", applicants: 29, status: "active", posted: "5 days ago" }
  ];

  const upcomingInterviews = [
    { candidate: "Alex Johnson", position: "Frontend Developer", time: "Today, 10:00 AM" },
    { candidate: "Sarah Williams", position: "UX Designer", time: "Tomorrow, 2:30 PM" },
    { candidate: "Michael Brown", position: "Data Scientist", time: "Jun 15, 11:00 AM" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div 
              className="flex h-10 w-10 items-center justify-center rounded-md"
              style={{ backgroundColor: primaryColor }}
            >
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-semibold">Employee Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative bg-[#3A6B4C]">
              <Bell className="h-5 w-5 text-white" />
              <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">3</Badge>
            </Button>
            <Avatar>
              <AvatarImage src="/avatars/employee.png" />
              <AvatarFallback>EM</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="py-6 px-4 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-xs ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                  {stat.change.startsWith('+') ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Job Postings</CardTitle>
                  <CardDescription>Your most recent job listings</CardDescription>
                </div>
                <Button size="sm" className="gap-2 text-white" style={{ backgroundColor: primaryColor }}>
                  <Plus className="h-4 w-4" />
                  New Job
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentJobs.map((job, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.applicants}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={job.status === "active" ? "default" : "outline"}
                          style={job.status === "active" ? { backgroundColor: primaryColor } : {}}
                          className={`${job.status === "active" && 'text-white'}`}
                        >
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{job.posted}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Your scheduled candidate interviews</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {upcomingInterviews.map((interview, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={`/avatars/candidate-${index+1}.jpg`} />
                    <AvatarFallback>{interview.candidate.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{interview.candidate}</p>
                    <p className="text-sm text-muted-foreground">{interview.position}</p>
                  </div>
                  <Badge variant="outline" className="whitespace-nowrap">
                    {interview.time}
                  </Badge>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Interviews
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>New candidate applications</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applications..."
                    className="pl-10 w-[200px]"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[1, 2, 3].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/avatars/candidate-${index+1}.jpg`} />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>Candidate {index+1}</span>
                      </div>
                    </TableCell>
                    <TableCell>Frontend Developer</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Under Review</Badge>
                    </TableCell>
                    <TableCell>2 days ago</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Review</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing 1 to 3 of 24 applications
            </div>
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

export default DashboardEmployee