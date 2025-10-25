"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { User, LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"
import { useGlobalStore } from "@/components/globalVariable"

export function Navigation() {
  
  const pathname = usePathname()
  const { token, tokenExpiry, isLoggedIn, user, logout, setUser,  setToken, setIsLoggedIn } = useGlobalStore();
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const isMobile = useIsMobile()

  console.log('navigation isloggedin : ' , isLoggedIn)
  console.log('navigation user : ' , user)
  console.log("token from navigation : " , token)
  // useEffect(() => {
  //   // Check if user is logged in from localStorage
  //   const loggedInUser = localStorage.getItem("currentUser")
  //   console.log("loggedInUser from localStorage:", loggedInUser)
  //   if (loggedInUser) {
      
  //     setIsLoggedIn(true)
  //     console.log("is logged in" , isLoggedIn )
  //   }
  // }, [isLoggedIn])
  useEffect(() => {
    if (tokenExpiry && Date.now() > tokenExpiry) {
      logout();
    }
  }, [tokenExpiry, logout]);

  const handleLogout = async () => {
      //  console.log("loggedInUser from localStorage:", localStorage.getItem("currentUser"))
    try {
      // 👇 Call your backend logout API
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`, {
        method: "POST",
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send token if needed
        },
      });
      if (res.status === 401) {
        alert("Login agin")
        logout(); // auto logout if expired/invalid
        return;
      }

      if (!res.ok) {
        const error = await res.json();
        console.error("Logout failed:", error.message);
      }

      // ✅ Clear Zustand + localStorage
      logout();
      // localStorage.removeItem("currentUser")
      console.log("User logged out successfully");
      alert("Logged out successfully");

    } catch (err) {
      console.error("Error during logout:", err);
    }
    // setUser(null)
    // setIsLoggedIn(false)
    console.log("Logged out, isLoggedIn:", isLoggedIn)
    // setToken("")
    console.log("logout token : ", token)
    console.log("logout user : ", user)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <> 
    { pathname === "/admin" ? 
      null 
      : 
      <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold font-serif text-primary">CIVIC ISSUES</Link>
            <div className="flex items-center space-x-8 flex-row">
              <div className="hidden md:flex space-x-6">
                <Link href="/" className="text-foreground hover:text-primary transition-colors">
                  Home
                </Link>
                <Link href="/report" className="text-foreground hover:text-primary transition-colors">
                  Post Issue
                </Link>
                <Link href="/browse" className="text-foreground hover:text-primary transition-colors">
                  Browse Issues
                </Link>
                <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="md:hidden">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle>Menu</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col space-y-4 mt-6">
                      <Link
                        href="/"
                        className="text-foreground hover:text-primary transition-colors py-2 px-4 rounded-md hover:bg-accent"
                        onClick={closeMobileMenu}
                      >
                        Home
                      </Link>
                      <Link
                        href="/report"
                        className="text-foreground hover:text-primary transition-colors py-2 px-4 rounded-md hover:bg-accent"
                        onClick={closeMobileMenu}
                      >
                        Post Issue
                      </Link>
                      <Link
                        href="/browse"
                        className="text-foreground hover:text-primary transition-colors py-2 px-4 rounded-md hover:bg-accent"
                        onClick={closeMobileMenu}
                      >
                        Browse Issues
                      </Link>
                      <Link
                        href="/about"
                        className="text-foreground hover:text-primary transition-colors py-2 px-4 rounded-md hover:bg-accent"
                        onClick={closeMobileMenu}
                      >
                        About
                      </Link>

                      <div className="border-t pt-4 mt-4">
                        {isLoggedIn ? (
                          <div className="space-y-2">
                            <Link
                              href="/profile"
                              className="flex items-center text-foreground hover:text-primary transition-colors py-2 px-4 rounded-md hover:bg-accent"
                              onClick={closeMobileMenu}
                            >
                              <User className="mr-2 h-4 w-4" />
                              My Profile
                            </Link>
                            <button
                              onClick={() => {
                                handleLogout()
                                closeMobileMenu()
                              }}
                              className="flex items-center text-foreground hover:text-primary transition-colors py-2 px-4 rounded-md hover:bg-accent w-full text-left"
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              Logout
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Link href="/login" onClick={closeMobileMenu}>
                              <Button variant="outline" className="w-full bg-transparent">
                                Login
                              </Button>
                            </Link>
                            <Link href="/register" onClick={closeMobileMenu}>
                              <Button className="w-full">Register</Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className="hidden md:flex items-center space-x-4">
                {isLoggedIn ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8 border-slate-500">
                          {/* <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Profile" /> */}
                          <AvatarFallback>
                            <User className="h-4 w-4 text-black " />
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuItem disabled>
                        <div className="flex flex-col">
                          <span className="font-medium">{user?.fullname || "User"}</span>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>My Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    }
    </>
  )
}
