"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, MessageSquare, MapPin, Calendar, User, Send } from "lucide-react"
import { ThreadModal } from "./thread-modal"
import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGlobalStore } from "@/components/globalVariable"


interface UserRef {
  _id: string
  fullname: string
  email: string
}

interface Comment {
  _id: string
  message: string
  commentBy: UserRef
  commentAt: string
  avatar?: string
  isOfficial?: boolean
}

interface Issue {
  _id: string
  title: string
  description: string
  images: string[]
  location: string
  category: string
  priority: string
  status: string
  votes: number
  votedBy: UserRef[]
  postDate: string
  postBy: UserRef
  comments: Comment[]
  createdAt: string
  updatedAt: string
}


interface IssueDetailsModalProps {
  issue: Issue | null
  isOpen: boolean
  onClose: () => void
  onStatusUpdate: (issueId: string, newStatus: string) => void
}

export function IssueDetailsModal({ issue, isOpen, onClose, onStatusUpdate }: IssueDetailsModalProps) {
  const [isThreadModalOpen, setIsThreadModalOpen] = useState(false)
  const { adminToken, admin }  = useGlobalStore();
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<any[]>([]);
  useEffect(() => {
    if (issue?.comments) {
      setComments(issue.comments);
    }
  }, [issue]);

  if (!issue) return null


  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // setNewComment("")
    if (!newComment.trim()) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/issues/commentadmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`, // token from your global store (Zustand or Context)
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
        commentBy: { fullname: admin?.fullname }, // add logged-in user info
        commentAt: new Date().toISOString(),
      }]);

      // Clear input
      setNewComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
      alert("Could not post comment, please try again.");
    }
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{issue.title}</DialogTitle>
            <DialogDescription>
              Issue ID: #{issue._id} • Reported on {issue.postDate.split("T")[0]}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Status and Priority Badges */}
            <div className="flex gap-3">
              <Badge className={getStatusColor(issue.status)}>{issue.status.replace("-", " ").toUpperCase()}</Badge>
              <Badge className={getPriorityColor(issue.priority)}>{issue.priority.toUpperCase()} PRIORITY</Badge>
            </div>

            {/* Issue Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{issue.description}</p>
            </div>

            {/* Issue Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="text-gray-900">{issue.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Reported By</p>
                    <p className="text-gray-900">{issue.postBy.fullname}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-500">Category</p>
                    <p className="text-gray-900">{issue.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {issue.votes} votes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {issue.comments.length} comments
                  </span>
                </div>
              </div>
            </div>

            {/* Status Update Section */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Update Status</h3>
              <div className="flex gap-3">
                <Select value={issue.status} onValueChange={(value) => onStatusUpdate(issue._id, value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In-progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                {/* <Button variant="outline">Save Changes</Button> */}
              </div>
            </div>

            {/* Comments Thread */}
          <div className="space-y-4">
            <h3 className="font-semibold mb-3">Comments </h3>
            <div className="max-h-[200px] overflow-y-auto">
            {comments && comments.map((comment, index) => (
              <div key={index} className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {(comment.commentBy?.fullname
                      ? comment.commentBy.fullname
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")
                      : "NA")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{comment.commentBy.fullname || "saxxd"}</span>
                    {comment.isOfficial && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        Official Response
                      </Badge>
                    )}
                    <span className="text-sm text-gray-500">{comment.commentAt.split("T")[0]}</span>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      comment.isOfficial && comment.isOfficial ? "bg-green-50 border border-green-200" : "bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <p className={`text-sm ${comment.isOfficial ? "text-green-800" : "text-gray-700"}`}>
                      {comment.message}
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
              {/* <p className="text-sm text-gray-500">
                {comments.length} {comments.length === 1 ? "response" : "responses"} in this thread
              </p> */}
              <div className="flex gap-2">
                {/* <Button variant="outline" onClick={onClose}>
                  Close Thread
                </Button> */}
                <Button type="submit" disabled={!newComment.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Post Response
                </Button>
              </div>
            </div>
          </form>
        </div>


            {/* Official Response Section */}
            {/* <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Official Response</h3>
              <Textarea placeholder="Add an official response to this issue..." className="min-h-24 mb-3" />
              <div className="flex gap-2">
                <Button>Post Response</Button>
                <Button variant="outline" onClick={() => setIsThreadModalOpen(true)}>
                  View Full Thread
                </Button>
              </div>
            </div> */}
          </div>
        </DialogContent>
      </Dialog>

      {/* ThreadModal component */}
      {/* <ThreadModal issue={issue} isOpen={isThreadModalOpen} onClose={() => setIsThreadModalOpen(false)} /> */}
    
    </>
  )
}
