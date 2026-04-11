"use client"

import Link from "next/link"
import { PlayCircle, Star, ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"
import { getGoogleRating } from "@/data/googleReviews"
import { Whatsapp } from "@/components/BrandIcons"

export default function Hero() {
    const [reviewData, setReviewData] = useState({ rating: "4.9", totalReviews: "1000+" })

    useEffect(() => {
        getGoogleRating().then(setReviewData).catch(console.error)
    }, [])
    return (
        <section className="relative bg-[#fffbf5] pt-32 lg:pt-40 pb-4 lg:pb-8 font-figtree overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 w-full">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">

                    {/* Left Content Area */}
                    <div className="flex flex-col items-start gap-8 z-10 w-full max-w-2xl">

                        {/* Headline */}
                        <h1 className="font-extrabold text-slate-900 leading-[1.1] tracking-tight text-4xl sm:text-5xl xl:text-[60px]">
                            Education is the best<br className="hidden md:block" />
                            way to <span className="text-[#794d00]">Grow Up Your<br className="hidden xl:block" />
                                Knowledge</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-slate-500 text-base sm:text-lg font-medium leading-[1.6] max-w-[500px]">
                            Our platform makes education flexible and convenient,
                            so you can achieve your goals wherever and whenever
                            you choose.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-8 mt-2">
                            <Link
                                href="/courses"
                                className="bg-[#794d00] text-white px-10 py-4 rounded-2xl font-bold text-[17px] transition-all hover:bg-[#1e2a3b] hover:text-blue-500 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#794d00]/20 flex-shrink-0 w-full sm:w-auto text-center border-t border-white/20"
                            >
                                Enroll Now
                            </Link>

                            <button className="group flex items-center gap-3 text-[#794d00] font-bold text-[17px] hover:opacity-80 transition-opacity">
                                <PlayCircle size={32} strokeWidth={2} className="fill-[#794d00]/10 group-hover:scale-110 transition-transform" />
                                Learn More
                            </button>
                        </div>

                        {/* Social Proof / Google Reviews */}
                        <a
                            href={`https://search.google.com/local/reviews?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'ChIJH1GPIFlmXj4RGXfJA5vymIo'}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 mt-8 px-6 py-4 bg-white rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.02] hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-200/60 group cursor-pointer"
                        >
                            {/* Google G Logo SVG */}
                            <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-300">
                                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                                </g>
                            </svg>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-[#0f172a] text-[15px] leading-none">{reviewData.rating}</span>
                                    <div className="flex gap-[2px]">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={13} className="fill-amber-400 text-amber-400" />)}
                                    </div>
                                </div>
                                <span className="text-[11px] text-slate-500 font-medium group-hover:text-[#794d00] transition-colors uppercase tracking-widest">
                                    Read {reviewData.totalReviews} Reviews
                                </span>
                            </div>
                        </a>

                    </div>

                    {/* Right Image Area */}
                    <div className="relative w-full flex justify-center lg:justify-end">

                        {/* Main Composite Image */}
                        <div className="relative w-full max-w-[600px] xl:max-w-[700px] z-0 mt-10 lg:mt-0">
                            <img
                                src="/images/brown-hero-student.png"
                                alt="Student growing knowledge"
                                className="w-full h-auto object-contain mix-blend-darken"
                            />

                            {/* Floating Card 1 (UI Design Class) */}
                            <div className="absolute top-[65%] left-0 sm:-left-4 xl:-left-12 bg-white/98 backdrop-blur-xl px-4 py-4 rounded-[20px] shadow-[0_24px_50px_-12px_rgba(121,77,0,0.2)] flex flex-col gap-4 min-w-[200px] animate-float border border-[#794d00]/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-[42px] h-[42px] rounded-full bg-[#25D366] flex items-center justify-center shadow-sm shrink-0">
                                        <Whatsapp size={24} stroke="white" />
                                    </div>
                                    <div className="flex flex-col justify-center gap-0.5">
                                        <span className="font-bold text-[14px] text-slate-900 leading-tight">Free webinars & Courses</span>
                                        <span className="text-[12px] font-medium text-slate-500">Join Our Community</span>
                                    </div>
                                </div>
                                <a
                                    href="https://chat.whatsapp.com/EuN3RJA0u8y4hexHboUlMQ"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-[#794d00] text-center text-white text-[13px] font-bold py-2.5 rounded-xl hover:bg-[#1e2a3b] hover:text-blue-500 transition-all shadow-md shadow-[#794d00]/20 block"
                                >
                                    Join now
                                </a>
                            </div>

                            {/* Floating Card 2 (200+ Courses) */}
                            <div className="absolute top-[45%] right-0 sm:right-0 xl:-right-6 bg-white/98 backdrop-blur-xl pl-3 pr-6 py-3 rounded-full shadow-[0_24px_40px_-12px_rgba(121,77,0,0.15)] flex items-center gap-4 animate-float-delayed border border-[#794d00]/5">
                                <div className="w-12 h-12 rounded-full bg-[#794d00] flex items-center justify-center text-white shrink-0 shadow-inner">
                                    <ArrowUpRight size={22} strokeWidth={2.5} />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="font-bold text-[17px] text-slate-900 leading-[1.1]">200+</span>
                                    <span className="text-[14px] font-semibold text-slate-500">Online & Offline Courses</span>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}