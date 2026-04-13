"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Image from "next/image"
import { CheckCircle, Award, Target, Users } from "lucide-react"
import WhyChooseAIMS from "@/components/WhyChooseAIMS"
import Stats from "@/components/Stats"
import FAQ from "@/components/FAQ"
import MissionVision from "@/components/MissionVision"
import CTA from "@/components/home/CTA"
import ContactForm from "@/components/ContactForm"
import BrandSlider from "@/components/BrandSlider"

export default function About() {
    const heroRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reveal-item", {
                y: 50,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top 80%",
                }
            })
        })

        return () => ctx.revert()
    }, [])

    return (
        <div className="about-page font-figtree">
            {/* Dark Hero Header Section */}
            <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-52 pb-24 overflow-hidden">
                {/* Background with Image and Dark Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero.png"
                        alt="AIMS Excellence"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/95 via-[#020617]/90 to-[#020617]"></div>
                </div>

                <div className="container-custom relative z-10 mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto flex flex-col items-center">
                        {/* Glowing Sub-header */}
                        <span className="reveal-item inline-block font-extrabold tracking-[0.3em] text-blue-500 uppercase text-xs sm:text-sm drop-shadow-[0_0_10px_rgba(59,130,246,0.3)] mb-8">
                            About AIMS Training Center - ABU DHABI
                        </span>

                        {/* Main Title Area */}
                        <div className="space-y-6">
                            <h1 className="reveal-item text-5xl md:text-6xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight font-figtree">
                                Start Your Success <br /> Journey with <span className="text-blue-500">AIMS</span>
                            </h1>

                            {/* Short Intro */}
                            <p className="reveal-item text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed font-figtree opacity-80">
                                Empowering professionals in AIMS through specialized training in Technical, Vocational, and Soft Skills development.
                            </p>
                        </div>

                        {/* Stylized Separator */}
                        <div className="reveal-item flex items-center justify-center gap-6 pt-28 pb-20">
                            <div className="h-px w-20 bg-gradient-to-r from-transparent to-blue-500/50"></div>
                            <div className="w-3 h-3 rotate-45 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                            <div className="h-px w-20 bg-gradient-to-l from-transparent to-blue-500/50"></div>
                        </div>
                    </div>
                </div>

                {/* Decorative Bottom Glow */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent z-10"></div>
            </section>

            <MissionVision />
            <BrandSlider />
            <CTA />
            <WhyChooseAIMS />
            <Stats />
            <ContactForm />
            <FAQ />
        </div>
    )
}
