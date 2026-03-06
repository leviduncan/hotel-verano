// lib/queries/rooms.ts
import { gql } from 'graphql-request'


export const GET_ALL_ROOMS = gql`
  query GetAllRooms {
    rooms(first: 20) {
      nodes {
        id slug title
        featuredImage { node { sourceUrl altText } }
        roomDetails {
          pricePerNight capacity bedType isAvailable
        }
      }
    }
  }
`


export const GET_FEATURED_ROOMS = gql`
  query GetFeaturedRooms {
    rooms(first: 3) {
      nodes {
        id slug title content
        featuredImage { node { sourceUrl altText } }
        roomDetails {
          pricePerNight capacity bedType isAvailable
        }
      }
    }
  }
`


export const GET_ROOM_BY_SLUG = gql`
  query GetRoomBySlug($slug: String!) {
    roomBy(slug: $slug) {
      id slug title content
      featuredImage { node { sourceUrl altText } }
      roomDetails {
        pricePerNight capacity bedType roomSize amenities isAvailable
        bookedDates
        gallery { node { sourceUrl altText } }
      }
    }
  }
`

