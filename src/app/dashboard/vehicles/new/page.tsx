"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { VehicleForm } from "@/components/vehicle-form"
import type { Vehicle } from "@/lib/types"

export default function NewVehiclePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (data: Partial<Vehicle>) => {
    setIsSubmitting(true)

    try {
      // In a real app, we would make an API call to create the vehicle
      // For demo purposes, we'll just simulate a successful creation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to the vehicles list
      router.push("/dashboard/vehicles")
    } catch (error) {
      console.error("Error creating vehicle:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add New Vehicle</h1>
        <p className="text-muted-foreground">Enter the details for the new vehicle listing</p>
      </div>

      <VehicleForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
