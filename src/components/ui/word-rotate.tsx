"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

interface WordRotateProps {
  words: string[]
  duration?: number
  motionProps?: MotionProps
  className?: string
}

// Adapted from Magic UI: renders inline spans so it can sit inside a heading.
export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: "-60%" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "60%" },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [words, duration])

  return (
    <span className="inline-flex overflow-hidden py-[0.12em] -my-[0.12em] align-bottom">
      <span className="sr-only">{words[0]}</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          aria-hidden="true"
          className={cn("inline-block", className)}
          {...motionProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
