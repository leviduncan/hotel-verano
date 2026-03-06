'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/lib/utils'
import { Room } from '@/app/types'

interface RoomGalleryProps {
  images: Room['images']
}

export default function RoomGallery({ images }: RoomGalleryProps) {
  const [current, setCurrent] = useState(0)

  if (!images || images.length === 0) return null

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length)
  const next = () => setCurrent((i) => (i + 1) % images.length)

  return (
    <section className="relative aspect-video rounded-2xl overflow-hidden group shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[current].src}
            alt={images[current].alt}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
            referrerPolicy="no-referrer"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-dark-surface/90 flex items-center justify-center text-primary-ink opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-dark-surface/90 flex items-center justify-center text-primary-ink opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === current ? 'bg-secondary-sand w-6' : 'bg-white/50 w-2'
                )}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
