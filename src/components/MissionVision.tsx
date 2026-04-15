"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
    Users,
    Zap,
    Monitor,
    Lightbulb,
    Award,
    Target,
    Rocket,
    Globe,
    Compass
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface CardData {
    title: string
    description: string
    icon: React.ReactNode
}

function SectionCard({ data }: { data: CardData }) {
    return (
        <div className="bg-white p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.01] duration-300 flex flex-col gap-6 min-h-[260px]">
            <div className="text-blue-500">
                {data.icon}
            </div>
            <div className="space-y-4">
                <h3 className="text-[19px] font-bold text-[#0f172a] leading-[1.2] font-figtree">
                    {data.title}
                </h3>
                <p className="text-[14px] text-slate-500 font-figtree font-medium leading-relaxed">
                    {data.description}
                </p>
            </div>
        </div>
    )
}

const coreValues = [
    {
        title: "Qualified Trainers",
        description: "Our greatest asset; highly experienced Trainers and well trained support staff who work as one team.",
        icon: <Users size={32} />
    },
    {
        title: "Efficient Methodology",
        description: "Compassionate and individualized Training with the right attitude in a safe and ambient environment.",
        icon: <Zap size={32} />
    },
    {
        title: "Best Facilities",
        description: "Advanced technology support in the Training industry to carry out day-to-day activities.",
        icon: <Monitor size={32} />
    },
    {
        title: "Innovation",
        description: "Committed to a supportive environment that encourages new ideas and creativity.",
        icon: <Lightbulb size={32} />
    },
    {
        title: "Excellence",
        description: "High standard of excellence and honesty in everything we deliver to our trainees.",
        icon: <Award size={32} />
    }
]

const missionObjectives = [
    {
        title: "Career Success",
        description: "Provide self-development and dynamic skills to help professionals and students succeed in their career and social objectives.",
        icon: <Rocket size={32} />
    },
    {
        title: "Accessible Education",
        description: "A venue where innovative teaching methodologies are available to all strata of communities at an economical rate.",
        icon: <Globe size={32} />
    },
    {
        title: "Subject Connection",
        description: "Unique and innovative approach that helps trainees and service users connect deeply with the subject matter.",
        icon: <Compass size={32} />
    }
]

export default function MissionVision() {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reveal-mv", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            })
        }, sectionRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="bg-[#fffbf5] pt-10 pb-20 md:pt-12 md:pb-24 font-figtree overflow-hidden">
            <div className="container-custom mx-auto px-6">

                {/* --- Vision Section --- */}
                <div className="mb-24">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12 reveal-mv">
                        <div className="space-y-4">
                            <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                                <Target size={14} /> Our Vision
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl">
                                Strategic Excellence in Training
                            </h2>
                        </div>
                        <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
                            Our vision is to mark our position as one of the Best Training centers in the region providing top quality training, focused on continuous service excellence and performance improvement.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 reveal-mv">
                        {coreValues.map((value, idx) => (
                            <SectionCard key={idx} data={value} />
                        ))}
                    </div>
                </div>

                {/* --- Mission Section --- */}
                <div>
                    <div className="flex flex-col lg:flex-row-reverse justify-between items-start lg:items-center gap-8 mb-12 reveal-mv">
                        <div className="space-y-4 text-left lg:text-right">
                            <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center justify-start lg:justify-end gap-2">
                                <Zap size={14} /> Our Mission
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl">
                                Empowering Human Talent
                            </h2>
                        </div>
                        <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
                            To ensure we have the best talents, latest technology and an ambient environment for our trainees to experience the true value of their training requirements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 reveal-mv">
                        {missionObjectives.map((obj, idx) => (
                            <SectionCard key={idx} data={obj} />
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}
