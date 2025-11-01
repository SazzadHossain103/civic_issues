"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, MapPin, Calendar, FileText, Settings, Eye, MessageSquare } from "lucide-react"
import { useGlobalStore } from "@/components/globalVariable"
import { getIssues } from "@/components/getData"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ChangePasswordModal from "@/components/change-password-modal"

// Mock user data - in real app this would come from authentication/database
const mockUser = {
  id: 1,
  firstName: "Ahmed",
  lastName: "Hassan",
  email: "ahmed.hassan@email.com",
  phone: "+880 1712-345678",
  district: "dhaka",
  address: "House 45, Road 12, Dhanmondi, Dhaka-1205",
  joinDate: "2023-12-15",
  lastActive: "2024-01-21",
  issuesReported: 12,
  issuesResolved: 8,
  bio: "Active citizen committed to improving our community infrastructure and civic services.",
}

// Mock user's reported issues
const mockUserIssues = [
  {
    id: 1,
    title: "Broken Road on Main Street",
    category: "Road Infrastructure",
    location: "Dhaka - Dhanmondi",
    status: "in-progress",
    priority: "high",
    reportedDate: "2024-01-15",
    votes: 45,
    comments: 12,
  },
  {
    id: 2,
    title: "Street Light Not Working",
    category: "Electricity",
    location: "Dhaka - Dhanmondi",
    status: "resolved",
    priority: "medium",
    reportedDate: "2024-01-10",
    votes: 23,
    comments: 8,
  },
  {
    id: 3,
    title: "Garbage Collection Issue",
    category: "Waste Management",
    location: "Dhaka - Dhanmondi",
    status: "pending",
    priority: "low",
    reportedDate: "2024-01-08",
    votes: 15,
    comments: 5,
  },
]

