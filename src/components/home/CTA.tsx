"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Sparkles, Building2, Phone, Mail } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".cta-banner", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all",
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 bg-[#fffbf5] relative font-figtree border-t border-slate-100/50">
            <div className="container-custom mx-auto px-6">
                
                <div className="cta-banner relative bg-white w-full p-10 md:p-14 lg:p-16 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 overflow-hidden hover:shadow-2xl hover:shadow-slate-200/60 transition-all duration-300">
                    
                    {/* Content Left */}
                    <div className="relative z-10 max-w-2xl space-y-5">
                        <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#794d00] leading-[1.1] tracking-tight uppercase">
                            Next Can be You!! <br className="hidden sm:block" />
                            <span className="text-slate-900">Turn Your Passion Into a Professional Career</span>
                        </h2>
                        <p className="text-slate-500 text-[15px] font-medium leading-relaxed max-w-xl">
                            Gain practical skills and globally recognised certifications through hands-on training and expert guidance.
                        </p>
                    </div>

                    {/* Button Right */}
                    <div className="relative z-10 flex-shrink-0">
                        <Link
                            href="/courses"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-[#794d00] text-white rounded-full font-bold text-[14px] tracking-widest uppercase hover:bg-[#1e2a3b] hover:text-blue-500 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#794d00]/20 group"
                        >
                            Start Learning <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    )
}
