"use client"

import { useLayoutEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CheckCircle, ShieldCheck, Clock, Award, Zap, Layout, Sparkles, ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const features = [
    {
        icon: <Award size={32} />,
        title: "ACTVET Licenced",
        description: "Official government recognition ensuring your training meets the highest UAE regulatory standards.",
        stat: "Gov. Licenced",
    },
    {
        icon: <Layout size={32} />,
        title: "Practical Learning",
        description: "Hands-on projects, live simulations, and real-world case studies that prepare you for day one on the job.",
        stat: "100% Practical",
    },
    {
        icon: <Clock size={32} />,
        title: "Flexible Schedules",
        description: "Morning, evening, and weekend batches designed around the lifestyle of working professionals.",
        stat: "All Timings",
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "Performance Tracking",
        description: "Regular mock tests, diagnostic reports, and personalised coaching sessions track your progress closely.",
        stat: "Mock Tested",
    },
    {
        icon: <Zap size={32} />,
        title: "Job-Ready Results",
        description: "Industry-aligned curriculum built with employer input, giving you an immediate competitive edge.",
        stat: "95% Pass Rate",
    },
    {
        icon: <Sparkles size={32} />,
        title: "Modern Facilities",
        description: "State-of-the-art labs, premium software, and a smart-campus environment for immersive learning.",
        stat: "Since 2010",
    },
]

export default function WhyChooseUs() {
    const sectionRef = useRef<HTMLElement>(null)

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".wcu-header", {
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all",
            })
            gsap.from(".feature-card", {
                scrollTrigger: { trigger: ".features-grid", start: "top 85%" },
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all",
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="bg-white pt-10 pb-20 md:pt-12 md:pb-24 font-figtree overflow-hidden border-t border-slate-100"
        >
            <div className="container-custom mx-auto px-6">

                {/* ── Header ── */}
                <div className="wcu-header flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
                    <div className="space-y-4">
                        <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                            <Sparkles size={14} className="text-blue-500" /> Educational Framework
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl leading-tight">
                            Excellence <span className="text-slate-900">Framework.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
                        Six pillars that separate AIMS from every other training centre in the UAE.
                    </p>
                </div>

                {/* ── Feature Cards ── */}
                <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="feature-card bg-white p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.01] duration-300 flex flex-col gap-6 min-h-[260px] group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-blue-500 transform group-hover:scale-110 transition-transform duration-300">
                                    {f.icon}
                                </div>
                                <span className="text-3xl font-black text-slate-100 group-hover:text-slate-200 transition-colors select-none">
                                    {f.stat}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <h3 className="text-[19px] font-bold text-[#0f172a] leading-[1.2]">
                                    {f.title}
                                </h3>
                                <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                                    {f.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Footer bar ── */}
                <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-[#794d00] font-bold text-xs tracking-widest uppercase">
                        <CheckCircle size={18} className="text-blue-500" />
                        Standardised Excellence Since 2010
                    </div>
                    <Link
                        href="/about"
                        className="group inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors"
                    >
                        Learn More About AIMS
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    )
}