const bangladeshDistricts = [
  { value: "dhaka", label: "Dhaka" },
  { value: "chittagong", label: "Chittagong" },
  { value: "sylhet", label: "Sylhet" },
  { value: "rajshahi", label: "Rajshahi" },
  { value: "khulna", label: "Khulna" },
  { value: "barisal", label: "Barisal" },
  { value: "rangpur", label: "Rangpur" },
  { value: "mymensingh", label: "Mymensingh" },
]

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoggedIn, token, logout } = useGlobalStore();
  // const [user, setUser] = useState(mockUser)
  const [issues, setIssues] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState(user)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    const fetchData = async () => {
      const resissues = await getIssues();
      setIssues(resissues.data.filter((issue: any) => issue.postBy._id === user?._id));
    };
    fetchData();
  }, [user]);

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

  const handleSaveProfile = () => {
    // setUser(editForm)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    // setEditForm(user)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setEditForm((prev) => (prev ? ({ ...prev, [field]: value } as any) : prev))
  }
  const handleDeleteIssue = async (issueId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/issues/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: issueId}),
      });

      const data = await response.json();

      if (!response.ok) {
        alert('Failed to delete issue');
        throw new Error(data.message || 'Failed to delete issue');
      }
      console.log('Issue deleted successfully:', data.message);
      alert('Issue deleted successfully');
      
    } catch (error) {
      console.error('Error deleting issue:', error);
      alert('Error deleting issue');
    }
    setIssues((prevIssues) => prevIssues.filter((issue) => issue._id !== issueId));
  };

  const handleDeleteUser = async (userId: string) => {

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      if(isLoggedIn && user?._id === userId) {
        logout();
        router.push("/");
      }
      console.log("User deleted successfully:", data.message);
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  }

  // const handlePasswordChange = (currentPassword: string, newPassword: string, confirmPassword: string) => {
  //   // In a real app, you would send this to your backend API
  //   console.log("Changing password:", {
  //     currentPassword,
  //     newPassword,
  //     confirmPassword,
  //   })

  //   // Simulate successful password change
  //   setPasswordMessage({
  //     type: "success",
  //     text: "Password updated successfully!",
  //   })
  //   setIsPasswordModalOpen(false)

  //   // Clear message after 3 seconds
  //   setTimeout(() => {
  //     setPasswordMessage({ type: "", text: "" })
  //   }, 3000)
  // }

  const handlePasswordChange = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: "error", text: "Passwords do not match!" })
      return
    }
    
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/update-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword, id: user?._id  }),
      })

      const data = await res.json()
      console.log("Response from password update: ", data);
      if (!res.ok) throw new Error(data.message || "Failed to update password")
      
      logout();
      router.push("/login");

      setPasswordMessage({ type: "success", text: "Password updated successfully!" })
      setIsPasswordModalOpen(false)

      setTimeout(() => {
        setPasswordMessage({ type: "", text: "" })
      }, 3000)
    } catch (error: any) {
      setPasswordMessage({ type: "error", text: error.message })
    }
  }


  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-serif text-foreground">My Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your account and view your civic contributions</p>
          {passwordMessage.text && (
            <div
              className={`mt-4 p-3 rounded text-sm font-medium ${
                passwordMessage.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {passwordMessage.text}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                      {user?.fullname[0]}
                      {/* {user.lastName[0]}/ */}
                    </AvatarFallback>
                  </Avatar>

                  <h2 className="text-xl font-semibold font-serif text-foreground">
                    {user?.fullname}
                  </h2>
                  <p className="text-muted-foreground mb-4">{user?.email}</p>

                  <div className="w-full space-y-3 text-sm">
                    {/* <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{bangladeshDistricts.find((d) => d.value === user.district)?.label}</span>
                    </div> */}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Joined {user?.createdAt.split("T")[0]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span>{
                        issues.length
                      } Issues Reported</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full mt-6 pt-6 border-t">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{issues.length}</p>
                      <p className="text-xs text-muted-foreground">Reported</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{issues.filter((issue: any) => issue.status.toLowerCase() === 'resolved').length}</p>
                      <p className="text-xs text-muted-foreground">Solved</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="profile" className="flex items-center gap-2 cursor-pointer">
                  <User className="h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="issues" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="h-4 w-4" />
                  My Issues
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="font-serif">Personal Information</CardTitle>
                      {/* {!isEditing ? (
                        <Button onClick={() => setIsEditing(true)} variant="outline">
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button onClick={handleCancelEdit} variant="outline" size="sm">
                            Cancel
                          </Button>
                          <Button onClick={handleSaveProfile} size="sm">
                            Save Changes
                          </Button>
                        </div>
                      )} */}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!isEditing ? (
                      // View Mode
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Name</Label>
                            <p className="text-foreground font-medium">{user?.fullname}</p>
                          </div>
                          {/* <div>
                            <Label className="text-sm font-medium text-muted-foreground">Last Name</Label>
                            <p className="text-foreground font-medium">{user.lastName}</p>
                          </div> */}
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                            <p className="text-foreground font-medium">{user?.email}</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium text-muted-foreground">Joined</Label>
                            <p className="text-foreground font-medium">{user?.createdAt.split("T")[0]}</p>
                          </div>
                          {/* <div>
                            <Label className="text-sm font-medium text-muted-foreground">District</Label>
                            <p className="text-foreground font-medium">
                              {bangladeshDistricts.find((d) => d.value === user.district)?.label}
                            </p>
                          </div> */}
                        </div>
                        <div className="md:col-span-2">
                          <div className="grid grid-cols-4 gap-4 w-full mt-6 pt-6 border-t">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-primary">{issues.length}</p>
                              <p className="text-xs text-muted-foreground">Reported</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-primary">{issues.filter((issue: any) => issue.status.toLowerCase() === 'panding').length}</p>
                              <p className="text-xs text-muted-foreground">Panding</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-primary">{issues.filter((issue: any) => issue.status.toLowerCase() === 'in-progress').length}</p>
                              <p className="text-xs text-muted-foreground">In progress </p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-green-600">{issues.filter((issue: any) => issue.status.toLowerCase() === 'resolved').length}</p>
                              <p className="text-xs text-muted-foreground">Solved</p>
                            </div>
                          </div>
                        </div>
                        {/* <div className="md:col-span-2">
                          <Label className="text-sm font-medium text-muted-foreground">Bio</Label>
                          <p className="text-foreground">{user.bio}</p>
                        </div> */}
                      </div>
                    ) : (
                      // Edit Mode
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="fullname">Name</Label>
                            <Input
                              id="fullname"
                              value={editForm?.fullname}
                              onChange={(e) => handleInputChange("fullname", e.target.value)}
                            />
                          </div>
                          {/* <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={editForm.lastName}
                              onChange={(e) => handleInputChange("lastName", e.target.value)}
                            />
                          </div> */}
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={editForm?.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <div className="space-y-4">
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              value={editForm.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="district">District</Label>
                            <Select
                              value={editForm.district}
                              onValueChange={(value) => handleInputChange("district", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {bangladeshDistricts.map((district) => (
                                  <SelectItem key={district.value} value={district.value}>
                                    {district.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div> */}
                        {/* <div className="md:col-span-2">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={editForm.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={editForm.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                            rows={3}
                          />
                        </div> */}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Issues Tab */}
              <TabsContent value="issues">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">My Reported Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {issues.map((issue, index) => (
                        <Card key={index} className="border border-border/50">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="font-semibold text-foreground">{issue.title}</h3>
                              <div className="flex gap-2">
                                <Badge className={getStatusColor(issue.status)} variant="secondary">
                                  {issue.status.replace("-", " ")}
                                </Badge>
                                <Badge className={getPriorityColor(issue.priority)} variant="secondary">
                                  {issue.priority}
                                </Badge>
                              </div>
                            </div>

                            <div className="space-y-2 text-sm text-muted-foreground">
                              <p>
                                <strong>Category:</strong> {issue.category}
                              </p>
                              <p>
                                <strong>Location:</strong> {issue.location}
                              </p>
                              <p>
                                <strong>Reported:</strong> {issue.postDate.split("T")[0]}
                              </p>
                            </div>

                            <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {issue.votes} votes
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                {issue.comments.length} comments
                              </span>
                            </div>

                            <div className="flex gap-2 mt-4">
                              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                                <Link href={`/issue/${issue._id}`}>
                                  View Details
                                </Link>
                              </Button>
                              <Button onClick={() => handleDeleteIssue(issue._id)} size="sm" variant="outline" className="flex-1 bg-red-600/10 text-red-600 hover:bg-red-600/20 cursor-pointer">
                                Delete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif">Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Notifications</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Email Notifications</p>
                              <p className="text-sm text-muted-foreground">Receive updates about your issues</p>
                            </div>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">SMS Notifications</p>
                              <p className="text-sm text-muted-foreground">Get SMS updates for urgent issues</p>
                            </div>
                            <input type="checkbox" className="rounded" />
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Privacy</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Public Profile</p>
                              <p className="text-sm text-muted-foreground">Make your profile visible to other users</p>
                            </div>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Show Location</p>
                              <p className="text-sm text-muted-foreground">Display your district in your profile</p>
                            </div>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-foreground mb-4">Danger Zone</h3>
                        <div className="space-y-3">
                          <Button
                            variant="outline"
                            className="w-full justify-start bg-transparent cursor-pointer"
                            onClick={() => setIsPasswordModalOpen(true)}
                          >
                            Change Password
                          </Button>
                          {/* <Button variant="outline" className="w-full justify-start bg-transparent">
                            Download My Data
                          </Button> */}
                          <Button variant="destructive" className="w-full justify-center cursor-pointer" onClick={() => handleDeleteUser(user?._id!)}>
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSubmit={handlePasswordChange}
      />
    </div>
  )
}
