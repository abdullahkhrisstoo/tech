"use client"

import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

export function AOSInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
      easing: "ease-out-cubic",
    })
  }, [])
  return null
}
