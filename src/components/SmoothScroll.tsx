"use client"

import { ReactNode, useEffect, useRef } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        })

        lenisRef.current = lenis

        // Connect Lenis to ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update)

        // Integrated GSAP ticker
        const update = (time: number) => {
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(update)
        gsap.ticker.lagSmoothing(0)

        // Clean up
        return () => {
            lenis.destroy()
            gsap.ticker.remove(update)
            lenisRef.current = null
        }
    }, [])

    // Handle Route Changes
    useEffect(() => {
        if (lenisRef.current) {
            // Reset scroll to top on page change
            lenisRef.current.scrollTo(0, { immediate: true })
            
            // Give Next.js a moment to render then refresh ScrollTrigger
            setTimeout(() => {
                ScrollTrigger.refresh()
            }, 100)
        }
    }, [pathname, searchParams])

    return <>{children}</>
}
