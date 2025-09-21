"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings } from "lucide-react"

interface AdminNavbarProps {
  adminName: string
  onLogout: () => void
}

export function AdminNavbar({ adminName, onLogout }: AdminNavbarProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">Bangladesh Civic Issues Platform</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Welcome, {adminName}</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Admin Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
