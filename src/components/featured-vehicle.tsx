'use client';

import VehicleCard from "@/components/vehicle-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Vehicle } from "@prisma/client";
import { useActionState } from "react";
import { fetchFeaturedVehicles } from "@/lib/vehicles";

type FeaturedVehiclesProps = {
  initialVehicles?: Vehicle[];
};

export default function FeaturedVehicles({ initialVehicles = [] }: FeaturedVehiclesProps) {
  // Initialize state with initialVehicles and loading/error states
  const [state, fetchAction] = useActionState(
    async (_: any, _formData: FormData) => {
      try {
        const vehicles = await fetchFeaturedVehicles(); 
        return { vehicles, error: null };
      } catch (err) {
        return { vehicles: [], error: "Failed to fetch featured vehicles" };
      }
    },
    { vehicles: initialVehicles, error: null }
  );

  const { vehicles: featuredVehicles, error } = state;
  const loading = !featuredVehicles && !error; // Loading state when no vehicles or error yet

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
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
          onClick={() => fetchAction(new FormData())} // Trigger fetch again
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
          <Link href="/inventory">Browse All Vehicles</Link>
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
            className="transition-all hover:scale-[1.02] hover:shadow-lg"
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