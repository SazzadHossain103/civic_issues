"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, MessageSquare, MapPin, Calendar, User } from "lucide-react"
import { ThreadModal } from "./thread-modal"
import { useState } from "react"

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

interface IssueDetailsModalProps {
  issue: Issue | null
  isOpen: boolean
  onClose: () => void
  onStatusUpdate: (issueId: number, newStatus: string) => void
}

export function IssueDetailsModal({ issue, isOpen, onClose, onStatusUpdate }: IssueDetailsModalProps) {
  const [isThreadModalOpen, setIsThreadModalOpen] = useState(false)

  if (!issue) return null

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
              Issue ID: #{issue.id} • Reported on {issue.reportedDate}
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
                    <p className="text-gray-900">{issue.reportedBy}</p>
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
                    {issue.comments} comments
                  </span>
                </div>
              </div>
            </div>

            {/* Status Update Section */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Update Status</h3>
              <div className="flex gap-3">
                <Select value={issue.status} onValueChange={(value) => onStatusUpdate(issue.id, value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Save Changes</Button>
              </div>
            </div>

            {/* Official Response Section */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3">Official Response</h3>
              <Textarea placeholder="Add an official response to this issue..." className="min-h-24 mb-3" />
              <div className="flex gap-2">
                <Button>Post Response</Button>
                <Button variant="outline" onClick={() => setIsThreadModalOpen(true)}>
                  View Full Thread
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ThreadModal component */}
      <ThreadModal issue={issue} isOpen={isThreadModalOpen} onClose={() => setIsThreadModalOpen(false)} />
    </>
  )
}
