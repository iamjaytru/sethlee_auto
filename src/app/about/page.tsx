"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Users, ShieldCheck, Award, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AboutPage = () => {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "5,00+", label: "Happy Customers" },
    { value: "50+", label: "Vehicle Brands" },
    { value: "24/7", label: "Customer Support" },
  ];

  const features = [
    {
      icon: <Car className="w-8 h-8 text-primary" />,
      title: "Wide Selection",
      description:
        "Choose from our extensive inventory of new and pre-owned vehicles from top manufacturers worldwide.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Certified Quality",
      description:
        "Every vehicle undergoes a rigorous 150-point inspection to ensure premium quality and reliability.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Expert Team",
      description:
        "Our knowledgeable staff provides personalized service to help you find your perfect vehicle.",
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Award Winning",
      description:
        "Recognized as the best dealership in the region for customer satisfaction three years running.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image
          src="/images/hero_image1.jpg"
          alt="Dealership exterior"
          fill
          className="object-cover"
          priority
        />
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-4">
              About Our Dealership
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Driving Excellence Since 2008
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We're committed to providing exceptional service and quality
              vehicles to our valued customers.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/inventory">Browse Inventory</Link>
              </Button>
              <Button variant="ghost" asChild className="border">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-gray-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <Image
                src="/images/family.jpg"
                alt="Dealership history"
                width={600}
                height={200}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020, Sethlee Auto began as a small family-owned
                dealership with a passion for automobiles. What started as a
                modest showroom is growing into one of the region's most trusted
                automotive retailers.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our success is built on three core principles:{" "}
                <span className="text-primary">integrity</span>, <span className="text-primary">quality</span>, and{" "}
                <span className="text-primary">customer satisfaction</span>. We treat every customer like
                family and every vehicle as if it were our own.
              </p>
              <Button variant="outline" asChild>
                <Link href="/about/team">Meet Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We go above and beyond to ensure your car buying experience is
              exceptional
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Visit Our Dealership</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-gray-600">Ughelli, Delta State</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Contact</h3>
                    <p className="text-gray-600">+234 903 110 0390</p>
                    <p className="text-gray-600">info@sethleeauto.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 text-primary mt-1 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9AM - 8PM</p>
                    <p className="text-gray-600">Saturday: 9AM - 6PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <Button className="mt-8" asChild>
                <Link href="/contact">Get Directions</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.585359333683!2d3.421587315231156!3d6.430952595338155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4cc9b07cf55%3A0xc4ae10b3a6d3d7a1!2sVictoria%20Island%2C%20Lagos!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
                  width="600"
                  height="450"
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
