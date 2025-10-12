"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

interface AddAdminModalProps {
  isOpen: boolean
  onClose: () => void
  onAddAdmin: (adminData: any) => void
}

export function AddAdminModal({ isOpen, onClose, onAddAdmin }: AddAdminModalProps) {
  const [formData, setFormData] = useState({
<<<<<<< HEAD
    fullname: "",
    email: "",
    password: "",
    role: "Moderator",
    department: "",
=======
    name: "",
    email: "",
    role: "Moderator",
    department: "",
    status: "active",
>>>>>>> main
    permissions: [] as string[],
  })

  const availablePermissions = ["view", "edit", "respond", "moderate", "all"]

<<<<<<< HEAD
  const departments = [
    "IT Administration",
    "Dhaka Division",
    "Chittagong Division",
    "Rajshahi Division",
    "Khulna Division",
    "Sylhet Division",
    "Road & Highways",
    "Water & Sanitation",
    "Electricity & Power",
    "Content Moderation",
    "Central Administration",
  ]

=======
>>>>>>> main
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newAdmin = {
      ...formData,
      id: Date.now(),
      joinDate: new Date().toISOString().split("T")[0],
      lastActive: new Date().toISOString().split("T")[0],
    }
    onAddAdmin(newAdmin)
<<<<<<< HEAD
    setFormData({ fullname: "", email: "", password: "", role: "Moderator", department: "", permissions: [] })
=======
    setFormData({ name: "", email: "", role: "Moderator", department: "", status: "active", permissions: [] })
>>>>>>> main
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      permissions: checked ? [...prev.permissions, permission] : prev.permissions.filter((p) => p !== permission),
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
<<<<<<< HEAD
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              id="fullname"
              value={formData.fullname}
              onChange={(e) => handleInputChange("fullname", e.target.value)}
=======
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
>>>>>>> main
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>
<<<<<<< HEAD
          <div className="space-y-2">
            <Label htmlFor="passwprd">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
=======
>>>>>>> main

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Super Admin">Super Admin</SelectItem>
                <SelectItem value="Regional Admin">Regional Admin</SelectItem>
                <SelectItem value="Department Admin">Department Admin</SelectItem>
                <SelectItem value="Moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
<<<<<<< HEAD
            <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
=======
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
              placeholder="e.g., IT Administration"
              required
            />
>>>>>>> main
          </div>

          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-2 gap-2">
              {availablePermissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission}
                    checked={formData.permissions.includes(permission)}
                    onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
                  />
                  <Label htmlFor={permission} className="text-sm capitalize">
                    {permission}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Admin
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
