import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Target, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by citizens, for citizens. Every post helps make our communities better.",
    },
    {
      icon: Target,
      title: "Direct Impact",
      description: "Your posts reach the right authorities and create real change in your neighborhood.",
    },
    {
      icon: Heart,
      title: "Civic Pride",
      description: "Take pride in contributing to the betterment of Bangladesh's infrastructure and services.",
    },
  ]

  const team = [
    {
      name: "Dr. Rashida Ahmed",
      role: "Project Director",
      description: "Former city planner with 15 years of experience in urban development.",
    },
    {
      name: "Mohammad Karim",
      role: "Technical Lead",
      description: "Software engineer passionate about using technology for social good.",
    },
    {
      name: "Fatima Rahman",
      role: "Community Outreach",
      description: "Community organizer working to bridge the gap between citizens and government.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-serif mb-4">About CIVIC ISSUES</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering citizens of Bangladesh to post civic issues and work together with local authorities to build
            better communities.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              CIVIC ISSUES is a digital platform designed to bridge the gap between citizens and local government
              authorities in Bangladesh. We believe that every citizen has the right to live in a well-maintained
              community with proper infrastructure and services.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our platform enables citizens to easily post civic issues such as broken roads, drainage problems,
              electricity outages, and waste management concerns. By providing a transparent and accessible posting
              system, we aim to improve the quality of life for all Bangladeshi citizens.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold font-serif text-center mb-8">Why Choose Our Platform?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4 mx-auto">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-4 mx-auto">
                  1
                </div>
                <h3 className="font-semibold mb-2">Post</h3>
                <p className="text-sm text-muted-foreground">
                  Take a photo and describe the civic issue you've encountered
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-4 mx-auto">
                  2
                </div>
                <h3 className="font-semibold mb-2">Review</h3>
                <p className="text-sm text-muted-foreground">
                  Our team reviews and forwards your post to relevant authorities
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-4 mx-auto">
                  3
                </div>
                <h3 className="font-semibold mb-2">Action</h3>
                <p className="text-sm text-muted-foreground">
                  Local authorities investigate and take appropriate action
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold mb-4 mx-auto">
                  4
                </div>
                <h3 className="font-semibold mb-2">Update</h3>
                <p className="text-sm text-muted-foreground">
                  Receive updates on the progress and resolution of your post
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold font-serif text-center mb-8">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-serif">Get In Touch</CardTitle>
            <CardDescription>Have questions or suggestions? We'd love to hear from you.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Contact Information</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p>Email: support@civicissues.bd</p>
                  <p>Phone: +880-1234-567890</p>
                  <p>Address: Dhaka, Bangladesh</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Office Hours</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Button asChild>
                <Link href="/report">Start Posting Issues</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
