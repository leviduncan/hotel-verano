import type { Room as WPRoom } from './types/room'
import type { Room as UIRoom } from '../app/types'

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim()

// Maps WordPress amenity label strings to lucide icon names
const amenityIconMap: Record<string, string> = {
  'wifi': 'Wifi', 'wi-fi': 'Wifi', 'high-speed wifi': 'Wifi',
  'coffee': 'Coffee', 'nespresso': 'Coffee', 'nespresso machine': 'Coffee',
  'bath': 'Bath', 'shower': 'Bath', 'rainfall shower': 'Bath',
  'air': 'Wind', 'air conditioning': 'Wind', 'ac': 'Wind',
  'tv': 'Tv', 'smart tv': 'Tv', '55" smart tv': 'Tv',
  'safe': 'Shield', 'in-room safe': 'Shield',
  'room service': 'UtensilsCrossed',
  'turndown': 'Star', 'evening turndown': 'Star',
}

function amenityLabelToIcon(label: string): string {
  return amenityIconMap[label.toLowerCase()] ?? 'Check'
}

export function adaptWPRoomDetail(r: WPRoom): UIRoom {
  const featuredImg = r.featuredImage
    ? [{ src: r.featuredImage.node.sourceUrl, alt: r.featuredImage.node.altText ?? r.title, width: 1600, height: 1200 }]
    : []
  const galleryImgs = r.roomDetails.gallery?.node
    ? [{ src: r.roomDetails.gallery.node.sourceUrl, alt: r.roomDetails.gallery.node.altText, width: 1600, height: 1200 }]
    : []

  return {
    id: r.id,
    slug: r.slug,
    name: r.title,
    shortDescription: stripHtml(r.content ?? ''),
    longDescription: stripHtml(r.content ?? ''),
    pricePerNight: r.roomDetails.pricePerNight,
    bedType: r.roomDetails.bedType as UIRoom['bedType'],
    capacity: r.roomDetails.capacity,
    sizeSqm: parseFloat(r.roomDetails.roomSize ?? '0') || 0,
    images: [...featuredImg, ...galleryImgs],
    amenities: (r.roomDetails.amenities ?? []).map((label) => ({
      icon: amenityLabelToIcon(label),
      label,
    })),
    availability: {
      bookedDates: r.roomDetails.bookedDates
        ? r.roomDetails.bookedDates.split(',').map(d => d.trim()).filter(Boolean)
        : [],
    },
    badge: r.roomDetails.isAvailable ? 'Available' : 'Unavailable',
    featured: true,
    order: 0,
  }
}

export function adaptWPRoom(r: WPRoom): UIRoom {
  return {
    id: r.id,
    slug: r.slug,
    name: r.title,
    shortDescription: r.content?.replace(/<[^>]*>/g, '').trim() ?? '',
    longDescription: '',
    pricePerNight: r.roomDetails.pricePerNight,
    bedType: r.roomDetails.bedType as UIRoom['bedType'],
    capacity: r.roomDetails.capacity,
    sizeSqm: 0,
    images: r.featuredImage
      ? [{
          src: r.featuredImage.node.sourceUrl,
          alt: r.featuredImage.node.altText ?? r.title,
          width: 1600,
          height: 1200,
        }]
      : [],
    amenities: [],
    availability: {
      bookedDates: r.roomDetails.bookedDates
        ? r.roomDetails.bookedDates.split(',').map(d => d.trim()).filter(Boolean)
        : [],
    },
    badge: r.roomDetails.isAvailable ? 'Available' : 'Unavailable',
    featured: true,
    order: 0,
  }
}
