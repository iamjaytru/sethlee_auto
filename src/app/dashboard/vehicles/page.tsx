"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Search, Filter, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VehicleTable } from "@/components/vehicle-table"
import { VehicleFilters } from "@/components/vehicle-filters"
import { mockVehicles } from "@/lib/mock-data"
import type { Vehicle } from "@/lib/types"

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    year: "",
    minPrice: "",
    maxPrice: "",
    condition: "",
  })

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For demo purposes, we'll use mock data
    setVehicles(mockVehicles)
    setFilteredVehicles(mockVehicles)
  }, [])

  useEffect(() => {
    let results = [...vehicles]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (vehicle) =>
          vehicle.make.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query) ||
          vehicle.vin.toLowerCase().includes(query) ||
          vehicle.stockNumber.toLowerCase().includes(query),
      )
    }

    // Apply filters
    if (filters.make) {
      results = results.filter((v) => v.make.toLowerCase() === filters.make.toLowerCase())
    }

    if (filters.model) {
      results = results.filter((v) => v.model.toLowerCase().includes(filters.model.toLowerCase()))
    }

    if (filters.year) {
      results = results.filter((v) => v.year.toString() === filters.year)
    }

    if (filters.minPrice) {
      results = results.filter((v) => v.price >= Number.parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      results = results.filter((v) => v.price <= Number.parseInt(filters.maxPrice))
    }

    if (filters.condition) {
      results = results.filter((v) => v.condition.toLowerCase() === filters.condition.toLowerCase())
    }

    setFilteredVehicles(results)
  }, [searchQuery, filters, vehicles])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Vehicles</h1>
        <Button asChild>
          <Link href="/dashboard/vehicles/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Vehicle
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by make, model, VIN, or stock #..."
            className="pl-8"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
      </div>

      {showFilters && <VehicleFilters filters={filters} onFilterChange={handleFilterChange} vehicles={vehicles} />}

      <div>
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredVehicles.length} of {vehicles.length} vehicles
        </p>
        <VehicleTable vehicles={filteredVehicles} />
      </div>
    </div>
  )
}
