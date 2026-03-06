'use client'
import Image from 'next/image';
import { motion } from 'motion/react';
import TrustImg from '@/public/images/resort.png'

const TrustSection = () => {
    return (
        <>
            <section className="py-24 px-6 lg:px-12 bg-white dark:bg-dark-surface overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <span className="text-xs uppercase tracking-widest text-secondary-sand font-bold">Our Story</span>
                        <h2 className="font-serif text-4xl lg:text-5xl text-primary-ink dark:text-dark-text-primary leading-tight">
                            A Legacy of Warmth <br /> and Refined Luxury
                        </h2>
                        <p className="text-text-slate dark:text-dark-text-secondary text-lg leading-relaxed">
                            Founded in 1987, The Grand Verano was born from a vision to create a home away from home for the discerning traveler. We believe that true luxury is found in the details — the softness of the linens, the warmth of the welcome, and the quiet moments of peace.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-4">
                            <div>
                                <span className="block font-serif text-3xl text-secondary-sand mb-1">35+</span>
                                <span className="text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary">Years of Excellence</span>
                            </div>
                            <div>
                                <span className="block font-serif text-3xl text-secondary-sand mb-1">12k+</span>
                                <span className="text-xs uppercase tracking-widest font-bold text-text-slate dark:text-dark-text-secondary">Happy Guests</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src={TrustImg}
                            alt="The Grand Verano Hotel Mountain View"
                            fill
                            className="object-cover w-full h-full"
                            referrerPolicy="no-referrer"
                        />
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default TrustSection