'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const carY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const carScale = useTransform(scrollYProgress, [0, 1], [1, 0.88])

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    audio.paused
      ? (await audio.play(), setIsPlaying(true))
      : (audio.pause(), setIsPlaying(false))
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <main className="w-full overflow-x-hidden bg-black">

        {/* ================= HERO SECTION ================= */}
        <section
          ref={heroRef}
          className="relative w-full h-[85vh] md:min-h-screen overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/background.png')" }}
        >
          {/* BISMILLAH */}
          <div className="absolute top-2 md:top-4 left-1/2 -translate-x-1/2 z-30 w-full flex justify-center px-4">
            <img
              src="/text.png"
              className="w-full max-w-[520px] h-auto object-contain"
            />
          </div>

          {/* LEFT DHOL */}
          <motion.img
            src="/dhol-left.png"
            className="absolute bottom-0 left-0 w-[38vw] max-w-[280px] h-auto object-contain"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />

          {/* RIGHT DHOL */}
          <motion.img
            src="/dhol-right.png"
            className="absolute bottom-0 right-0 w-[38vw] max-w-[280px] h-auto object-contain"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />

          {/* CAR */}
          <motion.div
            className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 z-20 px-4 w-full flex justify-center"
            style={{ y: carY, scale: carScale }}
          >
            <img
              src="/car.png"
              className="w-full max-w-[95vw] md:max-w-[1200px] h-auto object-contain"
            />
          </motion.div>
        </section>

        {/* ================= CARD 1 ================= */}
        <section className="relative w-full py-10 flex justify-center overflow-hidden px-4">
          <img
            src="/canvas.png"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <motion.img
            src="/card.png"
            alt="Wedding Card"
            className="relative mx-auto max-w-full h-auto object-contain rounded-lg shadow-lg scale-105 md:scale-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </section>

        {/* ================= CARD 2 (DATE / CALENDAR) ================= */}
        <section className="relative w-full py-10 flex justify-center overflow-hidden px-4">
          <img
            src="/canvas.png"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <motion.img
            src="/card1.png"
            alt="Wedding Card 1"
            className="relative mx-auto max-w-full h-auto object-contain rounded-lg shadow-lg scale-105 md:scale-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        </section>

        {/* ================= AUDIO ================= */}
        <audio ref={audioRef} src="/song.mp3" loop />

        <button
          onClick={togglePlay}
          className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center"
        >
          {isPlaying ? '⏸' : '▶️'}
        </button>

      </main>
    </>
  )
}
