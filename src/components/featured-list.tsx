import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import FeaturedVehicles from "./featured-vehicle";
import { ChevronRight } from "lucide-react"


type Props = {};

const FeaturedList = (props: Props) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Featured Vehicles</h2>
          <Button variant="ghost" asChild>
            <Link href="/inventory" className="flex items-center">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <FeaturedVehicles />
      </div>
    </section>
  );
};

export default FeaturedList;
