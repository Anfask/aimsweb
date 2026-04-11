"use client"

import Hero from "@/components/home/Hero"
import BrandSlider from "@/components/home/BrandSlider"
import FeaturedCourses from "@/components/home/FeaturedCourses"
import WhyChooseUs from "@/components/home/WhyChooseUs"
import Stats from "@/components/home/Stats"
import Testimonials from "@/components/home/Testimonials"
import ContactForm from "@/components/ContactForm"
import CTA from "@/components/home/CTA"
import FAQ from "@/components/FAQ"

export default function Home() {
  return (
    <div className="home-page overflow-x-hidden">
      <Hero />
      <BrandSlider />
      <FeaturedCourses />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <ContactForm />
      <CTA />
      <FAQ />
    </div>
  )
}
