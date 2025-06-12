"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Vehicle } from "@/lib/types"

interface VehicleFiltersProps {
  filters: {
    make: string
    model: string
    year: string
    minPrice: string
    maxPrice: string
    condition: string
  }
  onFilterChange: (filters: any) => void
  vehicles: Vehicle[]
}

export function VehicleFilters({ filters, onFilterChange, vehicles }: VehicleFiltersProps) {
  const [uniqueMakes, setUniqueMakes] = useState<string[]>([])
  const [uniqueModels, setUniqueModels] = useState<string[]>([])
  const [uniqueYears, setUniqueYears] = useState<string[]>([])
  const [uniqueConditions, setUniqueConditions] = useState<string[]>([])

  useEffect(() => {
    if (vehicles.length) {
      // Extract unique values for filter dropdowns
      const makes = [...new Set(vehicles.map((v) => v.make))].sort()
      const models = [...new Set(vehicles.map((v) => v.model))].sort()
      const years = [...new Set(vehicles.map((v) => v.year.toString()))].sort(
        (a, b) => Number.parseInt(b) - Number.parseInt(a),
      )
      const conditions = [...new Set(vehicles.map((v) => v.condition))].sort()

      setUniqueMakes(makes)
      setUniqueModels(models)
      setUniqueYears(years)
      setUniqueConditions(conditions)
    }
  }, [vehicles])

  const handleChange = (field: string, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    })
  }

  const resetFilters = () => {
    onFilterChange({
      make: "",
      model: "",
      year: "",
      minPrice: "",
      maxPrice: "",
      condition: "",
    })
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="space-y-2">
            <Label htmlFor="make">Make</Label>
            <Select value={filters.make} onValueChange={(value) => handleChange("make", value)}>
              <SelectTrigger id="make">
                <SelectValue placeholder="Any make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any_make">Any make</SelectItem>
                {uniqueMakes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select value={filters.model} onValueChange={(value) => handleChange("model", value)}>
              <SelectTrigger id="model">
                <SelectValue placeholder="Any model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any_model">Any model</SelectItem>
                {uniqueModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Select value={filters.year} onValueChange={(value) => handleChange("year", value)}>
              <SelectTrigger id="year">
                <SelectValue placeholder="Any year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any_year">Any year</SelectItem>
                {uniqueYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="minPrice">Min Price</Label>
            <Input
              id="minPrice"
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleChange("minPrice", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxPrice">Max Price</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleChange("maxPrice", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select value={filters.condition} onValueChange={(value) => handleChange("condition", value)}>
              <SelectTrigger id="condition">
                <SelectValue placeholder="Any condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any_condition">Any condition</SelectItem>
                {uniqueConditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" onClick={resetFilters} className="flex items-center">
            <X className="mr-2 h-4 w-4" />
            Reset filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
