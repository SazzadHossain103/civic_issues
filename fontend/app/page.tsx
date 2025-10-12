import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Camera, Users, TrendingUp, AlertTriangle, Zap, Droplets, Trash2 } from "lucide-react"
import Link from "next/link"
<<<<<<< HEAD
// import { useState, useEffect } from "react"
import { getIssues } from "@/components/getData"

export default async function HomePage() {

  const recentIssues = await getIssues();
  console.log("recentIssues from homepage: ", recentIssues)

  // const [recentIssues, setrecentIssues] = useState([])
  // useEffect(() => {
  //   const fetehData = async () => {
  //     const result = await issues();
  //     setrecentIssues(result);
  //   }
  //   fetehData();
  //   console.log("recentIssues from homepage: ", recentIssues )
  // }, [recentIssues])
  const recentIssuesDemo = [
=======

export default function HomePage() {
  const recentIssues = [
>>>>>>> main
    {
      id: 1,
      title: "Broken Road on Dhanmondi 27",
      category: "Road",
      location: "Dhanmondi, Dhaka",
      status: "Pending",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Blocked Drainage System",
      category: "Drainage",
      location: "Gulshan 2, Dhaka",
      status: "In Progress",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Frequent Power Outages",
      category: "Electricity",
      location: "Chittagong",
      status: "Pending",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const stats = [
<<<<<<< HEAD
    { label: "Total Reports", value: recentIssues.data.length, icon: AlertTriangle },
    { label: "Resolved Issues", value: recentIssues.data.filter((issue:any)=> issue.status === 'resolved').length , icon: TrendingUp },
    { label: "In progress Issues", value: recentIssues.data.filter((issue:any)=> issue.status === 'in-progress').length, icon: Users },
=======
    { label: "Total Reports", value: "1,247", icon: AlertTriangle },
    { label: "Resolved Issues", value: "892", icon: TrendingUp },
    { label: "Active Users", value: "3,456", icon: Users },
>>>>>>> main
    { label: "Cities Covered", value: "64", icon: MapPin },
  ]

  const categories = [
<<<<<<< HEAD
    { name: "Road Issues", icon: AlertTriangle, count: recentIssues.data.filter((issue:any)=> issue.category === 'road').length , color: "bg-red-100 text-red-700" },
    { name: "Electricity", icon: Zap, count: recentIssues.data.filter((issue:any)=> issue.category === 'electricity').length, color: "bg-yellow-100 text-yellow-700" },
    { name: "Water Supply", icon: Droplets, count: recentIssues.data.filter((issue:any)=> issue.category === 'water').length, color: "bg-blue-100 text-blue-700" },
    { name: "Waste Management", icon: Trash2, count: recentIssues.data.filter((issue:any)=> issue.category === 'waste').length, color: "bg-green-100 text-green-700" },
=======
    { name: "Road Issues", icon: AlertTriangle, count: 324, color: "bg-red-100 text-red-700" },
    { name: "Electricity", icon: Zap, count: 198, color: "bg-yellow-100 text-yellow-700" },
    { name: "Water Supply", icon: Droplets, count: 156, color: "bg-blue-100 text-blue-700" },
    { name: "Waste Management", icon: Trash2, count: 89, color: "bg-green-100 text-green-700" },
>>>>>>> main
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-6">
            Report Local Problems,
            <br />
            <span className="text-primary">Help Improve Our Community</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of citizens in Bangladesh reporting civic issues. Together, we can make our communities
            better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/report">
                <Camera className="mr-2 h-5 w-5" />
                Post an Issue
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/browse">Browse Issues</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-serif text-center mb-12">Issue Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${category.color}`}
                  >
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{category.name}</h3>
                  <p className="text-2xl font-bold text-primary">{category.count}</p>
                  <p className="text-sm text-muted-foreground">Active Reports</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Issues */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold font-serif">Recent Reports</h2>
            <Button variant="outline" asChild>
              <Link href="/browse">View All</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
<<<<<<< HEAD
            {recentIssues.data && recentIssues.data
            .sort((a: any, b: any) => new Date(b.postDate).getTime() - new Date(a.postDate).getTime())
            .slice(0,3)
            .map((issue: any) => (
              <Card key={issue._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted ">
                  <img
                    src={issue.images[0] || "/placeholder.svg"}
                    alt={issue.title}
                    className="w-full max-h-[220px] object-cover"
=======
            {recentIssues.map((issue) => (
              <Card key={issue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted">
                  <img
                    src={issue.image || "/placeholder.svg"}
                    alt={issue.title}
                    className="w-full h-full object-cover"
>>>>>>> main
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{issue.title}</CardTitle>
                    <Badge variant={issue.status === "Pending" ? "destructive" : "secondary"}>{issue.status}</Badge>
                  </div>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {issue.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
<<<<<<< HEAD
                    <Link href={`/issue/${issue._id}`}>View Details</Link>
=======
                    <Link href={`/issue/${issue.id}`}>View Details</Link>
>>>>>>> main
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold font-serif text-lg mb-4">CIVIC ISSUES</h3>
              <p className="text-muted-foreground">
                Empowering citizens to report and track civic issues across Bangladesh.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/report" className="hover:text-primary">
                    Post Issue
                  </Link>
                </li>
                <li>
                  <Link href="/browse" className="hover:text-primary">
                    Browse Issues
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Road Issues</li>
                <li>Electricity</li>
                <li>Water Supply</li>
                <li>Waste Management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-muted-foreground">
                Email: support@civicissues.bd
                <br />
                Phone: +880-1234-567890
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Civic Issues Bangladesh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
