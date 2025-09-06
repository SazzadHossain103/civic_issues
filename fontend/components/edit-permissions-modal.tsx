"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface EditPermissionsModalProps {
  isOpen: boolean
  onClose: () => void
  admin: any
  onUpdatePermissions: (adminId: number, permissions: string[]) => void
}

export function EditPermissionsModal({ isOpen, onClose, admin, onUpdatePermissions }: EditPermissionsModalProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const availablePermissions = ["view", "edit", "respond", "moderate", "all"]

  useEffect(() => {
    if (admin) {
      setSelectedPermissions(admin.permissions || [])
    }
  }, [admin])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (admin) {
      onUpdatePermissions(admin.id, selectedPermissions)
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
          <DialogTitle>Edit Permissions - {admin.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Current Role: {admin.role}</Label>
            <Label>Department: {admin.department}</Label>
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
              Update Permissions
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
