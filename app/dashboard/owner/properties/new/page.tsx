"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import api from "@/lib/api"
import { Building2, MapPin, ListPlus } from "lucide-react"

export default function NewPropertyPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    propertyType: "Villa",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        propertyType: formData.propertyType,
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        features: {
          bedrooms: Number(formData.bedrooms),
          bathrooms: Number(formData.bathrooms),
          area: Number(formData.area)
        },
        // Hardcode an image for now until image uploads are implemented
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80"]
      }

      await api.post("/properties", payload)
      router.push("/dashboard/owner")
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create property")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">List New Property</h1>
        <p className="text-muted-foreground">Add a new property to your portfolio.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ListPlus className="h-5 w-5" /> Basic Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Property Title</label>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Luxury Downtown Penthouse" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" 
                  placeholder="Describe your property..." 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price (USD)</label>
                  <Input name="price" type="number" min="0" value={formData.price} onChange={handleChange} placeholder="500000" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Property Type</label>
                  <select 
                    name="propertyType" 
                    value={formData.propertyType} 
                    onChange={handleChange}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    required
                  >
                    <option value="Villa">Villa</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5" /> Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Street Address</label>
                <Input name="address" value={formData.address} onChange={handleChange} placeholder="123 Main St" required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input name="city" value={formData.city} onChange={handleChange} placeholder="New York" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <Input name="state" value={formData.state} onChange={handleChange} placeholder="NY" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Zip Code</label>
                  <Input name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="10001" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5" /> Features</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Bedrooms</label>
                <Input name="bedrooms" type="number" min="0" value={formData.bedrooms} onChange={handleChange} placeholder="3" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bathrooms</label>
                <Input name="bathrooms" type="number" min="0" step="0.5" value={formData.bathrooms} onChange={handleChange} placeholder="2.5" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Area (sqft)</label>
                <Input name="area" type="number" min="0" value={formData.area} onChange={handleChange} placeholder="2500" required />
              </div>
            </CardContent>
          </Card>

          {error && <div className="text-red-500 font-medium text-sm text-center">{error}</div>}

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.push('/dashboard/owner')}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Create Listing"}</Button>
          </div>
        </div>
      </form>
    </div>
  )
}
