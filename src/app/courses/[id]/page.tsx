"use client"

import { useCourse, useCourses } from "@/hooks/useCourse"
import { useParams } from "next/navigation"
import {
    Clock, BookOpen, Users, ArrowLeft,
    Plus, Minus, Award, ArrowRight,
    AlertCircle, Check, Download
} from "lucide-react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef, useState } from "react"
import WhyChooseAIMS from "@/components/WhyChooseAIMS"
import ContactForm from "@/components/ContactForm"
import FAQ from "@/components/FAQ"

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   Exact clone of ContactForm – glassmorphic style
   Used in Hero (enroll) and Curriculum (brochure)
───────────────────────────────────────── */
function CourseEnquiryForm({ submitLabel = "Submit Now", defaultCourse }: { submitLabel?: string, defaultCourse?: string }) {
    const [formData, setFormData] = useState({ name: "", contact: "", email: "", course: defaultCourse || "" })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const validate = () => {
        const e: Record<string, string> = {}
        if (!formData.name.trim()) e.name = "Name is required"
        if (!formData.email.trim()) e.email = "Email is required"
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email format"
        if (!formData.contact.trim()) e.contact = "Contact number is required"
        else if (!/^[0-9+\s-]{7,15}$/.test(formData.contact)) e.contact = "Invalid contact number"
        if (!formData.course) e.course = "Please select a course"
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = (ev: React.FormEvent) => {
        ev.preventDefault()
        if (validate()) {
            setIsSubmitted(true)
            setFormData({ name: "", contact: "", email: "", course: defaultCourse || "" })
        }
    }

    if (isSubmitted) {
        return (
            <div className="w-full bg-white/10 backdrop-blur-xl px-10 py-16 rounded-[2.5rem] border border-white/20 shadow-2xl flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-blue-600/20 rounded-full flex items-center justify-center border border-blue-500/30">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="text-white w-6 h-6" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
                    <p className="text-white/60 text-sm">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                </div>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-blue-400 font-bold hover:text-blue-300 transition-colors uppercase tracking-widest text-xs"
                >
                    Send Another Message
                </button>
            </div>
        )
    }

    const inputCls = (field: string) =>
        `w-full px-5 py-4 rounded-lg bg-white/[0.03] border ${errors[field] ? "border-red-500/50" : "border-white/10"} focus:border-blue-500/40 focus:bg-white/[0.05] outline-none transition-all text-white font-normal`

    return (
        <div className="w-full bg-white/10 backdrop-blur-xl px-8 py-10 sm:px-12 sm:py-14 rounded-[2.5rem] border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] space-y-8 overflow-hidden relative">
            <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-white ml-1">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            className={inputCls("name")}
                        />
                        {errors.name && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} />{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-white ml-1">Contact Number</label>
                        <input
                            type="text"
                            value={formData.contact}
                            onChange={e => setFormData({ ...formData, contact: e.target.value })}
                            className={inputCls("contact")}
                        />
                        {errors.contact && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} />{errors.contact}</p>}
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-white ml-1">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            className={inputCls("email")}
                        />
                        {errors.email && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} />{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-[14px] font-medium text-white ml-1">Course Interested</label>
                        <input
                            type="text"
                            value={formData.course}
                            readOnly
                            className={`${inputCls("course")} cursor-not-allowed opacity-80`}
                        />
                        {errors.course && <p className="text-[10px] text-red-500 ml-1 flex items-center gap-1"><AlertCircle size={10} />{errors.course}</p>}
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-2 text-center relative z-10">
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-5 rounded-xl font-bold text-base transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-blue-500/30"
                >
                    {submitLabel}
                </button>
                <p className="text-[13px] font-normal text-white opacity-60 leading-relaxed">
                    From zero to job-ready. Apply in 60 seconds.
                </p>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────
   Expandable curriculum accordion item
───────────────────────────────────────── */
function CurriculumItem({ index, item }: { index: number; item: string }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="border border-slate-200 rounded-xl mb-4 bg-white overflow-hidden transition-all hover:border-slate-300">
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center gap-4 px-6 py-5 text-left group"
            >
                <span className="text-slate-800 shrink-0">
                    {open ? <Minus size={16} /> : <Plus size={16} />}
                </span>
                <span className="text-[14px] font-bold text-slate-800 group-hover:text-slate-900 transition-colors flex-1">
                    {item}
                </span>
            </button>
            {open && (
                <div className="px-14 pb-6 pt-0 text-[13px] text-slate-500 font-medium leading-relaxed">
                    Hands-on training covering all core aspects of {item.toLowerCase()}, with practical exercises
                    tailored to UAE industry standards and employer expectations.
                </div>
            )}
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default function CourseDetail() {
    const { id } = useParams()
    const { course, loading } = useCourse(id as string)
    const { courses: allCourses } = useCourses()
    const containerRef = useRef<HTMLDivElement>(null)

    let relatedCourses = allCourses
        .filter(c => c.category === course?.category && c.id !== course?.id)
        .slice(0, 3)

    if (relatedCourses.length === 0 && course && allCourses.length > 0) {
        relatedCourses = allCourses.filter(c => c.id !== course.id).slice(0, 3)
    }

    // Category → generated course image mapping
    const CATEGORY_IMAGES: Record<string, string> = {
        "Finance & Accounting": "/images/course-finance.png",
        "Office Administration": "/images/course-office.png",
        "Engineering and CAD": "/images/course-engineering.png",
        "Graphic Design and Animation": "/images/course-design.png",
        "Project Management": "/images/course-pm.png",
        "IT & Networking": "/images/course-it.png",
        "Soft Skills": "/images/brown-hero-student.png",
        "Language": "/images/hero-light.png",
    }
    const categoryImage = course ? (CATEGORY_IMAGES[course.category] ?? "/images/excellence.png") : "/images/excellence.png"

    useEffect(() => {
        if (!loading && course) {
            let ctx = gsap.context(() => {})
            // Slight delay guarantees `relatedCourses` UI is mounted before GSAP triggers search for .related-reveal
            const timer = setTimeout(() => {
                ctx.add(() => {
                    gsap.from(".hero-reveal", {
                        y: 40, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
                    })
                    gsap.from(".overview-reveal", {
                        y: 30, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power2.out",
                        scrollTrigger: { trigger: ".overview-section", start: "top 85%" },
                    })
                    gsap.from(".curriculum-reveal", {
                        y: 30, opacity: 0, stagger: 0.06, duration: 0.7, ease: "power2.out",
                        scrollTrigger: { trigger: ".curriculum-section", start: "top 85%" },
                    })
                    if (document.querySelector(".related-reveal")) {
                        gsap.from(".related-reveal", {
                            y: 30, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power2.out",
                            scrollTrigger: { trigger: ".related-section", start: "top 85%" },
                        })
                    }
                })
            }, 50)
            return () => {
                clearTimeout(timer)
                ctx.revert()
            }
        }
    }, [loading, course, allCourses?.length || 0])

    /* ── Loading skeleton ── */
    if (loading) return (
        <div className="min-h-screen bg-[#0f172a] pt-36 pb-20 font-figtree">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 space-y-10">
                <div className="h-4 w-28 bg-white/10 animate-pulse rounded-full" />
                <div className="h-12 w-2/3 bg-white/10 animate-pulse rounded-2xl" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="h-[360px] bg-white/10 animate-pulse rounded-[20px]" />
                    <div className="h-[360px] bg-white/10 animate-pulse rounded-[20px]" />
                </div>
            </div>
        </div>
    )

    /* ── Not found ── */
    if (!course) return (
        <div className="min-h-screen bg-[#fffbf5] font-figtree flex items-center justify-center">
            <div className="text-center space-y-8 py-32 px-6">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-[#794d00]/5 rounded-full">
                    <BookOpen size={40} className="text-[#794d00]/40" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-slate-900">Course Not Found</h2>
                    <p className="text-slate-500 max-w-md mx-auto text-base font-medium">
                        The program you&apos;re looking for might have been moved or doesn&apos;t exist.
                    </p>
                </div>
                <Link href="/courses" className="inline-flex items-center gap-3 bg-[#794d00] text-white px-8 py-4 rounded-2xl font-bold text-[15px] transition-all hover:bg-[#1e2a3b] hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#794d00]/20">
                    <ArrowLeft size={18} /> Back to All Courses
                </Link>
            </div>
        </div>
    )

    return (
        <div ref={containerRef} className="course-detail-page min-h-screen font-figtree">

            {/* ══════════════════════════════════════════════════════
                ① HERO — same bg image as ContactForm + glassmorphic form
            ══════════════════════════════════════════════════════ */}
            <section className="relative w-full min-h-screen flex items-center overflow-hidden">

                {/* Background image — identical setup to ContactForm.tsx */}
                <div className="absolute inset-0 z-0 bg-[url('/contact_hero_bg.png')] bg-cover bg-center bg-no-repeat bg-fixed transform scale-105">
                    <div className="absolute inset-0 bg-[#020617]/60 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 pt-36 pb-20">


                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-14 lg:gap-20 items-start">

                        {/* Left: title block */}
                        <div className="space-y-7">
                            {/* Category pill */}
                            <div className="hero-reveal inline-flex items-center gap-2 px-4 py-1.5 bg-[#794d00]/30 border border-[#794d00]/40 rounded-full text-[#c8915a] text-[11px] font-black uppercase tracking-[0.2em]">
                                <BookOpen size={11} />
                                {course.category}
                            </div>

                            {/* Title */}
                            <h1 className="hero-reveal font-extrabold text-white leading-[1.05] tracking-tight text-4xl sm:text-5xl xl:text-[56px] uppercase">
                                {course.title}
                            </h1>

                            {/* Description */}
                            <p className="hero-reveal text-slate-300 text-base sm:text-[17px] font-medium leading-relaxed max-w-xl">
                                {course.description}
                            </p>

                            {/* CTAs */}
                            <div className="hero-reveal flex flex-wrap items-center gap-4 pt-2">
                                <a
                                    href="#enroll-form"
                                    className="inline-flex items-center gap-3 bg-white text-[#1e2a3b] px-8 py-4 rounded-full font-black text-[13px] tracking-widest uppercase transition-all hover:bg-[#fffbf5] hover:scale-[1.02] active:scale-[0.98] shadow-xl group"
                                >
                                    Start Learning
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a
                                    href="#curriculum"
                                    className="inline-flex items-center gap-3 border-2 border-white/25 text-white px-8 py-4 rounded-full font-black text-[13px] tracking-widest uppercase transition-all hover:border-white/50 hover:bg-white/5 hover:scale-[1.01]"
                                >
                                    <Download size={14} />
                                    View Curriculum
                                </a>
                            </div>
                        </div>

                        {/* Right: glassmorphic enroll form */}
                        <div id="enroll-form" className="hero-reveal">
                            <CourseEnquiryForm submitLabel="Submit Now" defaultCourse={course.title} />
                        </div>

                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════
                ② OVERVIEW — white · left: text + stat pills · right: dark course card
            ══════════════════════════════════════════════════════ */}
            <section className="overview-section bg-white border-b border-slate-100">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Left: overview text */}
                        <div className="space-y-8">
                            <div className="overview-reveal inline-flex items-center px-4 py-1.5 bg-[#794d00]/10 border border-[#794d00]/20 rounded-full text-[#794d00] text-[11px] font-black uppercase tracking-[0.2em]">
                                Overview
                            </div>

                            <div className="overview-reveal space-y-4">
                                <p className="text-[15px] text-slate-700 font-medium leading-relaxed">
                                    {course.description}
                                </p>
                                <p className="text-[15px] text-slate-500 font-medium leading-relaxed">
                                    Our learning model is hands-on and project-driven. Each module ends with practical applications
                                    that go directly into your professional portfolio. By the end, you&apos;ll have a set of
                                    industry-ready skills that make you stand out to employers across the UAE.
                                </p>
                            </div>

                            {/* Stat pills */}
                            <div className="overview-reveal flex flex-wrap gap-3 pt-2">
                                {[
                                    { label: "Duration", value: course.duration },
                                    { label: "Format", value: "Live + Hands-On" },
                                    { label: "Level", value: course.level },
                                ].map((s, i) => (
                                    <div key={i} className="border border-slate-200 rounded-2xl px-5 py-3 bg-white shadow-sm min-w-[120px]">
                                        <p className="text-[9px] font-black tracking-widest uppercase text-[#794d00] mb-1">{s.label}</p>
                                        <p className="text-[13px] font-extrabold text-slate-900 uppercase tracking-tight leading-tight">{s.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: dark course card with category image */}
                        <div className="overview-reveal">
                            <div className="relative rounded-[24px] overflow-hidden bg-[#1e2a3b] shadow-2xl shadow-slate-900/40">

                                {/* ── Course image banner ── */}
                                <div className="relative w-full h-[240px] overflow-hidden">
                                    <img
                                        src={categoryImage}
                                        alt={course.category}
                                        className="w-full h-full object-cover object-center"
                                    />
                                    {/* Gradient fade into card body */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1e2a3b] via-[#1e2a3b]/30 to-transparent" />
                                    {/* Category icons overlay */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                        {[BookOpen, Award, Users, Clock].map((Icon, i) => (
                                            <div key={i} className="w-8 h-8 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/70">
                                                <Icon size={14} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ── Card body ── */}
                                <div className="relative z-10 p-8 space-y-6">
                                    {/* Glow blobs */}
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#794d00]/15 rounded-full blur-[60px]" />
                                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-800/15 rounded-full blur-[60px]" />
                                    </div>

                                    <div className="relative z-10 space-y-2">
                                        <p className="text-[10px] font-black tracking-widest uppercase text-[#c8915a]">{course.category}</p>
                                        <h3 className="text-[26px] md:text-[30px] font-extrabold text-white leading-[1.1] tracking-tight uppercase">
                                            {course.title}
                                        </h3>
                                    </div>

                                    <div className="relative z-10 grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                                        {[
                                            { label: "Duration", value: course.duration },
                                            { label: "Level", value: course.level },
                                            { label: "Seats Open", value: course.seats },
                                            { label: "Modules", value: `${course.curriculum.length} Topics` },
                                        ].map((s, i) => (
                                            <div key={i}>
                                                <p className="text-[9px] font-black tracking-widest uppercase text-white/40 mb-0.5">{s.label}</p>
                                                <p className="text-[13px] font-bold text-white">{s.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <a
                                        href="#enroll-form"
                                        className="relative z-10 inline-flex items-center gap-2 text-[11px] font-black tracking-widest uppercase text-[#c8915a] hover:text-white transition-colors group/link"
                                    >
                                        Enroll in This Program
                                        <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* ══════════════════════════════════════════════════════
                ③ CURRICULUM & RELATED — Integrated Section
            ══════════════════════════════════════════════════════ */}
            <section id="curriculum" className="curriculum-section scroll-mt-24 py-24 bg-[#fffbf5]">
                <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12">

                    {/* Heading */}
                    <div className="curriculum-reveal mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#794d00] tracking-tight uppercase leading-tight">
                            COURSE <span className="text-slate-900">CURRICULUM</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10 items-start">

                        {/* Accordion List */}
                        <div className="curriculum-reveal">
                            {course.curriculum.map((item, i) => (
                                <CurriculumItem key={i} index={i} item={item} />
                            ))}
                        </div>

                        {/* Brochure Form — same hero design but solid dark bg */}
                        <div className="curriculum-reveal sticky top-28">
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl bg-[#0a0f12]">
                                <div className="relative z-10 w-full p-2">
                                    <div className="px-8 pt-8 pb-0">
                                        <h3 className="text-[17px] font-bold text-white tracking-wide">Download Brochure</h3>
                                    </div>
                                    <CourseEnquiryForm submitLabel="Submit & Download" />
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* ══════════════════════════════════════════════════════
                        ④ RELATED COURSES (Nested directly under curriculum)
                    ══════════════════════════════════════════════════════ */}
                    {relatedCourses.length > 0 && (
                        <div className="related-section mt-16 pt-16 border-t border-slate-200/60">
                            
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                                <div className="space-y-2">
                                    <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                                        <BookOpen size={13} className="text-blue-500" />
                                        More from {course.category}
                                    </span>
                                    <h2 className="text-2xl md:text-3xl font-bold text-[#794d00] tracking-tight uppercase leading-tight">
                                        Related <span className="text-slate-900">Programs.</span>
                                    </h2>
                                </div>
                                <Link
                                    href="/courses"
                                    className="group inline-flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors shrink-0"
                                >
                                    View All Courses
                                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                                {relatedCourses.map((rc) => (
                                    <div
                                        key={rc.id}
                                        className="related-reveal group bg-white p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.02] duration-300 flex flex-col gap-6"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="text-blue-500 group-hover:scale-110 transition-transform duration-300">
                                                <BookOpen size={28} />
                                            </div>
                                            <span className="px-3 py-1 bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest rounded-lg group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                                {rc.level}
                                            </span>
                                        </div>
                                        <div className="space-y-2 flex-1">
                                            <h3 className="text-[18px] font-bold text-[#0f172a] leading-[1.25]">{rc.title}</h3>
                                            <p className="text-[13px] text-slate-500 font-medium leading-relaxed line-clamp-2">{rc.description}</p>
                                        </div>
                                        <div className="flex items-center gap-2 text-[12px] text-slate-400 font-bold">
                                            <Clock size={14} className="text-blue-500" />
                                            {rc.duration}
                                        </div>
                                        <div className="pt-4 border-t border-slate-50">
                                            <Link
                                                href={`/courses/${rc.id}`}
                                                className="inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors group/link"
                                            >
                                                View Details
                                                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
            </section>
            <WhyChooseAIMS />
            <ContactForm defaultCourse={course.title} />
            <FAQ />
        </div>
    )
}
