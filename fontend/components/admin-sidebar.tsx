"use client"

import { cn } from "@/lib/utils"
import { LayoutDashboard, FileText, Clock, AlertTriangle, CheckCircle, Users, Shield } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface AdminSidebarProps {
  activeItem: string
  onItemSelect: (item: string) => void
}

const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "total-issues",
    label: "Total Issues",
    icon: FileText,
  },
  {
    id: "pending-issues",
    label: "Pending Issues",
    icon: Clock,
  },
  {
    id: "in-progress",
    label: "In Progress",
    icon: AlertTriangle,
  },
  {
    id: "resolved",
    label: "Resolved",
    icon: CheckCircle,
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
  },
  {
    id: "admins",
    label: "Admins",
    icon: Shield,
  },
]

export function SidebarContent({
  activeItem,
  onItemSelect,
}: { activeItem: string; onItemSelect: (item: string) => void }) {
  return (
    <div className="p-3 ">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => {
                onItemSelect(item.id)
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors cursor-pointer",
                activeItem === item.id
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export function AdminSidebar({ activeItem, onItemSelect }: AdminSidebarProps) {
  return (
    <div className="w-64 min-w-50 bg-white border-r border-gray-200 min-h-screen hidden md:block">
      <div className="p-6 fixed">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onItemSelect(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors cursor-pointer",
                  activeItem === item.id
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
