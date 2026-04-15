"use client"

import { GraduationCap, Briefcase, Users, Layout, BookOpen, Network, Rocket } from "lucide-react"

const features = [
    {
        icon: <Users className="text-blue-500" size={32} />,
        title: "Learn from Industry-Active Mentors",
        description: "Guidance from professionals who are active in their fields, not just classroom theory."
    },
    {
        icon: <Layout className="text-blue-500" size={32} />,
        title: "Experience Project-First Learning",
        description: "Work on real case studies and practical builds that mirror industry challenges."
    },
    {
        icon: <GraduationCap className="text-blue-500" size={32} />,
        title: "Hybrid Learning Model",
        description: "Flexible learning options including live interactive sessions and physical classroom training."
    },
    {
        icon: <BookOpen className="text-blue-500" size={32} />,
        title: "Cutting-Edge, Evolving Curriculum",
        description: "Our syllabus is updated regularly to match the latest tools, workflows, and market demands."
    },
    {
        icon: <Network className="text-blue-500" size={32} />,
        title: "Lifetime Access to Resources & Community",
        description: "Continue learning with access to updated content, alumni events, and mentor support forever."
    },
    {
        icon: <Briefcase className="text-blue-500" size={32} />,
        title: "Strong Placement Network & Partnerships",
        description: "We connect you with a network of enterprises and startups actively hiring talent."
    },
    {
        icon: <Rocket className="text-blue-500" size={32} />,
        title: "Skill-Based Excellence",
        description: "Focused training on high-demand professional skills to ensure your career-ready success."
    }
]

export default function WhyChooseAIMS() {
    return (
        <section className="bg-[#fffbf5] pt-10 pb-20 md:pt-12 md:pb-24 font-figtree overflow-hidden">
            <div className="container-custom mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#794d00] tracking-tight uppercase max-w-xl font-figtree">
                        Why Choose AIMS ?
                    </h2>
                    <p className="text-slate-600 text-lg max-w-xl font-figtree leading-relaxed">
                        Our programs combine hands-on projects, mentorship from industry experts, and the latest tools to prepare you for real-world success.
                    </p>
                </div>

                {/* Top Row: 4 Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {features.slice(0, 4).map((feature, i) => (
                        <div key={i} className="bg-white p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.01] duration-300 flex flex-col gap-6 min-h-[280px]">
                            <div className="text-[#a3e635]">
                                {feature.icon}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[19px] font-bold text-[#0f172a] leading-[1.2] font-figtree">
                                    {feature.title}
                                </h3>
                                <p className="text-[14px] text-slate-500 font-figtree font-medium leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Row: 3 Cards Centered */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                    {features.slice(4).map((feature, i) => (
                        <div key={i} className="bg-white p-8 rounded-[20px] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all hover:scale-[1.01] duration-300 flex flex-col gap-6 min-h-[280px]">
                            <div className="text-[#a3e635]">
                                {feature.icon}
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[19px] font-bold text-[#0f172a] leading-[1.2] font-figtree">
                                    {feature.title}
                                </h3>
                                <p className="text-[14px] text-slate-500 font-figtree font-medium leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
