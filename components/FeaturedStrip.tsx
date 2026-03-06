
import { Coffee, MapPin, Star } from 'lucide-react';
const FeaturedStrip = () => {
  return (
    <>
              <section className="bg-accent-champagne dark:bg-dark-surface py-12 lg:py-16 border-y border-border-warm dark:border-dark-border">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-dark-bg flex items-center justify-center text-secondary-sand shadow-sm">
                  <Star size={24} />
                </div>
                <h3 className="font-serif text-xl text-primary-ink dark:text-dark-text-primary">Flexible Check-In</h3>
                <p className="text-sm text-text-slate dark:text-dark-text-secondary">Arrive and depart on your schedule with our seamless concierge service.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-dark-bg flex items-center justify-center text-secondary-sand shadow-sm">
                  <Coffee size={24} />
                </div>
                <h3 className="font-serif text-xl text-primary-ink dark:text-dark-text-primary">Curated Amenities</h3>
                <p className="text-sm text-text-slate dark:text-dark-text-secondary">From Nespresso machines to pillow menus, every detail is considered.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-dark-bg flex items-center justify-center text-secondary-sand shadow-sm">
                  <MapPin size={24} />
                </div>
                <h3 className="font-serif text-xl text-primary-ink dark:text-dark-text-primary">Prime Location</h3>
                <p className="text-sm text-text-slate dark:text-dark-text-secondary">Located in the historic cultural district, steps away from the city's best.</p>
              </div>
            </div>
          </section>
    </>
  )
}

export default FeaturedStrip