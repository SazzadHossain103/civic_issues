"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, MessageSquare, CheckCircle, Clock, AlertTriangle, Users, BarChart3, Trash2 } from "lucide-react"
import { IssueDetailsModal } from "@/components/issue-details-modal"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AddUserModal } from "@/components/add-user-modal"
import { AddAdminModal } from "@/components/add-admin-modal"
import { EditPermissionsModal } from "@/components/edit-permissions-modal"
import { AdminNavbar } from "@/components/admin-navbar"
import { AdminLoginForm } from "@/components/admin-login-form"
import { useGlobalStore } from "@/components/globalVariable"
import { getIssues, getUsers } from "@/components/getData"
import {jwtDecode} from "jwt-decode";

type JwtPayload = { exp: number };


// Mock data for admin dashboard
const mockIssues = [
  {
    id: 1,
    title: "Broken Road on Main Street",
    category: "Road Infrastructure",
    location: "Dhaka - Dhanmondi",
    status: "pending",
    priority: "high",
    reportedBy: "Ahmed Hassan",
    reportedDate: "2024-01-15",
    votes: 45,
    comments: 12,
    description: "Large potholes making it dangerous for vehicles",
  },
  {
    id: 2,
    title: "Blocked Drainage System",
    category: "Drainage",
    location: "Chittagong - Agrabad",
    status: "in-progress",
    priority: "medium",
    reportedBy: "Fatima Khan",
    reportedDate: "2024-01-14",
    votes: 23,
    comments: 8,
    description: "Water logging during rain due to blocked drains",
  },
  {
    id: 3,
    title: "Street Light Not Working",
    category: "Electricity",
    location: "Sylhet - Zindabazar",
    status: "resolved",
    priority: "low",
    reportedBy: "Rahman Ali",
    reportedDate: "2024-01-12",
    votes: 15,
    comments: 5,
    description: "Multiple street lights not functioning for weeks",
  },
]

const mockUsers = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    role: "Citizen",
    status: "active",
    joinDate: "2023-12-15",
    issuesReported: 12,
    location: "Dhaka - Dhanmondi",
    lastActive: "2024-01-20",
  },
  {
    id: 2,
    name: "Fatima Khan",
    email: "fatima.khan@email.com",
    role: "Citizen",
    status: "active",
    joinDate: "2023-11-22",
    issuesReported: 8,
    location: "Chittagong - Agrabad",
    lastActive: "2024-01-19",
  },
  {
    id: 3,
    name: "Rahman Ali",
    email: "rahman.ali@email.com",
    role: "Citizen",
    status: "active",
    joinDate: "2023-10-10",
    issuesReported: 15,
    location: "Sylhet - Zindabazar",
    lastActive: "2024-01-18",
  },
  {
    id: 4,
    name: "Nasir Uddin",
    email: "nasir.uddin@email.com",
    role: "Citizen",
    status: "inactive",
    joinDate: "2023-09-05",
    issuesReported: 3,
    location: "Rajshahi - Shaheb Bazar",
    lastActive: "2023-12-15",
  },
  {
    id: 5,
    name: "Salma Begum",
    email: "salma.begum@email.com",
    role: "Citizen",
    status: "active",
    joinDate: "2024-01-02",
    issuesReported: 6,
    location: "Khulna - Daulatpur",
    lastActive: "2024-01-21",
  },
]

const mockAdmins = [
  {
    id: 1,
    name: "Mohammad Karim",
    email: "m.karim@admin.gov.bd",
    role: "Super Admin",
    status: "active",
    joinDate: "2023-01-15",
    department: "IT Administration",
    permissions: ["all"],
    lastActive: "2024-01-21",
  },
  {
    id: 2,
    name: "Rashida Sultana",
    email: "r.sultana@admin.gov.bd",
    role: "Regional Admin",
    status: "active",
    joinDate: "2023-03-20",
    department: "Dhaka Division",
    permissions: ["view", "edit", "respond"],
    lastActive: "2024-01-20",
  },
  {
    id: 3,
    name: "Abdul Mannan",
    email: "a.mannan@admin.gov.bd",
    role: "Department Admin",
    status: "active",
    joinDate: "2023-05-10",
    department: "Road & Highways",
    permissions: ["view", "respond"],
    lastActive: "2024-01-19",
  },
  {
    id: 4,
    name: "Taslima Akter",
    email: "t.akter@admin.gov.bd",
    role: "Moderator",
    status: "active",
    joinDate: "2023-07-12",
    department: "Content Moderation",
    permissions: ["view", "moderate"],
    lastActive: "2024-01-21",
  },
]

const stats = {
  totalIssues: 156,
  pendingIssues: 89,
  inProgressIssues: 34,
  resolvedIssues: 33,
  totalUsers: 1247,
}

