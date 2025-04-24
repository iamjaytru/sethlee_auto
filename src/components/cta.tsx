"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Car, Phone, MapPin } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-primary text-white overflow-hidden">
   
      <div className="container md:mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Ready to Find Your <span className="text-secondary">Dream Car</span>?
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 mx-auto text-white/90">
            Visit our showroom today or browse our online inventory to find the perfect vehicle for your lifestyle and budget.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-base sm:text-lg px-8 py-6 hover:scale-105 transition-transform"
              asChild
            >
              <Link href="/inventory" className="flex items-center gap-2">
                <Car className="w-6 h-6" />
                Browse Inventory
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base sm:text-lg px-8 py-6 bg-primary/90 border-white text-white hover:bg-white/10 hover:text-white hover:scale-105 transition-transform"
              asChild
            >
              <Link href="/contact" className="flex items-center gap-2">
                <Phone className="w-6 h-6" />
                Contact Us
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Additional contact info */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-center gap-6 md:gap-12"
        >
          <div className="flex items-center justify-center gap-3">
            <Phone className="w-5 h-5 text-secondary" />
            <div>
              <p className="text-sm text-white/80">Sales Hotline</p>
              <a href="tel:+2349031100390" className="text-lg font-medium hover:text-secondary transition-colors">
                +234 903 110 0390
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <MapPin className="w-5 h-5 text-secondary" />
            <div>
              <p className="text-sm text-white/80">Location</p>
              <p className="text-lg font-medium">Ughelli Delta State</p>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default CTA;