"use client"

import { useLayoutEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Calculator, Briefcase, Compass, Palette, BookOpen, Wind, MessageCircle, Network } from "lucide-react"
import { useCourses } from "@/hooks/useCourse"

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedCourses() {
    const sectionRef = useRef<HTMLElement>(null)
    const { courses, loading } = useCourses()

    useGSAP(() => {
        if (loading) return
        gsap.from(".fc-header", {
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all"
        })
        gsap.from(".course-card", {
            scrollTrigger: { trigger: ".courses-grid", start: "top 85%" },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all"
        })
    }, { dependencies: [loading], scope: sectionRef })

    const getIcon = (category: string) => {
        return (
            <div className="w-6 h-6 sm:w-8 sm:h-8 [&>svg]:w-full [&>svg]:h-full">
                {(() => {
                    switch (category) {
                        case 'Finance & Accounting': return <Calculator />
                        case 'Office Administration': return <Briefcase />
                        case 'Engineering and CAD': return <Compass />
                        case 'Graphic Design and Animation': return <Palette />
                        case 'IT & Networking': return <Network aria-label="Network" />
                        case 'Language Courses': return <BookOpen />
                        default: return <BookOpen />
                    }
                })()}
            </div>
        )
    }

    if (loading) {
        return (
            <section className="bg-[#fffbf5] py-24 md:py-32 font-figtree border-t border-slate-100/50">
                <div className="container-custom mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white/50 animate-pulse h-[300px] rounded-[20px] border border-slate-100" />
                    ))}
                </div>
            </section>
        )
    }

    // Select the 5 main signature category overviews to feature with specific priority
    const featuredIds = ['engineering-cad', 'office-administration', 'graphic-design-animation', 'finance-accounting', 'network-it', 'language-courses']
    const featuredCourses = featuredIds
        .map(id => courses.find(c => c.id === id))
        .filter((c): c is NonNullable<typeof c> => !!c)

    return (
        <section
            ref={sectionRef}
            className="bg-[#fffbf5] pt-6 pb-6 md:pt-12 md:pb-12 font-figtree border-t border-slate-100/50 overflow-hidden relative"
        >
            <div className="container-custom mx-auto px-6">

                {/* ── Header ── */}
                <div className="fc-header flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
                    <div className="space-y-2 sm:space-y-4">
                        <span className="text-[#794d00] font-bold tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2">
                            <Wind size={12} className="text-blue-500 sm:w-[14px] sm:h-[14px]" /> Kinetic Programs
                        </span>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl leading-tight">
                            Signature <span className="text-slate-900">Education.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
                        Globally recognised certifications, expertly delivered for professionals across the UAE.
                    </p>
                </div>

                {/* ── Cards Grid ── */}
                <div className="courses-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {featuredCourses.map((course, idx) => (
                        <div
                            key={course.id}
                            className="course-card relative bg-white p-5 pb-3 sm:p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.01] duration-300 flex flex-col gap-3 sm:gap-6 group"
                        >
                            {/* Top row: icon + number */}
                            <div className="flex items-center justify-between">
                                <div className="text-blue-500 transform group-hover:scale-110 transition-transform duration-300">
                                    {getIcon(course.category)}
                                </div>
                                <span className="text-2xl sm:text-3xl font-black text-slate-100 group-hover:text-slate-200 transition-colors select-none">
                                    0{idx + 1}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="space-y-1 sm:space-y-3 flex-1">
                                <h3 className="text-[15px] sm:text-[19px] font-bold text-[#0f172a] leading-[1.2]">
                                    {course.title}
                                </h3>
                                <div className="relative flex items-end justify-between gap-4">
                                    <p className="text-[11px] sm:text-[14px] text-slate-500 font-medium leading-relaxed">
                                        {course.description || "Comprehensive high-impact training designed for your professional success in the UAE's competitive landscape."}
                                    </p>
                                    <ArrowRight size={16} className="sm:hidden text-blue-500 shrink-0 mb-1" />
                                </div>
                            </div>

                            {/* CTA - Hidden on mobile, visible on desktop */}
                            <Link
                                href={`/courses?category=${encodeURIComponent(course.category)}`}
                                className="block group/link"
                            >
                                {/* Invisible stretched link for mobile clickability */}
                                <span className="absolute inset-0 z-10 sm:hidden"></span>

                                <div className="hidden sm:flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
                                    <span className="text-[10px] font-black tracking-widest uppercase text-[#794d00]">Explore Program</span>
                                    <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-[#794d00] group-hover/link:bg-[#794d00] group-hover/link:text-white transition-all duration-300">
                                        <ArrowRight size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* ── Footer bar ── */}
                <div className="mt-6 sm:mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-6 sm:pt-10 border-t border-slate-100/50">
                    <div className="flex items-center gap-3 text-[#794d00] font-bold text-xs tracking-widest uppercase">
                        <BookOpen size={18} className="text-blue-500" />
                        Explore our complete curriculum
                    </div>
                    <Link
                        href="/courses"
                        className="group inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors self-end md:self-auto"
                    >
                        Explore All Programs
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    )
}
