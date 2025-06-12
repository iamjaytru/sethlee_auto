"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Fuel, MapPin, Star, Gauge } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import { Vehicle } from "@prisma/client";

interface VehicleCardProps {
  vehicle: Vehicle & {
    features?: { name: string }[];
    images?: { url: string }[];
  };
  className?: string;
}

export default function VehicleCard({ vehicle, className }: VehicleCardProps) {
  const {
    id,
    year,
    make,
    model,
    trim,
    price,
    mileage,
    fuelType,
    condition,
    bodyType,
    images,
    featured,
  } = vehicle;

  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-md transition-shadow duration-200",
        className
      )}
      role="article"
      aria-label={`${year} ${make} ${model}`}
    >
      {/* Image with featured/condition badge */}
      <div className="relative aspect-[16/9] overflow-hidden group">
        <Image
          src={images?.[0]?.url ?? "/placeholder.svg"}
          alt=""
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={featured}
          loading={featured ? undefined : "lazy"}
        />
        <div className="absolute top-2 left-2 z-10 flex gap-2">
          {featured && (
            <Badge className="flex items-center gap-1" aria-hidden="true">
              <Star className="h-3 w-3" />
              Featured
            </Badge>
          )}
          {condition && (
            <Badge
              variant="secondary"
              className="capitalize"
              aria-hidden="true"
            >
              {condition.toLowerCase().replace("_", " ")}
            </Badge>
          )}
        </div>
      </div>

      {/* Vehicle details */}
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-semibold text-lg leading-tight line-clamp-1">
              {year} {make} {model}
            </h3>
            {(trim || bodyType) && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {trim || bodyType}
              </p>
            )}
          </div>
          <span className="font-bold text-lg text-primary whitespace-nowrap">
            {formatCurrency(price)}
          </span>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Fuel className="h-4 w-4 mr-1.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{fuelType}</span>
          </div>
        </div>
      </CardContent>

      {/* Action buttons */}
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild variant="outline" className="flex-1" size="sm">
          <Link
            href={`/inventory/${id}`}
            className="flex items-center gap-2"
            aria-label={`View details for ${year} ${make} ${model}`}
          >
            <Gauge className="h-4 w-4" aria-hidden="true" />
            Details
          </Link>
        </Button>
        <Button
          asChild
          className="flex-1"
          size="sm"
          aria-label={`Contact about ${year} ${make} ${model}`}
        >
          <Link href={`/contact?vehicle=${id}`}>Contact</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
