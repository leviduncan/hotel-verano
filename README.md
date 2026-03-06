# Hotel Verano

A luxury hotel website built with **Next.js 16** and a **Headless WordPress CMS** backend, demonstrating a modern decoupled architecture where WordPress manages content and React renders it.

---

## Architecture Overview

```
WordPress (CMS) ──GraphQL──▶ Next.js (Frontend) ──▶ Browser
     │                            │
 WPGraphQL Plugin           Server Components
 Custom Post Type            fetch at build/request
 ACF / Custom Fields         adapt ──▶ render
```

**The core pattern:** WordPress acts purely as a content store. Next.js server components query it via GraphQL at request time, transform the raw WP data into typed UI models, and pass them to React components. No WordPress templates, no PHP in the frontend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| CMS | WordPress + WPGraphQL plugin |
| GraphQL Client | `graphql-request` |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion v12) |
| Forms | React Hook Form + Zod |
| Date Picker | react-day-picker |
| Icons | Lucide React |
| Fonts | Cormorant Garamond (serif) + Inter (sans) |

---

## Project Structure

```
hotel-verano/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout (Navbar, Footer, fonts)
│   ├── page.tsx                # Homepage — fetches featured rooms from WP
│   ├── rooms/
│   │   ├── page.tsx            # All rooms listing (client-side filter/sort)
│   │   └── [slug]/page.tsx     # Individual room detail — fetches by slug from WP
│   ├── contact/page.tsx        # Contact page
│   ├── privacy/page.tsx        # Privacy policy
│   ├── terms/page.tsx          # Terms of service
│   ├── api/
│   │   └── inquiry/route.ts    # API Route: booking inquiry handler
│   └── types/index.ts          # UI-layer Room type (shared across components)
│
├── lib/                        # Data & integration layer
│   ├── graphql.ts              # GraphQL client singleton (WPGraphQL endpoint)
│   ├── queries/
│   │   └── rooms.ts            # All GQL queries (GET_FEATURED_ROOMS, GET_ROOM_BY_SLUG, etc.)
│   ├── types/
│   │   └── room.ts             # WordPress GraphQL response types
│   ├── adapters.ts             # Transforms WP data → UI Room model
│   └── utils.ts                # cn() utility (clsx + tailwind-merge)
│
├── components/
│   ├── NavBar.tsx              # Site navigation
│   ├── Footer.tsx              # Site footer
│   ├── HeroSection.tsx         # Full-screen animated hero (Motion)
│   ├── BentoGrid.tsx           # Featured rooms grid on homepage
│   ├── RoomCard.tsx            # Room card for listings
│   ├── InquiryForm.tsx         # Booking inquiry form (RHF + Zod + DayPicker)
│   ├── rooms/
│   │   ├── RoomCard.tsx        # Room card variant (rooms section)
│   │   ├── RoomGallery.tsx     # Image carousel with Motion transitions
│   │   ├── AvailabilityCalendar.tsx  # Read-only calendar of booked dates
│   │   └── AmenityList.tsx     # Amenity icon + label list
│   └── ui/
│       ├── Button.tsx          # Reusable button component
│       ├── AvailabilityBadge.tsx     # Available/Unavailable badge
│       └── BookingInquiryForm.tsx    # Alternate inquiry form variant
│
├── data/
│   └── rooms.json              # Static fallback room data (used by /rooms listing)
│
├── public/images/              # Static assets (hero image, etc.)
├── .env.example                # Required environment variables
├── next.config.ts              # Image remote domains (WP + Unsplash)
└── tsconfig.json
```

---

## How the Headless WordPress Integration Works

### 1. WordPress Setup (Backend)

WordPress exposes content via the **WPGraphQL** plugin at `/graphql`. Rooms are a **Custom Post Type** with fields managed by ACF (Advanced Custom Fields):

- `pricePerNight`, `capacity`, `bedType`, `roomSize`, `isAvailable`
- `amenities` (string array), `bookedDates` (comma-separated date string)
- `gallery` (image relationship)

### 2. GraphQL Client — `lib/graphql.ts`

A single `GraphQLClient` instance is created using the `NEXT_PUBLIC_WP_GRAPHQL_URL` env var:

```ts
export const gqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_WP_GRAPHQL_URL)
```

This client is imported by any server component that needs to fetch CMS data.

### 3. Typed Queries — `lib/queries/rooms.ts`

Three queries cover all data needs:

| Query | Used by | Purpose |
|---|---|---|
| `GET_FEATURED_ROOMS` | `app/page.tsx` | 3 rooms for the homepage bento grid |
| `GET_ALL_ROOMS` | available for listing | Full listing with minimal fields |
| `GET_ROOM_BY_SLUG` | `app/rooms/[slug]/page.tsx` | Full detail — gallery, amenities, booked dates |

### 4. Type Separation & Adapters — `lib/adapters.ts`

This is the key architectural decision. There are **two separate type systems**:

- `lib/types/room.ts` — mirrors the WordPress GraphQL schema exactly (raw API response shape)
- `app/types/index.ts` — the UI `Room` type that all components consume

The adapter functions transform between them:

