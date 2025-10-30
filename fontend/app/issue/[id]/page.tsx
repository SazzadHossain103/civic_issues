"use client"

// import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Calendar, User, MessageCircle, ArrowLeft, ThumbsUp, Heart, Trash2 } from "lucide-react"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { ImageGallery } from "@/components/image-gallery"
import { getSingleIssues } from "@/components/getData"
import { useGlobalStore } from "@/components/globalVariable"
import { useRouter } from "next/navigation";


export default function IssueDetailsPage({ params }: { params: Promise<{ id: string }>}) {
  const {token, user, isLoggedIn } = useGlobalStore()
  const [newComment, setNewComment] = useState("")
  const [hasVoted, setHasVoted] = useState(false)
  const [voteCount, setVoteCount] = useState(23) // Mock initial vote count
  const { id } = React.use(params);
  const router = useRouter();
  // const { id } = params;

  const [issue, setIssue] = useState<any>([])
     useEffect(() => {
      const fetehData = async () => {
        const result = await getSingleIssues(id);
        setIssue(result.data);
      }
      fetehData();
    }, [id])
    console.log("id ", id)
    console.log("Issue from single: ", issue )

  const [comments, setComments] = useState<any[]>([]);
  useEffect(() => {
    if (issue?.comments) {
      setComments(issue.comments);
    }
  }, [issue]);

  // Mock data - in real app, fetch based on params.id
  const issueD = {
    id: 1,
    title: "Broken Road on Dhanmondi 27",
    category: "Road",
    location: "Dhanmondi 27, Block #A, Dhaka 1209",
    status: "In Progress",
    postedBy: "Ahmed Rahman",
    postedDate: "2024-01-15",
    description:
      "There are several large potholes on Dhanmondi 27 road that have been causing problems for vehicles and pedestrians. The potholes have been growing larger due to recent rains and are now causing traffic congestion. This is a major safety hazard, especially during night time when visibility is poor. The road needs immediate repair to prevent accidents and ensure smooth traffic flow.",
    images: [
      "/placeholder.svg?height=400&width=600&text=Broken+Road+Main+View",
      "/placeholder.svg?height=400&width=600&text=Pothole+Close+Up",
      "/placeholder.svg?height=400&width=600&text=Traffic+Congestion",
      "/placeholder.svg?height=400&width=600&text=Night+View+Safety+Hazard",
      "/placeholder.svg?height=400&width=600&text=Road+Damage+Detail",
    ],
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

  // const handleCommentSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (newComment.trim()) {
  //     console.log("New comment:", newComment)
  //     setNewComment("")
  //     // Handle comment submission
  //   }
  // }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoggedIn || !user) {
    alert("Please login to comment.");
    router.push("/login"); // redirect to login page
    return;
    }

    if (!newComment.trim()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/issues/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // token from your global store (Zustand or Context)
        },
        body: JSON.stringify({
          issueId: issue._id,   // pass the current issue ID
          message: newComment,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to post comment");
      }
      alert("Commnet successfully")
      console.log("Comment saved:", data);

      // Update UI (append new comment)
      setComments((prev:any) => [...prev, {
        _id: data.data.comments[data.data.comments.length - 1]._id,
        message: newComment,
        commentBy: { fullname: user.fullname }, // add logged-in user info
        commentAt: new Date().toISOString(),
      }]);

      // Clear input
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Could not post comment, please try again.");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!isLoggedIn || !user) {
    alert("Please login to delete comment.");
    router.push("/login"); // redirect to login page
    return;
    }
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/issues/comment`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // token from your global store (Zustand or Context)
        },
        body: JSON.stringify({
          issueId: issue._id,
          commentId,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete comment");
      }

      // Remove comment from local state
      setIssue((prev: any) => ({
        ...prev,
        comments: prev.comments.filter((c: any) => c._id !== commentId),
      }));
    } catch (error: any) {
      console.error("Delete comment error:", error.message);
      alert(error.message);
    }
  };



  // const handleVote = () => {
  //   if (hasVoted) {
  //     setVoteCount((prev) => prev - 1)
  //     setHasVoted(false)
  //   } else {
  //     setVoteCount((prev) => prev + 1)
  //     setHasVoted(true)
  //   }
  // }

  useEffect(() => {
    if (issue) {
      setVoteCount(issue.votes);
      setHasVoted(user ? issue?.votedBy?.includes(user._id) : false);
    }
  }, [issue, user]);

  

  const handleVote = async () => {
    if (!isLoggedIn || !user) {
    alert("Please log in to vote.");
    router.push("/login"); // redirect to login page
    return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/issues/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // from Zustand/global store
        },
        body: JSON.stringify({ issueId: issue._id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to toggle vote");
      }

      // The backend returns the updated issue with votes + votedBy
      setVoteCount(data.data.votes);
      setHasVoted(user ? data.data.votedBy.includes(user._id) : false);
    } catch (error) {
      console.error("Vote error:", error);
      alert("Could not register vote. Please try again.");
    }
  };


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
                    {issue.postBy && issue.postBy?.fullname}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {issue.postDate?.split("T")[0]}
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
            <ImageGallery images={issue.images} title={issue.title} />

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
                          ? "bg-green-600 hover:bg-green-700 cursor-pointer"
                          : "border-green-600 hover:bg-green-700 text-green-600 cursor-pointer"
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
            <div>
              <div className="flex" >
                <MapPin className="h-5 w-5 mr-2" />
                <h3 className="font-semibold mb-2">Map </ h3>
              </div>
              <div className="bg-muted rounded-lg text-center">
                <iframe
                  title="Google Map"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(issue.location)}&output=embed`}
                />
                {/* <p className="text-sm text-muted-foreground">Showing exact location of the reported issue</p> */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5" />
              Comments & Updates ({comments?.length})
            </CardTitle>
            <CardDescription>Track progress and join the discussion about this issue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Existing Comments */}
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {comments && comments.map((comment: any) => (
                <div key={comment._id} className="flex space-x-3 group hover:bg-muted/20 p-2 rounded-md transition">
                  <Avatar>
                    {/* <AvatarImage src={comment?.avatar || "/placeholder.svg"} /> */}
                    <AvatarFallback>{comment.commentBy.fullname[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{comment.commentBy.fullname}</span>
                      {comment.isOfficial && (
                        <Badge variant="secondary" className="text-xs">
                          Official
                        </Badge>
                      )}
                      <span className="text-sm text-muted-foreground">{comment.commentAt.split("T")[0]}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto text-red-500 text-sm cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity "
                        onClick={() => handleDeleteComment(comment._id)}
                      >
                        {/* Delete */}
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground">{comment.message}</p>
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
                  <Button className="cursor-pointer" type="submit" disabled={!newComment.trim()}>
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
