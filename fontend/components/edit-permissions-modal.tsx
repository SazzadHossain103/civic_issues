"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
<<<<<<< HEAD
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
=======
>>>>>>> main

interface EditPermissionsModalProps {
  isOpen: boolean
  onClose: () => void
  admin: any
<<<<<<< HEAD
  onUpdatePermissions: (adminId: string, role: string, department: string, permissions: string[]) => void
}

export function EditPermissionsModal({ isOpen, onClose, admin, onUpdatePermissions }: EditPermissionsModalProps) {
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
=======
  onUpdatePermissions: (adminId: number, permissions: string[]) => void
}

export function EditPermissionsModal({ isOpen, onClose, admin, onUpdatePermissions }: EditPermissionsModalProps) {
>>>>>>> main
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const availablePermissions = ["view", "edit", "respond", "moderate", "all"]

<<<<<<< HEAD
  const availableRoles = ["Super Admin", "Regional Admin", "Department Admin", "Moderator"]

  const availableDepartments = [
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

  useEffect(() => {
    if (admin) {
      setSelectedRole(admin.role || "")
      setSelectedDepartment(admin.department || "")
=======
  useEffect(() => {
    if (admin) {
>>>>>>> main
      setSelectedPermissions(admin.permissions || [])
    }
  }, [admin])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (admin) {
<<<<<<< HEAD
      onUpdatePermissions(admin._id, selectedRole, selectedDepartment, selectedPermissions)
=======
      onUpdatePermissions(admin.id, selectedPermissions)
>>>>>>> main
    }
    onClose()
  }

  const handlePermissionChange = (permission: string, checked: boolean) => {
    setSelectedPermissions((prev) => (checked ? [...prev, permission] : prev.filter((p) => p !== permission)))
  }

  if (!admin) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
<<<<<<< HEAD
          <DialogTitle>Edit Admin Details - {admin.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {availableDepartments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
=======
          <DialogTitle>Edit Permissions - {admin.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Current Role: {admin.role}</Label>
            <Label>Department: {admin.department}</Label>
>>>>>>> main
          </div>

          <div className="space-y-2">
            <Label>Permissions</Label>
            <div className="grid grid-cols-1 gap-3">
              {availablePermissions.map((permission) => (
                <div key={permission} className="flex items-center space-x-2">
                  <Checkbox
                    id={permission}
                    checked={selectedPermissions.includes(permission)}
                    onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
                  />
                  <Label htmlFor={permission} className="text-sm capitalize">
                    {permission === "all" ? "All Permissions (Super Admin)" : permission}
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
<<<<<<< HEAD
              Update Admin
=======
              Update Permissions
>>>>>>> main
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
