import type { Vehicle, VehicleApiResponse } from '@/lib/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'
const CACHE_TTL = 3600 // 1 hour in seconds

export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles`, {
      next: { 
        tags: ['vehicles'],
        revalidate: CACHE_TTL 
      },
      headers: {
        'Content-Type': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data: VehicleApiResponse = await response.json()
    
    // Validate response structure
    if (!data?.success || !Array.isArray(data.data)) {
      throw new Error(data?.message || 'Invalid API response structure')
    }

    // Transform and validate vehicle data
    return data.data.map(vehicle => ({
      id: vehicle.id || '',
      make: vehicle.make || 'Unknown',
      model: vehicle.model || 'Unknown',
      year: vehicle.year || new Date().getFullYear(),
      price: vehicle.price || 0,
      mileage: vehicle.mileage || 0,
      featured: vehicle.featured || false,
      trim: vehicle.trim || '',
      condition: vehicle.condition || 'Nigerian Used',
      bodyType: vehicle.bodyType || 'Sedan',
      fuelType: vehicle.fuelType || 'Petrol',
      transmission: vehicle.transmission || 'Automatic',
      engine: vehicle.engine || '',
      exteriorColor: vehicle.exteriorColor || '',
      interiorColor: vehicle.interiorColor || '',
      stockNumber: vehicle.stockNumber || '',
      vin: vehicle.vin || '',
      description: vehicle.description || '',
      features: Array.isArray(vehicle.features) ? vehicle.features : [],
      images: Array.isArray(vehicle.images) ? vehicle.images : ['/placeholder.svg'],
      createdAt: vehicle.createdAt || new Date().toISOString(),
      updatedAt: vehicle.updatedAt || new Date().toISOString(),
    }))
  } catch (error) {
    console.error('Error in getVehicles:', error)
    // Return empty array but log to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking (Sentry, etc.)
    }
    return [] 
  }
}

export async function getFeaturedVehicles(limit = 3): Promise<Vehicle[]> {
  try {
    const vehicles = await getVehicles()
    return vehicles
      .filter(vehicle => vehicle.featured)
      .slice(0, limit)
      .sort((a, b) => 
        (b.createdAt || '').localeCompare(a.createdAt || '')
      )
  } catch (error) {
    console.error('Error in getFeaturedVehicles:', error)
    return []
  }
}

// Additional utility functions
export async function getVehicleById(id: string): Promise<Vehicle | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/vehicles/${id}`, {
      next: { tags: [`vehicle-${id}`] }
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data?.data || null
  } catch (error) {
    console.error(`Error fetching vehicle ${id}:`, error)
    return null
  }
}

export async function getRelatedVehicles(vehicleId: string, limit = 3): Promise<Vehicle[]> {
  try {
    const currentVehicle = await getVehicleById(vehicleId)
    if (!currentVehicle) return []

    const allVehicles = await getVehicles()
    return allVehicles
      .filter(vehicle => 
        vehicle.id !== vehicleId && 
        vehicle.make === currentVehicle.make
      )
      .slice(0, limit)
  } catch (error) {
    console.error('Error in getRelatedVehicles:', error)
    return []
  }
}