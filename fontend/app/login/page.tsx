"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useGlobalStore } from "@/components/globalVariable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import {jwtDecode} from "jwt-decode";

type JwtPayload = { exp: number }

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { token, isLoggedIn, user, setUser,  setToken, setIsLoggedIn } = useGlobalStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // api call backend
    const userloginData = {
      email: email,
      password : password,
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userloginData),
      })

      if (res.ok) {
        alert("Logged in successfull")
        const userData = await res.json()
        console.log("Login Response:", userData)
        console.log("token : ", userData.data.accessToken)
        const decoded: JwtPayload = jwtDecode(userData.data.accessToken);
        const expiryTime = decoded.exp * 1000; // convert to ms
        setToken(userData.data.accessToken, expiryTime)
        setIsLoggedIn(true)
        setUser( userData.data.user )
        console.log("isLoggedIn after login : ", isLoggedIn)
        console.log("user after login : ", user)
        console.log("token after login : ", token)
        // Save user info (token or user object) to localStorage
        // localStorage.setItem("currentUser", userData.data.accessToken)
        router.push("/")
      } else {
        const error = await res.json()
        setError(error.message || "Invalid email or password.")
      }
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }

    // Demo user credentials
    // if (email === "sazzad@gmail.com" && password === "12345678") {
    //   // Set user data in localStorage
    //   const userData = {
    //     email: "sazzad@gmail.com",
    //     name: "Sazzad Rahman",
    //     id: "user_001",
    //   }
    //   localStorage.setItem("currentUser", JSON.stringify(userData))

    //   // Redirect to home page
    //   router.push("/")
    // } else {
    //   setError("Invalid email or password. Use sazzad@gmail.com / 12345678")
    // }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-serif font-bold text-primary">Civic Issues Report</h1>
            <p className="text-sm text-muted-foreground">Bangladesh Government Issues</p>
          </Link>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-serif">Login</CardTitle>
            <CardDescription>Sign in to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form className="space-y-4" onSubmit={handleSubmit}>  {/* login Form fields */}
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input id="remember" type="checkbox" className="rounded border-border" />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800 font-medium">Demo Credentials:</p>
              <p className="text-sm text-blue-700">Email: sazzad@gmail.com</p>
              <p className="text-sm text-blue-700">Password: 12345678</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            By logging in, you agree to our{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
