"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

export function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isFixed, setIsFixed] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(0)
  const indicatorRef = useRef<HTMLDivElement>(null)

  // Measure header height on mount and resize
  useEffect(() => {
    const headerEl = document.querySelector("header") // Assuming the header is the <header> tag
    if (headerEl) {
      setHeaderHeight(headerEl.offsetHeight)
    }

    const handleResize = () => {
      if (headerEl) {
        setHeaderHeight(headerEl.offsetHeight)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleScroll = useCallback(() => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const currentScroll = window.scrollY
    const progress = (currentScroll / totalHeight) * 100
    setScrollProgress(progress)

    // The indicator becomes fixed when the scroll position exceeds the header's height.
    // This means the header is already sticky at the top, and the indicator will appear below it.
    if (currentScroll > headerHeight) {
      setIsFixed(true)
    } else {
      setIsFixed(false)
    }
  }, [headerHeight])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    // Call once on mount to set initial state
    handleScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return (
    <>
      {/* Placeholder to prevent layout shift when the indicator becomes fixed */}
      {isFixed && <div style={{ height: "4px" }} aria-hidden="true" />} {/* Match indicator height */}
      <div
        ref={indicatorRef}
        className={cn(
          "h-1 w-full bg-muted transition-all duration-300 ease-in-out",
          isFixed ? "fixed z-40 shadow-md bg-background/90 backdrop-blur-sm" : "relative",
        )}
        style={isFixed ? { top: `${headerHeight}px` } : {}} // Dynamically set top when fixed
      >
        <div
          className={cn("h-full bg-primary transition-all duration-100 ease-out", "dark:bg-primary")}
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={scrollProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        />
      </div>
    </>
  )
}
