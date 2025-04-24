'use client';

import VehicleCard from "@/components/vehicle-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeaturedVehicles } from "@/lib/api";
import { useEffect, useState } from "react";
import type { Vehicle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const FEATURED_VEHICLES_COUNT = 3;

export default function FeaturedVehicles() {
  const [featuredVehicles, setFeaturedVehicles] = useState<Vehicle[]>([]); // Fixed typo here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedVehicles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("Fetching featured vehicles..."); 
        const data = await getFeaturedVehicles();
        console.log("Received data:", data);
        
        if (!data || data.length === 0) {
          throw new Error("No featured vehicles available");
        }
        
        setFeaturedVehicles(data.slice(0, FEATURED_VEHICLES_COUNT));
      } catch (err) {
        console.error("Error in FeaturedVehicles:", err); // Fixed error reference here
        const errorMessage = err instanceof Error ? err.message : "Failed to load featured vehicles";
        setError(errorMessage);
        toast.error("Error loading featured vehicles", {
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to prevent flash of loading state
    const timer = setTimeout(fetchFeaturedVehicles, 300);
    
    return () => clearTimeout(timer);
  }, []);


  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(FEATURED_VEHICLES_COUNT)].map((_, i) => (
            <VehicleCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-red-500">Error loading featured vehicles</p>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button 
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-2"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (featuredVehicles.length === 0) {
    return (
      <div className="text-center py-8 space-y-4">
        <p className="text-muted-foreground">No featured vehicles available</p>
        <Button asChild variant="outline">
          <Link href="/inventory">
            Browse All Vehicles
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredVehicles.map((vehicle) => (
          <VehicleCard 
            key={vehicle.id} 
            vehicle={vehicle} 
            // className="transition-all hover:scale-[1.02] hover:shadow-lg"
          />
        ))}
      </div>
      
      <div className="flex justify-center pt-4">
        <Button asChild variant="link" className="text-primary">
          <Link href="/inventory" className="flex items-center">
            View All Vehicles <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

// Skeleton component for loading state
function VehicleCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex justify-between pt-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </div>
  );
}