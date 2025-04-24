"use client";

import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Inventory", href: "/inventory" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/service" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 ">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl sm:text-2xl md:text-[30px] font-bold text-primary">
                Sethlee Auto
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex md:whitespace-nowrap space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm md:text-[17px] text-gray-700 hover:text-primary font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2" />
              <span className="text-sm font-medium">+234-903-110-0390</span>
            </div>
            <Button asChild className="text-sm xl:text-base px-4 xl:px-6">
              <Link href="/contact">Schedule Test Drive</Link>
            </Button>
          </div>

          <div className="flex md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] max-w-[400px] p-4 sm:p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-md sm:text-xl font-bold text-primary">
                      Sethlee Auto
                    </span>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-base sm:text-md text-gray-700 hover:text-primary font-medium py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="pt-6 border-t py-10">
                    <div className="flex items-center mb-10">
                      <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2" />
                      <span className="text-base font-medium">
                        +234-903-110-0390
                      </span>
                    </div>
                    <Button className="w-full text-base" asChild>
                      <Link href="/contact" onClick={() => setIsOpen(false)}>
                        Schedule Test Drive
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