```
WordPress Response (WPRoom) ──adaptWPRoom()──────────▶ UI Room (listing cards)
                            ──adaptWPRoomDetail()──▶ UI Room (detail page, with gallery + amenities)
```

This decouples all React components from the WordPress data shape. If the CMS changes, only the adapter needs updating — no component changes required.

**Adapter responsibilities:**
- Strip HTML tags from WordPress `content` field (`stripHtml()`)
- Map amenity label strings (e.g. `"High-Speed WiFi"`) → Lucide icon names via `amenityIconMap`
- Parse `bookedDates` comma-separated string into a `string[]`
- Merge `featuredImage` + `gallery` into a unified `images[]` array
- Normalize `isAvailable` boolean into typed `badge` strings (`'Available' | 'Unavailable'`)

### 5. Server Components Fetch at Request Time

Both the homepage and room detail page are **async React Server Components**:

```ts
// app/page.tsx
export default async function Page() {
  const data = await gqlClient.request(GET_FEATURED_ROOMS)
  const rooms = data.rooms.nodes.map(adaptWPRoom)
  return <BentoGrid rooms={rooms} />
}

// app/rooms/[slug]/page.tsx
export default async function RoomDetail({ params }) {
  const { slug } = await params
  const data = await gqlClient.request(GET_ROOM_BY_SLUG, { slug })
  if (!data.roomBy) notFound()
  const room = adaptWPRoomDetail(data.roomBy)
  // render full detail UI...
}
```

Data flows from WordPress → server → component props. No client-side fetching, no `useEffect`, no loading spinners on the initial render.

---

## Key Pages & Components

### Homepage (`app/page.tsx`)
Async server component. Fetches 3 featured rooms from WordPress and renders them in a `<BentoGrid>`.

### Rooms Listing (`app/rooms/page.tsx`)
**Client component** — uses static `data/rooms.json` for filtering and sorting. Demonstrates:
- `useState` + `useMemo` for reactive filter/sort state
- Filter by bed type (King, Twin, Suite) and guest capacity
- Sort by price (low → high, high → low)
- `AnimatePresence` from Motion for animated grid transitions
- Accessible empty state with clear-filters button

> **Interview note:** This is an intentional architectural contrast — the listing uses a local JSON file to demonstrate client-side state management, while the homepage and detail page use server-side GraphQL fetching. Both patterns are valid and context-dependent.

### Room Detail (`app/rooms/[slug]/page.tsx`)
Async server component. Fetches full room data by URL slug from WordPress, renders:
- `<RoomGallery>` — animated image carousel with prev/next controls and dot indicators
- `<AvailabilityCalendar>` — read-only `react-day-picker` showing booked dates with strikethrough styling
- `<InquiryForm>` — full booking inquiry form (client component)
- Amenities grid with dynamic Lucide icons resolved from string names

### Inquiry Form (`components/InquiryForm.tsx`)
Client component demonstrating a complete form implementation:
- `react-hook-form` for controlled form state
- `zod` schema validation including cross-field date range validation (`checkOut` must be after `checkIn`)
- `react-day-picker` in popover mode for date selection
- Motion-animated success confirmation state
- Accessible error messages with icons

---

## Data Flow Diagram

```
User visits /rooms/ocean-suite
        │
        ▼
Next.js Server Component (app/rooms/[slug]/page.tsx)
        │
        ├── gqlClient.request(GET_ROOM_BY_SLUG, { slug: "ocean-suite" })
        │           │
        │           ▼
        │   WordPress GraphQL API (/graphql)
        │   Returns: WPRoom { id, slug, title, content, featuredImage, roomDetails { ... } }
        │           │
        ├── adaptWPRoomDetail(wpRoom)
        │   Returns: UIRoom { name, images[], amenities[], availability.bookedDates[], ... }
        │           │
        ▼
React renders (server + client components):
  <RoomGallery images={room.images} />              ← client component
  <AvailabilityCalendar bookedDates={room.availability.bookedDates} />  ← client component
  <InquiryForm roomName={room.name} />              ← client component
```

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
# The WPGraphQL endpoint from your WordPress install
NEXT_PUBLIC_WP_GRAPHQL_URL=https://your-wp-site.com/graphql

# Transactional email for the inquiry API route (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
INQUIRY_TO_EMAIL=concierge@yourhotel.com

# The deployed URL of this Next.js app
NEXT_PUBLIC_SITE_URL=https://hotel-verano.vercel.app
```

---

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in NEXT_PUBLIC_WP_GRAPHQL_URL at minimum
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## WordPress CMS Requirements

To connect a live WordPress backend:

1. Install the **WPGraphQL** plugin
2. Register a `room` Custom Post Type
3. Add ACF field group with: `pricePerNight` (Number), `capacity` (Number), `bedType` (Select), `roomSize` (Text), `isAvailable` (True/False), `amenities` (Repeater), `bookedDates` (Text), `gallery` (Image)
4. Install **WPGraphQL for ACF** to expose custom fields to the GraphQL schema
5. Set `NEXT_PUBLIC_WP_GRAPHQL_URL=https://your-wp-site.com/graphql`
6. Add your WordPress hostname to `next.config.ts` under `images.remotePatterns`
