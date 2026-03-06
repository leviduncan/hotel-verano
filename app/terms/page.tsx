// app/terms/page.tsx
// 'use client'  optional if you use hooks

import React from 'react'

export const metadata = {
  title: 'Terms of Service | The Grand Verano',
  description: 'Review the terms and conditions for using The Grand Verano website and services.',
}

export default function TermsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-40">
      <h1 className="text-4xl font-serif mb-6">Terms of Service</h1>

      <p className="mb-4">
        Welcome to The Grand Verano. By accessing our website or using our services, you agree to comply with the following terms and conditions.
      </p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>
          By using our website or booking accommodations, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">2. Bookings and Payments</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>All bookings must be made through our official website or authorized platforms.</li>
          <li>Payment is required to confirm reservations and must be completed using our accepted methods.</li>
          <li>Cancellations and refunds are subject to our <strong>Cancellation Policy</strong>.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">3. User Conduct</h2>
        <p>
          You agree not to use our website or services for any unlawful or prohibited purposes. You are responsible for all actions taken under your account.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">4. Intellectual Property</h2>
        <p>
          All content, logos, images, and materials on this site are the property of The Grand Verano and may not be reproduced without prior written permission.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
        <p>
          The Grand Verano shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
        <p>
          We reserve the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">7. Contact</h2>
        <p>
          For questions regarding these Terms of Service, email us at <a href="mailto:info@grandverano.com" className="text-accent underline">info@grandverano.com</a>.
        </p>
      </section>
    </main>
  )
}