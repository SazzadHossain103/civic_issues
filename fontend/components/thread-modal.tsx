"use client"

import type React from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Calendar, User, Send } from "lucide-react"
import { useState } from "react"

interface Comment {
  id: number
  author: string
  avatar: string
  date: string
  content: string
  isOfficial: boolean
}

interface Issue {
  id: number
  title: string
  category: string
  location: string
  status: string
  priority: string
  reportedBy: string
  reportedDate: string
  votes: number
  comments: number
  description: string
}

interface ThreadModalProps {
  issue: Issue | null
  isOpen: boolean
  onClose: () => void
}

// Mock comments data - in real app, this would be fetched based on issue ID
const mockComments: Comment[] = [
  {
    id: 1,
    author: "Ahmed Hassan",
    avatar: "/placeholder.svg?height=40&width=40&text=AH",
    date: "2024-01-15 10:30 AM",
    content:
      "I reported this issue because it's becoming a serious safety hazard. The potholes are getting deeper every day, especially after the recent rains.",
    isOfficial: false,
  },
  {
    id: 2,
    author: "City Council",
    avatar: "/placeholder.svg?height=40&width=40&text=CC",
    date: "2024-01-15 2:45 PM",
    content:
      "Thank you for reporting this issue. We have received your complaint and forwarded it to the Roads and Highways Department for immediate attention.",
    isOfficial: true,
  },
  {
    id: 3,
    author: "Fatima Khan",
    avatar: "/placeholder.svg?height=40&width=40&text=FK",
    date: "2024-01-16 8:15 AM",
    content:
      "I live nearby and can confirm this is a major problem. My car got damaged last week because of these potholes. When will this be fixed?",
    isOfficial: false,
  },
  {
    id: 4,
    author: "Roads Department",
    avatar: "/placeholder.svg?height=40&width=40&text=RD",
    date: "2024-01-16 11:20 AM",
    content:
      "Our inspection team has been dispatched to assess the damage. We expect to begin repair work within 48-72 hours. Thank you for your patience.",
    isOfficial: true,
  },
  {
    id: 5,
    author: "Rahman Ali",
    avatar: "/placeholder.svg?height=40&width=40&text=RA",
    date: "2024-01-17 9:00 AM",
    content:
      "Any update on when the repair work will start? The situation is getting worse with more traffic avoiding this route.",
    isOfficial: false,
  },
  {
    id: 6,
    author: "Roads Department",
    avatar: "/placeholder.svg?height=40&width=40&text=RD",
    date: "2024-01-17 3:30 PM",
    content:
      "Update: Repair work will commence on January 20th at 6:00 AM. The work is expected to be completed within 3 days. We will ensure minimal traffic disruption.",
    isOfficial: true,
  },
  {
    id: 7,
    author: "Local Resident",
    avatar: "/placeholder.svg?height=40&width=40&text=LR",
    date: "2024-01-18 7:45 AM",
    content:
      "Great to see quick response from the authorities. Hope the repair work is done properly this time so we don't face the same issue again.",
    isOfficial: false,
  },
]

export function ThreadModal({ issue, isOpen, onClose }: ThreadModalProps) {
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(mockComments)

  if (!issue) return null

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment: Comment = {
        id: comments.length + 1,
        author: "Admin User", // In real app, get from auth context
        avatar: "/placeholder.svg?height=40&width=40&text=AU",
        date: new Date().toLocaleString(),
        content: newComment,
        isOfficial: true, // Admin comments are official
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Full Thread: {issue.title}
          </DialogTitle>
          <DialogDescription>Complete conversation history for Issue #{issue.id}</DialogDescription>
        </DialogHeader>

        {/* Thread Content - Scrollable */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {/* Original Issue */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40&text=OP" />
                <AvatarFallback>OP</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-blue-900">{issue.reportedBy}</span>
                  <Badge variant="outline" className="text-xs">
                    Original Post
                  </Badge>
                  <span className="text-sm text-blue-600">{issue.reportedDate}</span>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-900">{issue.title}</h4>
                  <p className="text-blue-800 text-sm">{issue.description}</p>
                  <div className="flex items-center gap-4 text-xs text-blue-600">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {issue.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {issue.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Thread */}
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={comment.id} className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{comment.author}</span>
                    {comment.isOfficial && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        Official Response
                      </Badge>
                    )}
                    <span className="text-sm text-gray-500">{comment.date}</span>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      comment.isOfficial ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <p className={`text-sm ${comment.isOfficial ? "text-green-800" : "text-gray-700"}`}>
                      {comment.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Form - Fixed at bottom */}
        <div className="flex-shrink-0 border-t pt-4 mt-4">
          <form onSubmit={handleCommentSubmit} className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                Posting as Admin
              </Badge>
              <span className="text-sm text-gray-500">Your response will be marked as official</span>
            </div>
            <Textarea
              placeholder="Add an official response or update to this thread..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="resize-none"
            />
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                {comments.length} {comments.length === 1 ? "response" : "responses"} in this thread
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={onClose}>
                  Close Thread
                </Button>
                <Button type="submit" disabled={!newComment.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Post Response
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
