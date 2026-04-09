"use client"

import { useState, useEffect } from "react"

import { Course, coursesData } from "@/data/courses"

export function useCourse(id: string) {
    const [course, setCourse] = useState<Course | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulating API fetch
        setLoading(true)
        const timer = setTimeout(() => {
            setCourse(coursesData[id] || null)
            setLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [id])

    return { course, loading }
}

export function useCourses() {
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulating API fetch
        setLoading(true)
        const timer = setTimeout(() => {
            setCourses(Object.values(coursesData))
            setLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    return { courses, loading }
}
