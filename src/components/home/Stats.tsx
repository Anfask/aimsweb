"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { BadgeCheck, Users, Globe, Building, Award, TrendingUp, Plus, Minus } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function Stats() {
    const sectionRef = useRef<HTMLElement>(null)
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    useGSAP(() => {
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
    }, { scope: sectionRef })

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
        <section ref={sectionRef} className="bg-[#fffbf5] pt-6 pb-6 md:pt-12 md:pb-12 font-figtree overflow-hidden border-y border-slate-100/50">
            <div className="container-custom mx-auto px-6">

                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
                    <div className="space-y-2 sm:space-y-4">
                        <span className="text-[#794d00] font-bold tracking-widest text-[10px] sm:text-xs uppercase flex items-center gap-2">
                            <BadgeCheck size={12} className="text-blue-500 sm:w-[14px] sm:h-[14px]" /> Success Metrics
                        </span>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl leading-tight">
                            Delivering <span className="text-slate-900">Exceptional Outcomes.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
                        We don't just teach; we deliver measurable results. Our focused approach ensures that every trainee experiences the true value of professional development.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {outcomes.map((outcome, i) => (
                        <div 
                            key={i} 
                            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                            className={`outcome-card bg-white p-5 pb-3 sm:p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-300 flex flex-col gap-3 sm:gap-6 group cursor-pointer ${activeIndex === i ? 'scale-[1.02] border-blue-100 ring-1 ring-blue-50' : 'hover:scale-[1.01]'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-blue-500 transform group-hover:scale-110 transition-transform w-6 h-6 sm:w-8 sm:h-8 [&>svg]:w-full [&>svg]:h-full">
                                    {outcome.icon}
                                </div>
                                <span className="text-2xl sm:text-3xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">
                                    {outcome.stat}
                                </span>
                            </div>
                            <div className="space-y-1 sm:space-y-3">
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-[17px] sm:text-[19px] font-bold text-[#0f172a] leading-[1.2]">
                                        {outcome.title}
                                    </h3>
                                    <div className={`w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300 sm:hidden ${activeIndex === i ? 'rotate-180 bg-blue-50' : ''}`}>
                                        <Plus size={12} className={`text-slate-400 transition-opacity ${activeIndex === i ? 'opacity-0' : 'opacity-100'}`} />
                                        <Minus size={12} className={`text-blue-500 absolute transition-opacity ${activeIndex === i ? 'opacity-100' : 'opacity-0'}`} />
                                    </div>
                                </div>
                                <div 
                                    className={`overflow-hidden transition-all duration-500 ease-in-out sm:max-h-none sm:opacity-100 sm:mt-3 ${activeIndex === i ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}
                                >
                                    <p className="text-[13px] sm:text-[14px] text-slate-500 font-medium leading-relaxed">
                                        {outcome.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
