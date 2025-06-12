"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Bell, Menu, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export function DashboardHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  // Get the current page title based on the pathname
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard"
    if (pathname === "/dashboard/vehicles") return "Vehicles"
    if (pathname.startsWith("/dashboard/vehicles/")) {
      if (pathname.includes("/edit")) return "Edit Vehicle"
      if (pathname.includes("/new")) return "Add New Vehicle"
      return "Vehicle Details"
    }
    if (pathname === "/dashboard/users") return "Users"
    if (pathname === "/dashboard/settings") return "Settings"
    return "Dashboard"
  }

  return (
    <header className="border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button variant="outline" size="icon" className="md:hidden mr-2" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <DashboardSidebar />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
        <div className="ml-auto flex items-center gap-4">
          <form className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="w-64 pl-8" />
            </div>
          </form>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
