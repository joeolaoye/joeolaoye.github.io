// Home — composed from the Figma Make design ported under src/figma/.
// Real portfolio content sourced from src/figma/content.ts; design CSS lives at src/styles/design.css.

import { useEffect } from 'react'
import { About, BuilderOS, Contact, Footer, Hero, Nav, Projects, Ticker, Writing } from '@/figma/Sections'

export default function Index() {
  // The design owns the page background; ensure the dark canvas sits behind everything.
  useEffect(() => {
    const prev = document.body.style.background
    document.body.style.background = 'var(--bg, #07080b)'
    return () => { document.body.style.background = prev }
  }, [])

  return (
    <>
      <div className="bg-fixed" aria-hidden="true">
        <div className="bg-grid"></div>
        <div className="bg-glow-1"></div>
        <div className="bg-glow-2"></div>
        <div className="bg-noise"></div>
      </div>

      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Projects />
      <BuilderOS />
      <Writing />
      <Contact />
      <Footer />
    </>
  )
}
