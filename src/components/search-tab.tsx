"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, KeyboardEvent } from "react";

const SearchTab = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(
        `/inventory?search=${encodeURIComponent(searchQuery.trim())}`
      );
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="bg-white py-8 border-b shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                placeholder="Search by make, model, or keywords..."
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Search vehicles"
              />
            </div>
            <Button
              size="lg"
              className="h-12 px-6 text-base"
              onClick={handleSearch}
              disabled={!searchQuery.trim()}
            >
              <Search className="mr-2 h-5 w-5" />
              <span className="hidden sm:inline">Search</span>
              <span className="sm:hidden">Find</span>
            </Button>
          </div>
          <div className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
            <span className="hidden sm:inline">Try:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSearchQuery("Toyota")}
                className="hover:text-primary transition-colors"
              >
                Toyota
              </button>
              <button
                onClick={() => setSearchQuery("BMW")}
                className="hover:text-primary transition-colors"
              >
                BMW
              </button>
              <button
                onClick={() => setSearchQuery("SUV")}
                className="hover:text-primary transition-colors"
              >
                SUV
              </button>
              <button
                onClick={() => setSearchQuery("Electric")}
                className="hover:text-primary transition-colors"
              >
                Electric
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchTab;
