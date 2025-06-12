"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, LayoutDashboard, Settings, Users, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function DashboardSidebar() {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Vehicles",
      icon: Car,
      href: "/dashboard/vehicles",
      active: pathname === "/dashboard/vehicles" || pathname.startsWith("/dashboard/vehicles/"),
    },
    {
      label: "Users",
      icon: Users,
      href: "/dashboard/users",
      active: pathname === "/dashboard/users",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div className="hidden md:flex flex-col w-64 bg-background border-r h-full">
      <div className="p-6">
        <h1 className="text-xl font-bold flex items-center">
          <Car className="mr-2 h-6 w-6" />
          Vehicle Manager
        </h1>
      </div>
      <div className="flex flex-col flex-1 px-4 space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              route.active ? "bg-primary text-primary-foreground" : "hover:bg-muted",
            )}
          >
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        ))}
      </div>
      <div className="p-4 border-t">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Link>
        </Button>
      </div>
    </div>
  )
}
