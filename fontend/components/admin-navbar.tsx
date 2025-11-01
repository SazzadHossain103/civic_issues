"use client"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet"
import { User, LogOut, Settings, Menu } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { AdminSidebar, SidebarContent } from "./admin-sidebar"

interface AdminNavbarProps {
  adminName: string
  onLogout: () => void
  activeItem: string
  onItemSelect: (item: string) => void
}

export function AdminNavbar({ adminName, onLogout, activeItem, onItemSelect }: AdminNavbarProps) {
  const isMobile = useIsMobile()

  return (
    <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-xs md:text-sm text-gray-600">Bangladesh Civic Issues Platform</p>
        </div>
        <div className="flex items-center gap-4">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-70">
                <SheetHeader>
                  {/* <SheetTitle>Menu</SheetTitle> */}
                  <SheetTitle className="border-b pb-2">
                    <p className="text-sm text-gray-600">Welcome</p>
                    <p className="font-semibold text-gray-900">{adminName}</p>
                  </SheetTitle>
                </SheetHeader>
                <SidebarContent activeItem={activeItem} onItemSelect={onItemSelect} />
                <div className="flex flex-col gap-6 mt-8 p-3">
                  {/* <div className="border-b pb-4">
                    <p className="text-sm text-gray-600">Welcome</p>
                    <p className="font-semibold text-gray-900">{adminName}</p>
                  </div> */}
                  <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" onClick={onLogout}>
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}

        </div>

        {/* Desktop profile dropdown */}
        {!isMobile && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {adminName}</span>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-10 w-10 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                {/* <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Admin Profile</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  )
}
