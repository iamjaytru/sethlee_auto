"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCurrency } from "@/lib/utils";
import type { Vehicle, VehicleApiResponse } from "@/lib/types";
import { Filter, Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import VehicleCard from "@/components/vehicle-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";

type SortOption = "newest" | "oldest" | "price-low" | "price-high";

export default function InventoryPage() {
  // State management
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [yearRange, setYearRange] = useState([2010, 2024]);
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("newest");

  // Fetch vehicles with error handling and caching
  const fetchVehicles = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/vehicles', {
        next: { 
          tags: ['vehicles'],
          revalidate: 3600 // ISR for 1 hour
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: VehicleApiResponse = await response.json();
      
      if (data.data?.length > 0) {
        const prices = data.data.map(v => v.price);
        const years = data.data.map(v => v.year);
        setPriceRange([Math.min(...prices), Math.max(...prices)]);
        setYearRange([Math.min(...years), Math.max(...years)]);
      }

      setVehicles(data.data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
      toast.error("Error loading vehicles", {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // Memoized filtered vehicles calculation
  const filteredVehicles = useMemo(() => {
    if (vehicles.length === 0) return [];

    let results = [...vehicles];

    // Apply search filter
    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      results = results.filter(
        vehicle =>
          vehicle.make.toLowerCase().includes(query) ||
          vehicle.model.toLowerCase().includes(query) ||
          vehicle.trim?.toLowerCase().includes(query) ||
          vehicle.year.toString().includes(query)
      );
    }

    // Apply price filter
    results = results.filter(
      vehicle => vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1]
    );

    // Apply year filter
    results = results.filter(
      vehicle => vehicle.year >= yearRange[0] && vehicle.year <= yearRange[1]
    );

    // Apply make filter
    if (selectedMakes.length > 0) {
      results = results.filter(vehicle => selectedMakes.includes(vehicle.make));
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        return results.sort((a, b) => b.year - a.year);
      case "oldest":
        return results.sort((a, b) => a.year - b.year);
      case "price-low":
        return results.sort((a, b) => a.price - b.price);
      case "price-high":
        return results.sort((a, b) => b.price - a.price);
      default:
        return results;
    }
  }, [vehicles, debouncedSearchQuery, priceRange, yearRange, selectedMakes, sortOption]);

  // Get unique makes
  const makes = useMemo(() => 
    Array.from(new Set(vehicles.map(v => v.make))).sort(),
    [vehicles]
  );

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    if (vehicles.length > 0) {
      const prices = vehicles.map(v => v.price);
      const years = vehicles.map(v => v.year);
      setPriceRange([Math.min(...prices), Math.max(...prices)]);
      setYearRange([Math.min(...years), Math.max(...years)]);
    }
    setSelectedMakes([]);
    setSortOption("newest");
    toast.success("Filters reset successfully");
  };

  // Handle sort change
  const handleSortChange = (value: SortOption) => {
    setSortOption(value);
    toast.info(`Sorted by: ${getSortLabel(value)}`);
  };

  const getSortLabel = (value: SortOption) => {
    switch (value) {
      case "newest": return "Newest First";
      case "oldest": return "Oldest First";
      case "price-low": return "Price: Low to High";
      case "price-high": return "Price: High to Low";
    }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Vehicle Inventory</h1>
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Button onClick={fetchVehicles}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vehicle Inventory</h1>

      {/* Search and filter controls */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="w-full lg:w-2/3">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by make, model, year..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="h-12 lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters sidebar */}
        <div className={`w-full lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"}`}>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Reset
                </Button>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 mt-4">
                        <Slider
                          value={priceRange}
                          min={0}
                          max={100000}
                          step={1000}
                          onValueChange={setPriceRange}
                        />
                        <div className="flex items-center justify-between">
                          <span>{formatCurrency(priceRange[0])}</span>
                          <span>{formatCurrency(priceRange[1])}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="year">
                    <AccordionTrigger>Year Range</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 mt-4">
                        <Slider
                          value={yearRange}
                          min={2000}
                          max={new Date().getFullYear()}
                          step={1}
                          onValueChange={setYearRange}
                        />
                        <div className="flex items-center justify-between">
                          <span>{yearRange[0]}</span>
                          <span>{yearRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="make">
                    <AccordionTrigger>Make</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 mt-2">
                        {makes.map((make) => (
                          <div key={make} className="flex items-center space-x-2">
                            <Checkbox
                              id={`make-${make}`}
                              checked={selectedMakes.includes(make)}
                              onCheckedChange={(checked) => {
                                setSelectedMakes(prev =>
                                  checked
                                    ? [...prev, make]
                                    : prev.filter(m => m !== make)
                                );
                              }}
                            />
                            <Label htmlFor={`make-${make}`}>{make}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results grid */}
        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-4">
            {isLoading ? (
              <Skeleton className="h-6 w-48" />
            ) : (
              <p className="text-muted-foreground">
                Showing {filteredVehicles.length} vehicles
              </p>
            )}

            <Select
              value={sortOption}
              onValueChange={handleSortChange}
              disabled={isLoading}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results display */}
          {isLoading ? (
            <VehicleGridSkeleton />
          ) : filteredVehicles.length > 0 ? (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <NoResults onReset={resetFilters} />
          )}
        </div>
      </div>
    </div>
  );
}

// Skeleton loading component
function VehicleGridSkeleton() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-0">
            <Skeleton className="h-48 w-full rounded-t-lg" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between pt-2">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// No results component
function NoResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-semibold mb-2">No vehicles found</h3>
      <p className="text-muted-foreground mb-4">
        Try adjusting your search criteria or filters
      </p>
      <Button onClick={onReset}>Reset Filters</Button>
    </div>
  );
}