'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import HeroImg from '@/public/images/hero.webp'

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={HeroImg}
          alt="The Grand Verano Hotel Exterior"
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary-ink/70 via-primary-ink/50 to-primary-ink/80" />
        <div className="grain-overlay" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs lg:text-sm uppercase tracking-[0.3em] text-secondary-sand font-bold mb-6 block"
        >
          Boutique Luxury · Since 1987
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-serif text-white text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 tracking-tight"
        >
          Where Every Stay <br className="hidden md:block" /> Becomes a Story
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-accent-champagne text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A sanctuary of warmth and elegance in the heart of the city.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/rooms"
            className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3"
          >
            View Our Rooms <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
