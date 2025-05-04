import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Search, Plus, Download, Filter } from "lucide-react"

const JobPostingsPage = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      type: "FULL_TIME",
      status: "APPROVED",
      postedDate: "2023-10-15",
      applicants: 24,
      location: "Remote",
      salaryRange: "$90,000 - $120,000"
    },
  ]

  return (
    <div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Job Postings</h1>
          <Button style={{ backgroundColor: '#3A6B4C' }} className='text-white'>
            <Plus className="mr-2 h-4 w-4 " />
            New Job Posting
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Active Job Postings</CardTitle>
                <CardDescription>Manage your current job listings</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Salary Range</TableHead>
                  <TableHead>Applicants</TableHead>
                  <TableHead>Posted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {job.type.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          job.status === "APPROVED" ? "default" :
                          job.status === "PENDING" ? "secondary" :
                          job.status === "REJECTED" ? "destructive" : "outline"
                        }
                        style={job.status === "APPROVED" ? { backgroundColor: '#3A6B4C' } : {}}
                        className='text-white'
                      >
                        {job.status.charAt(0) + job.status.slice(1).toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.salaryRange}</TableCell>
                    <TableCell>
                      <Button variant="link" className="h-auto p-0">
                        {job.applicants} applicants
                      </Button>
                    </TableCell>
                    <TableCell>{job.postedDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-muted-foreground">
              Showing 1 to {jobs.length} of {jobs.length} jobs
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
      </div>
    </div>
  )
}


export default JobPostingsPage