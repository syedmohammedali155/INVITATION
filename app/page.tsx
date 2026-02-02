'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-100%'])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6])

  // Audio setup
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(false)
      })
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      {/* ✅ Viewport meta tag for mobile scaling */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen w-full overflow-x-hidden relative">
        {/* Section 1: Background + Car + Dhol */}
        <section
          className="h-screen bg-cover bg-center relative overflow-hidden"
          style={{ backgroundImage: "url('/background.png')" }}
        >
          {/* Wedding Names (mobile par full zoom) */}
          <div className="absolute top-2 sm:top-6 md:top-10 left-1/2 transform -translate-x-1/2 z-30">
            <img src="/text.png" alt="Wedding Names"
              className="w-[100vw] sm:w-[85vw] md:w-[70vw] lg:w-[500px] xl:w-[600px]" />
          </div>

          {/* Dhol Players */}
          <motion.img
            src="/dhol-left.png"
            alt="Dhol Player Left"
            className="absolute bottom-0 left-2 w-[55vw] sm:w-[35vw] md:w-[25vw] lg:w-[250px] xl:w-[300px]"
            animate={{ y: [0, -20, 0], rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
          />
          <motion.img
            src="/dhol-right.png"
            alt="Dhol Player Right"
            className="absolute bottom-0 right-2 w-[55vw] sm:w-[35vw] md:w-[25vw] lg:w-[250px] xl:w-[300px]"
            animate={{ y: [0, -20, 0], rotate: [5, -5, 5] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
          />

          {/* Vintage Car */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20"
            style={{ y, scale }}
            transition={{ ease: "easeOut", duration: 1.2 }}
          >
            <img src="/car.png" alt="Vintage Car"
              className="w-[100vw] sm:w-[85vw] md:w-[75vw] lg:max-w-[1200px] xl:max-w-[1500px]" />
          </motion.div>
        </section>

        {/* Section 2: Canvas + Card + Flowers */}
        <section className="relative w-screen h-screen overflow-hidden">
          <motion.img
            src="/canvas.png"
            alt="Canvas Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Card */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img src="/card.png" alt="Wedding Invitation Card"
              className="w-[100vw] sm:w-[85vw] md:w-[70vw] lg:max-w-[1400px] xl:max-w-[1600px] object-contain" />
          </motion.div>

          {/* Flowers */}
          <motion.img
            src="/flower-left-bottom.png"
            alt="Flower Left Bottom"
            className="absolute bottom-0 left-0 w-[65vw] sm:w-[40vw] md:w-[30vw] lg:w-[500px] xl:w-[600px] z-20 pointer-events-none"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.img
            src="/flower-left-top.png"
            alt="Flower Left Top"
            className="absolute top-0 left-0 w-[55vw] sm:w-[35vw] md:w-[25vw] lg:w-[450px] xl:w-[550px] z-20 pointer-events-none"
            initial={{ opacity: 0, y: -100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.img
            src="/flower-right-top.png"
            alt="Flower Right Top"
            className="absolute top-0 right-0 w-[55vw] sm:w-[35vw] md:w-[25vw] lg:w-[450px] xl:w-[550px] z-20 pointer-events-none"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          />
        </section>

        {/* Section 3: Card Details */}
        <section className="relative w-screen h-screen overflow-hidden">
          <motion.img
            src="/canvas.png"
            alt="Canvas Background"
            className="absolute inset-0 w-full h-full object-cover z-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img src="/card1.png" alt="Wedding Invitation Card Details"
              className="w-[100vw] sm:w-[85vw] md:w-[70vw] lg:max-w-[1400px] xl:max-w-[1600px] object-contain" />
          </motion.div>
        </section>

        {/* Audio element */}
        <audio ref={audioRef} src="/song.mp3" loop />

        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="fixed top-4 right-4 bg-black text-white w-12 h-12 flex items-center justify-center rounded-full z-50 text-lg"
        >
          {isPlaying ? '⏸' : '▶️'}
        </button>
      </div>
    </>
  )
}