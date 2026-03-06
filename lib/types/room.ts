// lib/types/room.ts
export interface RoomImage {
  sourceUrl: string
  altText: string
}


export interface RoomDetails {
  pricePerNight: number
  capacity: number
  bedType: string
  roomSize: string
  amenities: string[]
  isAvailable: boolean
  bookedDates?: string
  gallery?: { node: RoomImage }
}


export interface Room {
  id: string
  slug: string
  title: string
  content?: string
  featuredImage: { node: RoomImage } | null
  roomDetails: RoomDetails
}

