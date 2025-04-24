import CTA from "@/components/cta";
import FeaturedList from "@/components/featured-list";
import Hero from "@/components/hero";
import SearchTab from "@/components/search-tab";
import Services from "@/components/services";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <SearchTab />
      <FeaturedList />
      <Services />
      <Testimonials />
      <CTA />
    </div>
  );
}
