"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Phone, MapPin, Mail, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Information */}
          <div className="space-y-4">
            <h3 className="text-white text-xl font-bold">Sethlee Auto</h3>
            <p className="text-gray-400">
              Your premier destination for luxury and performance vehicles with exceptional service.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, label: "Facebook" },
                { icon: Twitter, label: "Twitter" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" }
              ].map((social, index) => (
                <Link
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/inventory", label: "Inventory" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" }
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Our Services</h3>
            <ul className="space-y-3">
              {[
                { href: "#", label: "New Vehicles" },
                { href: "#", label: "Certified Pre-Owned" },
                { href: "#", label: "Flexible Financing" },
                { href: "#", label: "Maintenance Services" },
                { href: "#", label: "Trade-In Evaluation" }
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">Contact Us</h3>
            <address className="not-italic text-gray-400 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <p>Ughelli<br />Delta State, Nigeria</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+2349031100390" className="hover:text-white transition-colors">
                  +234 903 110 0390
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@sethleeauto.com" className="hover:text-white transition-colors">
                  info@sethleeauto.com
                </a>
              </div>
              <div className="flex items-start gap-3 pt-2">
                <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Business Hours:</p>
                  <p>Mon-Fri: 9AM - 8PM</p>
                  <p>Sat: 9AM - 6PM</p>
                  <p>Sun: Closed</p>
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Sethlee Auto. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-3">
            {[
              { href: "#", label: "Privacy Policy" },
              { href: "#", label: "Terms of Service" },
              { href: "#", label: "Cookie Policy" }
            ].map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}