import { gqlClient } from '@/lib/graphql'
import { GET_FEATURED_ROOMS } from '@/lib/queries/rooms'
import { adaptWPRoom } from '@/lib/adapters'
import type { Room as WPRoom } from '@/lib/types/room'
import HeroSection from '@/components/HeroSection'
import BentoGrid from '@/components/BentoGrid'
import FeaturedStrip from '@/components/FeaturedStrip'
import TrustSection from '@/components/TrustSection'

export default async function Page() {
  const data = await gqlClient.request<{ rooms: { nodes: WPRoom[] } }>(GET_FEATURED_ROOMS)
  const rooms = data.rooms.nodes.map(adaptWPRoom)

  return (
    <main id="main-content">
      <HeroSection />
      {/* Features Strip */}
      <FeaturedStrip />
      <section className="py-24 px-6 lg:px-12 bg-bg-ivory dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-secondary-sand font-bold">
              Accommodations
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl text-primary-ink dark:text-dark-text-primary">
              Our Featured Rooms
            </h2>
          </div>


          {/* Featured Rooms */}
          <BentoGrid rooms={rooms} />
        </div>
      </section>
      {/* Trust Section */}
      <TrustSection />
    </main>
  )
}
