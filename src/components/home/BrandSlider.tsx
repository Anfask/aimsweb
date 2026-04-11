"use client"

import React, { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { Wind } from "lucide-react"

const logos = [
    { name: "Abu Dhabi International Marine Sports Club", path: "/logo/ABU DHABI INTERNtional mRINE SPORTS CLUB LOGO HD.png" },
    { name: "ACTEVET", path: "/logo/ACTEVET LOGO PNG.png" },
    { name: "Adeka Al Ghurair", path: "/logo/ADEKA AL GHURUAIR ADDITIVES LOGO HD.png" },
    { name: "Al Masaood Oil", path: "/logo/AL MASAOOD OIL AS LOGO HD.png" },
    { name: "AN ADS Company", path: "/logo/AN ADS COMPANY.png" },
    { name: "Arabtec", path: "/logo/ARABTEC LOG HD.png" },
    { name: "ATGC", path: "/logo/ATGC TRANSORT AND GENERAL CONTRACTING LLC LOGO.png" },
    { name: "Arkan Architects", path: "/logo/Arkan architets consultants uae logo hd.png" },
    { name: "EDIC", path: "/logo/EDIC LOGO.png" },
    { name: "Eltizam", path: "/logo/ELTIZAM LOGO.png" },
    { name: "Emdad", path: "/logo/EMDAD LOGO HD.png" },
    { name: "Emirates Landscape", path: "/logo/EMIRATES LANDSCAPE KLOGO HD.png" },
    { name: "FedEx", path: "/logo/FEDEX LOGO.png" },
    { name: "Investcorp", path: "/logo/INVESTCORP LOGO HD.png" },
    { name: "Nael General Contracting", path: "/logo/NAEL GENERAL CONTRACTING GROUP.png" },
    { name: "NBHH", path: "/logo/NBHH LOGO HD.png" },
    { name: "NMDC", path: "/logo/NMDC LOGO UAE LOGO.png" },
    { name: "Tamas", path: "/logo/TAMAS LOGO UAE.png" },
    { name: "Tecon", path: "/logo/TECON.png" },
    { name: "Target", path: "/logo/Target logo.png" },
    { name: "Abu Dhabi Terminals", path: "/logo/abu dhabi terminals logo hd.png" },
    { name: "ADVETI", path: "/logo/abu dhabi vocational education and training institute long hd.png" },
    { name: "Al Masaood", path: "/logo/al masaood.png" },
    { name: "Altorath", path: "/logo/altorath international engineering consultants LOGO HD.png" },
    { name: "Ansaldo Energia", path: "/logo/ansaldo energia LOGO HD.png" },
    { name: "Cleveland Clinic", path: "/logo/cleveland clinic abu dhabi logo hd.png" },
    { name: "Etihad Airways Engineering", path: "/logo/ethihad aiwAYS ENGINEERING LOGO.png" },
    { name: "Inspire Integrated", path: "/logo/inspire integrated LOGO HD.png" },
    { name: "Marriott", path: "/logo/marriott logo.png" },
    { name: "Sharjah Airport", path: "/logo/sharjah airport LOGO HD.png" },
    { name: "Sohar Port", path: "/logo/sohar port free zone LOGO UAE.png" },
    { name: "St Regis", path: "/logo/st regis abu dhabi LOGO.png" },
    { name: "Yas Marina Circuit", path: "/logo/yas marina circuit.png" },
]

const BrandSlider = () => {
    const row1Ref = useRef<HTMLDivElement>(null)
    const row2Ref = useRef<HTMLDivElement>(null)

    // Split logos into two rows: 17 and 16
    const row1Logos = logos.slice(0, 17)
    const row2Logos = logos.slice(17)

    useEffect(() => {
        const createAnimation = (rowRef: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
            if (!rowRef.current) return
            
            const slider = rowRef.current
            const sliderContent = slider.firstChild as HTMLElement
            if (!sliderContent) return

            // Clone for infinite scroll
            const clone = sliderContent.cloneNode(true)
            slider.appendChild(clone)

            const totalWidth = sliderContent.offsetWidth
            
            const animation = gsap.fromTo(slider.children, 
                { x: direction === "left" ? 0 : -totalWidth },
                {
                    x: direction === "left" ? -totalWidth : 0,
                    duration: 60,
                    repeat: -1,
                    ease: "none",
                }
            )

            const handleMouseEnter = () => animation.pause()
            const handleMouseLeave = () => animation.play()

            slider.addEventListener("mouseenter", handleMouseEnter)
            slider.addEventListener("mouseleave", handleMouseLeave)

            return { animation, slider, handleMouseEnter, handleMouseLeave }
        }

        const row1 = createAnimation(row1Ref, "left")
        const row2 = createAnimation(row2Ref, "right")

        return () => {
            if (row1) {
                row1.animation.kill()
                row1.slider.removeEventListener("mouseenter", row1.handleMouseEnter)
                row1.slider.removeEventListener("mouseleave", row1.handleMouseLeave)
            }
            if (row2) {
                row2.animation.kill()
                row2.slider.removeEventListener("mouseenter", row2.handleMouseEnter)
                row2.slider.removeEventListener("mouseleave", row2.handleMouseLeave)
            }
        }
    }, [])

    const LogoRow = ({ items, rowRef }: { items: typeof logos, rowRef: React.RefObject<HTMLDivElement | null> }) => (
        <div className="relative flex whitespace-nowrap overflow-hidden mb-12">
            <div 
                ref={rowRef}
                className="flex gap-12 items-center"
            >
                <div className="flex gap-12 items-center shrink-0">
                    {items.map((logo, index) => (
                        <div 
                            key={index} 
                            className="w-32 md:w-48 h-20 md:h-24 relative grayscale hover:grayscale-0 transition-all duration-500 opacity-40 hover:opacity-100 cursor-pointer flex items-center justify-center p-3 hover:scale-110 active:scale-95"
                        >
                            <Image
                                src={logo.path}
                                alt={logo.name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 128px, 192px"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <section className="py-24 md:py-32 bg-[#fffbf5] font-figtree border-t border-slate-100/50 overflow-hidden relative">
            <div className="container-custom mx-auto px-6 mb-20">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                    <div className="space-y-4">
                        <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                            <Wind size={14} className="text-blue-500" /> Strategic Partners
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-2xl leading-tight">
                            Trusted by <span className="text-slate-900">Industry Leaders.</span>
                        </h2>
                    </div>
                    <p className="text-slate-600 text-lg max-w-xl leading-relaxed">
                        Collaborating with world-class organizations to deliver professional excellence and certified training benchmarks across the globe.
                    </p>
                </div>
            </div>

            <div className="max-w-[100vw] relative">
                {/* Row 1: Scrolling Left */}
                <LogoRow items={row1Logos} rowRef={row1Ref} />
                
                {/* Row 2: Scrolling Right */}
                <LogoRow items={row2Logos} rowRef={row2Ref} />

                {/* Seamless Edge Fades */}
                <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#fffbf5] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#fffbf5] to-transparent z-10 pointer-events-none" />
            </div>
        </section>
    )
}

export default BrandSlider
