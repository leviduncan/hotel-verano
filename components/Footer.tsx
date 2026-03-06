import Link from 'next/link'
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bg-ivory dark:bg-primary-ink text-primary-ink dark:text-dark-text-primary py-16 px-6 lg:px-12 border-t border-border-warm dark:border-transparent">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Hotel Info */}
        <div className="space-y-6">
          <h2 className="font-serif text-2xl tracking-tight">THE GRAND VERANO</h2>
          <p className="text-text-slate dark:text-dark-text-secondary text-sm leading-relaxed max-w-xs">
            A sanctuary of warmth and elegance. Where every stay becomes a story worth telling.
          </p>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-text-slate dark:text-dark-text-secondary">
              <MapPin size={16} className="text-secondary-sand" />
              <span>123 Via della Cultura, Grand City</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-text-slate dark:text-dark-text-secondary">
              <Phone size={16} className="text-secondary-sand" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-text-slate dark:text-dark-text-secondary">
              <Mail size={16} className="text-secondary-sand" />
              <span>hello@grandverano.com</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-serif text-lg mb-6">Quick Links</h3>
          <ul className="space-y-4">
            <li><Link href="/" className="text-sm text-text-slate dark:text-dark-text-secondary hover:text-secondary-sand transition-colors">Home</Link></li>
            <li><Link href="/rooms" className="text-sm text-text-slate dark:text-dark-text-secondary hover:text-secondary-sand transition-colors">Rooms & Suites</Link></li>
            <li><Link href="/contact" className="text-sm text-text-slate dark:text-dark-text-secondary hover:text-secondary-sand transition-colors">Contact Us</Link></li>
            <li><Link href="/about" className="text-sm text-text-slate dark:text-dark-text-secondary hover:text-secondary-sand transition-colors">Our Story</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-serif text-lg mb-6">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full border border-border-warm dark:border-white/10 flex items-center justify-center hover:bg-secondary-sand hover:text-primary-ink transition-all" aria-label="Follow us on Instagram">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-border-warm dark:border-white/10 flex items-center justify-center hover:bg-secondary-sand hover:text-primary-ink transition-all" aria-label="Follow us on Facebook">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-serif text-lg mb-6">Newsletter</h3>
          <p className="text-sm text-text-slate dark:text-dark-text-secondary mb-4">Subscribe to receive exclusive offers and updates.</p>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-white dark:bg-white/5 border border-border-warm dark:border-white/10 rounded-sm px-4 py-2 text-sm focus:outline-none focus:border-secondary-sand transition-colors"
            />
            <button type="submit" className="btn-primary py-2 text-sm">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border-warm dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-slate dark:text-dark-text-secondary">
        <p>© 2026 The Grand Verano Hotel. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-secondary-sand">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-secondary-sand">Terms of Service</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer