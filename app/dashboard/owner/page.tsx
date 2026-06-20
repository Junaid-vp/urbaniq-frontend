"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import api from "@/lib/api"
import { useAuthStore } from "@/store/authStore"

interface Property {
  _id: string;
  title: string;
  location: { city: string; state: string };
  price: number;
  status: string;
}

export default function OwnerDashboard() {
  const { user } = useAuthStore()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      if (!user?._id) return
      try {
        const res = await api.get(`/properties?ownerId=${user._id}`)
        setProperties(res.data)
      } catch (error) {
        console.error("Failed to fetch properties:", error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProperties()
  }, [user])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
  }

  const activeCount = properties.filter(p => p.status === 'Available').length

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Owner Dashboard</h1>
          <p className="text-muted-foreground">Manage your properties and track performance.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/owner/properties/new">
            <Plus className="h-4 w-4 mr-2" /> List New Property
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : properties.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : activeCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">Coming Soon</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">Coming Soon</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>My Properties</CardTitle>
        </CardHeader>
        <CardContent>
           <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                 <tr>
                   <th className="px-4 py-3 rounded-tl-lg">Property Name</th>
                   <th className="px-4 py-3">Location</th>
                   <th className="px-4 py-3">Price</th>
                   <th className="px-4 py-3">Status</th>
                   <th className="px-4 py-3 rounded-tr-lg">Actions</th>
                 </tr>
               </thead>
               <tbody>
                 {loading ? (
                   <tr>
                     <td colSpan={5} className="text-center py-8 text-muted-foreground">Loading properties...</td>
                   </tr>
                 ) : properties.length === 0 ? (
                   <tr>
                     <td colSpan={5} className="text-center py-8 text-muted-foreground">You have no properties listed yet.</td>
                   </tr>
                 ) : (
                   properties.map(property => (
                     <tr key={property._id} className="border-b last:border-0">
                       <td className="px-4 py-3 font-medium">{property.title}</td>
                       <td className="px-4 py-3 text-muted-foreground">{property.location.city}, {property.location.state}</td>
                       <td className="px-4 py-3 font-medium">{formatPrice(property.price)}</td>
                       <td className="px-4 py-3">
                         <span className={`px-2 py-1 rounded-full text-xs font-semibold ${property.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                           {property.status}
                         </span>
                       </td>
                       <td className="px-4 py-3">
                         <Button variant="ghost" size="sm">Edit</Button>
                       </td>
                     </tr>
                   ))
                 )}
               </tbody>
             </table>
           </div>
        </CardContent>
      </Card>
    </div>
  )
}
