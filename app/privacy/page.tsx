// app/privacy/page.tsx
'use client' // optional: only needed if you use React hooks or interactivity

import React from 'react'

export default function PrivacyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-40">
      <h1 className="text-4xl font-serif mb-6">Privacy Policy</h1>

      <p className="mb-4">
        At The Grand Verano, your privacy is important to us. We collect only the information necessary to provide our services.
      </p>

      <p className="mb-4">
        We do not sell your personal data and follow industry-standard practices to keep it secure.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
        <ul className="list-disc pl-6">
          <li>Booking information (name, email, dates)</li>
          <li>Payment details (processed securely via Stripe/PayPal)</li>
          <li>Optional preferences for room requests</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
        <p>We use cookies to enhance your experience and analyze traffic. You can disable cookies in your browser settings.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p>If you have questions about your privacy, email us at <a href="mailto:privacy@grandverano.com" className="text-accent underline">privacy@grandverano.com</a>.</p>
      </section>
    </main>
  )
}