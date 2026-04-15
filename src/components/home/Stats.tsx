"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BadgeCheck, Users, Globe, Building, Award, TrendingUp } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".outcome-card", {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all"
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const outcomes = [
        {
            icon: <TrendingUp className="text-blue-500" size={32} />,
            title: "Career Transformation",
            description: "Over 95% of our students report significant career advancement or transition within 6 months of completion.",
            stat: "95%"
        },
        {
            icon: <Award className="text-blue-500" size={32} />,
            title: "Industry Mastery",
            description: "Providing high-impact training that helps trainees connect deeply with the subject matter and industry needs.",
            stat: "15+ Years"
        },
        {
            icon: <Users className="text-blue-500" size={32} />,
            title: "Global Alumni Network",
            description: "Join a growing community of 10,000+ graduates working in leading enterprises across the Emirates.",
            stat: "10k+"
        }
    ]

    return (
        <section ref={sectionRef} className="bg-[#fffbf5] pt-10 pb-20 md:pt-12 md:pb-24 font-figtree overflow-hidden border-y border-slate-100/50">
            <div className="container-custom mx-auto px-6">

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
                    <div className="space-y-4">
                        <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                            <BadgeCheck size={14} className="text-blue-500" /> Success Metrics
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl leading-tight">
                            Delivering <span className="text-slate-900">Exceptional Outcomes.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
                        We don't just teach; we deliver measurable results. Our focused approach ensures that every trainee experiences the true value of professional development.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {outcomes.map((outcome, i) => (
                        <div key={i} className="outcome-card bg-white p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.01] duration-300 flex flex-col gap-6 min-h-[280px] group">
                            <div className="flex items-center justify-between">
                                <div className="text-blue-500 transform group-hover:scale-110 transition-transform">
                                    {outcome.icon}
                                </div>
                                <span className="text-3xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">
                                    {outcome.stat}
                                </span>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[19px] font-bold text-[#0f172a] leading-[1.2]">
                                    {outcome.title}
                                </h3>
                                <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                                    {outcome.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
