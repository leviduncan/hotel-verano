import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BedDouble, Maximize2, Users, Check, Wifi, Coffee, Bath, Wind, Tv, Shield, UtensilsCrossed, Star } from 'lucide-react'
import InquiryForm from '@/components/InquiryForm'
import RoomGallery from '@/components/rooms/RoomGallery'
import AvailabilityCalendar from '@/components/rooms/AvailabilityCalendar'
import { gqlClient } from '@/lib/graphql'
import { GET_ROOM_BY_SLUG } from '@/lib/queries/rooms'
import { adaptWPRoomDetail } from '@/lib/adapters'
import type { Room as WPRoom } from '@/lib/types/room'

const iconMap: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={20} />,
  Coffee: <Coffee size={20} />,
  Bath: <Bath size={20} />,
  Wind: <Wind size={20} />,
  Tv: <Tv size={20} />,
  Shield: <Shield size={20} />,
  UtensilsCrossed: <UtensilsCrossed size={20} />,
  Star: <Star size={20} />,
}

export default async function RoomDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const data = await gqlClient.request<{ roomBy: WPRoom | null }>(GET_ROOM_BY_SLUG, { slug })

  if (!data.roomBy) notFound()

  const room = adaptWPRoomDetail(data.roomBy)

  return (
    <main className="pt-20 lg:pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary">
            <li><Link href="/" className="hover:text-secondary-sand">Home</Link></li>
            <li className="before:content-['/'] before:mr-2"><Link href="/rooms" className="hover:text-secondary-sand">Rooms</Link></li>
            <li className="before:content-['/'] before:mr-2 text-primary-ink dark:text-dark-text-primary">{room.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-12">
            <RoomGallery images={room.images} />

            {/* Room Info */}
            <section className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="font-serif text-4xl lg:text-5xl text-primary-ink dark:text-dark-text-primary">{room.name}</h1>
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-2 text-sm text-text-slate dark:text-dark-text-secondary">
                      <BedDouble size={18} className="text-secondary-sand" />
                      <span>{room.bedType} Bed</span>
                    </div>
                    {room.sizeSqm > 0 && (
                      <div className="flex items-center gap-2 text-sm text-text-slate dark:text-dark-text-secondary">
                        <Maximize2 size={18} className="text-secondary-sand" />
                        <span>{room.sizeSqm} m²</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-text-slate dark:text-dark-text-secondary">
                      <Users size={18} className="text-secondary-sand" />
                      <span>Up to {room.capacity} guests</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary block">Starting from</span>
                  <span className="font-serif text-4xl text-secondary-sand">${room.pricePerNight}</span>
                  <span className="text-sm text-text-slate dark:text-dark-text-secondary"> / night</span>
                </div>
              </div>

              <div className="h-px bg-border-warm dark:border-dark-border w-full" />

              {room.longDescription && (
                <p className="text-lg leading-relaxed text-text-slate dark:text-dark-text-secondary">
                  {room.longDescription}
                </p>
              )}
            </section>

            {/* Amenities */}
            {room.amenities.length > 0 && (
              <section className="space-y-8">
                <h2 className="font-serif text-2xl text-primary-ink dark:text-dark-text-primary">Room Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {room.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-primary-ink dark:text-dark-text-primary">
                      <div className="text-secondary-sand">
                        {iconMap[amenity.icon] ?? <Check size={20} />}
                      </div>
                      <span>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Availability */}
            <section className="space-y-8">
              <h2 className="font-serif text-2xl text-primary-ink dark:text-dark-text-primary">Availability</h2>
              <AvailabilityCalendar bookedDates={room.availability.bookedDates} />
            </section>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <InquiryForm roomName={room.name} />

              <div className="mt-8 p-6 bg-accent-champagne/30 dark:bg-dark-surface/30 rounded-2xl border border-border-warm dark:border-dark-border">
                <h3 className="font-serif text-lg mb-4 text-primary-ink dark:text-dark-text-primary">Need Assistance?</h3>
                <p className="text-sm text-text-slate dark:text-dark-text-secondary mb-4">
                  Our concierge team is available 24/7 to help you with your booking or any special requests.
                </p>
                <div className="space-y-2">
                  <a href="tel:+15551234567" className="block text-sm font-bold text-primary-ink dark:text-dark-text-primary hover:text-secondary-sand">+1 (555) 123-4567</a>
                  <a href="mailto:concierge@grandverano.com" className="block text-sm font-bold text-primary-ink dark:text-dark-text-primary hover:text-secondary-sand">concierge@grandverano.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
