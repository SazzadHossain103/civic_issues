"use client"

import type React from "react"
import { useGlobalStore } from "@/components/globalVariable"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Camera,
  MapPin,
  Upload,
  ArrowLeft,
  AlertTriangle,
  ThumbsUp,
  MessageCircle,
  Eye,
  ArrowRight,
  X,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Navigation } from "@/components/navigation"
import { useRouter } from "next/navigation";
import { getIssues } from "@/components/getData"

const existingIssues = [
  {
    id: "1",
    title: "Broken road with large potholes",
    category: "road",
    location: "Dhanmondi, Dhaka",
    description: "Multiple large potholes making it difficult for vehicles to pass",
    image: "/placeholder.svg?height=200&width=300",
    likes: 45,
    comments: 12,
    status: "Under Review",
  },
  {
    id: "2",
    title: "Blocked drainage system",
    category: "drainage",
    location: "Gulshan, Dhaka",
    description: "Drainage system blocked causing water logging during rain",
    image: "/placeholder.svg?height=200&width=300",
    likes: 32,
    comments: 8,
    status: "In Progress",
  },
  {
    id: "3",
    title: "Frequent power outages",
    category: "electricity",
    location: "Uttara, Dhaka",
    description: "Daily power cuts for 3-4 hours affecting residents",
    image: "/placeholder.svg?height=200&width=300",
    likes: 67,
    comments: 23,
    status: "Reported",
  },
]

const bangladeshLocations = [
  // Dhaka Division
  "Dhanmondi, Dhaka",
  "Gulshan, Dhaka",
  "Uttara, Dhaka",
  "Mirpur, Dhaka",
  "Wari, Dhaka",
  "Ramna, Dhaka",
  "Tejgaon, Dhaka",
  "Pallabi, Dhaka",
  "Shah Ali, Dhaka",
  "Sutrapur, Dhaka",
  "Lalbagh, Dhaka",
  "Kotwali, Dhaka",
  "Chawkbazar, Dhaka",
  "Hazaribagh, Dhaka",
  "New Market, Dhaka",
  "Shahbagh, Dhaka",
  "Motijheel, Dhaka",
  "Paltan, Dhaka",
  "Banani, Dhaka",
  "Baridhara, Dhaka",

  // Chittagong Division
  "Kotwali, Chittagong",
  "Panchlaish, Chittagong",
  "Double Mooring, Chittagong",
  "Pahartali, Chittagong",
  "Bayezid, Chittagong",
  "Chandgaon, Chittagong",
  "Karnaphuli, Chittagong",
  "Banshkhali, Chittagong",
  "Boalkhali, Chittagong",
  "Anwara, Chittagong",

  // Rajshahi Division
  "Boalia, Rajshahi",
  "Motihar, Rajshahi",
  "Rajpara, Rajshahi",
  "Shah Makhdum, Rajshahi",

  // Khulna Division
  "Kotwali, Khulna",
  "Sonadanga, Khulna",
  "Khalishpur, Khulna",
  "Daulatpur, Khulna",

  // Sylhet Division
  "Kotwali, Sylhet",
  "South Surma, Sylhet",
  "Osmani Nagar, Sylhet",
  "Shah Poran, Sylhet",

  // Barisal Division
  "Kotwali, Barisal",
  "Bakerganj, Barisal",
  "Banari Para, Barisal",
  "Wazirpur, Barisal",

  // Rangpur Division
  "Kotwali, Rangpur",
  "Mithapukur, Rangpur",
  "Badarganj, Rangpur",
  "Gangachara, Rangpur",

  // Mymensingh Division
  "Kotwali, Mymensingh",
  "Muktagachha, Mymensingh",
  "Fulbaria, Mymensingh",
  "Gaffargaon, Mymensingh",
]

