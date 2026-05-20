"use client"

import { useState, useEffect } from "react"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("cookie-consent") !== "accepted") {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  function accept() {
    localStorage.setItem("cookie-consent", "accepted")
    setVisible(false)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#1A1A1A] shadow-[0_-2px_8px_rgba(0,0,0,0.3)] px-4 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
        <p className="text-[#FAFAFA] text-sm flex-1 text-center sm:text-left">
          Usamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política de privacidade.
        </p>
        <button
          onClick={accept}
          className="shrink-0 bg-[#C5A059] text-[#1A1A1A] font-semibold text-sm px-5 py-2 rounded-[var(--radius)] hover:bg-[#D4B87A] transition-colors cursor-pointer border-0"
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}
