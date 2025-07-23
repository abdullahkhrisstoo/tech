"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ContactFormProps {
  dict: any // Dictionary for localized text
  isRtl: boolean
}

export function ContactForm({ dict, isRtl }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Message sent! (Check console for data)")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">{dict.contact_section.name}</Label>
        <Input
          type="text"
          id="name"
          placeholder={dict.contact_section.name}
          value={formData.name}
          onChange={handleChange}
          required
          className={cn(
            isRtl ? "text-right" : "",
            "transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2",
          )}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">{dict.contact_section.email}</Label>
        <Input
          type="email"
          id="email"
          placeholder={dict.contact_section.email}
          value={formData.email}
          onChange={handleChange}
          required
          className={cn(
            isRtl ? "text-right" : "",
            "transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2",
          )}
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="message">{dict.contact_section.message}</Label>
        <Textarea
          id="message"
          placeholder={dict.contact_section.message}
          value={formData.message}
          onChange={handleChange}
          required
          className={cn(
            isRtl ? "text-right" : "",
            "transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2",
          )}
        />
      </div>
      <Button type="submit" className="w-full transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]">
        {dict.contact_section.send_message}
      </Button>
    </form>
  )
}
