'use client'
import React, { useState, useMemo } from 'react';
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react';
import { SearchX, SlidersHorizontal } from 'lucide-react';
import RoomCard from '@/components/RoomCard';
import roomsData from '@/data/rooms.json';
import { Room } from '../types';

const rooms = roomsData as unknown as Room[];

export default function Rooms() {
    const [bedFilter, setBedFilter] = useState('All');
    const [capacityFilter, setCapacityFilter] = useState('All');
    const [sortBy, setSortBy] = useState('Default');

    const filteredRooms = useMemo(() => {
        let result = [...rooms];

        if (bedFilter !== 'All') {
            result = result.filter(r => r.bedType === bedFilter);
        }

        if (capacityFilter !== 'All') {
            const cap = parseInt(capacityFilter);
            if (cap === 3) {
                result = result.filter(r => r.capacity >= 3);
            } else {
                result = result.filter(r => r.capacity === cap);
            }
        }

        if (sortBy === 'PriceLow') {
            result.sort((a, b) => a.pricePerNight - b.pricePerNight);
        } else if (sortBy === 'PriceHigh') {
            result.sort((a, b) => b.pricePerNight - a.pricePerNight);
        }

        return result;
    }, [bedFilter, capacityFilter, sortBy]);

    return (
        <main className="pt-20 lg:pt-24 pb-24">
            {/* Page Header */}
            <header className="bg-accent-champagne dark:bg-dark-surface py-12 lg:py-20 px-6 lg:px-12 border-b border-border-warm dark:border-dark-border">
                <div className="max-w-7xl mx-auto">
                    <nav aria-label="Breadcrumb" className="mb-4">
                        <ol className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary">
                            <li><Link href="/" className="hover:text-secondary-sand">Home</Link></li>
                            <li className="before:content-['/'] before:mr-2">Rooms</li>
                        </ol>
                    </nav>
                    <h1 className="font-serif text-4xl lg:text-6xl text-primary-ink dark:text-dark-text-primary mb-4">Our Rooms & Suites</h1>
                    <p className="text-text-slate dark:text-dark-text-secondary max-w-xl">
                        Select your perfect accommodation from our curated collection of luxury rooms and suites.
                    </p>
                </div>
            </header>

            {/* Filters Bar */}
            <section className="sticky top-16 lg:top-20 z-40 bg-bg-ivory/80 dark:bg-dark-bg/80 backdrop-blur-md border-b border-border-warm dark:border-dark-border py-4 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary">
                            <SlidersHorizontal size={14} />
                            <span>Filters:</span>
                        </div>

                        <select
                            value={bedFilter}
                            onChange={(e) => setBedFilter(e.target.value)}
                            className="bg-white dark:bg-dark-surface border border-border-warm dark:border-dark-border rounded-full px-4 py-2 text-xs font-semibold focus:outline-none focus:border-secondary-sand"
                        >
                            <option value="All">All Bed Types</option>
                            <option value="King">King Bed</option>
                            <option value="Twin">Twin Bed</option>
                            <option value="Suite">Suites</option>
                        </select>

                        <select
                            value={capacityFilter}
                            onChange={(e) => setCapacityFilter(e.target.value)}
                            className="bg-white dark:bg-dark-surface border border-border-warm dark:border-dark-border rounded-full px-4 py-2 text-xs font-semibold focus:outline-none focus:border-secondary-sand"
                        >
                            <option value="All">Any Capacity</option>
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3+ Guests</option>
                        </select>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-6">
                        <span className="text-xs text-text-slate dark:text-dark-text-secondary font-medium" aria-live="polite">
                            Showing {filteredRooms.length} rooms
                        </span>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-transparent text-xs font-bold uppercase tracking-widest text-primary-ink dark:text-dark-text-primary focus:outline-none"
                        >
                            <option value="Default">Sort By</option>
                            <option value="PriceLow">Price: Low to High</option>
                            <option value="PriceHigh">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Room Grid */}
            <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
                <AnimatePresence mode="popLayout">
                    {filteredRooms.length > 0 ? (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredRooms.map((room: Room) => (
                                <div key={room.id}>
                                    <RoomCard room={room} />
                                </div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-24 text-center space-y-6"
                        >
                            <div className="flex justify-center">
                                <SearchX size={64} className="text-secondary-sand/40" />
                            </div>
                            <h3 className="font-serif text-2xl text-primary-ink dark:text-dark-text-primary">No rooms found</h3>
                            <p className="text-text-slate dark:text-dark-text-secondary max-w-xs mx-auto">
                                Try adjusting your filters to find the perfect accommodation for your stay.
                            </p>
                            <button
                                onClick={() => { setBedFilter('All'); setCapacityFilter('All'); }}
                                className="btn-outline"
                            >
                                Clear All Filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </main>
    );
}
