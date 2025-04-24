export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  trim?: string
  price: number
  mileage: number
  exteriorColor: string
  interiorColor: string
  drivetrain?: 'FWD' | 'RWD' | 'AWD' | '4WD'
  fuelType: string
  transmission: string
  engine: string
  vin: string
  stockNumber: string
  description: string
  features: string[]
  images: string[]
  featured: boolean
  condition?: 'Brand New' | 'Foreign Used' | 'Nigerian Used'
  bodyType?: string
  cityMPG?: number
  highwayMPG?: number
  createdAt?: string
  updatedAt?: string
}

export interface VehicleApiResponse {
  success: boolean
  message?: string
  data: Vehicle[]
  timestamp?: string
  pagination?: {
    page: number
    pageSize: number
    totalItems: number
  }
}