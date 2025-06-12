"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Car, DollarSign, ShoppingCart, TrendingUp, ArrowRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { VehicleTable } from "@/components/vehicle-table"
import { mockVehicles } from "@/lib/mock-data"

export function DashboardOverview() {
  const [recentVehicles, setRecentVehicles] = useState([])
  const [stats, setStats] = useState({
    totalVehicles: 0,
    featuredVehicles: 0,
    averagePrice: 0,
    totalValue: 0,
  })

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For demo purposes, we'll use mock data
    const vehicles = mockVehicles
    setRecentVehicles(vehicles.slice(0, 5))

    const totalVehicles = vehicles.length
    const featuredVehicles = vehicles.filter((v) => v.featured).length
    const totalValue = vehicles.reduce((sum, v) => sum + v.price, 0)
    const averagePrice = totalValue / totalVehicles

    setStats({
      totalVehicles,
      featuredVehicles,
      averagePrice,
      totalValue,
    })
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVehicles}</div>
            <p className="text-xs text-muted-foreground">+2 added this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Featured Vehicles</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.featuredVehicles}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.featuredVehicles / stats.totalVehicles) * 100).toFixed(1)}% of inventory
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.averagePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${stats.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
            <p className="text-xs text-muted-foreground">+12% from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Vehicles</CardTitle>
            <CardDescription>Recently added vehicles to your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <VehicleTable vehicles={recentVehicles} />
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild className="ml-auto">
              <Link href="/dashboard/vehicles">
                View all vehicles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full justify-between" asChild>
              <Link href="/dashboard/vehicles/new">
                Add new vehicle
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-between">
              Generate inventory report
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              Import vehicle data
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              Export vehicle data
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
