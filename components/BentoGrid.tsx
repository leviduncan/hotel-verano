'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Room } from '../app/types';

interface BentoGridProps {
  rooms: Room[];
}

export default function BentoGrid({ rooms }: BentoGridProps) {
  const featured = rooms.filter(r => r.featured).slice(0, 3);

  if (featured.length < 3) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[300px] lg:auto-rows-[260px]">
      {/* Large Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lg:col-span-2 lg:row-span-2 relative group overflow-hidden rounded-2xl"
      >
        <Image
          src={featured[0].images?.[0]?.src ?? '/images/placeholder.jpg'}
          alt={featured[0].images?.[0]?.alt ?? featured[0].name}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-ink/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <span className="text-xs uppercase tracking-widest text-secondary-sand font-bold mb-2 block">Featured Suite</span>
          <h3 className="font-serif text-3xl lg:text-4xl mb-4">{featured[0].name}</h3>
          <p className="text-white/80 max-w-md mb-6 hidden md:block">{featured[0].shortDescription}</p>
          <Link href={`/rooms/${featured[0].slug}`} className="btn-primary inline-flex items-center gap-2">
            Explore Suite <ArrowRight size={18} />
          </Link>
        </div>
      </motion.div>

      {/* Smaller Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="relative group overflow-hidden rounded-2xl"
      >
        <Image
          src={featured[1].images?.[0]?.src ?? '/images/placeholder.jpg'}
          alt={featured[1].images?.[0]?.alt ?? featured[1].name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-ink/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="font-serif text-xl mb-2">{featured[1].name}</h3>
          <Link href={`/rooms/${featured[1].slug}`} className="text-sm text-secondary-sand font-semibold hover:underline">View Details →</Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="relative group overflow-hidden rounded-2xl"
      >
        <Image
          src={featured[2].images?.[0]?.src ?? '/images/placeholder.jpg'}
          alt={featured[2].images?.[0]?.alt ?? featured[2].name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-ink/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h3 className="font-serif text-xl mb-2">{featured[2].name}</h3>
          <Link href={`/rooms/${featured[2].slug}`} className="text-sm text-secondary-sand font-semibold hover:underline">View Details →</Link>
        </div>
      </motion.div>
    </div>
  );
}
