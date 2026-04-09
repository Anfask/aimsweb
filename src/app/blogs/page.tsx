"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

const blogPosts = [
    { id: 1, title: "Mastering the OET: Tips from Top Instructors", date: "Oct 12, 2025", excerpt: "Learn the secrets to scoring high on the Occupational English Test with our expert guide.", category: "Exam Prep" },
    { id: 2, title: "Why Dubai is the Best Global Training Hub", date: "Nov 05, 2025", excerpt: "Exploring the growth of professional training centers in the UAE's most vibrant city.", category: "Education" },
    { id: 3, title: "IELTS Speaking: Five Common Mistakes to Avoid", date: "Dec 01, 2025", excerpt: "Avoid these frequent errors to boost your confidence and band score in IELTS Speaking.", category: "IELTS" },
    { id: 4, title: "The Future of Professional Career Development", date: "Jan 15, 2026", excerpt: "Staying ahead in 2026 with the most in-demand vocational and language skills.", category: "Career" },
]

export default function Blogs() {
    const blogsRef = useRef(null)

    useEffect(() => {
        gsap.from(".blog-header > *", {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
        })

        gsap.from(".blog-card", {
            scrollTrigger: {
                trigger: blogsRef.current,
                start: "top 80%",
            },
            scale: 0.95,
            opacity: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power2.out",
        })
    }, [])

    return (
        <div className="blogs-page font-figtree bg-slate-50 min-h-screen py-24 md:py-32">
            <div className="container px-6 mx-auto">
                <header className="blog-header text-center space-y-8 mb-20 md:mb-32">
                    <span className="inline-block px-4 py-2 bg-blue-600 text-white font-bold tracking-widest rounded-full uppercase text-xs">
                        Insights & Education
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-figtree font-extrabold text-slate-900 leading-tight">
                        Our Latest Blogs
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
                        Stay updated with the latest trends in professional training and language excellence.
                    </p>
                </header>

                <div ref={blogsRef} className="blogs-grid grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="blog-card group bg-white rounded-[40px] overflow-hidden border border-slate-200 hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-2xl">
                            <div className="blog-img aspect-video bg-slate-100 flex items-center justify-center text-blue-600 font-black text-3xl font-figtree group-hover:bg-blue-50 transition-colors">
                                {post.category}
                            </div>
                            <div className="blog-body p-10 md:p-16 space-y-6">
                                <div className="meta flex gap-6 text-sm font-semibold tracking-widest uppercase">
                                    <span className="text-blue-600">{post.category}</span>
                                    <span className="text-slate-400">{post.date}</span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold font-figtree text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-lg text-slate-600 font-light leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="read-more inline-block border-b-2 border-blue-600 pb-1 text-slate-900 font-black tracking-widest uppercase text-sm cursor-pointer hover:text-blue-600 transition-colors">
                                    Read Full Article
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    )
}