export default function ReportIssuePage() {
  const { token, isLoggedIn, setToken, setIsLoggedIn } = useGlobalStore();
  const [currentStep, setCurrentStep] = useState(1)
  // const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
  })
  const [duplicateIssues, setDuplicateIssues] = useState<any[]>([])
  const [showDuplicates, setShowDuplicates] = useState(false)
  const router = useRouter();

  // const [recentIssues, setrecentIssues] = useState([])
  useEffect(() => {
    const fetehData = async () => {
      const result = await getIssues();
      setDuplicateIssues(result.data);
    }
    fetehData();
  }, [])

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files
  //   if (files) {
  //     Array.from(files).forEach((file) => {
  //       const reader = new FileReader()
  //       reader.onload = (e) => {
  //         const result = e.target?.result as string
  //         setSelectedImages((prev) => [...prev, result])
  //       }
  //       reader.readAsDataURL(file)
  //     })
  //   }
  // }

  // const removeImage = (index: number) => {
  //   setSelectedImages((prev) => prev.filter((_, i) => i !== index))
  // }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);

      // store actual files for upload
      setSelectedImages((prev) => [...prev, ...fileArray]);

      // create previews
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setPreviewImages((prev) => [...prev, result])
        }
        reader.readAsDataURL(file)
      })
      // const previewArray = fileArray.map((file) => URL.createObjectURL(file));
      // setPreviewImages((prev) => [...prev, ...previewArray]);

    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNextStep = () => {
    if (!formData.category || !formData.location) {
      alert("Please select both category and location")
      return
    }

    const duplicates = duplicateIssues.filter(
      (issue) => issue.category === formData.category && issue.location === formData.location,
    )

    setDuplicateIssues(duplicates)

    if (duplicates.length > 0) {
      setShowDuplicates(true)
    } else {
      setCurrentStep(2)
    }
  }

  const proceedToStep2 = () => {
    setShowDuplicates(false)
    setCurrentStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoggedIn || !token) {
      alert("Please login to post.");
      router.push("/login"); // redirect to login page
      return;
    }
    console.log("Form submitted:", formData)
    console.log("Images:", selectedImages)

    if (selectedImages.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("category", formData.category);
    form.append("location", formData.location);
    form.append("description", formData.description);
    selectedImages.forEach((file) => { form.append("images", file) });

    console.log(form);

    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/issues/add`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, },
        // body: JSON.stringify(form),
        body: form,

      });

      if (res.ok) {
        alert("Post issue successfull");
      } else {
        const error = await res.json();
        alert(error.message || "Failed to post issue.");
      }

      setCurrentStep(1);
      setFormData({ title: "", category: "", location: "", description: "" });
      setSelectedImages([]);
      setPreviewImages([]);
    } catch (err) {
      alert("An error occurred while posting the issue must be logged in.");
      console.error(err);
    }
  }
 



  return (
    <div className="min-h-screen bg-background">

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold font-serif mb-2">Post a Civic Issue</h1>
          <p className="text-muted-foreground">
            Help improve your community by posting local problems. Your post will be reviewed by relevant authorities.
          </p>
        </div>

        {currentStep === 1 && !showDuplicates && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5" />
                Step 1: Issue Category & Location
              </CardTitle>
              <CardDescription>
                First, select the type of issue and location to check for similar reports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Issue Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Issue Category *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="road">Road Issues</SelectItem>
                      <SelectItem value="drainage">Drainage Problems</SelectItem>
                      <SelectItem value="electricity">Electricity Issues</SelectItem>
                      <SelectItem value="water">Water Supply</SelectItem>
                      <SelectItem value="waste">Waste Management</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
                    <SelectTrigger>
                      <div className="flex items-center">
                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select your area" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {bangladeshLocations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">Select the area where the issue is located</p>
                </div>

                {/* Next Button */}
                <div className="flex justify-end">
                  <Button onClick={handleNextStep} disabled={!formData.category || !formData.location}>
                    Next Step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {showDuplicates && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-orange-600">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Similar Issues Found
              </CardTitle>
              <CardDescription>
                We found existing issues in this category and location. You can interact with these posts instead of
                creating a new one.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Do you face the same problem?</strong> Instead of posting a new issue, you can like, vote, or
                  comment on existing posts to show your support and add more details.
                </AlertDescription>
              </Alert>

              <div className="space-y-4 mb-6">
                {duplicateIssues.map((issue) => (
                  <Card key={issue._id} className="border-orange-200">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={issue.images[0] || "/placeholder.svg"}
                          alt={issue.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{issue.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{issue.location}</p>
                          <p className="text-xs text-muted-foreground mb-2">{issue.description.substring(0, 100)}...</p>
                          <div className="flex items-center gap-4 text-xs mb-2">
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="h-3 w-3" />
                              {issue.votes} votes
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              {issue.comments.length} comments
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${issue.status === "Under Review"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : issue.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                            >
                              {issue.status}
                            </span>
                          </div>
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/issue/${issue._id}`}>
                              <Eye className="h-3 w-3 mr-1" />
                              View & Vote
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={proceedToStep2} variant="outline">
                  My Issue is Different - Continue Posting
                </Button>
                <Button variant="ghost" onClick={() => setShowDuplicates(false)}>
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="mr-2 h-5 w-5" />
                Step 2: Issue Details
              </CardTitle>
              <CardDescription>
                Now provide the details of your issue including photos, title, and description.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Selected Category and Location Display */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Selected Details:</h4>
                  <p className="text-sm">
                    <strong>Category:</strong> {formData.category}
                  </p>
                  <p className="text-sm">
                    <strong>Location:</strong> {formData.location}
                  </p>
                  <Button type="button" variant="ghost" size="sm" onClick={() => setCurrentStep(1)} className="mt-2">
                    Change Category/Location
                  </Button>
                </div>

                {/* Photo Upload */}
                <div className="space-y-2">
                  <Label htmlFor="photo">Upload Photos *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6">
                    {previewImages.length > 0 ? (
                      <div className="space-y-4">
                        {/* Image Gallery */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {previewImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Issue photo ${index + 1}`}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                className="absolute top-2 right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          {/* Add More Button */}
                          {previewImages.length < 5 && (
                            <Label htmlFor="photo" className="cursor-pointer">
                              <div className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center hover:border-primary transition-colors">
                                <Plus className="h-6 w-6 text-muted-foreground mb-1" />
                                <span className="text-xs text-muted-foreground">Add More</span>
                              </div>
                            </Label>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground text-center">
                          {previewImages.length}/5 photos uploaded
                        </p>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div>
                          <Label htmlFor="photo" className="cursor-pointer">
                            <span className="text-primary hover:text-primary/80">Click to upload photos</span> or drag
                            and drop
                          </Label>
                          <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB each (max 5 photos)</p>
                        </div>
                      </div>
                    )}
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>

                {/* Issue Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Broken road with large potholes"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the issue in detail. Include when you first noticed it, how it affects the community, and any other relevant information."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-4">
                  <Button type="submit" className="flex-1" disabled={selectedImages.length === 0}>
                    Submit Post
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Guidelines */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Posting Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Do:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Take clear, well-lit photos</li>
                  <li>• Provide exact location details</li>
                  <li>• Be specific in your description</li>
                  <li>• Post genuine civic issues</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Don't:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Submit false or misleading posts</li>
                  <li>• Include personal information of others</li>
                  <li>• Post private property issues</li>
                  <li>• Use inappropriate language</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
