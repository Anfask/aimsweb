"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GraduationCap, Clock, Briefcase, BookOpen } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Custom hook for scramble/count-up effect
function useCountUp(end: string, duration: number = 2, triggerRef?: React.RefObject<HTMLElement | null>) {
    const [count, setCount] = useState("0")
    const countRef = useRef<HTMLSpanElement>(null)
    const endValue = parseInt(end.replace(/,/g, ''))
    const targetStr = end

    useEffect(() => {
        const triggerElement = triggerRef?.current || countRef.current
        if (!triggerElement) return

        const obj = { value: 0 }
        const scrambleChars = "0123456789"
        
        // Use global gsap if available (from CDN), fallback to imported one
        const activeGsap = (window as any).gsap || gsap

        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top 85%",
            onEnter: () => {
                activeGsap.to(obj, {
                    value: endValue,
                    duration: duration,
                    ease: "power2.out",
                    onUpdate: () => {
                        const progress = obj.value / endValue
                        let result = ""
                        
                        for (let i = 0; i < targetStr.length; i++) {
                            const char = targetStr[i]
                            
                            if (char === ",") {
                                // Commas appear once progress is past their position
                                result += progress > (i / targetStr.length) ? "," : scrambleChars[Math.floor(Math.random() * 10)]
                                continue
                            }

                            // Locking threshold - numbers lock from left to right
                            // We delay the locking to make the scramble very obvious
                            const lockThreshold = (i / targetStr.length) * 0.7 
                            
                            if (progress < lockThreshold) {
                                // High-speed scramble for this position
                                result += scrambleChars[Math.floor(Math.random() * 10)]
                            } else {
                                // Locked to final digit
                                result += char
                            }
                        }
                        setCount(result)
                    },
                    onComplete: () => {
                        setCount(targetStr)
                    }
                })
            },
            once: true
        })
    }, [endValue, duration, targetStr, triggerRef])

    return { count, countRef }
}

function StatItem({ icon, endValue, label, triggerRef }: { icon: React.ReactNode, endValue: string, label: string, triggerRef: React.RefObject<HTMLElement | null> }) {
    const { count, countRef } = useCountUp(endValue, 2, triggerRef)
    
    return (
        <div className="flex flex-col items-center justify-center p-8 lg:p-12 text-center group perspective-1000">
            {/* Multi-Layered Jewel Icon Container */}
            <div className="relative mb-8 flex items-center justify-center">
                {/* Background Glow Pulse */}
                <div className="absolute inset-0 bg-[#794d00]/10 blur-2xl rounded-full scale-110 group-hover:bg-[#794d00]/20 group-hover:scale-150 transition-all duration-1000 animate-pulse"></div>
                
                {/* Diamond Jewel Outer (Floating) */}
                <div className="relative w-16 h-16 transform rotate-45 group-hover:rotate-[225deg] transition-all duration-[1.5s] ease-in-out">
                    {/* Layer 1: Glass Base */}
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-[0_4px_24px_rgba(121,77,0,0.08)]"></div>
                    
                    {/* Layer 2: Inner Glow & Gloss */}
                    <div className="absolute inset-[2px] bg-gradient-to-br from-orange-50/50 to-transparent rounded-[14px]"></div>
                </div>

                {/* Centered Icon with 3D Lift */}
                <div className="absolute text-[#794d00] group-hover:text-blue-500 group-hover:scale-110 transition-all duration-700 z-20">
                    {icon}
                </div>
            </div>
            
            <div className="space-y-1 transform-gpu group-hover:translate-z-10 transition-transform duration-700">
                <span ref={countRef} className="text-4xl lg:text-5xl font-semibold text-[#794d00] tracking-tighter tabular-nums drop-shadow-sm">
                    {count}
                </span>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#0f172a]/70 whitespace-nowrap">
                    {label}
                </p>
            </div>
        </div>
    )
}

export default function Stats() {
    const containerRef = useRef<HTMLDivElement>(null)

    const stats = [
        { icon: <GraduationCap size={28} />, number: "10,960", label: "Students Trained" },
        { icon: <Clock size={28} />, number: "150,000", label: "Training Hours" },
        { icon: <Briefcase size={28} />, number: "48,000", label: "Corporate" },
        { icon: <BookOpen size={28} />, number: "120", label: "Courses Offered" }
    ]

    return (
        <section ref={containerRef} className="py-24 bg-[#fffbf5] relative overflow-hidden font-figtree">
            {/* Soft Ambient Glow Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200%] bg-gradient-to-b from-orange-100/20 via-transparent to-transparent rotate-12 blur-[120px] pointer-events-none"></div>

            <div className="container-custom relative z-10 mx-auto px-6">
                {/* Single Unified Dashboard Box */}
                <div ref={containerRef} className="mx-auto max-w-6xl relative group">
                    {/* Glowing Outline */}
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-transparent via-[#794d00]/20 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    
                    {/* Unified Glass Container */}
                    <div className="relative bg-white/50 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_8px_40px_rgba(121,77,0,0.05)] hover:shadow-[0_20px_80px_rgba(121,77,0,0.12)] transition-all duration-1000 overflow-hidden">
                        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100/80">
                            {stats.map((stat, index) => (
                                <StatItem 
                                    key={index} 
                                    icon={stat.icon} 
                                    endValue={stat.number} 
                                    label={stat.label} 
                                    triggerRef={containerRef}
                                />
                            ))}
                        </div>
                        
                        {/* Interactive Accent Bar */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#794d00]/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
