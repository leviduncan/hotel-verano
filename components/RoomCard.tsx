'use client'
import Link from 'next/link';
import Image from 'next/image';
import { Users, BedDouble, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Room } from '@/app/types';
import { cn } from '@/lib/utils';

interface RoomCardProps {
  room: Room;
  className?: string;
}

export default function RoomCard({ room, className }: RoomCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "group bg-white dark:bg-dark-surface rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border-warm dark:border-dark-border",
        className
      )}
    >
      <Link href={`/rooms/${room.slug}`} className="block relative aspect-[4/3] overflow-hidden">
        <Image
          src={room.images?.[0]?.src ?? '/images/placeholder.jpg'}
          alt={room.images?.[0]?.alt ?? room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {room.badge && (
          <div className={cn(
            "absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold text-white",
            room.badge === 'Available' ? "bg-success-forest" : room.badge === 'Limited' ? "bg-secondary-sand" : "bg-error-terracotta"
          )}>
            {room.badge}
          </div>
        )}
      </Link>

      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="font-serif text-xl text-primary-ink dark:text-dark-text-primary group-hover:text-secondary-sand transition-colors">
            {room.name}
          </h3>
          <div className="text-right">
            <span className="text-xs text-text-slate dark:text-dark-text-secondary uppercase tracking-wider block">From</span>
            <span className="font-serif text-xl text-secondary-sand">${room.pricePerNight}</span>
            <span className="text-xs text-text-slate dark:text-dark-text-secondary"> / night</span>
          </div>
        </div>

        <p className="text-sm text-text-slate dark:text-dark-text-secondary line-clamp-2 leading-relaxed">
          {room.shortDescription}
        </p>

        <div className="flex items-center gap-6 pt-2 border-t border-border-warm dark:border-dark-border">
          <div className="flex items-center gap-2 text-xs text-text-slate dark:text-dark-text-secondary">
            <BedDouble size={14} className="text-secondary-sand" />
            <span>{room.bedType}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-slate dark:text-dark-text-secondary">
            <Users size={14} className="text-secondary-sand" />
            <span>Up to {room.capacity} guests</span>
          </div>
        </div>

        <Link
          href={`/rooms/${room.slug}`}
          className="flex items-center justify-between w-full pt-4 text-sm font-semibold text-primary-ink dark:text-dark-text-primary group/link"
        >
          <span>View Details</span>
          <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
