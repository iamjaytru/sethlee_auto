"use client";

import { motion } from "framer-motion";
import { ChevronRight, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const testimonials = [
  {
    name: "Sarah T.",
    role: "Business Owner",
    rating: 5,
    content:
      "The team at this dealership made buying a car so easy. They were knowledgeable, friendly, and not pushy at all. I love my new car!",
  },
  {
    name: "Michael B.",
    role: "Software Engineer",
    rating: 5,
    content:
      "Exceptional service from start to finish. Found my dream car at a great price with no pressure. Will definitely recommend to friends!",
  },
  {
    name: "Amina K.",
    role: "Doctor",
    rating: 5,
    content:
      "As a first-time car buyer, I was nervous, but the staff guided me through every step. The financing options were clearly explained.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-sm font-semibold tracking-wider text-primary mb-2 block">
            HAPPY CUSTOMERS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center text-amber-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <blockquote className="text-gray-600 mb-6 text-lg leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
{/* 
        <div className="mt-12 text-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            asChild
          >
            <Link href="/testimonials">
              Read More Reviews
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default Testimonials;
