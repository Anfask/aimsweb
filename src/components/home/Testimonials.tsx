"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Star, BadgeCheck, MessageCircle, ArrowRight } from "lucide-react"
import { getGoogleRating } from "@/data/googleReviews"

gsap.registerPlugin(ScrollTrigger)

interface ReviewData {
    text: string
    author: string
    avatar: string | null
    verified: boolean
    stars: number
    relativeTime?: string
}
// The component is strictly dynamic and tied to Google's API payload.
// We display exactly 4 reviews to maintain a perfect single-line uniform grid.

function GoogleLogo({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    )
}

function ReviewStars({ rating = 5 }: { rating?: number }) {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className={i < rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
            ))}
        </div>
    )
}

function ReviewCard({ data }: { data: ReviewData }) {
    const initials = data.author
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()

    const isLong = data.text.length > 200
    const displayText = isLong ? data.text.substring(0, 200) + "..." : data.text

    return (
        <div
            className="group relative bg-white rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.01] overflow-hidden"
        >
            {/* Google colour bar on hover */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-red-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Top row */}
            <div className="flex items-center justify-between z-10 relative">
                <ReviewStars rating={data.stars} />
                <GoogleLogo className="w-4 h-4 opacity-25 group-hover:opacity-60 transition-opacity" />
            </div>

            {/* Review text */}
            <div className="flex-1 z-10 relative">
                <p className="text-[14px] text-slate-500 font-medium leading-relaxed">
                    &ldquo;{displayText}&rdquo;
                    {isLong && (
                        <a
                            href={`https://search.google.com/local/reviews?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'ChIJH1GPIFlmXj4RGXfJA5vymIo'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 font-bold text-slate-400 hover:text-[#794d00] transition-colors text-[13px] uppercase tracking-wide inline-block"
                        >
                            Read More
                        </a>
                    )}
                </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-3 border-t border-slate-50">
                <div className="w-9 h-9 rounded-full bg-[#fffbf5] border border-[#794d00]/10 flex items-center justify-center text-[#794d00] font-black text-sm shrink-0 overflow-hidden">
                    {data.avatar && data.avatar.startsWith("http") ? (
                        <img src={data.avatar} alt={data.author} className="w-full h-full object-cover" />
                    ) : (
                        initials
                    )}
                </div>
                <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#0f172a] text-sm truncate">{data.author}</span>
                        {data.verified && (
                            <BadgeCheck size={13} className="text-amber-400 fill-amber-400 shrink-0" />
                        )}
                    </div>
                    {data.relativeTime && (
                        <span className="text-[10px] text-slate-400 font-medium">{data.relativeTime}</span>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function Testimonials() {
    const sectionRef = useRef<HTMLElement>(null)
    const [reviews, setReviews] = useState<ReviewData[]>([])
    const [reviewData, setReviewData] = useState({ rating: "4.9", totalReviews: "1000+" })

    useEffect(() => {
        // Fetch rating stats
        getGoogleRating().then(setReviewData).catch(console.error)

        // Fetch reviews client-side via the API — server actions cannot be called from client
        const fetchReviews = async () => {
            try {
                const res = await fetch("/api/reviews")
                if (!res.ok) return
                const data = await res.json()
                if (Array.isArray(data) && data.length > 0) {
                    const filteredReviews = data
                        .filter((r: ReviewData) => r.stars >= 3)
                        .sort((a, b) => b.stars - a.stars)
                        .slice(0, 13)

                    if (filteredReviews.length > 0) {
                        setReviews(filteredReviews)
                    }
                }
            } catch {
                // Return silently on error
            }
        }
        fetchReviews()

        // Animate header immediately
        const ctx = gsap.context(() => {
            gsap.from(".t-header", {
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                clearProps: "all",
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    // Animate review cards AFTER reviews load into state
    useEffect(() => {
        if (reviews.length === 0) return
        // rAF ensures the DOM nodes are committed before GSAP scans
        const raf = requestAnimationFrame(() => {
            const ctx = gsap.context(() => {
                gsap.from(".review-card-wrap", {
                    scrollTrigger: { trigger: ".reviews-grid", start: "top 85%" },
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    stagger: 0.05,
                    ease: "power2.out",
                    clearProps: "all",
                })
            }, sectionRef)
            return () => ctx.revert()
        })
        return () => cancelAnimationFrame(raf)
    }, [reviews])

    const displayReviews = reviews.slice(0, 4)

    return (
        <section
            ref={sectionRef}
            className="pt-10 pb-20 md:pt-12 md:pb-24 bg-[#fffbf5] font-figtree overflow-hidden border-t border-slate-100/50"
        >
            <div className="container-custom mx-auto px-6">

                {/* ── Header ── */}
                <div className="t-header flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
                    <div className="space-y-4">
                        <span className="text-[#794d00] font-bold tracking-widest text-xs uppercase flex items-center gap-2">
                            <MessageCircle size={14} className="text-blue-500" /> Student Success
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl leading-tight">
                            Our Community&apos;s <span className="text-slate-900">Success Stories.</span>
                        </h2>
                    </div>

                    {/* Google badge */}
                    <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50">
                        <GoogleLogo className="w-6 h-6" />
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-[#0f172a] text-sm">{reviewData.rating}</span>
                                <ReviewStars rating={Math.round(Number(reviewData.rating)) || 5} />
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                                Read {reviewData.totalReviews} Reviews
                            </span>
                        </div>
                    </div>
                </div>

                {/* ── Lunchbox Grid ── */}
                <div className="reviews-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayReviews.map((review, i) => (
                        <div key={i} className="review-card-wrap">
                            <ReviewCard data={review} />
                        </div>
                    ))}
                </div>

                {/* ── Footer bar ── */}
                <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-100/50">
                    <div className="flex items-center gap-3 text-[#794d00] font-bold text-xs tracking-widest uppercase">
                        <MessageCircle size={18} className="text-blue-500" />
                        Thousands of trusted student opinions
                    </div>
                    <a
                        href={`https://search.google.com/local/reviews?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'ChIJH1GPIFlmXj4RGXfJA5vymIo'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 text-[10px] font-black tracking-widest uppercase text-[#794d00] hover:text-slate-900 transition-colors"
                    >
                        Read More Reviews
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

            </div>
        </section>
    )
}