export default function AdaminDashboard() {
  // const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null)
  const [loginError, setLoginError] = useState("")
  const [issues, setIssues] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [admins, setAdmins] = useState<any[]>([])
  const [selectedIssue, setSelectedIssue] = useState<any>(null)
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false)
  const [isEditPermissionsModalOpen, setIsEditPermissionsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [activeView, setActiveView] = useState("dashboard")


  const { adminToken, adminTokenExpiry, isAdminLoggedIn, admin, adminlogout, setAdmin,  setAdminToken, setIsAdminLoggedIn } = useGlobalStore();

  useEffect(() => {
    if (adminTokenExpiry && Date.now() > adminTokenExpiry) {
      adminlogout();
    }
  }, [adminTokenExpiry, adminlogout]);

 
  useEffect(() => {
    const fetehData = async () => {
      const resissues = await getIssues();
      setIssues(resissues.data);
      const resusers = await getUsers();
      setUsers(resusers.data);

      try{
        const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admins/list`, { 
        method: "GET",
        headers: { Authorization: `Bearer ${adminToken}`, },
        next: { revalidate: 10 } });

        if (!result.ok) {
          throw new Error("Failed to fetch issue");
        }
        console.log("admins fetch ok")
        const data = await result.json();
        setAdmins(data.data);
      }
      catch(error){
        console.log("admins fetch error ", error)
      }
    }
    fetehData();
    console.log("Admins from admin: ", admins )
  }, [adminToken])

  // useEffect(() => {
  //   const savedAdmin = localStorage.getItem("adminUser")
  //   if (savedAdmin) {
  //     const adminData = JSON.parse(savedAdmin)
  //     setAdminToken(adminData.token)
  //     setAdminUser(adminData.admin)
  //     setIsAdminLoggedIn(true)
  //   }
  // }, [adminUser])

  console.log("current admin : ", admin)

  // const handleAdminLogin = (email: string, password: string) => {
  //   // Demo admin credentials
  //   if (email === "admin@civicissues.gov.bd" && password === "admin123456") {
  //     const adminData = { name: "Mohammad Karim", email }
  //     setAdminUser(adminData)
  //     setIsAdminLoggedIn(true)
  //     setLoginError("")
  //     localStorage.setItem("adminUser", JSON.stringify(adminData))
  //   } else {
  //     setLoginError("Invalid email or password. Please try again.")
  //   }
  // }

  

  const handleAdminLogin = async (email: string, password: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admins/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("Login failed");
        alert("Login failed");
        setLoginError(data.message || "Login failed");
        return;
      }
      alert("Logged in successfully");

      const decoded: JwtPayload = jwtDecode(data.data.token);
      const expiryTime = decoded.exp * 1000; // convert to ms

      setAdminToken(data.data.token, expiryTime);
      const adminData = data.data.admin;
      setAdmin(adminData);
      setIsAdminLoggedIn(true);
      setLoginError("");

      // optional: keep in localStorage if you want
      // localStorage.setItem("adminUser", JSON.stringify(adminData));
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Something went wrong. Try again.");
    }
  };

  const handleAdminLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admins/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!res.ok) {
        console.log("Logout failed");
      }
      alert("Logout successfully");

      // setIsAdminLoggedIn(false);
      // setAdmin(null);
      adminlogout();
      // localStorage.removeItem("adminUser");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  // const handleAdminLogout = () => {
  //   setIsAdminLoggedIn(false)
  //   setAdminUser(null)
  //   localStorage.removeItem("adminUser")
  // }

  if (!isAdminLoggedIn) {
    return <AdminLoginForm onLogin={handleAdminLogin} error={loginError} />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
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

  const updateIssueStatus = (issueId: number, newStatus: string) => {
    setIssues(issues.map((issue) => (issue.id === issueId ? { ...issue, status: newStatus } : issue)))
  }

  const handleViewDetails = (issue: any) => {
    setSelectedIssue(issue)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedIssue(null)
  }

  const handleAddUser = (userData: any) => {
    setUsers((prev) => [...prev, userData])
  }

  const handleDeleteUser = (userId: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
  }

  // const handleAddAdmin = (adminData: any) => {
  //   setAdmins((prev) => [...prev, adminData])
  // }
  console.log("admin token : " , adminToken)
  const handleAddAdmin = async (adminData: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admins/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify(adminData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add admin");
      }

      // Add the new admin to state
      setAdmins((prev) => [...prev, data.data]);

      console.log("Admin added successfully:", data.data);
    } catch (error: any) {
      console.log("Error adding admin:", error.message);
      alert(error.message);
    }
  };


  const handleDeleteAdmin = (adminId: number) => {
    setAdmins((prev) => prev.filter((admin) => admin.id !== adminId))
  }

  const handleUpdatePermissions = (adminId: number, permissions: string[]) => {
    setAdmins((prev) => prev.map((admin) => (admin.id === adminId ? { ...admin, permissions } : admin)))
  }

  const handleEditPermissions = (admin: any) => {
    setSelectedAdmin(admin)
    setIsEditPermissionsModalOpen(true)
  }

  const getFilteredIssuesByView = () => {
    switch (activeView) {
      case "pending-issues":
        return issues.filter((issue) => issue.status === "pending")
      case "in-progress":
        return issues.filter((issue) => issue.status === "in-progress")
      case "resolved":
        return issues.filter((issue) => issue.status === "resolved")
      case "total-issues":
      default:
        return issues.filter((issue) => {
          const matchesSearch =
            issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            issue.location.toLowerCase().includes(searchTerm.toLowerCase())
          const matchesStatus = statusFilter === "all" || issue.status.toLowerCase() === statusFilter
          const matchesPriority = priorityFilter === "all" || issue.priority.toLowerCase() === priorityFilter
          return matchesSearch && matchesStatus && matchesPriority
        })
    }
  }

  const getViewTitle = () => {
    switch (activeView) {
      case "dashboard":
        return "Dashboard Overview"
      case "total-issues":
        return "All Issues"
      case "pending-issues":
        return "Pending Issues"
      case "in-progress":
        return "In Progress Issues"
      case "resolved":
        return "Resolved Issues"
      case "users":
        return "User Management"
      case "admins":
        return "Admin Management"
      default:
        return "Dashboard"
    }
  }

  const renderContent = () => {
    if (activeView === "users") {
      return (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">User Management</h3>
                <div className="flex gap-2">
                  {/* <Button size="sm" onClick={() => setIsAddUserModalOpen(true)}>
                    Add New User
                  </Button> */}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {users.map((user,index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{user.fullname}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <Badge className={getStatusColor(user.status)} variant="secondary">
                          {user.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>Location:</strong> {user.location}
                        </p>
                        <p>
                          <strong>Issues Reported:</strong> {issues.filter((issue) => issue.postBy._id === user._id).length}
                        </p>
                        <p>
                          <strong>Joined:</strong> {user.createdAt.split("T")[0]}
                        </p>
                        {/* <p>
                          <strong>Last Active:</strong> {user.lastActive}
                        </p> */}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex-1"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (activeView === "admins") {
      return (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Admin Management</h3>
                <div className="flex gap-2">
                  {admin?.role === "Super Admin" && <Button size="sm" onClick={() => setIsAddAdminModalOpen(true)}>
                    Add New Admin
                  </Button>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {admins && admins.map((item,index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.email}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge className={getStatusColor(item.status)} variant="secondary">
                            {item.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.role}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <p>
                          <strong>Department:</strong> {item.department}
                        </p>
                        <p>
                          <strong>Permissions:</strong> {item.permissions.join(", ")}
                        </p>
                        <p>
                          <strong>Joined:</strong> {item.createdAt.split("T")[0]}
                        </p>
                        {/* <p>
                          <strong>Last Active:</strong> {item.updatedAt}
                        </p> */}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => handleEditPermissions(item)}
                        >
                          Edit Permissions
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleDeleteAdmin(item.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return (
      <>
        {/* Stats Cards - Show only on dashboard */}
        {activeView === "dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Issues</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalIssues}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Clock className="h-8 w-8 text-yellow-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.pendingIssues}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <AlertTriangle className="h-8 w-8 text-blue-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">In Progress</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.inProgressIssues}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Resolved</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.resolvedIssues}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-purple-600" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search issues by title or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Issues List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Issues Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getFilteredIssuesByView().map((issue) => (
              <Card key={issue._id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{issue.title}</h3>
                    <div className="flex flex-col gap-1">
                      <Badge className={getStatusColor(issue.status)} variant="secondary">
                        {issue.status.replace("-", " ")}
                      </Badge>
                      <Badge className={getPriorityColor(issue.priority)} variant="secondary">
                        {issue.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      <strong>Category:</strong> {issue.category}
                    </p>
                    <p>
                      <strong>Location:</strong> {issue.location}
                    </p>
                    <p>
                      <strong>Reported by:</strong> {issue.postBy.fullname}
                    </p>
                    <p>
                      <strong>Date:</strong> {issue.postDate.split("T")[0]}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
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
                    <Button size="sm" variant="outline" onClick={() => handleViewDetails(issue)} className="flex-1">
                      View Details
                    </Button>
                    <Select value={issue.status.toLowerCase()} onValueChange={(value) => updateIssueStatus(issue._id, value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNavbar adminName={admin?.name || "Admin"} onLogout={handleAdminLogout} />

      <div className="flex flex-1">
      <AdminSidebar activeItem={activeView} onItemSelect={setActiveView} />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">{getViewTitle()}</h1>
            <p className="text-gray-600 mt-2">Manage civic issues and monitor platform activity</p>
          </div>

          {renderContent()}

          {/* Issue Details Modal */}
          <IssueDetailsModal
            issue={selectedIssue}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onStatusUpdate={updateIssueStatus}
          />

          {/* Add User Modal */}
          <AddUserModal
            isOpen={isAddUserModalOpen}
            onClose={() => setIsAddUserModalOpen(false)}
            onAddUser={handleAddUser}
          />

          {/* Add Admin Modal */}
          <AddAdminModal
            isOpen={isAddAdminModalOpen}
            onClose={() => setIsAddAdminModalOpen(false)}
            onAddAdmin={handleAddAdmin}
          />

          {/* Edit Permissions Modal */}
          <EditPermissionsModal
            isOpen={isEditPermissionsModalOpen}
            onClose={() => setIsEditPermissionsModalOpen(false)}
            admin={selectedAdmin}
            onUpdatePermissions={handleUpdatePermissions}
          />
        </div>
      </div>
      </div>
    </div>
  )
}
