"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Filter, Eye } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { getIssues } from "@/components/getData"

export default function BrowseIssuesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const [issues, setIssues] = useState([])
  useEffect(() => {
    const fetehData = async () => {
      const result = await getIssues();
      setIssues(result.data);
    }
    fetehData();
    console.log("recentIssues from homepage: ", issues )
  }, [issues])

  const issuesDemo = [
    {
      id: 1,
      title: "Broken Road on Dhanmondi 27",
      category: "Road",
      location: "Dhanmondi, Dhaka",
      status: "Pending",
      postedBy: "Ahmed Rahman",
      postedDate: "2024-01-15",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Blocked Drainage System",
      category: "Drainage",
      location: "Gulshan 2, Dhaka",
      status: "In Progress",
      postedBy: "Fatima Khan",
      postedDate: "2024-01-14",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Frequent Power Outages",
      category: "Electricity",
      location: "Chittagong",
      status: "Pending",
      postedBy: "Mohammad Ali",
      postedDate: "2024-01-13",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Water Supply Interruption",
      category: "Water",
      location: "Sylhet",
      status: "Resolved",
      postedBy: "Rashida Begum",
      postedDate: "2024-01-12",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 5,
      title: "Overflowing Garbage Bins",
      category: "Waste",
      location: "Rajshahi",
      status: "In Progress",
      postedBy: "Karim Uddin",
      postedDate: "2024-01-11",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 6,
      title: "Street Light Not Working",
      category: "Electricity",
      location: "Barisal",
      status: "Pending",
      postedBy: "Nasir Ahmed",
      postedDate: "2024-01-10",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const filteredIssues = issues.filter((issue: any) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || issue.category.toLowerCase() === selectedCategory
    const matchesStatus = selectedStatus === "all" || issue.status.toLowerCase() === selectedStatus.toLowerCase()

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "destructive"
      case "In Progress":
        return "secondary"
      case "Resolved":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif mb-2">Browse Civic Issues</h1>
          <p className="text-muted-foreground">
            Explore reported issues in your community and track their resolution progress.
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title or location..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="road">Road Issues</SelectItem>
                  <SelectItem value="drainage">Drainage</SelectItem>
                  <SelectItem value="electricity">Electricity</SelectItem>
                  <SelectItem value="water">Water Supply</SelectItem>
                  <SelectItem value="waste">Waste Management</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-muted-foreground">
            Showing {filteredIssues.length} of {issues.length} issues
          </p>
          <Button variant="outline" asChild>
            <Link href="/report">Post New Issue</Link>
          </Button>
        </div>

        {/* Issues Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue: any) => (
            <Card key={issue._id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-muted">
                <img src={issue.images[0] || "/placeholder.svg"} alt={issue.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg line-clamp-2">{issue.title}</CardTitle>
                  <Badge variant={getStatusColor(issue.status)}>{issue.status}</Badge>
                </div>
                <CardDescription className="space-y-1">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {issue.location}
                  </div>
                  <div className="text-xs">
                    By {issue.postBy.fullname} • {issue.postDate.split("T")[0]}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={`/issue/${issue._id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">No issues found matching your criteria.</p>
              <Button asChild>
                <Link href="/report">Post the First Issue</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
