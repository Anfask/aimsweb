"use client"

import { useLayoutEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Calculator, Briefcase, Compass, Palette, BookOpen, Wind } from "lucide-react"
import { useCourses } from "@/hooks/useCourse"

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedCourses() {
    const sectionRef = useRef<HTMLElement>(null)
    const { courses, loading } = useCourses()

    useLayoutEffect(() => {
        if (loading) return
        let ctx = gsap.context(() => {
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
        }, sectionRef)
        return () => ctx.revert()
    }, [loading])

    const getIcon = (category: string) => {
        const size = 32
        switch (category) {
            case 'Finance & Accounting': return <Calculator size={size} />
            case 'Office Administration': return <Briefcase size={size} />
            case 'Engineering and CAD': return <Compass size={size} />
            case 'Graphic Design and Animation': return <Palette size={size} />
            default: return <BookOpen size={size} />
        }
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

    // Select the 4 main signature category overviews to feature
    const featuredIds = ['finance-accounting', 'office-administration', 'engineering-cad', 'graphic-design-animation']
    const featuredCourses = courses.filter(c => featuredIds.includes(c.id))

    return (
        <section
            ref={sectionRef}
            className="bg-[#fffbf5] py-24 md:py-32 font-figtree border-t border-slate-100/50 overflow-hidden relative"
        >
            <div className="container-custom mx-auto px-6">

                {/* ── Header ── */}
                <div className="fc-header flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20">
                    <div className="space-y-4">
                        <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                            <Wind size={14} className="text-blue-500" /> Kinetic Programs
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl leading-tight">
                            Signature <span className="text-slate-900">Education.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
                        Globally recognised certifications, expertly delivered for professionals across the UAE.
                    </p>
                </div>

                {/* ── Cards Grid ── */}
                <div className="courses-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                    {featuredCourses.map((course, idx) => (
                        <div
                            key={course.id}
                            className="course-card bg-white p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.01] duration-300 flex flex-col gap-6 group"
                        >
                            {/* Top row: icon + number */}
                            <div className="flex items-center justify-between">
                                <div className="text-blue-500 transform group-hover:scale-110 transition-transform duration-300">
                                    {getIcon(course.category)}
                                </div>
                                <span className="text-3xl font-black text-slate-100 group-hover:text-slate-200 transition-colors select-none">
                                    0{idx + 1}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="space-y-3 flex-1">
                                <h3 className="text-[19px] font-bold text-[#0f172a] leading-[1.2]">
                                    {course.title}
                                </h3>
                                <p className="text-[14px] text-slate-500 font-medium leading-relaxed line-clamp-2">
                                    {course.description || "Comprehensive high-impact training designed for your professional success in the UAE's competitive landscape."}
                                </p>
                            </div>

                            {/* CTA */}
                            <div className="pt-4 border-t border-slate-50">
                                <Link
                                    href={`/courses/${course.id}`}
                                    className="inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors group/link"
                                >
                                    Learn More
                                    <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Footer bar ── */}
                <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-100/50">
                    <div className="flex items-center gap-3 text-[#794d00] font-bold text-xs tracking-widest uppercase">
                        <BookOpen size={18} className="text-blue-500" />
                        Explore our complete curriculum
                    </div>
                    <Link
                        href="/courses"
                        className="group inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors"
                    >
                        Explore All Programs
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </section>
    )
}
