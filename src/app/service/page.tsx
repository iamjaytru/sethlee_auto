"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Wrench,
  DollarSign,
  ShieldCheck,
  CalendarCheck,
  Phone,
  MapPin,
  Clock,
  RefreshCw,
  Settings,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ServicePage = () => {
  const services = [
    {
      icon: <Car className="w-8 h-8 text-primary" />,
      title: "Vehicle Sales",
      description:
        "Explore our extensive inventory of new and certified pre-owned vehicles from top manufacturers.",
      features: [
        "Wide selection of makes and models",
        "Competitive pricing",
        "Flexible financing options",
        "Trade-in evaluations",
      ],
    },
    {
      icon: <Wrench className="w-8 h-8 text-primary" />,
      title: "Service & Maintenance",
      description:
        "Keep your vehicle running at peak performance with our expert maintenance services.",
      features: [
        "Factory-trained technicians",
        "Genuine OEM parts",
        "Comprehensive diagnostics",
        "Regular maintenance packages",
      ],
    },
    {
      icon: <DollarSign className="w-8 h-8 text-primary" />,
      title: "Financing Solutions",
      description:
        "Tailored financing options to make your dream vehicle affordable.",
      features: [
        "Competitive interest rates",
        "Flexible payment plans",
        "Quick approval process",
        "First-time buyer programs",
      ],
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      title: "Extended Warranties",
      description:
        "Protect your investment with our comprehensive warranty coverage.",
      features: [
        "Bumper-to-bumper coverage",
        "Roadside assistance",
        "Transferable plans",
        "Customizable terms",
      ],
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-primary" />,
      title: "Trade-In Appraisal",
      description:
        "Get a fair market value for your current vehicle with our hassle-free trade-in process.",
      features: [
        "Instant valuation",
        "Competitive offers",
        "No-obligation appraisals",
        "Seamless transaction",
      ],
    },
    {
      icon: <Settings className="w-8 h-8 text-primary" />,
      title: "Parts & Accessories",
      description:
        "Genuine parts and premium accessories to customize and maintain your vehicle.",
      features: [
        "OEM-certified parts",
        "Performance upgrades",
        "Custom styling options",
        "Expert installation",
      ],
    },
  ];

  const serviceBenefits = [
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      text: "Certified technicians with manufacturer training",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      text: "State-of-the-art diagnostic equipment",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      text: "Transparent pricing with no hidden fees",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      text: "Comfortable customer lounge with amenities",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      text: "Eco-friendly service practices",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      text: "Complimentary multi-point inspection",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <Image
          src="/images/service-hero.jpg"
          alt="Service center"
          fill
          className="object-cover"
          priority
        />
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="mb-4">
              Our Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Comprehensive Automotive Solutions
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              From sales to service, we provide everything you need for your
              vehicle in one convenient location.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/schedule-service">Schedule Service</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Automotive Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Quality care for your vehicle at every stage of ownership
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow h-full"
              >
                <CardHeader className="items-center">
                  <div className="p-4 bg-primary/10 rounded-full mb-4">
                    {service.icon}
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-6 w-full" asChild>
                    <Link
                      href={`/services/${service.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      Learn More
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Service */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <Image
                src="/images/service-center.jpg"
                alt="Service center"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6">
                Why Choose Our Service Center
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We're committed to providing the highest quality service with a
                focus on your complete satisfaction. Our ASE-certified
                technicians use only the best tools and genuine parts to ensure
                your vehicle receives the care it deserves.
              </p>
              <ul className="grid md:grid-cols-2 gap-4">
                {serviceBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0">{benefit.icon}</div>
                    <span className="text-gray-700">{benefit.text}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8" asChild>
                <Link href="/contact">Schedule an Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Specials */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Current Service Specials</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Take advantage of these limited-time offers to keep your vehicle in
            top condition
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-primary">
                  Oil Change Package
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-4">₦25,000</p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>Full synthetic oil change</li>
                  <li>Multi-point inspection</li>
                  <li>Fluid top-off</li>
                  <li>Tire rotation</li>
                </ul>
                <Button asChild>
                  <Link href="/schedule-service">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-primary">Brake Special</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-4">₦65,000</p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>Brake pad replacement</li>
                  <li>Brake system inspection</li>
                  <li>Rotor resurfacing</li>
                  <li>Brake fluid flush</li>
                </ul>
                <Button asChild>
                  <Link href="/schedule-service">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="text-primary">AC Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold mb-4">₦40,000</p>
                <ul className="space-y-2 text-gray-700 mb-6">
                  <li>AC system diagnostic</li>
                  <li>Refrigerant recharge</li>
                  <li>Cabin air filter replacement</li>
                  <li>System performance test</li>
                </ul>
                <Button asChild>
                  <Link href="/schedule-service">Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gray-50 border-none">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Service Your Vehicle?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Our service advisors are standing by to help you schedule your
                next appointment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/schedule-service">
                    <CalendarCheck className="w-5 h-5 mr-2" />
                    Schedule Online
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="tel:+2349031100390">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: +234 903 110 0390
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Service Center</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Location</h3>
                    <p className="text-gray-600">
                      123 Auto Plaza, Victoria Island, Lagos
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg">Service Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 7:30AM - 6PM
                    </p>
                    <p className="text-gray-600">Saturday: 8AM - 4PM</p>
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

export default ServicePage;
