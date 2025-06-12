"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { mockVehicles } from "@/lib/mock-data"
import type { Vehicle } from "@/lib/types"

export default function VehicleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [vehicle, setVehicle] = useState<Vehicle | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For demo purposes, we'll use mock data
    const fetchVehicle = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const foundVehicle = mockVehicles.find(v => v.id === params.id)
        
        if (foundVehicle) {
          setVehicle(foundVehicle)
        } else {
          // Vehicle not found, redirect to vehicles list
          router.push("/dashboard/vehicles")
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchVehicle()
  }, [params.id,\
