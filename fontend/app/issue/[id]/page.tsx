"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Calendar, User, MessageCircle, ArrowLeft, ThumbsUp, Heart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Navigation } from "@/components/navigation"

export default function IssueDetailsPage({ params }: { params: { id: string } }) {
  const [newComment, setNewComment] = useState("")
  const [hasVoted, setHasVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(23) // Mock initial vote count

  // Mock data - in real app, fetch based on params.id
  const issue = {
    id: 1,
    title: "Broken Road on Dhanmondi 27",
    category: "Road",
    location: "Dhanmondi 27, Dhaka 1209",
    status: "In Progress",
    postedBy: "Ahmed Rahman",
    postedDate: "2024-01-15",
    description:
      "There are several large potholes on Dhanmondi 27 road that have been causing problems for vehicles and pedestrians. The potholes have been growing larger due to recent rains and are now causing traffic congestion. This is a major safety hazard, especially during night time when visibility is poor. The road needs immediate repair to prevent accidents and ensure smooth traffic flow.",
    image: "/placeholder.svg?height=400&width=600&text=Broken+Road+Dhanmondi+27",
    comments: [
      {
        id: 1,
        author: "City Council",
        avatar: "/placeholder.svg?height=40&width=40&text=CC",
        date: "2024-01-16",
        content:
          "Thank you for reporting this issue. We have forwarded this to the Roads and Highways Department. A team will inspect the area within 48 hours.",
        isOfficial: true,
      },
      {
        id: 2,
        author: "Fatima Khan",
        avatar: "/placeholder.svg?height=40&width=40&text=FK",
        date: "2024-01-16",
        content:
          "I also face this problem daily while going to work. The situation gets worse during rain. Hope it gets fixed soon.",
        isOfficial: false,
      },
      {
        id: 3,
        author: "Roads Dept",
        avatar: "/placeholder.svg?height=40&width=40&text=RD",
        date: "2024-01-17",
        content:
          "Update: Our inspection team has visited the site. Repair work will begin on January 20th and is expected to complete within 3 days. We apologize for the inconvenience.",
        isOfficial: true,
      },
    ],
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      console.log("New comment:", newComment)
      setNewComment("")
      // Handle comment submission
    }
  }

  const handleVote = () => {
    if (hasVoted) {
      setVoteCount((prev) => prev - 1)
      setHasVoted(false)
    } else {
      setVoteCount((prev) => prev + 1)
      setHasVoted(true)
    }
  }

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/browse">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Browse
          </Link>
        </Button>

        {/* Issue Details */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <CardTitle className="text-2xl font-serif">{issue.title}</CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {issue.postedBy}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {issue.postedDate}
                  </div>
                  <Badge variant="outline">{issue.category}</Badge>
                </div>
              </div>
              <Badge variant={getStatusColor(issue.status)} className="text-sm">
                {issue.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image */}
            <div className="aspect-video bg-muted rounded-lg overflow-hidden">
              <img src={issue.image || "/placeholder.svg"} alt={issue.title} className="w-full h-full object-cover" />
            </div>

            {/* Location */}
            <div className="flex items-center text-muted-foreground">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{issue.location}</span>
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Heart className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold text-green-800">Do you face the same problem?</h3>
                  </div>
                  <p className="text-green-700 text-sm">
                    If you're experiencing this issue too, vote to show your support and help prioritize the solution.
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      onClick={handleVote}
                      variant={hasVoted ? "default" : "outline"}
                      className={
                        hasVoted
                          ? "bg-green-600 hover:bg-green-700"
                          : "border-green-600 text-green-600 hover:bg-green-50"
                      }
                    >
                      <ThumbsUp className={`mr-2 h-4 w-4 ${hasVoted ? "fill-current" : ""}`} />
                      {hasVoted ? "Voted" : "Vote"}
                    </Button>
                    <div className="text-center">
                      <div className="font-bold text-green-800 text-lg">{voteCount}</div>
                      <div className="text-xs text-green-600">people affected</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{issue.description}</p>
            </div>

            {/* Map Placeholder */}
            <div className="bg-muted rounded-lg p-8 text-center">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Interactive map would be displayed here</p>
              <p className="text-sm text-muted-foreground">Showing exact location of the reported issue</p>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Comments & Updates ({issue.comments.length})
            </CardTitle>
            <CardDescription>Track progress and join the discussion about this issue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Existing Comments */}
            <div className="space-y-4">
              {issue.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <Avatar>
                    <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{comment.author}</span>
                      {comment.isOfficial && (
                        <Badge variant="secondary" className="text-xs">
                          Official
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">{comment.date}</span>
                    </div>
                    <p className="text-muted-foreground">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Form */}
            <div className="border-t pt-6">
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <Textarea
                  placeholder="Add a comment or ask for updates..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                />
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Please be respectful and constructive in your comments
                  </p>
                  <Button type="submit" disabled={!newComment.trim()}>
                    Post Comment
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
