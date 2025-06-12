"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Vehicle } from "@/lib/types"

interface VehicleTableProps {
  vehicles: Vehicle[]
}

export function VehicleTable({ vehicles }: VehicleTableProps) {
  const [sortField, setSortField] = useState<keyof Vehicle | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (field: keyof Vehicle) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (!sortField) return 0

    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const getSortIcon = (field: keyof Vehicle) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] cursor-pointer" onClick={() => handleSort("stockNumber")}>
              <div className="flex items-center">Stock #{getSortIcon("stockNumber")}</div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("make")}>
              <div className="flex items-center">
                Make/Model
                {getSortIcon("make")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("year")}>
              <div className="flex items-center">
                Year
                {getSortIcon("year")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
              <div className="flex items-center">
                Price
                {getSortIcon("price")}
              </div>
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => handleSort("condition")}>
              <div className="flex items-center">
                Condition
                {getSortIcon("condition")}
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedVehicles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No vehicles found.
              </TableCell>
            </TableRow>
          ) : (
            sortedVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.stockNumber}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {vehicle.make} {vehicle.model}
                    </div>
                    <div className="text-sm text-muted-foreground">{vehicle.trim}</div>
                  </div>
                </TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>${vehicle.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={vehicle.condition === "New" ? "default" : "secondary"}>{vehicle.condition}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/vehicles/${vehicle.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/vehicles/${vehicle.id}/edit`}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
