import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Fuel, Info, MapPin, Star } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { Vehicle } from "@/lib/types"

interface VehicleCardProps {
  vehicle: Vehicle
  className?: string
}

export default function VehicleCard({ vehicle, className = "" }: VehicleCardProps) {
  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      {/* Image with featured badge */}
      <div className="relative aspect-[16/9] overflow-hidden group">
        <Image
          src={vehicle.images?.[0] || "/placeholder.svg"}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={vehicle.featured}
        />
        {vehicle.featured && (
          <Badge className="absolute top-2 left-2 z-10 flex items-center gap-1">
            <Star className="h-3 w-3" />
            Featured
          </Badge>
        )}
      </div>

      {/* Vehicle details */}
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg leading-tight">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h3>
            {vehicle.trim && (
              <p className="text-sm text-muted-foreground">{vehicle.trim}</p>
            )}
          </div>
          <span className="font-bold text-lg text-primary whitespace-nowrap">
            {formatCurrency(vehicle.price)}
          </span>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span>{vehicle.mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Fuel className="h-4 w-4 mr-1.5" />
            <span>{vehicle.fuelType}</span>
          </div>
        </div>
      </CardContent>

      {/* Action buttons */}
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild variant="outline" className="flex-1" size="sm">
          <Link href={`/inventory/${vehicle.id}`} className="flex items-center">
            <Info className="h-4 w-4 mr-2" />
            Details
          </Link>
        </Button>
        <Button asChild className="flex-1" size="sm">
          <Link href={`/contact?vehicle=${vehicle.id}`}>Contact</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}