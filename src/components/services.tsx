"use client";

import { Car, ShieldCheck, DollarSign, RefreshCw, Settings, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Car className="h-8 w-8 text-primary" />,
    title: "Premium Vehicle Collection",
    description: "Discover our curated selection of luxury and high-performance vehicles from the world's most prestigious brands."
  },
  {
    icon: <DollarSign className="h-8 w-8 text-primary" />,
    title: "Tailored Financing Solutions",
    description: "Access personalized financing plans with competitive rates and flexible payment options to suit your financial needs."
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Extended Protection Plans",
    description: "Enjoy peace of mind with our comprehensive warranty and maintenance packages covering your vehicle beyond factory terms."
  },
  {
    icon: <RefreshCw className="h-8 w-8 text-primary" />,
    title: "Trade-In Evaluation",
    description: "Get a fair market value assessment for your current vehicle with our hassle-free trade-in process."
  },
  {
    icon: <Settings className="h-8 w-8 text-primary" />,
    title: "Certified Maintenance",
    description: "Keep your vehicle in peak condition with our factory-trained technicians using genuine parts and equipment."
  },
  {
    icon: <CalendarCheck className="h-8 w-8 text-primary" />,
    title: "Concierge Services",
    description: "Experience white-glove service with vehicle delivery, pickup, and maintenance scheduling at your convenience."
  }
];

const Services = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-sm font-semibold tracking-wider text-primary mb-2 block">
            WHAT WE OFFER
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Our Premium Services
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 hover:bg-gray-100/50 p-8 rounded-xl text-center transition-all duration-300 border border-gray-100 hover:border-primary/10 shadow-sm hover:shadow-md"
            >
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 lg:text-lg">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;